# Dorado

Dorado is a role-based founder-investor matching platform for startup discovery, AI-powered startup summaries, and faster first meetings.

The product supports two perspectives:
- Investor view: discover startups, review AI summaries, and browse matches.
- Founder view: browse investors, manage profile visibility, and request connections.

## Project Overview

Investors and founders usually work across fragmented tools for discovery, filtering, and outreach. Dorado centralizes this flow with role-based dashboards, startup search, profile pages, AI summaries, and meeting links.

## Technical Architecture

### Core Technologies

- Frontend: React 19, Vite, React Router, Axios, Lucide
- Backend: FastAPI, Pydantic, Uvicorn
- Database: MongoDB (Motor async driver)
- AI: Google Gemini (`gemini-2.0-flash`)
- Config: `python-dotenv` environment loading

### Backend Architecture

- Routers in `backend/app/routers` expose API endpoints.
- Services in `backend/app/services` hold business logic.
- Repositories in `backend/app/repositories` isolate MongoDB queries.
- Schemas in `backend/app/schemas` define request/response models.

### Key Functions and Services

- `create_indexes()` in `backend/app/database.py` creates indexes for searchable fields.
- `seed_if_empty()` in `backend/app/seed.py` inserts demo founders, investors, and startups.
- `generate_summary()` in `backend/app/services/gemini_summary.py` generates and caches summaries.
- `_hash_description()` in `backend/app/services/gemini_summary.py` invalidates cache on description changes.
- `get_matches_for_investor()` in `backend/app/services/matching.py` computes ranked startup matches.
- `get_investor_metrics()` and `get_founder_metrics()` in `backend/app/services/dashboard.py` build dashboard stats.
- `getAiSummary()` in `frontend/src/api/summaries.js` calls `POST /api/summaries/{startup_id}`.
- `handleSummary()` in `frontend/src/components/StartupCard.jsx` loads summary content on demand.

## API Highlights

- `GET /api/startups` - list startups
- `GET /api/startups/{startup_id}` - startup detail
- `POST /api/startups` - create startup (founder-only)
- `PATCH /api/startups/{startup_id}` - update startup (founder-only)
- `DELETE /api/startups/{startup_id}` - delete startup (founder-only)
- `GET /api/search` - filtered startup search
- `GET /api/matches` - investor match feed (investor-only)
- `GET /api/dashboard` - role-aware dashboard metrics
- `GET /api/network` / `POST /api/network` / `DELETE /api/network/{connection_id}` - network operations
- `POST /api/summaries/{startup_id}` - Gemini summary generation with MongoDB caching

Swagger docs:
- `http://localhost:8000/docs`
- `http://localhost:8000/redoc`

## Feature Breakdown

- Role-based investor and founder experiences
- Filter-driven startup discovery
- AI startup summaries for investor review
- Lightweight investor-startup matching scores
- Profile and network views for both roles
- Meeting links integrated in dashboard/detail/profile views

## Setup

### Prerequisites

- Node.js 18+
- Python 3.11+ (3.12 recommended)
- MongoDB running locally

### 1) Clone

```bash
git clone <repository-url>
cd Dorado
```

### 2) Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=dorado
```

Run backend:

```bash
uvicorn app.main:app --reload --port 8000
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` and proxies `/api` to `http://localhost:8000`.

## Project Structure

```text
Dorado/
├── prd.md
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── seed.py
│   │   ├── core/config.py
│   │   ├── routers/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── schemas/
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   └── pages/
    ├── package.json
    └── vite.config.js
```

## Notes

- Some frontend screens still use mock adapters in `frontend/src/api/mockData.js`.
- AI summaries are served by the real backend summaries endpoint.
- Meeting integration is currently Calendly-link based.

## AI Usage Statement

This project was developed with assistance from AI tools (Cursor, Claude, ChatGPT, and Gemini) for implementation support, debugging, and documentation. All generated outputs were reviewed and adapted by the team.
