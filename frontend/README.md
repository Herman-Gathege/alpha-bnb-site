frontend/
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ pages/
   │  ├─ Home.jsx
   │  └─ Quiz.jsx
   └─ components/
      ├─ Navbar.jsx
      ├─ Footer.jsx
      ├─ HeroSection.jsx
      ├─ ServicesSection.jsx
      └─ QuestionCard.jsx

backend/
├─ main.py
├─ config.py
├─ extensions.py
├─ requirements.txt
├─ run.py              # optional
├─ wsgi.py             # optional
│
├─ core/
│  ├─ __init__.py
│  └─ models.py        # global models (if any)
│
├─ modules/
│  ├─ auth/
│  │  ├─ __init__.py
│  │  ├─ models.py
│  │  └─ routes.py
│  │
│  ├─ dashboard/
│  │  ├─ __init__.py
│  │  └─ routes.py
│  │
│  ├─ contact/
│  │  ├─ __init__.py
│  │  ├─ models.py      # contact messages DB table
│  │  └─ routes.py
│  │
│  ├─ leads/
│  │  ├─ __init__.py
│  │  ├─ models.py      # leads table
│  │  └─ routes.py
│  │
│  ├─ services/
│  │  ├─ __init__.py
│  │  ├─ models.py      # services table
│  │  └─ routes.py
│  │
│  ├─ portfolio/
│  │  ├─ __init__.py
│  │  ├─ models.py      # portfolio items table
│  │  └─ routes.py
│  │
│  ├─ notifications/
│  │  ├─ __init__.py
│  │  └─ routes.py      # simple notifications endpoint
│  │
│  └─ scoreapp_webhook/
│     ├─ __init__.py
│     ├─ models.py       # Client + Response
│     └─ routes.py       # webhook blueprint
│
└─ venv/
