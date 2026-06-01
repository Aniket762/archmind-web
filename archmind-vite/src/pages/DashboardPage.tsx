import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Stack,
  Chip, Button, LinearProgress, alpha,
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
import { DifficultyBadge } from '@/component/common/DifficultyBadge';
import { ScoreCircle }     from '@/component/common/ScoreCircle';
import { CardSkeleton }    from '@/component/common/LoadingSkeleton';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { useAppSelector }  from '@/hooks/redux';
import { selectAuth }      from '@/store';
import { dashboardService } from '@/services/dashboardService';
import type { DashboardStats, RecentSubmission, DayActivity } from '@/types';

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
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
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

function ActivityHeatmap({ activityData }: { activityData: DayActivity[] }) {
  const activityMap: Record<string, number> = {};
  activityData.forEach((d) => { activityMap[d.date] = d.count; });

  const today = new Date();
  const weeks = 18;
  const totalDays = weeks * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays + 1);

  const grid: { date: string; count: number }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      const dateStr = date.toISOString().split('T')[0];
      week.push({ date: dateStr, count: activityMap[dateStr] ?? 0 });
    }
    grid.push(week);
  }

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
                title={`${day.date}: ${day.count} submission${day.count !== 1 ? 's' : ''}`}
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

function RecentSubmissionsList({
  submissions,
  navigate,
}: {
  submissions: RecentSubmission[];
  navigate: (path: string) => void;
}) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    EVALUATED:  { bg: 'rgba(81,207,102,0.1)',  text: '#51CF66' },
    DRAFT:      { bg: 'rgba(255,179,71,0.1)',  text: '#FFB347' },
    EVALUATING: { bg: 'rgba(108,99,255,0.1)',  text: '#6C63FF' },
    SUBMITTED:  { bg: 'rgba(108,99,255,0.1)',  text: '#6C63FF' },
    FAILED:     { bg: 'rgba(255,107,107,0.1)', text: '#FF6B6B' },
  };

  if (submissions.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body2" color="text.secondary">
          No submissions yet — start solving problems!
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.5}>
      {submissions.map((s) => {
        const colors = statusColors[s.status] ?? statusColors.DRAFT;
        return (
          <Box
            key={s.submissionId}
            onClick={() => navigate(`/submissions/${s.submissionId}`)}
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
                {s.problemTitle}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={0.25}>
                <Typography variant="caption" color="text.secondary">
                  {new Date(s.submittedAt).toLocaleDateString()}
                </Typography>
                <DifficultyBadge level={s.level} />
              </Stack>
            </Box>
            <Stack direction="row" spacing={1.5} alignItems="center" ml={2}>
              {s.score != null && <ScoreCircle score={Math.round(s.score)} size={44} />}
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

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <Box>
      <Grid container spacing={2} mb={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={6} sm={3} key={i}><CardSkeleton /></Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} md={6} key={i}><CardSkeleton /></Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate              = useNavigate();
  const { user }              = useAppSelector(selectAuth);
  const [stats, setStats]     = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const loadStats = () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    dashboardService
      .getStats(user.id)
      .then(setStats)
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadStats(); }, [user?.id]);

  if (loading) return <DashboardSkeleton />;

  if (error || !stats) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="text.secondary" mb={2}>
          {error ?? 'No data available'}
        </Typography>
        <Button variant="outlined" onClick={loadStats}>Retry</Button>
      </Box>
    );
  }

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
              {stats.currentStreak > 0
                ? `🔥 ${stats.currentStreak}-day streak — keep it going!`
                : 'Start a new problem today!'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
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
            <StatCard
              label="Problems Solved"
              value={stats.totalSolved}
              sub={`of ${stats.totalProblems} total`}
              icon={TrendingUpOutlined}
              color="#6C63FF"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard
              label="Current Streak"
              value={`${stats.currentStreak}d`}
              sub="days in a row"
              icon={LocalFireDepartmentOutlined}
              color="#FF6B6B"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard
              label="Global Rank"
              value={`#${stats.globalRank.toLocaleString()}`}
              sub="based on total score"
              icon={EmojiEventsOutlined}
              color="#FFB347"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard
              label="Total Score"
              value={stats.totalScore.toLocaleString()}
              sub="cumulative score"
              color="#51CF66"
            />
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
                {stats.submissionTrend.length === 0 ? (
                  <Box textAlign="center" py={6}>
                    <Typography variant="body2" color="text.secondary">
                      No submission data yet
                    </Typography>
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height={210}>
                    <AreaChart
                      data={stats.submissionTrend}
                      margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
                    >
                      <defs>
                        <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#6C63FF" stopOpacity={0.22} />
                          <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
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
                      <Area
                        type="monotone" dataKey="avgScore"
                        stroke="#6C63FF" fill="url(#gradPrimary)"
                        strokeWidth={2.5}
                        dot={{ fill: '#6C63FF', r: 4, strokeWidth: 0 }}
                        name="Avg Score"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
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
                  <DifficultyBar
                    label="Easy"
                    solved={stats.easySolved}
                    total={stats.easyTotal}
                    color="#51CF66"
                  />
                  <DifficultyBar
                    label="Medium"
                    solved={stats.mediumSolved}
                    total={stats.mediumTotal}
                    color="#FFB347"
                  />
                  <DifficultyBar
                    label="Hard"
                    solved={stats.hardSolved}
                    total={stats.hardTotal}
                    color="#FF6B6B"
                  />
                </Stack>
                <Box mt={4}>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Total Solved
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <ScoreCircle
                      score={
                        stats.totalProblems > 0
                          ? Math.round((stats.totalSolved / stats.totalProblems) * 100)
                          : 0
                      }
                      size={72}
                    />
                    <Box>
                      <Typography variant="h5" fontWeight={800}>
                        {stats.totalSolved}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        of {stats.totalProblems} problems
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
                <Typography variant="h6" fontWeight={700} mb={0.5}>
                  Skill Breakdown
                </Typography>
                <Typography variant="caption" color="text.secondary" mb={2} display="block">
                  Based on your last 10 submissions
                </Typography>
                {stats.skillBreakdown.length === 0 ? (
                  <Box textAlign="center" py={6}>
                    <Typography variant="body2" color="text.secondary">
                      Submit more problems to see your skill breakdown
                    </Typography>
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={stats.skillBreakdown}>
                      <PolarGrid stroke="rgba(255,255,255,0.07)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#888' }} />
                      <Radar
                        dataKey="score"
                        stroke="#6C63FF" fill="#6C63FF"
                        fillOpacity={0.2} strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
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
                  <Chip
                    label={`${stats.currentStreak} day streak 🔥`}
                    size="small" color="error"
                    sx={{ fontSize: '0.72rem' }}
                  />
                </Stack>
                <ActivityHeatmap activityData={stats.activityData} />
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
                  <Button
                    size="small"
                    endIcon={<ArrowForwardOutlined sx={{ fontSize: 14 }} />}
                    onClick={() => navigate('/problems')}
                    sx={{ fontSize: '0.8rem' }}
                  >
                    View all
                  </Button>
                </Stack>
                <RecentSubmissionsList
                  submissions={stats.recentSubmissions}
                  navigate={navigate}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

      </Grid>
    </motion.div>
  );
}
