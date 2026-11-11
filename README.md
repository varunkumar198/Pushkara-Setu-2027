# Pushkara Setu 2027: Digital Pilgrim Experience & Heritage Access
**Problem Statement 12 Solution Proposal & Prototype Package**
**Target Event:** Godavari Pushkaralu 2027 (June 26 – July 7, 2027)

---

## 📌 Project Overview
Pushkara Setu is an omnichannel civic platform engineered to provide real-time crowd telematics, dynamic ghat queue balancing, satellite parking navigation, geo-fenced heritage audio guidance, and rapid emergency reunification during Godavari Pushkaralu 2027.

### Key Capabilities:
- **Zero-Install Pilgrim PWA:** Instant access to ghat wait times, safety depth indicators, and water/sanitation points without native app downloads.
- **ICCC Command Dashboard:** Real-time density tracking across 68 compartments, automated crowd diversion recommendations, and police dispatch alerts.
- **Vernacular Audio Guide:** Culturally authentic narrations in Telugu, Hindi, Tamil, Kannada, and English.
- **Hardware Integration:** Compatible with 250 IP66 weather-resistant QR/NFC field totems.
- **Budget Compliance:** Fully costed turnkey implementation at ₹25,83,020 (inclusive of contingency & 18% GST).

---

## 📂 File Structure
```text
pushkara_setu_system/
├── index.html           # Full Interactive PWA & ICCC Command Center Prototype
├── app.js               # Frontend telemetry simulation & state management
├── styles.css           # Styling rules and responsive layouts
├── engine.py            # Python telematics engine and simulation script
├── config.json          # Ghat capacities, coordinates, thresholds, and audio metadata
├── budget_breakdown.csv # Itemized ₹25,83,020 financial budget
└── README.md            # Technical documentation and execution guide
```

---

## 🚀 How to Run

### 1. Interactive Web Application
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
- Switch between **Pilgrim View (PWA)**, **ICCC Command Desk**, **Heritage Audio Player**, **Edge QR Totem**, and **Reunification Portal**.
- Live crowd counters and density metrics update dynamically in real time.

### 2. Python Backend Simulation
To test the core telematics logic and rule-based crowd redirection engine:
```bash
python engine.py
```
Outputs status checks, threshold breaches, wait-time projections, and parking occupancy percentages.

---

## 🔒 Security & Privacy (DPDP Act 2023)
- Ephemeral session logging (no permanent personally identifiable information stored).
- AES-256 encryption at rest, TLS 1.3 in transit.
- Automated 24-hour log purge policy post-event.
- CERT-In empaneled VAPT validation planned during Phase 2 pilot testing.
