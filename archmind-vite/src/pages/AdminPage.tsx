import React, { useState } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Stack,
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, IconButton,
  Tooltip, Tab, Tabs, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  EditOutlined, DeleteOutlined, AddOutlined,
  PeopleOutlined, CodeOutlined,
  BarChartOutlined, CheckCircleOutlined,
} from '@mui/icons-material';
import { mockProblems } from '@/mocks/data';
import { DifficultyBadge } from '@/component/common/DifficultyBadge';
import { TOPIC_LABEL } from '@/constants';
import { staggerContainer, staggerItem } from '@/animations/variants';

type AdminTab = 'problems' | 'users' | 'overview';

const mockUsers = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@example.com', role: 'USER',  solved: 12, joinedAt: '2023-06-15' },
  { id: 'u2', name: 'Sarah Chen',   email: 'sarah@example.com', role: 'USER',  solved: 34, joinedAt: '2023-04-01' },
  { id: 'u3', name: 'Admin User',   email: 'admin@archmind.io', role: 'ADMIN', solved: 0,  joinedAt: '2023-01-01' },
];

const platformStats = [
  { label: 'Total Users',       value: '52,841', icon: PeopleOutlined,    color: '#6C63FF' },
  { label: 'Total Problems',    value: '500',     icon: CodeOutlined,      color: '#00D4AA' },
  { label: 'Submissions Today', value: '1,284',   icon: CheckCircleOutlined, color: '#51CF66' },
  { label: 'Avg Score',         value: '74.2',    icon: BarChartOutlined,  color: '#FFB347' },
];

function StatCard({
  label, value, icon: Icon, color,
}: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>{label}</Typography>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em" sx={{ color }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{
            width: 40, height: 40, borderRadius: 2,
            backgroundColor: alpha(color, 0.1),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon sx={{ color, fontSize: 20 }} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ProblemsTab() {
  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<AddOutlined />}
          sx={{ background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)', fontWeight: 600 }}>
          New Problem
        </Button>
      </Stack>
      <TableContainer component={Paper}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Title', 'Level', 'Topic', 'Companies', 'Solved By', 'Actions'].map((h) => (
                <TableCell key={h} sx={{
                  fontWeight: 700, fontSize: '0.76rem', color: 'text.secondary', py: 1.5,
                }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProblems.map((p) => (
              <TableRow key={p.id}
                sx={{ '&:last-child td': { borderBottom: 0 },
                  '&:hover': { backgroundColor: (t) => alpha(t.palette.primary.main, 0.03) } }}>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography variant="body2" fontWeight={600}>{p.title}</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <DifficultyBadge level={p.level} />
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Chip label={TOPIC_LABEL[p.topic]} size="small" variant="outlined"
                    sx={{ fontSize: '0.67rem', height: 20 }} />
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {p.companies.slice(0, 2).join(', ')}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {(p.solvedBy ?? 0).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <EditOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: 'error.main' }}>
                        <DeleteOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function UsersTab() {
  return (
    <TableContainer component={Paper}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, boxShadow: 'none' }}>
      <Table>
        <TableHead>
          <TableRow>
            {['Name', 'Email', 'Role', 'Solved', 'Joined', 'Actions'].map((h) => (
              <TableCell key={h} sx={{
                fontWeight: 700, fontSize: '0.76rem', color: 'text.secondary', py: 1.5,
              }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mockUsers.map((u) => (
            <TableRow key={u.id}
              sx={{ '&:last-child td': { borderBottom: 0 },
                '&:hover': { backgroundColor: (t) => alpha(t.palette.primary.main, 0.03) } }}>
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2" fontWeight={600}>{u.name}</Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2" color="text.secondary">{u.email}</Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Chip
                  label={u.role} size="small"
                  sx={{
                    fontSize: '0.67rem', height: 20, fontWeight: 600,
                    backgroundColor: u.role === 'ADMIN'
                      ? 'rgba(108,99,255,0.12)' : 'rgba(255,255,255,0.06)',
                    color: u.role === 'ADMIN' ? '#6C63FF' : 'text.secondary',
                  }}
                />
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2">{u.solved}</Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {new Date(u.joinedAt).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Edit user">
                    <IconButton size="small">
                      <EditOutlined sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user">
                    <IconButton size="small" sx={{ color: 'error.main' }}>
                      <DeleteOutlined sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('overview');

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={staggerItem}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em">Admin Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Manage problems, users, and platform health
            </Typography>
          </Box>
          <Chip label="Admin" size="small" color="primary"
            sx={{ fontWeight: 700, fontSize: '0.72rem' }} />
        </Stack>
      </motion.div>

      {/* Overview stats */}
      {tab === 'overview' && (
        <motion.div variants={staggerItem}>
          <Grid container spacing={2} mb={3}>
            {platformStats.map((s) => (
              <Grid item xs={6} sm={3} key={s.label}>
                <StatCard {...s} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div variants={staggerItem}>
        <Tabs
          value={tab} onChange={(_, v: AdminTab) => setTab(v)}
          sx={{
            borderBottom: '1px solid', borderColor: 'divider', mb: 3,
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 },
          }}
        >
          <Tab label="Overview"  value="overview" />
          <Tab label="Problems"  value="problems" />
          <Tab label="Users"     value="users"    />
        </Tabs>
      </motion.div>

      <motion.div variants={staggerItem}>
        {tab === 'problems' && <ProblemsTab />}
        {tab === 'users'    && <UsersTab />}
        {tab === 'overview' && (
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>Platform Health</Typography>
              <Typography variant="body2" color="text.secondary">
                All systems operational · API latency 42ms · Uptime 99.99%
              </Typography>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}
