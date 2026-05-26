import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import { SearchOutlined, ClearOutlined } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, placeholder = 'Search...' }: Props) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', px: 1.5, py: 0.75,
      border: '1px solid', borderColor: 'divider',
      borderRadius: 2, backgroundColor: 'background.paper',
      transition: 'all 0.2s',
      '&:focus-within': {
        borderColor: 'primary.main',
        boxShadow: (theme) => `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
      },
    }}>
      <SearchOutlined sx={{ color: 'text.secondary', fontSize: 17, mr: 1, flexShrink: 0 }} />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        sx={{ fontSize: '0.875rem' }}
      />
      {value && (
        <IconButton size="small" onClick={onClear} sx={{ p: 0.25, flexShrink: 0 }}>
          <ClearOutlined sx={{ fontSize: 15 }} />
        </IconButton>
      )}
    </Box>
  );
}
