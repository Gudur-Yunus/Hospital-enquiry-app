# 🏥 Arogya Desk — 3D Hospital Enquiry Kiosk

A modern, interactive **3D hospital kiosk application** built with React, Three.js, and Tailwind CSS. Patients can tap on a realistic 3D human body model to select body parts, view symptoms, and get instant OPD tokens — all through a touchscreen-friendly interface.

![Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19-blue) ![Three.js](https://img.shields.io/badge/Three.js-R3F-orange) ![Vite](https://img.shields.io/badge/Vite-6-purple)

---

## ✨ Features

### 🧍 Interactive 3D Human Body
- Realistic 3D human avatar (GLB model) rendered with React Three Fiber
- Tap on **Head, Chest, Stomach, or Limbs** to open the relevant medical department
- Smooth camera animations that zoom into selected body zones
- Studio-quality lighting for natural, lifelike rendering

### 🏥 Smart Medical Triage
- **Symptom Selection** — Pick common symptoms for the selected body zone
- **Instant OPD Token** — Generate a live queue token with one tap
- **Book Appointment** — Schedule for a future date with a step-by-step flow
- **Floor Navigation** — Get directions to the right department
- **Emergency SOS** — One-tap emergency fast-track

### 🌐 Multilingual Support
- English, Hindi (हिन्दी), and Telugu (తెలుగు)
- Audio hints with text-to-speech

### 📊 Staff Dashboard
- Real-time OPD queue management
- Token status tracking (Received → In Progress → Completed)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 6 |
| **3D Engine** | Three.js, React Three Fiber, Drei, Postprocessing |
| **Styling** | Tailwind CSS 4 |
| **Animations** | CSS Animations, R3F useFrame |
| **State** | React useReducer |
| **Storage** | LocalStorage (token persistence) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Gudur-Yunus/Hospital-enquiry-app.git
cd Hospital-enquiry-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 📁 Project Structure

```
Hospital-enquiry-app/
├── public/
│   ├── HumanBody.glb          # 3D human avatar model
│   └── favicon.svg
├── src/
│   ├── App.jsx                # Main app with state management
│   ├── components/
│   │   ├── Home.jsx           # Home screen with menu cards
│   │   ├── AppointmentFlow.jsx
│   │   ├── BillingFlow.jsx
│   │   ├── DepartmentFlow.jsx
│   │   ├── EmergencyScreen.jsx
│   │   ├── StaffDashboard.jsx
│   │   ├── canvas/
│   │   │   ├── SymptomScene.jsx      # 3D canvas setup
│   │   │   ├── FullHumanBody3D.jsx   # GLB model loader
│   │   │   ├── HumanBodyModel.jsx    # Fallback procedural model
│   │   │   └── CameraRig.jsx         # Smooth camera controller
│   │   ├── triage/
│   │   │   └── ZoneTriageModal.jsx   # Body zone triage popup
│   │   └── shared/                   # Reusable UI components
│   ├── data/
│   │   ├── departments.js     # Department & symptom data
│   │   └── translations.js    # i18n strings (EN/HI/TE)
│   └── utils/
│       ├── storage.js         # LocalStorage helpers
│       └── tokenGenerator.js  # OPD token generator
├── index.html
├── vite.config.js
└── package.json
```

---

## 🌍 Deployment on Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New** → **Static Site**
3. Connect your GitHub repo
4. Set:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click **Deploy**

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- **National Health Mission** — Inspiration for public hospital kiosk UX
- **Ready Player Me** — 3D avatar base model
- **React Three Fiber** — 3D rendering in React
- **Lucide Icons** — Clean icon set

---

> Built with ❤️ for public healthcare accessibility
