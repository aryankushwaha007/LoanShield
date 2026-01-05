# LoanShield

**LoanShield** is a next-generation **Automated Due Diligence Platform** designed for the Loan Syndications and Trading Association (LSTA) / LMA market. It streamlines the loan trade settling process by automating critical risk assessments—reducing manual error, speeding up settlement times, and providing real-time compliance feedback.

---

## 🚀 LMA Edge Hackathon Theme Alignment

This project directly addresses the **"Efficiency & Digitization"** pillar of the LMA Edge Hackathon.

1.  **Automating Manual Workflows**: detailed due diligence often involves checking multiple disparate data sources (OFAC lists, corporate registries, credit agencies). LoanShield aggregates these into a single click.
2.  **Reducing Friction**: By allowing direct **Document Upload (PDF extraction)**, we eliminate manual data entry errors, a common cause of delayed trade settlements.
3.  **Real-Time Risk Scoring**: Instead of waiting days for a compliance officer review, traders get an immediate **Risk Score (0-100)** and a Go/No-Go signal.
4.  **Modern User Experience**: We bring a "Bloomberg Terminal" grade aesthetic to the loan market, replacing clunky spreadsheets with a responsive, dark-mode web application.

---

## 📖 Application Walkthrough & Functionality

### 1. The Dashboard (Command Center)
*   **What it does:** Provides a high-level overview of the trader's current portfolio exposure and recent activity.
*   **Key Features:**
    *   **Live Metrics:** Real-time counters for "Active Exposure", "Loans Monitored", and "Pending Reviews".
    *   **Activity Blotter:** A centralized table showing recent diligence checks with instant visual status indicators (Green/Amber/Red).
*   **How to use:** This is the landing page. Use it to monitor portfolio health and quickly jump to specific loan records.

### 2. Auto-Diligence Engine (The Core)
*   **What it does:** The heart of the application. It runs three critical checks:
    1.  **Sanctions Screening:** Checks borrower against OFAC/AML watchlists.
    2.  **Corporate Registry:** Verifies entity existence and active status.
    3.  **Credit Analysis:** Pulls mock credit ratings (S&P/Moody's) to assess financial health.
*   **Modes of Operation:**
    *   **Manual Input:** Type in a Loan ID and Borrower Name for a quick spot check.
    *   **Document Upload:** Upload a raw Loan Agreement (PDF). The system parses key terms (Borrower, Amount, ID) and runs checks automatically.
*   **How to use:** Navigate to "Auto-Diligence", select your input method, and click "Run Analysis".

### 3. Risk Reports
*   **What it does:** Acts as an audit trail. Every diligence check generates a downloadable PDF report.
*   **Key Features:** Stores historical reports for compliance audits.
*   **How to use:** Navigate to "Risk Reports" to download past assessments or view summarized weekly risk memos.

### 4. Analytics~
*   **What it does:** (Placeholder) Future module for predictive risk modeling.
*   **Vision:** Will use historical data to predict settlement delays based on counterparty behavior.

---

## 🛠️ Technical Stack

*   **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI.
*   **Backend**: Python FastAPI.
*   **Data Processing**: Python `pydantic` for validation, `ReportLab` for PDF generation.
*   **Architecture**: RESTful API communication between a decoupled frontend and backend.

---

## ⚡ Quick Start Guide

### Prerequisites
*   Node.js & npm
*   Python 3.10+

### Step 1: Start the Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
*Backend runs on: `http://localhost:8000`*

### Step 2: Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 🧪 Testing the App
1.  Open `http://localhost:3000`.
2.  Go to **Auto-Diligence**.
3.  Click **Document Upload**.
4.  Upload the provided synthetic file `MOCK_LOAN_DOC.pdf` (found on Desktop).
5.  Watch the system extract data and return a **Risk Score**.
6.  Click **Download Full Report** to get the official PDF certification.
