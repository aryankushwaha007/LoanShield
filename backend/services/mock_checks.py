import random
from typing import Dict, Any

def check_sanctions_list(borrower_name: str) -> Dict[str, Any]:
    """
    Simulates checking OFAC/Sanctions lists.
    Randomly flags 10% of inputs as FAIL.
    """
    # Deterministic randomness based on name length for demo consistency if needed, 
    # but requirement asked for random 10%.
    # Let's make it random but slightly predictable for specific keywords if we wanted, 
    # but sticking to pure random 10% (0.1) chance of fail.
    
    is_hit = random.random() < 0.1
    
    # Override for "Osama" or specific trigger words for demo reliability
    if "BAD" in borrower_name.upper() or "TERROR" in borrower_name.upper():
        is_hit = True
    
    if is_hit:
        return {
            "status": "FAIL",
            "flagged": True,
            "details": "Potential match found on OFAC SDN List"
        }
    else:
        return {
            "status": "PASS",
            "flagged": False,
            "details": "No records found"
        }

def check_corporate_registry(reg_number: str) -> Dict[str, Any]:
    """
    Simulates Corporate Registry Check.
    Always returns Valid as per requirements.
    """
    return {
        "status": "VALID",
        "active": True,
        "registration_date": "2010-05-15" # Mock date
    }

def check_credit_rating(borrower_name: str) -> Dict[str, Any]:
    """
    Simulates S&P Credit Rating.
    Randomly assigns AAA to B-.
    """
    ratings = [
        ("AAA", 95, "Go"), 
        ("AA+", 90, "Go"), ("AA", 85, "Go"), ("AA-", 80, "Go"),
        ("A+", 75, "Go"), ("A", 70, "Caution"), ("A-", 65, "Caution"),
        ("BBB+", 60, "Caution"), ("BBB", 55, "Caution"), ("BBB-", 50, "Caution"),
        ("BB+", 45, "Stop"), ("BB", 40, "Stop"), ("B", 30, "Stop")
    ]
    
    selected = random.choice(ratings)
    
    # Specific override for "Red" behavior demonstration
    if "RISKY" in borrower_name.upper():
        selected = ("B", 30, "Stop")
    elif "SAFE" in borrower_name.upper():
        selected = ("AAA", 95, "Go")
        
    return {
        "agency": "S&P Global (Mock)",
        "rating": selected[0],
        "score": selected[1],
        "status": selected[2]
    }

def calculate_overall_risk(sanctions, corporate, credit) -> Dict[str, Any]:
    """
    Rule-based logic:
    Any failed critical check -> RED
    Minor risk flags -> AMBER
    All checks clear -> GREEN
    """
    if sanctions["flagged"]:
        return {"status": "RED", "score": 0}
    
    if corporate["status"] != "VALID":
        return {"status": "RED", "score": 0}
        
    if credit["status"] == "Stop":
        return {"status": "RED", "score": credit["score"]}
    
    if credit["status"] == "Caution":
        return {"status": "AMBER", "score": credit["score"]}
        
    return {"status": "GREEN", "score": credit["score"]}
