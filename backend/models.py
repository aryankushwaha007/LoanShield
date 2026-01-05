from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class LoanIntakeRequest(BaseModel):
    loan_id: str
    borrower_name: str
    registration_number: Optional[str] = None
    amount_usd: Optional[float] = None

class SanctionCheckResult(BaseModel):
    status: str  # "PASS" or "FAIL"
    flagged: bool
    details: str

class CorporateCheckResult(BaseModel):
    status: str  # "VALID" or "INVALID"
    active: bool
    registration_date: Optional[str] = None

class CreditRatingResult(BaseModel):
    agency: str
    rating: str
    score: int # 0-100 normalized
    status: str # "Go", "Caution", "Stop"

class CheckResult(BaseModel):
    loan_id: str
    timestamp: datetime
    overall_status: str # "GREEN", "AMBER", "RED"
    risk_score: int # 0-100
    sanctions: SanctionCheckResult
    corporate: CorporateCheckResult
    credit: CreditRatingResult
