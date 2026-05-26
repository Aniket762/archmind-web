import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Stack, Card, Button, Chip,
  Select, MenuItem, FormControl, InputLabel,
  ToggleButtonGroup, ToggleButton, alpha,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, SelectChangeEvent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined, LockOutlined,
  GridViewOutlined, ViewListOutlined,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProblems, setFilter, clearFilters } from '@/store/slices/problemsSlice';
import { selectProblems } from '@/store';
import { DifficultyBadge } from '@/component/common/DifficultyBadge';
import { CompanyTagList }  from '@/component/common/CompanyTag';
import { SearchBar }       from '@/component/common/SearchBar';
import { TableSkeleton }   from '@/component/common/LoadingSkeleton';
import { EmptyState }      from '@/component/common/EmptyState';
import { staggerContainer, staggerItem, cardHover } from '@/animations/variants';
import { LEVELS, LEVEL_LABEL, TOPICS, TOPIC_LABEL } from '@/constants';
import type { Level, Topic, Problem } from '@/types';

type ViewMode = 'list' | 'grid';

export default function ProblemsPage() {
  const navigate   = useNavigate();
  const dispatch   = useAppDispatch();
  const { list, loading, filters, total } = useAppSelector(selectProblems);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  useEffect(() => {
    dispatch(fetchProblems({
      level:  filters.level  || undefined,
      topic:  filters.topic  || undefined,
      search: filters.search || undefined,
    }));
  }, [dispatch, filters.level, filters.topic, filters.search]);

  // Client-side status filter
  const displayed = list.filter((p) => {
    if (filters.status === 'SOLVED'   && !p.premium) return true;  // placeholder
    if (filters.status === 'UNSOLVED' && p.premium)  return false;
    return true;
  });

  const hasActiveFilters = !!(filters.level || filters.search || filters.topic || filters.status);

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em">Problems</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {total} system design challenges
          </Typography>
        </Box>
      </Stack>

      {/* Filter bar */}
      <Card sx={{ border: '1px solid', borderColor: 'divider', mb: 3, p: { xs: 2, sm: 2.5 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2} alignItems={{ sm: 'center' }} flexWrap="wrap"
        >
          <Box flex={1} minWidth={{ xs: '100%', sm: 220 }}>
            <SearchBar
              value={filters.search ?? ''}
              onChange={(v) => dispatch(setFilter({ search: v }))}
              onClear={() => dispatch(setFilter({ search: '' }))}
              placeholder="Search problems…"
            />
          </Box>

          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              label="Difficulty"
              value={filters.level ?? ''}
              onChange={(e: SelectChangeEvent) =>
                dispatch(setFilter({ level: e.target.value as Level | '' }))
              }
            >
              <MenuItem value="">All levels</MenuItem>
              {LEVELS.map((l) => (
                <MenuItem key={l} value={l}>{LEVEL_LABEL[l]}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Topic</InputLabel>
            <Select
              label="Topic"
              value={filters.topic ?? ''}
              onChange={(e: SelectChangeEvent) =>
                dispatch(setFilter({ topic: e.target.value as Topic | '' }))
              }
            >
              <MenuItem value="">All topics</MenuItem>
              {TOPICS.map((t) => (
                <MenuItem key={t} value={t}>{TOPIC_LABEL[t]}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {hasActiveFilters && (
            <Button size="small" onClick={() => dispatch(clearFilters())}
              sx={{ whiteSpace: 'nowrap' }}>
              Clear filters
            </Button>
          )}

          <ToggleButtonGroup
            size="small" value={viewMode} exclusive
            onChange={(_, v) => v && setViewMode(v)}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <ToggleButton value="list" sx={{ px: 1.5 }}>
              <ViewListOutlined sx={{ fontSize: 18 }} />
            </ToggleButton>
            <ToggleButton value="grid" sx={{ px: 1.5 }}>
              <GridViewOutlined sx={{ fontSize: 18 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Card>

      {/* Content */}
      {loading ? (
        <TableSkeleton rows={8} />
      ) : displayed.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No problems found"
          description="Try adjusting your filters or search query."
          action={{ label: 'Clear Filters', onClick: () => dispatch(clearFilters()) }}
        />
      ) : viewMode === 'list' ? (
        <ListView problems={displayed} navigate={navigate} />
      ) : (
        <GridView problems={displayed} navigate={navigate} />
      )}
    </Box>
  );
}

// ─── List view ────────────────────────────────────────────────────────────────

function ListView({
  problems,
  navigate,
}: {
  problems: Problem[];
  navigate: (p: string) => void;
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, boxShadow: 'none' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {['', '#', 'Title', 'Difficulty', 'Topic', 'Companies', 'Solved By', 'Rate'].map(
              (h, i) => (
                <TableCell key={i} sx={{
                  fontWeight: 700, fontSize: '0.76rem', color: 'text.secondary',
                  display: i >= 6 ? { xs: 'none', lg: 'table-cell' } : 'table-cell',
                  py: 1.5,
                }}>
                  {h}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((p, idx) => (
            <TableRow
              key={p.id}
              onClick={() => navigate(`/problems/${p.id}`)}
              hover
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: (t) => alpha(t.palette.primary.main, 0.04) },
                '&:last-child td': { borderBottom: 0 },
              }}
            >
              <TableCell sx={{ width: 42, py: 1.5 }}>
                {p.premium
                  ? <LockOutlined sx={{ fontSize: 15, color: '#FFB347' }} />
                  : <Box sx={{ width: 15 }} />
                }
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {idx + 1}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2" fontWeight={600}>{p.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                   {p.topics?.[0] ?? 'General'}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <DifficultyBadge level={p.level} />
              </TableCell>
              <TableCell sx={{ py: 1.5, display: { xs: 'none', md: 'table-cell' } }}>
                <Chip label= {p.topics?.[0] ?? 'General'} size="small" variant="outlined"
                  sx={{ fontSize: '0.67rem', height: 20 }} />
              </TableCell>
              <TableCell sx={{ py: 1.5 }}>
                <CompanyTagList companies={p.companies ?? []} max={2} />
              </TableCell>
              <TableCell sx={{ py: 1.5, display: { xs: 'none', lg: 'table-cell' } }}>
                <Typography variant="body2" color="text.secondary">
                  {(p.solvedBy ?? 0).toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1.5, display: { xs: 'none', lg: 'table-cell' } }}>
                {p.successRate != null && (
                  <Typography variant="body2" fontWeight={600} sx={{
                    color: p.successRate >= 65 ? '#51CF66'
                      : p.successRate >= 45 ? '#FFB347' : '#FF6B6B',
                  }}>
                    {p.successRate}%
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ─── Grid view ────────────────────────────────────────────────────────────────

function GridView({
  problems,
  navigate,
}: {
  problems: Problem[];
  navigate: (p: string) => void;
}) {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
        gap: 2,
      }}>
        {problems.map((p) => (
          <motion.div key={p.id} variants={staggerItem}>
            <motion.div {...cardHover}>
              <Card
                onClick={() => navigate(`/problems/${p.id}`)}
                sx={{
                  border: '1px solid', borderColor: 'divider', cursor: 'pointer',
                  height: '100%',
                  '&:hover': { borderColor: 'primary.main' },
                  transition: 'border-color 0.2s',
                }}
              >
                <Box sx={{ p: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" mb={1.5}>
                    <DifficultyBadge level={p.level} />
                    {p.premium && (
                      <LockOutlined sx={{ fontSize: 16, color: '#FFB347' }} />
                    )}
                  </Stack>
                  <Typography variant="body1" fontWeight={700} gutterBottom>{p.title}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    {p.topics?.[0] ?? 'General'}
                  </Typography>
                  <CompanyTagList companies={p.companies ?? []} max={3} />
                  {p.solvedBy != null && (
                    <Typography variant="caption" color="text.secondary"
                      display="block" mt={2}>
                      {p.solvedBy.toLocaleString()} engineers solved
                    </Typography>
                  )}
                </Box>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
}
