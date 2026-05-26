import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';

const SAMPLE_DATA = [
  { range: '0-10',   count: 2  },
  { range: '10-20',  count: 4  },
  { range: '20-30',  count: 6  },
  { range: '30-40',  count: 10 },
  { range: '40-50',  count: 18 },
  { range: '50-60',  count: 28 },
  { range: '60-70',  count: 40 },
  { range: '70-80',  count: 35 },
  { range: '80-90',  count: 22 },
  { range: '90-100', count: 14 },
];

interface Props {
  userScore?: number;
  height?: number;
}

export function ScoreDistributionChart({ userScore, height = 180 }: Props) {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} mb={1}>
        Score Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={SAMPLE_DATA} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 9, fill: '#666' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#666' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a28',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, fontSize: 12,
            }}
            formatter={(v: any) => [`${v ?? 0} engineers`, 'Count']}
          />
          <Bar dataKey="count" fill="#6C63FF" radius={[3, 3, 0, 0]} fillOpacity={0.7} name="Engineers" />
          {userScore != null && (
            <ReferenceLine
              x={`${Math.floor(userScore / 10) * 10}-${Math.floor(userScore / 10) * 10 + 10}`}
              stroke="#51CF66"
              strokeWidth={2}
              strokeDasharray="4 2"
              label={{ value: 'You', fill: '#51CF66', fontSize: 11, position: 'top' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
