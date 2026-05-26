import React from 'react';
import { Skeleton, Box, Stack } from '@mui/material';

export function ProblemRowSkeleton() {
  return (
    <Box sx={{ px: 2, py: 1.75, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
      <Skeleton variant="circular" width={18} height={18} />
      <Skeleton variant="text" width={20} height={18} />
      <Skeleton variant="text" width={240} height={18} sx={{ flex: 1 }} />
      <Skeleton variant="rounded" width={55} height={22} />
      <Skeleton variant="rounded" width={65} height={22} />
    </Box>
  );
}

export function CardSkeleton() {
  return (
    <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Skeleton variant="text" width="40%" height={20} />
      <Skeleton variant="text" width="70%" height={36} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="50%" height={14} sx={{ mt: 0.5 }} />
    </Box>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <ProblemRowSkeleton key={i} />
      ))}
    </Box>
  );
}
