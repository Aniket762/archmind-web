import React from 'react';
import { Chip, Stack } from '@mui/material';

interface CompanyTagProps { company: string; size?: 'small' | 'medium' }
interface CompanyTagListProps { companies: string[]; max?: number }

export function CompanyTag({ company, size = 'small' }: CompanyTagProps) {
  return (
    <Chip
      label={company} size={size} variant="outlined"
      sx={{ fontSize: '0.68rem', fontWeight: 500, height: 22, borderRadius: '6px', opacity: 0.7, '&:hover': { opacity: 1 } }}
    />
  );
}

export function CompanyTagList({ companies = [], max = 3 }: CompanyTagListProps) {
  const shown = companies.slice(0, max);
  const extra = companies.length - max;
  return (
    <Stack direction="row" flexWrap="wrap" gap={0.5}>
      {shown.map((c) => <CompanyTag key={c} company={c} />)}
      {extra > 0 && (
        <Chip label={`+${extra}`} size="small" sx={{ fontSize: '0.65rem', height: 22, opacity: 0.45 }} />
      )}
    </Stack>
  );
}
