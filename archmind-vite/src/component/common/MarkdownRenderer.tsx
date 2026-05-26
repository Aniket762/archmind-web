import React from 'react';
import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { alpha } from '@mui/material/styles';

interface Props {
  children: string;
  dense?: boolean;
}

export function MarkdownRenderer({ children, dense = false }: Props) {
  return (
    <Box
      sx={{
        '& h1, & h2': {
          fontSize: dense ? '0.95rem' : '1rem',
          fontWeight: 700, mt: dense ? 2 : 3, mb: 1,
          color: 'text.primary',
        },
        '& h3': {
          fontSize: dense ? '0.875rem' : '0.95rem',
          fontWeight: 600, mt: dense ? 1.5 : 2.5, mb: 0.75,
        },
        '& p': {
          fontSize: dense ? '0.8rem' : '0.875rem',
          color: 'text.secondary',
          lineHeight: 1.85, mb: 1.5,
        },
        '& ul, & ol': {
          pl: 2.5, color: 'text.secondary',
          fontSize: dense ? '0.8rem' : '0.875rem',
          lineHeight: 1.85, mb: 1.5,
        },
        '& li': { mb: 0.5 },
        '& strong': { color: 'text.primary', fontWeight: 600 },
        '& em': { color: 'text.secondary' },
        '& code': {
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: dense ? '0.74rem' : '0.78rem',
          backgroundColor: (t: any) => alpha(t.palette.primary.main, 0.1),
          color: 'primary.light',
          px: 0.75, py: 0.2, borderRadius: 0.5,
        },
        '& pre': {
          backgroundColor: (t: any) => alpha(t.palette.primary.main, 0.06),
          border: '1px solid',
          borderColor: (t: any) => alpha(t.palette.primary.main, 0.12),
          borderRadius: 1.5, p: 2, overflowX: 'auto', mb: 2,
          '& code': {
            backgroundColor: 'transparent',
            color: 'text.primary', px: 0, py: 0,
          },
        },
        '& blockquote': {
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          pl: 2, ml: 0, color: 'text.secondary',
          fontStyle: 'italic',
        },
        '& hr': { border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 2.5 },
        '& a': {
          color: 'primary.main', textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        },
        '& table': { width: '100%', borderCollapse: 'collapse', mb: 2 },
        '& th, & td': {
          border: '1px solid', borderColor: 'divider',
          p: 1, fontSize: '0.8rem', textAlign: 'left',
        },
        '& th': { backgroundColor: (t: any) => alpha(t.palette.primary.main, 0.06), fontWeight: 600 },
      }}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </Box>
  );
}
