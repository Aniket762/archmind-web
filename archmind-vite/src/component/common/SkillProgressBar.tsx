import React from 'react';
import { Box, Stack, Typography, LinearProgress, alpha } from '@mui/material';
import { getScoreColor } from '@/constants';

interface Props {
  label: string;
  score: number;   // 0-100
  showValue?: boolean;
  height?: number;
}

export function SkillProgressBar({ label, score, showValue = true, height = 6 }: Props) {
  const color = getScoreColor(score);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.75}>
        <Typography variant="body2" fontWeight={500}>{label}</Typography>
        {showValue && (
          <Typography variant="caption" fontWeight={700} sx={{ color }}>
            {score}%
          </Typography>
        )}
      </Stack>
      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height,
          borderRadius: height / 2,
          backgroundColor: alpha(color, 0.13),
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: height / 2,
            transition: 'transform 0.9s ease',
          },
        }}
      />
    </Box>
  );
}
