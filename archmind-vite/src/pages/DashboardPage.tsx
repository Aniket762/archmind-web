import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Stack,
  Chip, Button, LinearProgress, Avatar, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import type { SvgIconComponent } from '@mui/icons-material';
import {
  TrendingUpOutlined, LocalFireDepartmentOutlined,
  EmojiEventsOutlined, ArrowForwardOutlined, AddOutlined,
} from '@mui/icons-material';
import {
  mockDashboardStats, mockSubmissions, mockSubmissionTrend, mockSkillRadar,
} from '@/mocks/data';
import { DifficultyBadge } from '@/component/common/DifficultyBadge';
import { ScoreCircle }     from '@/component/common/ScoreCircle';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { useAppSelector }  from '@/hooks/redux';
import { selectAuth }      from '@/store';
import type { DashboardStats, Submission } from '@/types';

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: SvgIconComponent;
  color?: string;
}

function StatCard({ label, value, sub, icon: Icon, color = '#6C63FF' }: StatCardProps) {
  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>{label}</Typography>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em" sx={{ color }}>
              {value}
            </Typography>
            {sub && (
              <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                {sub}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Box sx={{
              width: 40, height: 40, borderRadius: 2,
              backgroundColor: alpha(color, 0.1),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon sx={{ color, fontSize: 20 }} />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

// ─── Difficulty progress bar ──────────────────────────────────────────────────

function DifficultyBar({
  label, solved, total, color,
}: { label: string; solved: number; total: number; color: string }) {
  const pct = Math.round((solved / total) * 100);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={0.75}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />
          <Typography variant="body2" fontWeight={500}>{label}</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">{solved}/{total}</Typography>
      </Stack>
      <LinearProgress
        variant="determinate" value={pct}
        sx={{
          height: 6, borderRadius: 3,
          backgroundColor: alpha(color, 0.14),
          '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 3 },
        }}
      />
    </Box>
  );
}

// ─── Activity heatmap ─────────────────────────────────────────────────────────

function ActivityHeatmap() {
  const weeks = 18;
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => ({
      count: Math.random() > 0.58 ? Math.floor(Math.random() * 4) + 1 : 0,
    })),
  );

  const bgFor = (count: number) => {
    if (!count) return 'rgba(108,99,255,0.06)';
    const opacity = [0.2, 0.42, 0.68, 1][Math.min(count - 1, 3)];
    return `rgba(108,99,255,${opacity})`;
  };

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', gap: '3px', minWidth: 'fit-content' }}>
        {grid.map((week, wi) => (
          <Box key={wi} sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((day, di) => (
              <Box
                key={di}
                title={`${day.count} submissions`}
                sx={{
                  width: 12, height: 12, borderRadius: 0.5,
                  backgroundColor: bgFor(day.count),
                  transition: 'transform 0.1s',
                  '&:hover': { transform: 'scale(1.35)' },
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
      <Stack direction="row" alignItems="center" spacing={1} mt={2}>
        <Typography variant="caption" color="text.secondary">Less</Typography>
        {[0, 1, 2, 3, 4].map((n) => (
          <Box key={n} sx={{
            width: 12, height: 12, borderRadius: 0.5,
            backgroundColor: n === 0
              ? 'rgba(108,99,255,0.06)'
              : `rgba(108,99,255,${[0.2, 0.42, 0.68, 1][n - 1]})`,
          }} />
        ))}
        <Typography variant="caption" color="text.secondary">More</Typography>
      </Stack>
    </Box>
  );
}

// ─── Recent submissions list ──────────────────────────────────────────────────

function RecentSubmissions({
  submissions,
  navigate,
}: {
  submissions: Submission[];
  navigate: (path: string) => void;
}) {
  const problemMap: Record<string, string> = {
    '1': 'Design a URL Shortener',
    '2': 'Design Twitter',
    '4': 'Design Uber',
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    EVALUATED: { bg: 'rgba(81,207,102,0.1)',  text: '#51CF66' },
    DRAFT:     { bg: 'rgba(255,179,71,0.1)',  text: '#FFB347' },
    EVALUATING:{ bg: 'rgba(108,99,255,0.1)', text: '#6C63FF' },
    SUBMITTED: { bg: 'rgba(108,99,255,0.1)', text: '#6C63FF' },
    FAILED:    { bg: 'rgba(255,107,107,0.1)', text: '#FF6B6B' },
  };

  return (
    <Stack spacing={1.5}>
      {submissions.map((s) => {
        const colors = statusColors[s.status] ?? statusColors.DRAFT;
        return (
          <Box
            key={s.id}
            onClick={() => navigate(`/submissions/${s.id}`)}
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
              transition: 'all 0.15s',
            }}
          >
            <Box flex={1} minWidth={0}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {problemMap[s.problemId] ?? `Problem #${s.problemId}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(s.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} alignItems="center" ml={2}>
              {s.score != null && <ScoreCircle score={s.score} size={44} />}
              <Chip
                label={s.status}
                size="small"
                sx={{
                  fontSize: '0.68rem', height: 22,
                  backgroundColor: colors.bg, color: colors.text,
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const stats    = mockDashboardStats;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      {/* Header */}
      <motion.div variants={staggerItem}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
          mb={4}
        >
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em">
              Welcome back, {user?.name?.split(' ')[0] ?? 'Engineer'} 👋
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {stats.streak > 0
                ? `🔥 ${stats.streak}-day streak — keep it going!`
                : 'Start a new problem today!'}
            </Typography>
          </Box>
          <Button
            variant="contained" startIcon={<AddOutlined />}
            onClick={() => navigate('/problems')}
            sx={{
              mt: { xs: 2, sm: 0 },
              background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
              fontWeight: 600,
            }}
          >
            New Problem
          </Button>
        </Stack>
      </motion.div>

      {/* Stat cards */}
      <motion.div variants={staggerItem}>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={6} sm={3}>
            <StatCard label="Problems Solved" value={stats.solved}
              sub={`of ${stats.total} total`} icon={TrendingUpOutlined} color="#6C63FF" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard label="Current Streak" value={`${stats.streak}d`}
              sub="days in a row" icon={LocalFireDepartmentOutlined} color="#FF6B6B" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard label="Global Rank" value={`#${stats.rank.toLocaleString()}`}
              sub="top 5%" icon={EmojiEventsOutlined} color="#FFB347" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard label="Total Score" value={stats.score.toLocaleString()}
              sub="+240 this week" color="#51CF66" />
          </Grid>
        </Grid>
      </motion.div>

      <Grid container spacing={3}>
        {/* Submission trend chart */}
        <Grid item xs={12} md={8}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Submission Trend</Typography>
                  <Chip label="Last 7 months" size="small" variant="outlined"
                    sx={{ fontSize: '0.72rem' }} />
                </Stack>
                <ResponsiveContainer width="100%" height={210}>
                  <AreaChart data={mockSubmissionTrend}
                    margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#6C63FF" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#666' }}
                      axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#666' }}
                      axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a28',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8, fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="avgScore"
                      stroke="#6C63FF" fill="url(#gradPrimary)"
                      strokeWidth={2.5}
                      dot={{ fill: '#6C63FF', r: 4, strokeWidth: 0 }}
                      name="Avg Score"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Progress by difficulty */}
        <Grid item xs={12} md={4}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Progress</Typography>
                <Stack spacing={3}>
                  <DifficultyBar label="Easy"   solved={stats.easyCount.solved}
                    total={stats.easyCount.total}   color="#51CF66" />
                  <DifficultyBar label="Medium" solved={stats.mediumCount.solved}
                    total={stats.mediumCount.total} color="#FFB347" />
                  <DifficultyBar label="Hard"   solved={stats.hardCount.solved}
                    total={stats.hardCount.total}   color="#FF6B6B" />
                </Stack>
                <Box mt={4}>
                  <Typography variant="body2" color="text.secondary" mb={2}>Total Solved</Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <ScoreCircle
                      score={Math.round((stats.solved / stats.total) * 100)}
                      size={72}
                    />
                    <Box>
                      <Typography variant="h5" fontWeight={800}>{stats.solved}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        of {stats.total} problems
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Skill radar */}
        <Grid item xs={12} md={5}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Skill Breakdown</Typography>
                <Typography variant="caption" color="text.secondary" mb={2} display="block">
                  Based on your last 10 submissions
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={mockSkillRadar}>
                    <PolarGrid stroke="rgba(255,255,255,0.07)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#888' }} />
                    <Radar dataKey="score" stroke="#6C63FF" fill="#6C63FF"
                      fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Activity heatmap */}
        <Grid item xs={12} md={7}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Activity</Typography>
                  <Chip label={`${stats.streak} day streak 🔥`} size="small" color="error"
                    sx={{ fontSize: '0.72rem' }} />
                </Stack>
                <ActivityHeatmap />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent submissions */}
        <Grid item xs={12}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Recent Submissions</Typography>
                  <Button size="small"
                    endIcon={<ArrowForwardOutlined sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: '0.8rem' }}>
                    View all
                  </Button>
                </Stack>
                <RecentSubmissions submissions={mockSubmissions} navigate={navigate} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}
