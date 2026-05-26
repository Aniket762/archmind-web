import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button, Box,
} from '@mui/material';
import { WarningAmberOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleIn } from '@/animations/variants';

interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_COLORS = {
  danger:  '#FF6B6B',
  warning: '#FFB347',
  info:    '#6C63FF',
};

export function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const color = VARIANT_COLORS[variant];

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onCancel}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            component: motion.div,
            ...scaleIn,
            sx: { borderRadius: 3, border: '1px solid', borderColor: 'divider' },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: 2,
                backgroundColor: `${color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <WarningAmberOutlined sx={{ fontSize: 18, color }} />
              </Box>
              <Typography variant="h6" fontWeight={700}>{title}</Typography>
            </Box>
          </DialogTitle>

          <DialogContent>
            <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
              {message}
            </Typography>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              variant="outlined" onClick={onCancel} disabled={loading}
              sx={{ flex: 1, fontWeight: 600 }}
            >
              {cancelLabel}
            </Button>
            <Button
              variant="contained" onClick={onConfirm} disabled={loading}
              sx={{
                flex: 1, fontWeight: 600,
                backgroundColor: color,
                '&:hover': { backgroundColor: color, filter: 'brightness(0.88)' },
              }}
            >
              {loading ? 'Processing…' : confirmLabel}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
