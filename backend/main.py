from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random
import time

from models import LoanIntakeRequest, CheckResult, SanctionCheckResult, CorporateCheckResult, CreditRatingResult
from services.mock_checks import check_sanctions_list, check_corporate_registry, check_credit_rating, calculate_overall_risk

app = FastAPI(title="LoanShield API", description="Automated Due Diligence Engine")

# ... existing code ...

@app.post("/api/diligence/upload")
async def upload_loan_document(file: UploadFile = File(...)):
    # Simulate processing delay
    time.sleep(1.5)
    
    # Mock extraction logic
    # In a real app, uses OCR/PDF parsing
    return {
        "filename": file.filename,
        "extracted_data": {
            "loan_id": f"LN-{random.randint(2000, 3000)}-DOC",
            "borrower_name": "Global Logistics Corp", # Mock extracted name
            "registration_number": "REG-884422",
            "amount_usd": 15000000
        },
        "message": "Document successfully parsed"
    }


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for hackathon/local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    return {"status": "ok", "service": "LoanShield Backend"}

@app.post("/api/diligence/check", response_model=CheckResult)
async def run_diligence_check(request: LoanIntakeRequest):
    # Run Checks
    sanctions_data = check_sanctions_list(request.borrower_name)
    corporate_data = check_corporate_registry(request.registration_number or "N/A")
    credit_data = check_credit_rating(request.borrower_name)
    
    # Calculate Risk
    risk_eval = calculate_overall_risk(sanctions_data, corporate_data, credit_data)
    
    # Assemble Result
    result = CheckResult(
        loan_id=request.loan_id,
        timestamp=datetime.now(),
        overall_status=risk_eval["status"],
        risk_score=risk_eval["score"],
        sanctions=SanctionCheckResult(**sanctions_data),
        corporate=CorporateCheckResult(**corporate_data),
        credit=CreditRatingResult(**credit_data)
    )
    
    return result

from fastapi.responses import StreamingResponse
from utils.report_generator import generate_pdf_report
import io

@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    """Mock stats for the dashboard"""
    return {
        "active_trades": 124,
        "pending_reviews": 12,
        "flagged_loans": 3,
        "avg_processing_time": "1.2s"
    }

@app.post("/api/report/generate")
async def generate_report(result: CheckResult):
    pdf_bytes = generate_pdf_report(result.dict())
    return StreamingResponse(
        io.BytesIO(pdf_bytes), 
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=loan_report_{result.loan_id}.pdf"}
    )
