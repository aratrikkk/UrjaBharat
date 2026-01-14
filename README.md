# Bharat Energy Dynamics: AI-Based Decision Support System (DSS)

**An Intelligent Operational Gateway for Industrial Energy Optimization**

---

## 1. Project Overview
The **Bharat Energy Dynamics AI-DSS** is a conceptual digital assistant designed for energy-intensive industrial environments (e.g., oil refineries, power plants, and heavy manufacturing). Developed with a "Support, Not Replace" philosophy, it transforms raw SCADA telemetry into high-fidelity actionable insights, enabling plant managers to make data-driven decisions that reduce operational expenditure and carbon footprint.

### Core Problem
Energy-intensive industries often rely on fixed rules or personal experience for load scheduling, leading to significant energy wastage during off-peak hours or sudden load deviations. This DSS bridges the gap between raw data and corrective action.

---

## 2. Key Features

### 📡 Real-Time Telemetry Bridge
* **SCADA Simulation**: Live tracking of power (kW), flow rates, discharge pressure, and isentropic efficiency.
* **Anomaly Detection**: Instant visual alerts and automated diagnostic triggers when system parameters deviate from nominal design curves.

### 🧠 Intelligence Lab (Core Engine)
* **Predictive Measures**: Deep-data analysis of telemetry trends to forecast performance and recommend specific technical adjustments (e.g., IGV positioning, stage purging).
* **Root Cause Analysis (RCA)**: Automated "Why-Why" analysis for thermal or mechanical anomalies.
* **Official Handover Generation**: Bureaucratic-standard reports for shift transitions, ensuring continuity and safety.

### 📊 Energy Performance Auditing
* **Statutory Logs**: Automated tracking of Specific Energy Consumption (SEC) and compliance with IS:15895/ISO:50001 standards.
* **Financial Impact**: Real-time calculation of energy costs and projected annual savings in INR (₹).

### 🛠️ Maintenance Ledger
* **Predictive Overhauls**: Dynamic maintenance scheduling based on asset health scores rather than just fixed time intervals.
* **Statutory Compliance**: Tracking of safety valve audits and lubrication cycles according to BHEL engineering standards.

---

## 3. Technical Stack
* **Frontend**: React 19 (TypeScript)
* **Styling**: Tailwind CSS
* **Visualization**: Recharts (High-fidelity telemetry plots)
* **Icons**: Lucide React
* **AI Integration**: Google Gemini API (Flash-3-Preview) for industrial reasoning and predictive modeling.

---

## 4. Cost Impact Logic
The system prioritizes financial transparency. Based on industrial benchmarks:
* **Electricity Tariff**: ₹7.00 – ₹10.00 per kWh (Industrial).
* **Base Asset**: 300 kW - 500 kW Centrifugal Compressors.
* **Savings Calculation**: By reducing idle time or surge-point operation by just 5%, the system projects annual savings of **₹25,00,000+** per unit.

---

## 5. Getting Started

### Prerequisites
* A valid Google AI Studio API Key (for the intelligence engine).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bharat-energy-dss.git
   ```
2. Set up environment variables:
   * Create a `.env` file and add: `API_KEY=your_gemini_api_key_here`
3. Launch the development server:
   ```bash
   npm install
   npm run dev
   ```

---

## 6. Industrial Compliance & Trust
To ensure operator trust and explainability, every AI-driven directive includes:
1. **Technical Justification**: Explanation of the underlying physics (e.g., Joule-Thomson effect).
2. **Financial Quantification**: Clear INR impact for the proposed action.
3. **Protocol Alignment**: Directives are cross-referenced with PSU operating manuals.

---

## 7. License & Disclaimer
This project is a conceptual Decision Support System developed for the Bharat Energy Dynamics framework. It is intended for strategic analysis and operational assistance. Official industrial actions should always be verified by a certified Plant Superintendent.

**A Digital India Initiative.**