# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### HAX: Vibe Coding Plan Generator (`artifacts/hax`)
- **Type**: React + Vite, frontend-only (no backend)
- **Path**: `/` (root preview path)
- **Purpose**: Gamified questionnaire guiding AI app builders through Microsoft's HAX (Human-AI eXperience) Toolkit. Generates a structured markdown "Vibe Coding Plan" prompt.
- **Key features**:
  - 4-stage HAX questionnaire (8 questions) with Framer Motion card animations
  - Yes/No toggles + text notes per question
  - Undo, Back, Start Over navigation (HAX G9/G10 compliance)
  - Auto-save to localStorage (HAX G4 compliance)
  - Dark/light mode toggle with persistence (HAX G13/G14)
  - Confetti animation on prompt generation
  - Copy-to-clipboard generated markdown prompt with inline HAX source links
  - History tab for previously generated prompts
  - Settings page for data management and memory transparency
  - Every question card links to the official Microsoft HAX Toolkit guideline page
- **HAX Compliance**: G1, G2, G4, G8, G9, G10, G13, G14 all explicitly implemented
- **Source**: https://www.microsoft.com/en-us/haxtoolkit/

### API Server (`artifacts/api-server`)
- Express 5 + Pino logging
- Currently serves only a health check at `/api/healthz`
