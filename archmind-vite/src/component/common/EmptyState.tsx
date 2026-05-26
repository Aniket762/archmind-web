import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { fadeIn } from '@/animations/variants';

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({
  icon = '🔍',
  title = 'Nothing here yet',
  description = 'There is nothing to display.',
  action,
}: EmptyStateProps) {
  return (
    <motion.div {...fadeIn}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 44, mb: 2 }}>{icon}</Typography>
        <Typography variant="h6" sx={{fontWeight:600}} gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 340, mb: 3 }}>
          {description}
        </Typography>
        {action && (
          <Button variant="contained" onClick={action.onClick}>{action.label}</Button>
        )}
      </Box>
    </motion.div>
  );
}

interface ErrorStateProps { message?: string; onRetry?: () => void }

export function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, textAlign: 'center' }}>
      <Typography sx={{ fontSize: 44, mb: 2 }}>⚠️</Typography>
      <Typography variant="h6" sx={{fontWeight:600}} gutterBottom>An error occurred</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{message}</Typography>
      {onRetry && <Button variant="outlined" onClick={onRetry}>Try Again</Button>}
    </Box>
  );
}
