import React, { type ReactNode } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/animations/variants';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  breadcrumb?: ReactNode;
}

export function PageHeader({ title, subtitle, action, breadcrumb }: Props) {
  return (
    <motion.div {...fadeInUp(0)}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'flex-start' }}
        mb={4}
        spacing={2}
      >
        <Box>
          {breadcrumb && <Box mb={1}>{breadcrumb}</Box>}
          <Typography
            variant="h4"
            fontWeight={800}
            letterSpacing="-0.03em"
            sx={{ lineHeight: 1.15 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>
    </motion.div>
  );
}
