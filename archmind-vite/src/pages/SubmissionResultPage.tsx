import React, { useEffect } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Stack,
  Chip, Button, List, ListItem, ListItemIcon, ListItemText,
  Divider, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined, WarningAmberOutlined,
  LightbulbOutlined, ArrowForwardOutlined,
  ArrowBackOutlined, AutoAwesomeOutlined,
} from '@mui/icons-material';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchSubmissionById }  from '@/store/slices/submissionsSlice';
import { selectSubmissions }    from '@/store';
import { ScoreCircle, RubricScoreCard } from '@/component/common/ScoreCircle';
import { TableSkeleton }        from '@/component/common/LoadingSkeleton';
import { staggerContainer, staggerItem, fadeInUp } from '@/animations/variants';
import { getScoreColor, getScoreLabel } from '@/constants';

export default function SubmissionResultPage() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const dispatch   = useAppDispatch();
  const { current: feedback, loading } = useAppSelector(selectSubmissions);

  useEffect(() => {
    if (id) dispatch(fetchSubmissionById(id));
  }, [dispatch, id]);

  if (loading || !feedback) {
    return <Box p={4}><TableSkeleton rows={6} /></Box>;
  }
  console.log('Feedback:', feedback);
  const radarData = Object.entries(feedback.scores || {score:100}).map(([skill, val]) => ({
    skill: skill.length > 14 ? skill.slice(0, 14) + '…' : skill,
    score: Math.round((val.score / val.max) * 100),
    fullMark: 100,
  }));

  const scoreColor = getScoreColor(feedback.overallScore || 12 );
  const scoreLabel = getScoreLabel(feedback.overallScore) || 12;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      {/* Back */}
      <motion.div variants={staggerItem}>
        <Button
          startIcon={<ArrowBackOutlined sx={{ fontSize: 16 }} />}
          onClick={() => navigate('/problems')}
          sx={{ mb: 3, color: 'text.secondary', fontWeight: 500 }}
        >
          Back to Problems
        </Button>
      </motion.div>

      {/* Header card */}
      <motion.div variants={staggerItem}>
        <Card sx={{
          border: '1px solid', borderColor: 'divider', mb: 3,
          background: (t) =>
            t.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha(scoreColor, 0.08)} 0%, rgba(0,0,0,0) 60%)`
              : `linear-gradient(135deg, ${alpha(scoreColor, 0.05)} 0%, rgba(255,255,255,0) 60%)`,
        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3} alignItems={{ sm: 'center' }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <ScoreCircle score={feedback.overallScore || 12} size={96} />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <AutoAwesomeOutlined sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography variant="caption" color="primary.main" fontWeight={600}>
                      AI Evaluation Complete
                    </Typography>
                  </Stack>
                  <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em" mb={0.5}>
                    {feedback.problemTitle || 'Problem Title'}
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Chip
                      label={scoreLabel}
                      size="small"
                      sx={{
                        backgroundColor: alpha(scoreColor, 0.12),
                        color: scoreColor,
                        fontWeight: 700, fontSize: '0.72rem',
                        border: `1px solid ${alpha(scoreColor, 0.3)}`,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {feedback.overallScore}/100 overall score
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined" size="small"
                  onClick={() => navigate(`/problems`)}
                >
                  Try Again
                </Button>
                <Button
                  variant="contained" size="small"
                  endIcon={<ArrowForwardOutlined sx={{ fontSize: 14 }} />}
                  onClick={() => navigate('/problems')}
                  sx={{ background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)' }}
                >
                  Next Problem
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3}>
        {/* Rubric scores */}
        <Grid item xs={12} md={7}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2.5}>
                  Rubric Breakdown
                </Typography>
                <Stack spacing={2}>
                  {Object.entries(feedback.scores || {scores:50}).map(([cat, val]) => (
                    <RubricScoreCard
                      key={cat}
                      category={cat}
                      score={val.score}
                      max={val.max}
                      comment={val.comment}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Radar + summary */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3} height="100%">
            {/* Radar chart */}
            <motion.div variants={staggerItem} style={{ flex: 1 }}>
              <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} mb={1}>Score Radar</Typography>
                  <ResponsiveContainer width="100%" height={230}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.07)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#888' }} />
                      <Radar dataKey="score"
                        stroke={scoreColor} fill={scoreColor}
                        fillOpacity={0.18} strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Stack>
        </Grid>

        {/* Strengths */}
        <Grid item xs={12} sm={6}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <CheckCircleOutlined sx={{ color: '#51CF66', fontSize: 20 }} />
                  <Typography variant="h6" fontWeight={700}>Strengths</Typography>
                </Stack>
                <List dense disablePadding>
                  {(feedback?.strengths || []).map((s, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 24, mt: 0.3 }}>
                        <Box sx={{
                          width: 6, height: 6, borderRadius: '50%',
                          backgroundColor: '#51CF66', mt: 0.5,
                        }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={s}
                        primaryTypographyProps={{
                          variant: 'body2', color: 'text.secondary', lineHeight: 1.7,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Weaknesses */}
        <Grid item xs={12} sm={6}>
          <motion.div variants={staggerItem}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <WarningAmberOutlined sx={{ color: '#FFB347', fontSize: 20 }} />
                  <Typography variant="h6" fontWeight={700}>Areas to Improve</Typography>
                </Stack>
                <List dense disablePadding>
                  {(feedback?.weaknesses || []).map((w, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 24, mt: 0.3 }}>
                        <Box sx={{
                          width: 6, height: 6, borderRadius: '50%',
                          backgroundColor: '#FFB347', mt: 0.5,
                        }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={w}
                        primaryTypographyProps={{
                          variant: 'body2', color: 'text.secondary', lineHeight: 1.7,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Missing concepts */}
        <Grid item xs={12} sm={6}>
          <motion.div variants={staggerItem}>
            <Card sx={{
              border: '1px solid', borderColor: 'divider',
              background: (t) => alpha(t.palette.error.main, 0.04),
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Missing Concepts</Typography>
                <Stack spacing={1}>
                  {(feedback?.missingConcepts || []).map((c, i) => (
                    <Box key={i} sx={{
                      display: 'flex', alignItems: 'flex-start', gap: 1.5,
                      p: 1.5, borderRadius: 1.5,
                      backgroundColor: (t) => alpha(t.palette.error.main, 0.06),
                    }}>
                      <Box sx={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                        backgroundColor: alpha('#FF6B6B', 0.15),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Typography sx={{ fontSize: 10, color: '#FF6B6B', fontWeight: 700 }}>
                          {i + 1}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                        {c}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Improvement suggestions */}
        <Grid item xs={12} sm={6}>
          <motion.div variants={staggerItem}>
            <Card sx={{
              border: '1px solid', borderColor: 'divider',
              background: (t) => alpha(t.palette.primary.main, 0.04),
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <LightbulbOutlined sx={{ color: '#6C63FF', fontSize: 20 }} />
                  <Typography variant="h6" fontWeight={700}>AI Suggestions</Typography>
                </Stack>
                <Stack spacing={2}>
                  {(feedback?.suggestions || []).map((s, i) => (
                    <Box key={i} sx={{
                      p: 2, borderRadius: 2,
                      border: '1px solid', borderColor: (t) => alpha(t.palette.primary.main, 0.15),
                      backgroundColor: (t) => alpha(t.palette.primary.main, 0.04),
                    }}>
                      <Typography variant="body2" color="text.secondary" lineHeight={1.75}>
                        {s}
                      </Typography>
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
