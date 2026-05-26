# ArchMind Frontend

AI-powered system design interview preparation platform — React + TypeScript + MUI frontend.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev        # dev server proxies /api/* → localhost:8080
npx tsc --noEmit   # type-check
npm run build      # production build
```

## Backend Integration

Endpoints are mapped in `src/constants/index.ts` under the `API` object.
To switch from mock data to your real Spring Boot backend, flip `USE_MOCK = false`
in each service file (`problemService.ts`, `submissionService.ts`, `authService.ts`).

### Controller → Service mapping

| Spring Controller    | Frontend Service          | Endpoints                                         |
|----------------------|---------------------------|---------------------------------------------------|
| ProblemController    | problemService            | GET /api/problems, GET /api/problems/{id}, etc.  |
| SubmissionController | submissionService         | POST /api/submission, GET /api/submission/{id}, etc. |
| UserController       | userService               | GET /api/users, PUT /api/users/{id}, etc.         |
| Auth (TBD)           | authService               | POST /api/auth/login, /api/auth/register          |

## Customisation — zero business-logic changes needed

| File                       | Controls                                    |
|----------------------------|---------------------------------------------|
| src/config/branding.ts     | App name, logo, tagline, social URLs        |
| src/config/theme.ts        | Colour palette, fonts, border radius        |
| src/config/navigation.ts   | Sidebar items, top nav links                |
| src/config/landingPage.ts  | Hero, features, testimonials, footer        |

## Tech Stack

React 18 + TypeScript · Vite · Material UI v5 · Redux Toolkit · React Router v6
Axios · Framer Motion · Recharts · react-markdown · react-hot-toast