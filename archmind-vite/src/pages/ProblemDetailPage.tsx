import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box, Typography, Stack, Button, Chip, Tab, Tabs,
  IconButton, Tooltip, CircularProgress, LinearProgress,
  Alert, Divider, alpha,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
  LightbulbOutlined, ForumOutlined,
  ExpandOutlined, CompressOutlined,
  SendOutlined, SaveOutlined, AutoAwesomeOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProblemById } from '@/store/slices/problemsSlice';
import { submitSolution }   from '@/store/slices/submissionsSlice';
import { selectProblems, selectSubmissions } from '@/store';
import { DifficultyBadge }  from '@/component/common/DifficultyBadge';
import { CompanyTagList }   from '@/component/common/CompanyTag';
import { TableSkeleton }    from '@/component/common/LoadingSkeleton';
import { useLocalDraft }    from '@/hooks/useLocalDraft';
import { TOPIC_LABEL }      from '@/constants';
import type { Problem }     from '@/types';

const MIN_CHARS = 200;

// ─── Tab types ────────────────────────────────────────────────────────────────

type ProblemTab = 'description' | 'hints' | 'discussions';

// ─── Hint card ────────────────────────────────────────────────────────────────

function HintCard({ hint, index }: { hint: string; index: number }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <Box
        onClick={() => setRevealed((p) => !p)}
        sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          p: 2, cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <LightbulbOutlined sx={{ fontSize: 16, color: 'warning.main' }} />
          <Typography variant="body2" fontWeight={600}>Hint {index + 1}</Typography>
        </Stack>
        <Typography variant="caption" color="primary.main">
          {revealed ? 'Hide' : 'Reveal'}
        </Typography>
      </Box>
      {revealed && (
        <Box sx={{ px: 2.5, pb: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" mt={2} lineHeight={1.75}>
            {hint}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

// ─── Problem description panel ────────────────────────────────────────────────

function ProblemPanel({ problem }: { problem: Problem }) {
  const [tab, setTab] = useState<ProblemTab>('description');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ p: { xs: 2, sm: 3 }, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <DifficultyBadge level={problem.level} />
          {problem.premium && (
            <Chip label="Premium" size="small" color="warning"
              sx={{ fontSize: '0.67rem', height: 20 }} />
          )}
        </Stack>
        <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em" mb={1.5}>
          {problem.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          {TOPIC_LABEL[problem.topic]}
        </Typography>
        <CompanyTagList companies={problem.companies} max={5} />

        {/* Rubric pills */}
        <Box sx={{
          mt: 2, p: 1.5, borderRadius: 1.5,
          backgroundColor: (t) => alpha(t.palette.primary.main, 0.06),
          border: '1px solid', borderColor: (t) => alpha(t.palette.primary.main, 0.14),
        }}>
          <Typography variant="caption" color="primary.main" fontWeight={600}
            display="block" mb={1}>
            Evaluation rubric
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {Object.entries(problem.rubric).map(([key, weight]) => (
              <Chip key={key} label={`${key} (${weight}%)`} size="small"
                sx={{
                  fontSize: '0.64rem', height: 20,
                  backgroundColor: 'transparent',
                  border: '1px solid', borderColor: 'divider',
                }} />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab} onChange={(_, v: ProblemTab) => setTab(v)}
        variant="scrollable" scrollButtons={false}
        sx={{
          borderBottom: '1px solid', borderColor: 'divider', px: 2, minHeight: 44, flexShrink: 0,
          '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 500, fontSize: '0.85rem' },
        }}
      >
        <Tab label="Description"  value="description" />
        <Tab label="Hints"        value="hints"
          icon={<LightbulbOutlined sx={{ fontSize: 14 }} />} iconPosition="start" />
        <Tab label="Discussions"  value="discussions"
          icon={<ForumOutlined sx={{ fontSize: 14 }} />} iconPosition="start" />
      </Tabs>

      {/* Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}>
        {tab === 'description' && (
          <Box sx={{
            '& h2': { fontSize: '1rem', fontWeight: 700, mt: 3, mb: 1 },
            '& h3': { fontSize: '0.95rem', fontWeight: 600, mt: 2.5, mb: 1 },
            '& p':  { fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.85, mb: 1.5 },
            '& ul, & ol': { pl: 2.5, color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.85 },
            '& li': { mb: 0.5 },
            '& strong': { color: 'text.primary', fontWeight: 600 },
            '& code': {
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
              backgroundColor: (t: any) => alpha(t.palette.primary.main, 0.1),
              color: 'primary.light', px: 0.75, py: 0.2, borderRadius: 0.5,
            },
          }}>
            <ReactMarkdown>{problem.description}</ReactMarkdown>
          </Box>
        )}

        {tab === 'hints' && (
          <Stack spacing={2}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Try solving without hints first — that's how real interviews work!
            </Alert>
            {problem.hints.map((hint, i) => (
              <HintCard key={i} hint={hint} index={i} />
            ))}
          </Stack>
        )}

        {tab === 'discussions' && (
          <Box textAlign="center" py={6}>
            <Typography variant="body2" color="text.secondary">
              Community discussions coming soon.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── Submission editor ────────────────────────────────────────────────────────

interface EditorProps {
  problem: Problem;
  onSubmit: (content: string) => Promise<void>;
  submitting: boolean;
}

function SubmissionEditor({ problem, onSubmit, submitting }: EditorProps) {
  const { content, setContent, lastSaved, saveNow } = useLocalDraft(problem.id);
  const [fullscreen, setFullscreen] = useState(false);

  const isReady    = content.length >= MIN_CHARS;
  const charPct    = Math.min((content.length / MIN_CHARS) * 100, 100);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el    = e.currentTarget;
      const start = el.selectionStart;
      const end   = el.selectionEnd;
      const next  = content.substring(0, start) + '  ' + content.substring(end);
      setContent(next);
    }
  };

  return (
    <Box sx={{
      height: '100%', display: 'flex', flexDirection: 'column',
      ...(fullscreen && {
        position: 'fixed', inset: 0, zIndex: 1400,
        backgroundColor: 'background.default',
      }),
    }}>
      {/* Toolbar */}
      <Box sx={{
        px: 2.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="body2" fontWeight={600}>Your Solution</Typography>
          <Chip label="Markdown" size="small"
            sx={{ fontSize: '0.67rem', height: 20, opacity: 0.6 }} />
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          {lastSaved && (
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              Saved {lastSaved.toLocaleTimeString()}
            </Typography>
          )}
          <Tooltip title="Save draft">
            <IconButton size="small" onClick={() => { saveNow(); toast.success('Draft saved'); }}>
              <SaveOutlined sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            <IconButton size="small" onClick={() => setFullscreen((p) => !p)}>
              {fullscreen
                ? <CompressOutlined sx={{ fontSize: 17 }} />
                : <ExpandOutlined   sx={{ fontSize: 17 }} />
              }
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Guide */}
      <Box sx={{
        px: 2.5, py: 1.75, borderBottom: '1px solid', borderColor: 'divider',
        backgroundColor: (t) => alpha(t.palette.primary.main, 0.04), flexShrink: 0,
      }}>
        <Typography variant="caption" color="primary.main" fontWeight={600} display="block" mb={0.5}>
          Suggested structure:
        </Typography>
        <Typography variant="caption" color="text.secondary" lineHeight={1.75}>
          Requirements → Architecture → Data Model → API Design → Scalability → Trade-offs
        </Typography>
      </Box>

      {/* Textarea */}
      <Box
        component="textarea"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`# ${problem.title}\n\n## Requirements Clarification\n\nBefore diving into the design...\n\n## High-Level Architecture\n\n...\n\n## Data Model\n\n...\n\n## API Design\n\n...\n\n## Scalability\n\n...`}
        sx={{
          flex: 1, border: 'none', outline: 'none', resize: 'none',
          p: 2.5, fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.82rem', lineHeight: 1.85,
          backgroundColor: 'background.paper', color: 'text.primary',
          caretColor: 'primary.main',
          '&::placeholder': { color: 'text.disabled', fontStyle: 'italic' },
        }}
      />

      {/* Footer */}
      <Box sx={{
        px: 2.5, py: 2, borderTop: '1px solid', borderColor: 'divider',
        flexShrink: 0, backgroundColor: 'background.paper',
      }}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="caption" sx={{ color: isReady ? 'success.main' : 'text.secondary' }}>
            {content.length} / {MIN_CHARS} min chars
          </Typography>
          <Typography variant="caption" color="text.secondary">Markdown</Typography>
        </Stack>
        <LinearProgress
          variant="determinate" value={charPct}
          sx={{
            mb: 2, height: 3,
            '& .MuiLinearProgress-bar': {
              backgroundColor: isReady ? '#51CF66' : 'primary.main',
              transition: 'background-color 0.3s',
            },
          }}
        />
        <Button
          fullWidth variant="contained" size="large"
          startIcon={
            submitting
              ? <CircularProgress size={15} color="inherit" />
              : <AutoAwesomeOutlined />
          }
          onClick={() => onSubmit(content)}
          disabled={submitting || !isReady}
          sx={{
            background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
            fontWeight: 700, py: 1.5,
            '&:disabled': { opacity: 0.5 },
          }}
        >
          {submitting ? 'AI is evaluating…' : 'Submit for AI Evaluation'}
        </Button>
        <Typography variant="caption" color="text.secondary"
          textAlign="center" display="block" mt={1}>
          Scored against industry-standard rubric · ~30s
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProblemDetailPage() {
  const { id }         = useParams<{ id: string }>();
  const navigate       = useNavigate();
  const dispatch       = useAppDispatch();
  const { current: problem, loading } = useAppSelector(selectProblems);
  const { loading: submitting }       = useAppSelector(selectSubmissions);

  // Resizable split
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPct, setSplitPct]   = useState(50);
  const [dragging, setDragging]   = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProblemById(id));
  }, [dispatch, id]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.min(Math.max(pct, 30), 70));
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [dragging, onMouseMove, onMouseUp]);

  const handleSubmit = async (content: string) => {
    if (!problem || !id) return;
    const result = await dispatch(submitSolution({
      problemId: id,
      userId: 'u1',   // replace with auth user id
      content,
      score: undefined,
      feedback: undefined,
    }));
    if (!result.type.endsWith('rejected')) {
      toast.success('Submitted! AI is evaluating your answer…');
      setTimeout(() => navigate('/submissions/s1'), 2200);
    } else {
      toast.error('Submission failed. Please try again.');
    }
  };

  if (loading || !problem) {
    return <Box p={4}><TableSkeleton rows={6} /></Box>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      {/* Top bar */}
      <Box sx={{
        px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, backgroundColor: 'background.paper',
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton size="small" onClick={() => navigate('/problems')}>
            <ArrowBackOutlined sx={{ fontSize: 18 }} />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2" fontWeight={600}
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            {problem.title}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          {problem.solvedBy != null && (
            <Chip label={`${problem.solvedBy.toLocaleString()} solved`}
              size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
          )}
          {problem.successRate != null && (
            <Chip label={`${problem.successRate}% success`}
              size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
          )}
        </Stack>
      </Box>

      {/* Split layout — desktop */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1, display: { xs: 'none', md: 'flex' }, overflow: 'hidden',
          cursor: dragging ? 'col-resize' : 'default',
          userSelect: dragging ? 'none' : 'auto',
        }}
      >
        {/* Left: problem */}
        <Box sx={{ width: `${splitPct}%`, flexShrink: 0, overflow: 'hidden' }}>
          <ProblemPanel problem={problem} />
        </Box>

        {/* Drag handle */}
        <Box
          onMouseDown={() => setDragging(true)}
          sx={{
            width: 4, cursor: 'col-resize', flexShrink: 0,
            backgroundColor: 'divider',
            '&:hover': { backgroundColor: 'primary.main', opacity: 0.5 },
            transition: 'background-color 0.15s',
          }}
        />

        {/* Right: editor */}
        <Box sx={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
          <SubmissionEditor
            problem={problem}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </Box>
      </Box>

      {/* Mobile — stacked */}
      <Box sx={{ display: { md: 'none' }, overflow: 'auto', flex: 1 }}>
        <ProblemPanel problem={problem} />
        <Divider />
        <Box sx={{ minHeight: '55vh' }}>
          <SubmissionEditor
            problem={problem}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </Box>
      </Box>
    </Box>
  );
}
