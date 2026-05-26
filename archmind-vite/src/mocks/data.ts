import type {
  Problem, Submission, SubmissionFeedback,
  DashboardStats, SubmissionTrendPoint, SkillRadarPoint, Discussion,
} from '@/types';

// ─── Problems (matches archmind.model.problem.Problem) ────────────────────────

export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Design a URL Shortener',
    level: 'EASY',
    topic: 'STORAGE_AND_RETRIEVAL',
    companies: ['Google', 'Amazon', 'Bitly'],
    tags: ['hashing', 'caching', 'databases'],
    solvedBy: 45200,
    successRate: 78,
    premium: false,
    description: `## Overview
Design a URL shortening service like TinyURL that generates short aliases for long URLs and redirects users to the original URL.

## Functional Requirements
- Given a long URL, generate a shorter unique alias
- When users access the short URL, redirect to the original
- Users can optionally create custom short URLs
- URLs expire after a configurable timespan
- Track click analytics per URL

## Non-Functional Requirements
- **Availability**: 99.99% uptime
- **Latency**: Redirect latency < 100ms (P99)
- **Durability**: Shortened URLs must never be silently lost
- **Scale**: 100M URLs generated/day, 1B redirects/day
- **Read:Write ratio**: 10:1

## Constraints
- URL length: max 2048 characters
- Short code: 7 alphanumeric characters (base62)
- Default data retention: 5 years`,
    hints: [
      'Think about your encoding strategy — base62 counter vs MD5 hash — and the tradeoffs of each.',
      'Where will you store the mapping? Consider SQL (indexed) vs NoSQL (fast key-value) tradeoffs.',
      'How do you handle cache invalidation for viral URLs that suddenly get millions of hits?',
      'Consider how you\'d deploy this globally with geo-distributed read replicas.',
      'Bloom filters can prevent unnecessary DB lookups for non-existent short codes.',
    ],
    rubric: {
      'API Design': 20,
      'Data Model': 20,
      'Scalability': 20,
      'Caching Strategy': 15,
      'Availability & Reliability': 15,
      'Performance Optimization': 10,
    },
  },
  {
    id: '2',
    title: 'Design Twitter',
    level: 'HARD',
    topic: 'SOCIAL_MEDIA',
    companies: ['Twitter/X', 'Meta', 'LinkedIn'],
    tags: ['news feed', 'fanout', 'social graph', 'caching'],
    solvedBy: 12400,
    successRate: 42,
    premium: false,
    description: `## Overview
Design a simplified version of Twitter where users can post tweets, follow other users, and see a home timeline of tweets from people they follow.

## Functional Requirements
- Post tweets (text up to 280 chars, images, videos)
- Follow / unfollow users
- View home timeline (tweets from followed users, reverse-chronological)
- Like and retweet
- Trending topics and hashtags
- Full-text search over tweets and users

## Non-Functional Requirements
- **Scale**: 200M DAU, 100M new tweets/day
- **Read:Write ratio**: ~1000:1 (very read-heavy)
- **Consistency**: Eventual consistency acceptable for feed
- **Latency**: Feed load < 200ms (P99)`,
    hints: [
      'Fanout-on-write vs fanout-on-read: what are the tradeoffs for different user classes?',
      'How do you handle "celebrity problem" — users with 100M followers?',
      'Consider a hybrid approach: push for regular users, pull for celebrities.',
      'What DB schema supports efficient timeline queries? Think about denormalisation.',
    ],
    rubric: {
      'Feed Generation Architecture': 25,
      'Data Model': 20,
      'Scalability Strategy': 20,
      'Media Storage': 15,
      'Search & Indexing': 10,
      'Notification System': 10,
    },
  },
  {
    id: '3',
    title: 'Design a Distributed Cache',
    level: 'HARD',
    topic: 'INFRASTRUCTURE',
    companies: ['Netflix', 'Uber', 'Stripe'],
    tags: ['caching', 'consistency', 'distributed systems'],
    solvedBy: 8200,
    successRate: 38,
    premium: true,
    description: `## Overview
Design a distributed in-memory caching system similar to Redis or Memcached that accelerates data retrieval across microservices.`,
    hints: [
      'Consistent hashing for key distribution — what happens when nodes join/leave?',
      'LRU vs LFU vs TTL-based eviction: when do you use each?',
      'How do you handle hot keys (cache stampede problem)?',
    ],
    rubric: {
      'Cache Architecture': 25,
      'Consistency & Coherence': 20,
      'Eviction Strategy': 15,
      'Fault Tolerance': 20,
      'Performance': 20,
    },
  },
  {
    id: '4',
    title: 'Design Uber',
    level: 'HARD',
    topic: 'REAL_TIME_SYSTEMS',
    companies: ['Uber', 'Lyft', 'DoorDash'],
    tags: ['real-time', 'geospatial', 'matching', 'streaming'],
    solvedBy: 18700,
    successRate: 45,
    premium: false,
    description: `## Overview
Design the core backend for a ride-sharing application focusing on driver-rider matching, real-time location tracking, and dynamic pricing.`,
    hints: [
      'How do you efficiently query nearby drivers? Consider geohashing vs quadtrees.',
      'What matching algorithm balances rider wait time vs driver utilisation?',
      'How would you implement surge pricing in real time?',
    ],
    rubric: {
      'Location Tracking': 20,
      'Matching Algorithm': 25,
      'Real-time Architecture': 25,
      'Surge Pricing': 15,
      'Payment System': 15,
    },
  },
  {
    id: '5',
    title: 'Design a Notification Service',
    level: 'MEDIUM',
    topic: 'MESSAGING',
    companies: ['Amazon', 'Meta', 'Airbnb'],
    tags: ['push notifications', 'messaging', 'queues'],
    solvedBy: 22300,
    successRate: 61,
    premium: false,
    description: `## Overview
Design a notification service capable of sending millions of notifications per day across email, SMS, push, and in-app channels.`,
    hints: [
      'How do you guarantee at-least-once delivery without duplicates reaching the user?',
      'Priority queues: how do transactional vs marketing notifications differ?',
      'Rate limiting per user/channel to avoid notification fatigue.',
    ],
    rubric: {
      'Channel Architecture': 20,
      'Message Routing': 20,
      'Reliability & Delivery': 25,
      'Rate Limiting': 15,
      'User Preferences': 10,
      'Analytics': 10,
    },
  },
  {
    id: '6',
    title: 'Design Google Drive',
    level: 'MEDIUM',
    topic: 'STORAGE_AND_RETRIEVAL',
    companies: ['Google', 'Dropbox', 'Box'],
    tags: ['file storage', 'sync', 'collaboration', 'CDN'],
    solvedBy: 15800,
    successRate: 54,
    premium: false,
    description: `## Overview
Design a cloud file storage and sync service similar to Google Drive.`,
    hints: [
      'Chunking files into fixed-size blocks enables resumable uploads and efficient syncing.',
      'Content-based deduplication: how does it save storage?',
      'Conflict resolution when the same file is edited on two devices offline.',
    ],
    rubric: {
      'Storage Architecture': 25,
      'Sync Protocol': 25,
      'Metadata Management': 15,
      'Sharing & Permissions': 15,
      'CDN & Delivery': 10,
      'Conflict Resolution': 10,
    },
  },
];

// ─── Submissions ──────────────────────────────────────────────────────────────

export const mockSubmissions: Submission[] = [
  { id: 's1', problemId: '1', userId: 'u1', content: '...', status: 'EVALUATED', score: 82, createdAt: '2024-01-15T10:30:00Z' },
  { id: 's2', problemId: '4', userId: 'u1', content: '...', status: 'EVALUATED', score: 71, createdAt: '2024-01-12T14:20:00Z' },
  { id: 's3', problemId: '2', userId: 'u1', content: '...', status: 'DRAFT',     score: undefined, createdAt: '2024-01-10T09:00:00Z' },
];

// ─── AI Feedback ──────────────────────────────────────────────────────────────

export const mockFeedback: SubmissionFeedback = {
  submissionId: 's1',
  problemTitle: 'Design a URL Shortener',
  overallScore: 82,
  scores: {
    'API Design':                 { score: 17, max: 20, comment: 'Well-structured REST API with appropriate HTTP semantics. Could add rate limiting headers.' },
    'Data Model':                 { score: 16, max: 20, comment: 'Good relational model. Consider discussing NoSQL alternatives for extreme read scale.' },
    'Scalability':                { score: 18, max: 20, comment: 'Excellent discussion of horizontal scaling and consistent hashing.' },
    'Caching Strategy':           { score: 11, max: 15, comment: 'Redis caching discussed, but cache invalidation strategy needs more depth.' },
    'Availability & Reliability': { score: 12, max: 15, comment: 'Multi-region deployment mentioned but failover procedure is missing.' },
    'Performance Optimization':   { score: 8,  max: 10, comment: 'Good overall. Database index strategy for short-code lookups not addressed.' },
  },
  strengths: [
    'Clear and well-reasoned API design with correct HTTP methods and status codes',
    'Strong command of consistent hashing and distributed ID generation',
    'Excellent scalability planning with horizontal sharding discussion',
    'Good treatment of SQL vs NoSQL trade-offs for the mapping store',
  ],
  weaknesses: [
    'Cache invalidation strategy is underspecified — what happens on URL expiry?',
    'No discussion of monitoring, alerting, or observability',
    'Database indexing strategy for short-code lookups is missing',
  ],
  missingConcepts: [
    'Rate limiting and abuse/spam prevention',
    'Analytics pipeline for click tracking without impacting redirect latency',
    'URL expiration background jobs and storage reclamation',
  ],
  suggestions: [
    'Add a dedicated analytics service (Kafka + ClickHouse) to decouple tracking from the hot redirect path.',
    'Use a Bloom filter in front of the cache to eliminate DB lookups for non-existent codes.',
    'Discuss write-through vs write-around vs write-behind caching and which fits this use case.',
  ],
};

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export const mockDashboardStats: DashboardStats = {
  solved: 12,
  total: 500,
  streak: 7,
  rank: 1842,
  score: 2840,
  easyCount:   { solved: 7, total: 120 },
  mediumCount: { solved: 4, total: 230 },
  hardCount:   { solved: 1, total: 150 },
};

export const mockSubmissionTrend: SubmissionTrendPoint[] = [
  { month: 'Jul', submissions: 2, avgScore: 65 },
  { month: 'Aug', submissions: 4, avgScore: 68 },
  { month: 'Sep', submissions: 3, avgScore: 72 },
  { month: 'Oct', submissions: 6, avgScore: 75 },
  { month: 'Nov', submissions: 8, avgScore: 79 },
  { month: 'Dec', submissions: 5, avgScore: 82 },
  { month: 'Jan', submissions: 10, avgScore: 84 },
];

export const mockSkillRadar: SkillRadarPoint[] = [
  { skill: 'Scalability',  score: 80, fullMark: 100 },
  { skill: 'API Design',   score: 72, fullMark: 100 },
  { skill: 'Data Modeling',score: 68, fullMark: 100 },
  { skill: 'Caching',      score: 85, fullMark: 100 },
  { skill: 'Reliability',  score: 60, fullMark: 100 },
  { skill: 'Security',     score: 55, fullMark: 100 },
];

export const mockDiscussions: Discussion[] = [
  {
    id: 'd1',
    problemId: '1',
    title: 'Best approach for encoding — base62 vs MD5?',
    content: 'I\'ve been debating between base62 encoding of an auto-increment counter and MD5 hashing for generating short codes. Base62 gives more predictable length and no collision risk, but requires a central counter...',
    author: { name: 'alex_eng', avatar: 'A', reputation: 1240 },
    votes: 47,
    replies: 12,
    createdAt: '2024-01-10T08:00:00Z',
    pinned: true,
    tags: ['encoding', 'hashing'],
  },
  {
    id: 'd2',
    problemId: '1',
    title: 'How to handle custom aliases without race conditions?',
    content: 'When two users simultaneously try to claim the same custom alias, you have a classic distributed write conflict. I handled it with an optimistic lock on the DB row...',
    author: { name: 'sys_design_pro', avatar: 'S', reputation: 3200 },
    votes: 31,
    replies: 8,
    createdAt: '2024-01-09T12:00:00Z',
    pinned: false,
    tags: ['custom-urls', 'concurrency'],
  },
];
