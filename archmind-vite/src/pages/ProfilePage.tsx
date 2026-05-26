import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Stack,
  Avatar, Chip, Button, Divider, LinearProgress, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  EditOutlined, CalendarTodayOutlined,
  EmojiEventsOutlined, LocalFireDepartmentOutlined,
} from '@mui/icons-material';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { useAppSelector } from '@/hooks/redux';
import { selectAuth }     from '@/store';
import { ScoreCircle }    from '@/components/common/ScoreCircle';
import { DifficultyBadge } from '@/components/common/DifficultyBadge';
import {
  mockDashboardStats, mockSubmissions, mockSkillRadar, mockSubmissionTrend,
} from '@/mocks/data';
import { staggerContainer, staggerItem } from '@/animations/variants';

const achievements = [
  { icon: '🚀', label: 'First Solve', earned: true  },
  { icon: '🔥', label: '7-Day Streak', earned: true  },
  { icon: '⭐', label: 'Top 5%', earned: true  },
  { icon: '🏆', label: '25 Solves', earned: false },
  { icon: '🧠', label: 'Hard Mode', earned: false },
  { icon: '💎', label: 'Perfect Score', earned: false },
];

export default function ProfilePage() {
  const { user } = useAppSelector(selectAuth);
  const stats    = mockDashboardStats;

  if (!user) return null;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      {/* Profile header */}
      <motion.div variants={staggerItem}>
        <Card sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3} alignItems={{ sm: 'flex-start' }}
            >
              <Avatar sx={{
                width: 80, height: 80, fontSize: '1.8rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
                flexShrink: 0,
              }}>
                {user.name?.[0] ?? 'U'}
              </Avatar>

              <Box flex={1}>
                <Stack direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between" alignItems={{ sm: 'flex-start' }}>
                  <Box>
                    <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1.5}>
                      {user.email}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <CalendarTodayOutlined sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          Joined {user.joinedAt
                            ? new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                            : 'Recently'}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <EmojiEventsOutlined sx={{ fontSize: 14, color: '#FFB347' }} />
                        <Typography variant="caption" color="text.secondary">
                          Rank #{(user.rank ?? stats.rank).toLocaleString()}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <LocalFireDepartmentOutlined sx={{ fontSize: 14, color: '#FF6B6B' }} />
                        <Typography variant="caption" color="text.secondary">
                          {user.streak ?? stats.streak}-day streak
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Button
                    variant="outlined" size="small" startIcon={<EditOutlined sx={{ fontSize: 14 }} />}
                    sx={{ mt: { xs: 2, sm: 0 }, fontWeight: 600 }}
                  >
                    Edit Profile
                  </Button>
                </Stack>

                <Divider sx={{ my: 2.5 }} />

                <Grid container spacing={3}>
                  {[
                    { label: 'Problems Solved', value: stats.solved },
                    { label: 'Total Score',     value: (user.totalScore ?? stats.score).toLocaleString() },
                    { label: 'Global Rank',     value: `#${(user.rank ?? stats.rank).toLocaleString()}` },
                    { label: 'Streak',          value: `${user.streak ?? stats.streak}d` },
                  ].map(({ label, value }) => (
                    <Grid item xs={6} sm={3} key={label}>
                      <Typography variant="body2" color="text.secondary" mb={0.25}>{label}</Typography>
                      <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em">
                        {value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3}>
        {/* Solved by difficulty */}
        <Grid item xs={12} md={4}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>Solved Problems</Typography>
                <Box textAlign="center" mb={3}>
                  <ScoreCircle
                    score={Math.round((stats.solved / stats.total) * 100)}
                    size={100}
                  />
                  <Typography variant="h5" fontWeight={800} mt={1}>{stats.solved}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    of {stats.total} total
                  </Typography>
                </Box>
                <Stack spacing={2.5}>
                  {[
                    { label: 'Easy',   ...stats.easyCount,   color: '#51CF66' },
                    { label: 'Medium', ...stats.mediumCount,  color: '#FFB347' },
                    { label: 'Hard',   ...stats.hardCount,    color: '#FF6B6B' },
                  ].map(({ label, solved, total, color }) => (
                    <Box key={label}>
                      <Stack direction="row" justifyContent="space-between" mb={0.75}>
                        <Typography variant="body2" fontWeight={500}>{label}</Typography>
                        <Typography variant="body2" color="text.secondary">{solved}/{total}</Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={Math.round((solved / total) * 100)}
                        sx={{
                          height: 6, borderRadius: 3,
                          backgroundColor: alpha(color, 0.13),
                          '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 3 },
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Skill radar */}
        <Grid item xs={12} md={4}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>Skill Radar</Typography>
                <Typography variant="caption" color="text.secondary" mb={2} display="block">
                  Based on last 10 submissions
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

        {/* Score progression */}
        <Grid item xs={12} md={4}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Score Progression</Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={mockSubmissionTrend}
                    margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
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
                    <Bar dataKey="avgScore" fill="#6C63FF" radius={[4, 4, 0, 0]} name="Avg Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Achievements</Typography>
                <Grid container spacing={2}>
                  {achievements.map((a) => (
                    <Grid item xs={6} sm={4} md={2} key={a.label}>
                      <Box sx={{
                        p: 2, borderRadius: 2, textAlign: 'center',
                        border: '1px solid', borderColor: a.earned ? 'primary.main' : 'divider',
                        backgroundColor: a.earned
                          ? (t) => alpha(t.palette.primary.main, 0.07)
                          : 'transparent',
                        opacity: a.earned ? 1 : 0.4,
                        transition: 'all 0.2s',
                      }}>
                        <Typography sx={{ fontSize: 28, mb: 0.75 }}>{a.icon}</Typography>
                        <Typography variant="caption" fontWeight={600} display="block">
                          {a.label}
                        </Typography>
                        {a.earned && (
                          <Chip label="Earned" size="small" color="primary"
                            sx={{ mt: 0.75, fontSize: '0.6rem', height: 18 }} />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent submissions */}
        <Grid item xs={12}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Recent Submissions</Typography>
                <Stack spacing={1.5}>
                  {mockSubmissions.map((s) => (
                    <Box key={s.id} sx={{
                      display: 'flex', alignItems: 'center', gap: 2,
                      p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main' }, transition: 'border-color 0.15s',
                    }}>
                      {s.score != null && <ScoreCircle score={s.score} size={40} />}
                      <Box flex={1} minWidth={0}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                          Problem #{s.problemId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={s.status} size="small"
                        sx={{
                          fontSize: '0.67rem', height: 22, fontWeight: 600,
                          backgroundColor: s.status === 'EVALUATED'
                            ? 'rgba(81,207,102,0.1)' : 'rgba(255,179,71,0.1)',
                          color: s.status === 'EVALUATED' ? '#51CF66' : '#FFB347',
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}
