import React from 'react';
import { Chip } from '@mui/material';
import { SUBMISSION_STATUS_LABEL } from '@/constants';
import type { SubmissionStatus } from '@/types';

interface Props {
  status: SubmissionStatus;
  size?: 'small' | 'medium';
}

const STATUS_STYLE: Record<SubmissionStatus, { bg: string; color: string }> = {
  DRAFT:      { bg: 'rgba(136,136,153,0.12)', color: '#888899' },
  SUBMITTED:  { bg: 'rgba(108,99,255,0.12)',  color: '#6C63FF' },
  EVALUATING: { bg: 'rgba(108,99,255,0.12)',  color: '#6C63FF' },
  EVALUATED:  { bg: 'rgba(81,207,102,0.12)',  color: '#51CF66' },
  FAILED:     { bg: 'rgba(255,107,107,0.12)', color: '#FF6B6B' },
};

export function StatusChip({ status, size = 'small' }: Props) {
  const style = STATUS_STYLE[status];
  return (
    <Chip
      label={SUBMISSION_STATUS_LABEL[status]}
      size={size}
      sx={{
        fontSize: size === 'small' ? '0.68rem' : '0.78rem',
        fontWeight: 600,
        height: size === 'small' ? 22 : 28,
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.color}30`,
      }}
    />
  );
}
