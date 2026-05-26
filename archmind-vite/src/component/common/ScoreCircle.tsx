import React from 'react';
import { Box, Typography } from '@mui/material';
import { getScoreColor } from '@/constants';

// ─── ScoreCircle ──────────────────────────────────────────────────────────────

interface ScoreCircleProps { score: number; size?: number }

export function ScoreCircle({ score, size = 80 }: ScoreCircleProps) {
  const color  = getScoreColor(score);
  const r      = (size - 10) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <Box sx={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Typography sx={{ fontSize: size * 0.22, fontWeight: 800, lineHeight: 1, color }}>
          {score}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── RubricScoreCard ──────────────────────────────────────────────────────────

interface RubricScoreCardProps {
  category: string;
  score: number;
  max: number;
  comment?: string;
}

export function RubricScoreCard({ category, score, max, comment }: RubricScoreCardProps) {
  const pct   = Math.round((score / max) * 100);
  const color = getScoreColor(pct);

  return (
    <Box sx={{
      p: 2.5, border: '1px solid', borderColor: 'divider', borderRadius: 2,
      transition: 'border-color 0.2s',
      '&:hover': { borderColor: `${color}55` },
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="body2" fontWeight={600}>{category}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ color }}>{score}</Typography>
          <Typography variant="caption" color="text.secondary">/{max}</Typography>
        </Box>
      </Box>
      <Box sx={{ height: 4, borderRadius: 2, backgroundColor: 'divider', overflow: 'hidden', mb: comment ? 1.5 : 0 }}>
        <Box sx={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 2, transition: 'width 0.8s ease' }} />
      </Box>
      {comment && (
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {comment}
        </Typography>
      )}
    </Box>
  );
}
