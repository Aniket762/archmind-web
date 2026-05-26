import React from 'react';
import {
  Box, Card, Typography, Stack, Chip, alpha,
} from '@mui/material';
import { LockOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { cardHover } from '@/animations/variants';
import { DifficultyBadge } from './DifficultyBadge';
import { CompanyTagList }  from './CompanyTag';
import { TOPIC_LABEL }     from '@/constants';
import type { Problem }    from '@/types';

interface Props {
  problem: Problem;
  onClick: () => void;
}

export function ProblemCard({ problem, onClick }: Props) {
  return (
    <motion.div {...cardHover} style={{ height: '100%' }}>
      <Card
        onClick={onClick}
        sx={{
          height: '100%', border: '1px solid', borderColor: 'divider',
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
          '&:hover': { borderColor: 'primary.main' },
          '&:hover .card-arrow': { opacity: 1, transform: 'translateX(0)' },
          transition: 'border-color 0.2s',
        }}
      >
        {/* Gradient accent top */}
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, #6C63FF, #4ECDC4)',
          opacity: 0, transition: 'opacity 0.2s',
          '.MuiCard-root:hover &': { opacity: 1 },
        }} />

        <Box sx={{ p: 2.5 }}>
          {/* Top row */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
            <DifficultyBadge level={problem.level} />
            <Stack direction="row" spacing={1} alignItems="center">
              {problem.premium && (
                <LockOutlined sx={{ fontSize: 15, color: '#FFB347' }} />
              )}
              <ArrowForwardOutlined
                className="card-arrow"
                sx={{
                  fontSize: 16, color: 'primary.main',
                  opacity: 0, transform: 'translateX(-4px)',
                  transition: 'all 0.2s',
                }}
              />
            </Stack>
          </Stack>

          {/* Title */}
          <Typography variant="body1" fontWeight={700} mb={0.5} lineHeight={1.35}>
            {problem.title}
          </Typography>

          {/* Topic */}
          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
            {TOPIC_LABEL[problem.topic]}
          </Typography>

          {/* Companies */}
          <CompanyTagList companies={problem.companies} max={3} />

          {/* Footer */}
          {problem.solvedBy != null && (
            <Typography
              variant="caption" color="text.secondary"
              display="block" mt={2} pt={2}
              sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            >
              {problem.solvedBy.toLocaleString()} engineers solved
              {problem.successRate != null && (
                <Box
                  component="span"
                  sx={{
                    ml: 1.5,
                    color: problem.successRate >= 60 ? '#51CF66' : '#FFB347',
                    fontWeight: 600,
                  }}
                >
                  {problem.successRate}% success
                </Box>
              )}
            </Typography>
          )}
        </Box>
      </Card>
    </motion.div>
  );
}
