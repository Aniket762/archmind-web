import React, { useState } from 'react';
import {
  Box, Typography, Stack, Card, CardContent, Button,
  Avatar, Chip, IconButton, Divider, TextField, alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ThumbUpOutlined, ChatBubbleOutlineOutlined,
  PushPinOutlined, AddOutlined,
} from '@mui/icons-material';
import { mockDiscussions } from '@/mocks/data';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { SearchBar } from '@/component/common/SearchBar';
import type { Discussion } from '@/types';

function DiscussionCard({ discussion }: { discussion: Discussion }) {
  const [voted,  setVoted]  = useState(false);
  const [votes,  setVotes]  = useState(discussion.votes);

  const toggleVote = () => {
    setVoted((p) => !p);
    setVotes((p) => voted ? p - 1 : p + 1);
  };

  return (
    <Card sx={{
      border: '1px solid', borderColor: 'divider',
      '&:hover': { borderColor: 'primary.main' }, transition: 'border-color 0.2s',
    }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2.5} alignItems="flex-start">
          {/* Vote column */}
          <Stack alignItems="center" spacing={0.5} sx={{ flexShrink: 0 }}>
            <IconButton
              size="small" onClick={toggleVote}
              sx={{ color: voted ? 'primary.main' : 'text.secondary' }}
            >
              <ThumbUpOutlined sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography variant="body2" fontWeight={700} sx={{ color: voted ? 'primary.main' : 'text.secondary' }}>
              {votes}
            </Typography>
          </Stack>

          {/* Content */}
          <Box flex={1} minWidth={0}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              {discussion.pinned && (
                <PushPinOutlined sx={{ fontSize: 14, color: 'warning.main' }} />
              )}
              <Typography variant="body1" fontWeight={700} sx={{
                cursor: 'pointer', '&:hover': { color: 'primary.main' }, transition: 'color 0.15s',
              }}>
                {discussion.title}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" mb={2}
              sx={{
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                lineHeight: 1.7,
              }}>
              {discussion.content}
            </Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{
                  width: 24, height: 24, fontSize: '0.7rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
                }}>
                  {discussion.author.avatar}
                </Avatar>
                <Typography variant="caption" fontWeight={600}>
                  {discussion.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  · {discussion.author.reputation.toLocaleString()} rep
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  · {new Date(discussion.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <ChatBubbleOutlineOutlined sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {discussion.replies} replies
                  </Typography>
                </Stack>
                {discussion.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined"
                    sx={{ fontSize: '0.65rem', height: 20, borderRadius: 1 }} />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DiscussionsPage() {
  const [search, setSearch] = useState('');

  const filtered = mockDiscussions.filter((d) =>
    !search || d.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      {/* Header */}
      <motion.div variants={staggerItem}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between"
          alignItems={{ sm: 'center' }} mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em">
              Discussions
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Community-driven conversations about system design
            </Typography>
          </Box>
          <Button
            variant="contained" startIcon={<AddOutlined />}
            sx={{
              mt: { xs: 2, sm: 0 },
              background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)', fontWeight: 600,
            }}
          >
            New Thread
          </Button>
        </Stack>
      </motion.div>

      {/* Search */}
      <motion.div variants={staggerItem}>
        <Box mb={3} maxWidth={400}>
          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search discussions…"
          />
        </Box>
      </motion.div>

      {/* List */}
      <Stack spacing={2}>
        {filtered.map((d) => (
          <motion.div key={d.id} variants={staggerItem}>
            <DiscussionCard discussion={d} />
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary">No discussions match your search.</Typography>
          </Box>
        )}
      </Stack>
    </motion.div>
  );
}
