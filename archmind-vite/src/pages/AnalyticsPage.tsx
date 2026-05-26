import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Stack, Chip, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  PieChart, Pie, Cell,
  ResponsiveContainer,
} from 'recharts';
import { mockSubmissionTrend, mockSkillRadar } from '@/mocks/data';
import { staggerContainer, staggerItem } from '@/animations/variants';

const difficultyData = [
  { name: 'Easy',   value: 7,  color: '#51CF66' },
  { name: 'Medium', value: 4,  color: '#FFB347' },
  { name: 'Hard',   value: 1,  color: '#FF6B6B' },
];

const topicData = [
  { topic: 'Storage',      solved: 4 },
  { topic: 'Social',       solved: 2 },
  { topic: 'Infra',        solved: 2 },
  { topic: 'Real-time',    solved: 2 },
  { topic: 'Messaging',    solved: 1 },
  { topic: 'Distributed',  solved: 1 },
];

export default function AnalyticsPage() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      {/* Header */}
      <motion.div variants={staggerItem}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em">Analytics</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Your performance insights and progress over time
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Score trend */}
        <Grid item xs={12} md={8}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>Average Score Trend</Typography>
                  <Chip label="7 months" size="small" variant="outlined" sx={{ fontSize: '0.72rem' }} />
                </Stack>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={mockSubmissionTrend}
                    margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#6C63FF" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#666' }}
                      axisLine={false} tickLine={false} />
                    <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#666' }}
                      axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a28',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8, fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="avgScore"
                      stroke="#6C63FF" fill="url(#grad1)"
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

        {/* Difficulty pie */}
        <Grid item xs={12} md={4}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Solved by Difficulty</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={difficultyData} cx="50%" cy="50%"
                        innerRadius={55} outerRadius={80}
                        dataKey="value" paddingAngle={4}
                      >
                        {difficultyData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a28',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 8, fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Stack spacing={1} mt={1}>
                  {difficultyData.map((d) => (
                    <Stack key={d.name} direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: d.color }} />
                        <Typography variant="body2">{d.name}</Typography>
                      </Stack>
                      <Typography variant="body2" fontWeight={700}>{d.value}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Submissions per month */}
        <Grid item xs={12} md={6}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Submissions Per Month</Typography>
                <ResponsiveContainer width="100%" height={200}>
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
                    <Bar dataKey="submissions" fill="#4ECDC4" radius={[4, 4, 0, 0]} name="Submissions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Skill radar */}
        <Grid item xs={12} md={6}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={0.5}>Skill Breakdown</Typography>
                <Typography variant="caption" color="text.secondary" mb={2} display="block">
                  Areas where you excel vs. need improvement
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
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

        {/* Problems by topic */}
        <Grid item xs={12}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>Problems Solved by Topic</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topicData} layout="vertical"
                    margin={{ top: 0, right: 20, bottom: 0, left: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#666' }}
                      axisLine={false} tickLine={false} />
                    <YAxis dataKey="topic" type="category" tick={{ fontSize: 11, fill: '#888' }}
                      axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a28',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8, fontSize: 12,
                      }}
                    />
                    <Bar dataKey="solved" fill="#6C63FF" radius={[0, 4, 4, 0]} name="Solved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}
