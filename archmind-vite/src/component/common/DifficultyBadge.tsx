import React from 'react';
import { Chip } from '@mui/material';
import { LEVEL_LABEL, LEVEL_COLOR, LEVEL_BG } from '@/constants';
import type { Level } from '@/types';

interface Props {
  level: Level;
  size?: 'small' | 'medium';
}

export function DifficultyBadge({ level, size = 'small' }: Props) {
  return (
    <Chip
      label={LEVEL_LABEL[level]}
      size={size}
      sx={{
        color: LEVEL_COLOR[level],
        backgroundColor: LEVEL_BG[level],
        border: `1px solid ${LEVEL_COLOR[level]}30`,
        fontWeight: 700,
        fontSize: size === 'small' ? '0.68rem' : '0.78rem',
        height: size === 'small' ? 22 : 28,
        letterSpacing: '0.02em',
      }}
    />
  );
}
