import React from 'react';
import {
  Box, Typography, Stack, Chip, alpha,
} from '@mui/material';
import { AutoAwesomeOutlined } from '@mui/icons-material';

interface Props {
  title?: string;
  insight: string;
  type?: 'tip' | 'warning' | 'success' | 'info';
}

const TYPE_STYLES = {
  tip:     { color: '#6C63FF', bg: 'rgba(108,99,255,0.08)', label: 'AI Tip'        },
  warning: { color: '#FFB347', bg: 'rgba(255,179,71,0.08)', label: 'Improvement'   },
  success: { color: '#51CF66', bg: 'rgba(81,207,102,0.08)', label: 'Strength'      },
  info:    { color: '#4ECDC4', bg: 'rgba(78,205,196,0.08)', label: 'Insight'       },
} as const;

export function AIInsightCard({ title, insight, type = 'tip' }: Props) {
  const style = TYPE_STYLES[type];

  return (
    <Box sx={{
      p: 2.5, borderRadius: 2,
      backgroundColor: style.bg,
      border: `1px solid ${style.color}22`,
    }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box sx={{
          width: 32, height: 32, borderRadius: 1.5, flexShrink: 0,
          backgroundColor: `${style.color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mt: 0.25,
        }}>
          <AutoAwesomeOutlined sx={{ fontSize: 16, color: style.color }} />
        </Box>

        <Box flex={1}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.75}>
            <Chip
              label={style.label} size="small"
              sx={{
                fontSize: '0.63rem', fontWeight: 700, height: 18,
                backgroundColor: `${style.color}18`,
                color: style.color,
              }}
            />
            {title && (
              <Typography variant="body2" fontWeight={600}>{title}</Typography>
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
            {insight}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
