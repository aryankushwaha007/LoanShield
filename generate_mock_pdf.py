from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

def create_mock_loan_doc(filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Title
    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, height - 50, "CONFIDENTIAL LOAN AGREEMENT")
    
    # Header Info
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 80, "LOAN ID: LN-2026-X")
    c.drawString(50, height - 100, "DATE: 2026-03-15")
    
    # Body
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 140, "borrower Information:")
    
    c.setFont("Helvetica", 12)
    c.drawString(70, height - 160, "Name: Global Logistics Corp") 
    c.drawString(70, height - 180, "Registration No: REG-884422")
    c.drawString(70, height - 200, "Jurisdiction: Delaware, USA")
    
    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, height - 240, "Loan Details:")
    c.setFont("Helvetica", 12)
    c.drawString(70, height - 260, "Principal Amount: $15,000,000 USD")
    c.drawString(70, height - 280, "Interest Rate: SOFR + 3.5%")
    c.drawString(70, height - 300, "Maturity Date: 2029-03-15")
    
    # Fake text
    text_object = c.beginText(50, height - 350)
    text_object.setFont("Helvetica", 10)
    lorem = """
    This Loan Agreement ("Agreement") is entered into as of the date entered above by and between the Borrower and the Lender. 
    The Borrower hereby agrees to pay to the order of the Lender the principal amount together with interest thereon.
    
    ARTICLE I: DEFINITIONS
    1.1 "Applicable Law" means all applicable provisions of constitutions, laws, statutes, ordinances, rules, treaties, 
    regulations, permits, licenses, approvals, interpretations and orders of courts.
    
    ARTICLE II: REPRESENTATIONS AND WARRANTIES
    The Borrower represents and warrants to the Lender that:
    (a) It is a corporation duly organized, validly existing and in good standing under the laws of its jurisdiction of organization.
    (b) The execution, delivery and performance by the Borrower of this Agreement and the other Loan Documents to which it is 
    a party are within the Borrower's corporate powers, have been duly authorized by all necessary corporate action.
    
    ARTICLE III: COVENANTS
    The Borrower shall maintain its corporate existence and right to carry on its business.
    """
    for line in lorem.split('\n'):
        text_object.textLine(line.strip())
    
    c.drawText(text_object)
    
    # Signature Mock
    c.line(50, 150, 250, 150)
    c.drawString(50, 135, "Authorized Signature")
    
    c.save()
    print(f"Generated: {filename}")

if __name__ == "__main__":
    # Save to desktop for easy access
    desktop = os.path.join(os.path.expanduser("~"), "Desktop")
    # Also save to current directory just in case
    create_mock_loan_doc("MOCK_LOAN_DOC.pdf") 
