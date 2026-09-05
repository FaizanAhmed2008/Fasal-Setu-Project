# FasalSetu - Market-Linked Crop Intelligence

FasalSetu means "Bridge for the Farmer." It is a market-linked crop planning and agricultural advisory platform that helps farmers avoid the cobweb effect by predicting when a crop is about to become oversaturated.

## Core Differentiator

**We don't just predict the crop. We predict the crowd.**

FasalSetu analyzes not just current prices, but farmer behavior patterns to predict saturation risk before market crashes occur.

## Features

### 1. Saturation Risk Engine
- Real-time analysis of price trends and planted area data
- Calculates saturation risk based on historical patterns
- Generates human-readable explanations for risk levels

### 2. Smart Crop Recommendation
- Ranks crops based on expected profitability
- Accounts for saturation risk in recommendations
- Season-specific analysis for Kharif, Rabi, and Zaid

### 3. Market Operations
- Compares nearby mandis (markets)
- Calculates net prices after transport costs
- Recommends best selling opportunities and timing

### 4. Rural Advisory
- Weather alerts for farming conditions
- Pest and disease warnings
- Actionable recommendations for crop management

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router
- Framer Motion
- Axios

### Backend
- FastAPI
- Python 3.14
- Uvicorn

## Project Structure

```
fasalsetu/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                # Reusable UI (Button, Card, Section, PageChrome)
│   │   │   ├── illustrations/     # SVG illustrations (FieldScene)
│   │   │   ├── Navbar.jsx         # Landing-page sticky nav
│   │   │   ├── Hero.jsx           # Landing hero
│   │   │   ├── CobwebEffect.jsx   # The cobweb effect storytelling
│   │   │   ├── IntelligenceSection.jsx
│   │   │   ├── SaturationIntelligence.jsx
│   │   │   ├── Capabilities.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── MarketPreview.jsx
│   │   │   ├── AdvisoryPreview.jsx
│   │   │   ├── DataToDecision.jsx
│   │   │   ├── CTASection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CropCard/          # Recommendation card
│   │   │   ├── MandiCard/         # Market comparison card
│   │   │   ├── AdvisoryCard/      # Advisory alert card
│   │   │   └── RiskGauge/         # SVG risk gauge
│   │   ├── pages/
│   │   │   ├── Landing/           # / - marketing landing
│   │   │   ├── FarmInput/         # /farm-input
│   │   │   ├── Recommendations/   # /recommendations
│   │   │   ├── Market/            # /market
│   │   │   └── Advisory/          # /advisory
│   │   ├── services/api.js        # /api/* axios client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js             # /api proxy → :8000
│   └── tailwind.config.js         # Design tokens
│
├── ml/                            # Pure-Python ML modules (no FastAPI)
│   ├── config.py                  # Tunable thresholds
│   ├── saturation_risk.py         # Module 1 - Saturation Risk Engine
│   ├── recommendation.py          # Module 2 - Crop recommendation
│   ├── market_ops.py              # Module 3 - Mandi net-price analysis
│   ├── advisory.py                # Module 4 - Rural advisory feed
│   ├── mock_data.json             # Sample data
│   └── test_*.py                  # Pytest suites
│
├── backend/                       # FastAPI shell that wraps ml/
│   ├── main.py                    # 5 HTTP endpoints + CORS
│   ├── services/                  # Thin re-exports of ml/
│   └── venv/                      # Python 3.14 venv
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.14+
- npm or yarn

### Backend Setup

1. Create a virtual environment (if you don't already have `backend/venv/`):
```bash
cd backend
python3.14 -m venv venv
```

2. Install dependencies:
```bash
./venv/bin/pip install -r requirements.txt
```

3. Run the backend server. You can do this either from the **repo root** or from inside **`backend/`** — both work because `main.py` adds the repo root to `sys.path` automatically:

```bash
# option A - from the repo root
./backend/venv/bin/python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000

# option B - from inside backend/ (what `python main.py` actually uses)
cd backend
./venv/bin/python main.py
```

The backend will run on `http://localhost:8000` and serves:
- `GET /` — API root
- `GET /health` — health + supported crops/districts
- `GET /districts` — list of districts
- `GET /recommend?district=&land_size=&season=` — ranked crop list
- `GET /market?crop=` — mandi comparison + best mandi + sell window
- `GET /advisory?crop=` — weather/pest alerts

The `ml/` directory contains pure-Python modules (no FastAPI dependency) so they can be unit-tested or reused. `backend/services/` is a thin re-export layer.

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /health
```

### Get Districts
```
GET /districts
```

### Get Crop Recommendations
```
GET /recommend?district={district}&land_size={acres}&season={Kharif|Rabi|Zaid}
```
Returns ranked crops with `expected_profit_per_acre`, `total_expected_profit`, `saturation_risk` (Low/Medium/High), `risk_score` (0-100), and a human-readable `reason`.

### Get Market Operations
```
GET /market?crop={crop_name}
```
Returns the mandi list with `market_price`, `transport_cost`, `net_price`, plus `best_mandi` and `sell_window`.

### Get Advisory Alerts
```
GET /advisory?crop={crop_name}
```
Returns an array of `weather` and `pest` alerts for the crop.

## Running Tests

The `ml/` directory has pytest suites for each module. From the repo root:

```bash
./backend/venv/bin/pip install pytest
./backend/venv/bin/python -m pytest ml/ -v
```

## Design Philosophy

FasalSetu combines:
- Modern AgriTech aesthetics
- Data-driven intelligence
- Rural accessibility
- Premium SaaS quality

The color system uses agriculture-inspired greens, warm neutrals, and clear risk indicators (green/amber/red) for maximum readability across all literacy levels.

## Key Features for Hackathon Demo

1. **Immediate Value Proposition**: The landing page clearly communicates the cobweb problem and FasalSetu's solution within 30 seconds.

2. **Demo Mode**: "Try Sample Farm" button pre-fills data for instant demonstration.

3. **Visual Risk Communication**: Risk gauges and color-coded cards make saturation risk immediately understandable.

4. **Complete User Flow**: From landing page → farm input → recommendations → market → advisory in a seamless experience.

5. **Real Intelligence**: The saturation risk engine uses actual logic based on price and area trends, not hardcoded values.

## License

Built for FasalSetu - Market-Linked Crop Intelligence Platform
