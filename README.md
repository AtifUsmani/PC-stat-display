# PC Stat Dashboard with WLED Integration

This repository contains a **real-time PC monitoring dashboard** built with:

* **Backend:** Python + FastAPI
* **Frontend:** React + TailwindCSS + Recharts
* **Display:** Android phone in Kiosk Browser
* **Ambient Lighting:** WLED LED strip integration

Your phone, hot‑glued inside your PC setup, will show live CPU, RAM, and GPU temperature graphs. The WLED strip reacts to system events (startup/shutdown), and the app auto‑launches on boot.

---

## 🚀 Features

* **Real‑time metrics:** CPU average load, RAM usage (%), GPU temperature
* **Live graphs:** Area charts with color‑filled underlay (Recharts)
* **Kiosk mode:** Full‑screen display on Android with auto‑refresh
* **WLED lighting:** Startup and shutdown effects via WLED HTTP API
* **Auto‑startup:** FastAPI server launches on Windows boot via Task Scheduler
* **Auto‑reload:** Frontend retries fetches until the backend is ready

---

## 🏗 Architecture Overview

```
┌───────────────┐───────────┐
│ FastAPI       │           │
│ ┌───────────┐ │ HTTP API  │
│ │ stats     │◀───────────┘
│ └───────────┘ │            ┌──────────────┐
│ ┌───────────┐ │   Static   │ React/Tailwind│
│ │ WLED       │◀───────────┤ Frontend      │
│ └───────────┘ │ assets    └──────────────┘
└───────────────┘                        │
    ▲                                    ▼
    │                                    ┌─────────────┐
    │ WLED HTTP                          │ Android     │
    │ requests                           │ Kiosk Browser│
    ▼                                    └─────────────┘
```

---

## 📋 Prerequisites

* **Python 3.8+**
* **Node.js & npm**
* **Windows 10/11** (for Task Scheduler)
* **Android phone** with Kiosk Browser installed
* **WLED‑controlled LED strip** on same network

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/<your‑username>/pc‑stat‑dashboard.git
cd pc‑stat‑dashboard
```

### 2. Backend (FastAPI)

```powershell
# Create and activate virtual environment
python -m venv venv
.
venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn psutil gputil requests
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install recharts framer-motion axios
```

Edit `tailwind.config.js` (content paths) and add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ⚙ Configuration

1. **Backend IP:** In `start-server.bat` and Task Scheduler, set `--host` to your LAN IP (e.g., `192.168.29.8`).
2. **WLED IP:** In `wled_effects.py`, set `WLED_IP = "<your_wled_ip>"`.
3. **Kiosk URL:** In Kiosk Browser settings, set homepage to `http://<backend_ip>:8000`.

---

## ▶ Running Locally

#### Manual start

```powershell
# Activate venv and run WLED startup effect + server
download code → cd project root
env\Scripts\activate
python wled_effects.py
uvicorn main:app --host 0.0.0.0 --port 8000
```

Open `http://<backend_ip>:8000` on any browser.

#### Frontend dev mode

```bash
cd frontend
npm run start
# (Frontend proxies /stats to backend)
```

---

## 🖥️ Auto‑Startup & Shutdown Effects

### A. Startup Task (Windows Task Scheduler)

1. Create Task “PC Startup - WLED + Server”.
2. Trigger: **At startup** (delay 15s).
3. Action: **Start a program** → `start-server.bat`:

   ```bat
   @echo off
   cd /d C:\...\pc‑stat‑dashboard
   call venv\Scripts\activate.bat
   python wled_effects.py
   start /min uvicorn main:app --host 192.168.29.8 --port 8000
   ```

### B. Shutdown Task

1. Create Task “PC Shutdown - WLED”.
2. Trigger: **On event** → Log: System, Source: User32, Event ID: 1074.
3. Action: **Start a program** → `shutdown-wled.bat`:

   ```bat
   @echo off
   cd /d C:\...\pc‑stat‑dashboard
   call venv\Scripts\activate.bat
   python wled_effects.py shutdown
   ```

---

## 🔄 Auto‑Reload Frontend

Add this script to `public/index.html` or in your root component:

```html
<script>
  async function check() {
    try { await fetch('/stats'); }
    catch { setTimeout(() => location.reload(), 5000); }
  }
  window.addEventListener('load', check);
</script>
```

---

## 📁 Project Structure

```
pc‑stat‑dashboard/
├── main.py
├── wled_effects.py
├── start-server.bat
├── shutdown-wled.bat
├── venv/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
