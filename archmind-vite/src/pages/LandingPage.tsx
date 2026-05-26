import React from 'react';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Stack, Chip, Avatar, alpha, IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowForwardOutlined,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { LandingNavbar }   from '@/layouts/LandingNavbar';
import { DifficultyBadge } from '@/component/common/DifficultyBadge';
import { landingPage }     from '@/config/landingPage';
import { branding }        from '@/config/branding';
import { staggerContainer, staggerItem, fadeInUp, cardHover } from '@/animations/variants';

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  const { hero } = landingPage;
  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', pt: 8,
    }}>
      <Box sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: (t) =>
          t.palette.mode === 'dark'
            ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.18) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.09) 0%, transparent 60%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 820, mx: 'auto' }}>
          <motion.div {...fadeInUp(0)}>
            <Chip label={hero.badge} sx={{
              mb: 3,
              background: (t) => alpha(t.palette.primary.main, 0.1),
              color: 'primary.light',
              border: '1px solid', borderColor: (t) => alpha(t.palette.primary.main, 0.3),
              fontWeight: 600, fontSize: '0.75rem', px: 1,
            }} />
          </motion.div>

          <motion.div {...fadeInUp(0.08)}>
            <Typography variant="h1" sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.8rem' },
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, mb: 3,
              background: (t) =>
                t.palette.mode === 'dark'
                  ? 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.65) 100%)'
                  : 'linear-gradient(180deg, #0D0D1A 0%, rgba(13,13,26,0.7) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {hero.headline}
            </Typography>
          </motion.div>

          <motion.div {...fadeInUp(0.16)}>
            <Typography variant="h6" color="text.secondary"
              sx={{ mb: 5, maxWidth: 540, mx: 'auto', fontWeight: 400, lineHeight: 1.7 }}>
              {hero.subheadline}
            </Typography>
          </motion.div>

          <motion.div {...fadeInUp(0.24)}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={9}>
              <Button variant="contained" size="large"
                endIcon={<ArrowForwardOutlined />}
                onClick={() => navigate('/signup')}
                sx={{
                  background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
                  px: 4, py: 1.6, fontSize: '1rem', fontWeight: 700,
                  '&:hover': { background: 'linear-gradient(135deg, #5B52EE, #3DBCB4)' },
                }}>
                {hero.cta.primary}
              </Button>
              <Button variant="outlined" size="large"
                onClick={() => navigate('/problems')}
                sx={{ px: 4, py: 1.6, fontSize: '1rem', fontWeight: 600 }}>
                {hero.cta.secondary}
              </Button>
            </Stack>
          </motion.div>

          {/* Stats */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <Grid container spacing={2} justifyContent="center">
              {hero.stats.map((stat) => (
                <Grid item xs={6} sm={3} key={stat.label}>
                  <motion.div variants={staggerItem}>
                    <Box sx={{
                      p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider',
                      backgroundColor: (t) => alpha(t.palette.background.paper, 0.5),
                      backdropFilter: 'blur(8px)',
                    }}>
                      <Typography variant="h4" fontWeight={800} sx={{
                        background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.03em',
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <Box sx={{ py: 13, backgroundColor: (t) => alpha(t.palette.background.paper, 0.4) }} id="features">
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" color="primary.main" fontWeight={600} letterSpacing={2}>
            Features
          </Typography>
          <Typography variant="h3" fontWeight={700} letterSpacing="-0.03em" mt={1}>
            Everything you need to ace system design
          </Typography>
        </Box>

        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <Grid container spacing={3}>
            {landingPage.features.map((f) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <motion.div variants={staggerItem}>
                  <motion.div {...cardHover}>
                    <Card sx={{
                      height: '100%', border: '1px solid', borderColor: 'divider',
                      background: (t) =>
                        t.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(108,99,255,0.06) 0%, rgba(0,212,170,0.03) 100%)'
                          : 'background.paper',
                      '&:hover': { borderColor: 'primary.main' }, transition: 'border-color 0.2s',
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography sx={{ fontSize: 32, mb: 2 }}>{f.icon}</Typography>
                        <Typography variant="h6" fontWeight={600} gutterBottom>{f.title}</Typography>
                        <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                          {f.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

// ─── Problems showcase ────────────────────────────────────────────────────────

function ProblemsSection() {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 13 }} id="problems">
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" color="primary.main" fontWeight={600} letterSpacing={2}>
            Problem Library
          </Typography>
          <Typography variant="h3" fontWeight={700} letterSpacing="-0.03em" mt={1} mb={2}>
            Real problems from top companies
          </Typography>
          <Typography color="text.secondary" maxWidth={460} mx="auto">
            Hundreds of system design problems curated from actual FAANG interviews.
          </Typography>
        </Box>

        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          <Stack spacing={2} mb={5}>
            {landingPage.problems.map((p, i) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Box
                  onClick={() => navigate('/problems')}
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    p: 2.5, border: '1px solid', borderColor: 'divider', borderRadius: 2,
                    backgroundColor: 'background.paper', cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main', transform: 'translateX(4px)' },
                    transition: 'all 0.2s',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary"
                      sx={{ width: 24, textAlign: 'center', fontWeight: 600 }}>
                      {i + 1}
                    </Typography>
                    <Typography variant="body1" fontWeight={700}>{p.title}</Typography>
                    <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                      {p.companies.map((c) => (
                        <Chip key={c} label={c} size="small" variant="outlined"
                          sx={{ fontSize: '0.68rem', height: 20 }} />
                      ))}
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" color="text.secondary"
                      sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {p.solvedBy.toLocaleString()} solved
                    </Typography>
                    <DifficultyBadge level={p.level} />
                  </Stack>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        <Box textAlign="center">
          <Button variant="outlined" size="large"
            endIcon={<ArrowForwardOutlined />} onClick={() => navigate('/problems')}>
            View All Problems
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <Box sx={{ py: 13, backgroundColor: (t) => alpha(t.palette.background.paper, 0.4) }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography variant="overline" color="primary.main" fontWeight={600} letterSpacing={2}>
            Testimonials
          </Typography>
          <Typography variant="h3" fontWeight={700} letterSpacing="-0.03em" mt={1}>
            Engineers who landed their dream jobs
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {landingPage.testimonials.map((t) => (
            <Grid item xs={12} md={4} key={t.name}>
              <motion.div {...cardHover}>
                <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 3.5 }}>
                    <Typography variant="body1" color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.8, fontStyle: 'italic' }}>
                      "{t.text}"
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{
                        width: 40, height: 40,
                        background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)', fontWeight: 700,
                      }}>
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={700}>{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 14 }}>
      <Container maxWidth="md">
        <Box sx={{
          textAlign: 'center', p: { xs: 5, md: 9 }, borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,170,0.07) 100%)',
          border: '1px solid', borderColor: (t) => alpha(t.palette.primary.main, 0.2),
        }}>
          <Typography variant="h3" fontWeight={800} letterSpacing="-0.03em" mb={2}>
            Ready to crush your next interview?
          </Typography>
          <Typography color="text.secondary" mb={4} fontSize="1.08rem">
            Join 50,000+ engineers mastering system design with AI feedback.
          </Typography>
          <Button variant="contained" size="large"
            endIcon={<ArrowForwardOutlined />} onClick={() => navigate('/signup')}
            sx={{
              background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
              px: 5, py: 1.8, fontSize: '1rem', fontWeight: 700,
            }}>
            Start Practicing Free
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            No credit card required · Free tier available
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 7 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={800} fontSize="1.1rem" letterSpacing="-0.03em" mb={1.5}>
              {branding.appName}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2.5} maxWidth={280} lineHeight={1.8}>
              {branding.appDescription}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton size="small" href={branding.twitter} target="_blank"><TwitterIcon sx={{ fontSize: 17 }} /></IconButton>
              <IconButton size="small" href={branding.github}  target="_blank"><GitHubIcon  sx={{ fontSize: 17 }} /></IconButton>
              <IconButton size="small" href={branding.linkedin} target="_blank"><LinkedInIcon sx={{ fontSize: 17 }} /></IconButton>
            </Stack>
          </Grid>
          {landingPage.footer.links.map((col) => (
            <Grid item xs={6} sm={4} md={2} key={col.heading}>
              <Typography variant="overline" fontWeight={600} letterSpacing={1.5}
                color="text.secondary" gutterBottom display="block">
                {col.heading}
              </Typography>
              <Stack spacing={1} mt={1}>
                {col.items.map((item) => (
                  <Typography key={item} variant="body2" color="text.secondary"
                    sx={{ cursor: 'pointer', '&:hover': { color: 'text.primary' }, transition: 'color 0.15s' }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box sx={{
          mt: 7, pt: 3, borderTop: '1px solid', borderColor: 'divider',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2,
        }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} {branding.company}. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>Privacy</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>Terms</Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <Box>
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <ProblemsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </Box>
  );
}
