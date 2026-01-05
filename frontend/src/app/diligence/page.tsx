"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/RiskBadge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Download, Search, ShieldCheck, Upload } from "lucide-react";

interface CheckResult {
    loan_id: string;
    overall_status: string;
    risk_score: number;
    sanctions: { status: string; flagged: boolean; details: string };
    corporate: { status: string; active: boolean };
    credit: { agency: string; rating: string; score: number; status: string };
}

export default function DiligencePage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CheckResult | null>(null);
    const [activeTab, setActiveTab] = useState("manual");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        loan_id: "LN-2026-X",
        borrower_name: "Acme Corp",
        registration_number: "REG-998877"
    });

    const handleCheck = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch("http://localhost:8000/api/diligence/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            // Simulate delay for effect
            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 1000);
        } catch (e) {
            console.error("Check failed", e);
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!uploadedFile) return;
        setLoading(true);
        setResult(null);

        const uploadData = new FormData();
        uploadData.append("file", uploadedFile);

        try {
            // Step 1: Upload and Parse
            const uploadRes = await fetch("http://localhost:8000/api/diligence/upload", {
                method: "POST",
                body: uploadData
            });
            const parseResult = await uploadRes.json();

            // Auto-fill form data from parsed result
            setFormData(parseResult.extracted_data);

            // Step 2: Run Checks automatically with parsed data
            const checkRes = await fetch("http://localhost:8000/api/diligence/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parseResult.extracted_data)
            });

            const checkData = await checkRes.json();
            setResult(checkData);
            setLoading(false);

        } catch (e) {
            console.error("Upload failed", e);
            setLoading(false);
        }
    };



    const handleDownload = async () => {
        if (!result) return;
        try {
            const response = await fetch("http://localhost:8000/api/report/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result)
            });

            if (!response.ok) throw new Error("Download failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `LoanShield_Report_${result.loan_id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Download error", e);
            alert("Failed to download report");
        }
    };

    const getStatusIcon = (status: string) => {
        if (status === "PASS" || status === "VALID" || status === "Go") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        if (status === "FAIL" || status === "Stop" || status === "INVALID") return <XCircle className="w-5 h-5 text-rose-500" />;
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Auto-Diligence Engine</h2>
                <p className="text-slate-400">Run automated risk checks on loan trades.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <Card className="bg-slate-900 border-slate-800 h-fit">
                    <CardHeader>
                        <CardTitle className="text-white">Loan Details</CardTitle>
                        <CardDescription>Enter borrower information or upload loan document.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 mb-6 border-b border-slate-800 pb-2">
                            <button
                                onClick={() => setActiveTab("manual")}
                                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === 'manual' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                            >
                                Manual Input
                            </button>
                            <button
                                onClick={() => setActiveTab("upload")}
                                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === 'upload' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                            >
                                Document Upload
                            </button>
                        </div>

                        {activeTab === "manual" ? (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="loan_id" className="text-slate-300">Loan ID</Label>
                                    <Input
                                        id="loan_id"
                                        value={formData.loan_id}
                                        onChange={(e) => setFormData({ ...formData, loan_id: e.target.value })}
                                        className="bg-slate-950 border-slate-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="borrower" className="text-slate-300">Borrower Name</Label>
                                    <Input
                                        id="borrower"
                                        value={formData.borrower_name}
                                        onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
                                        className="bg-slate-950 border-slate-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg" className="text-slate-300">Registration Number</Label>
                                    <Input
                                        id="reg"
                                        value={formData.registration_number}
                                        onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                                        className="bg-slate-950 border-slate-700 text-white"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-emerald-500/50 transition-colors bg-slate-950/50">
                                    <Input
                                        type="file"
                                        className="hidden"
                                        id="file-upload"
                                        onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                                    />
                                    <Label htmlFor="file-upload" className="cursor-pointer block">
                                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-slate-700">
                                            <Upload className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-300 block mb-1">
                                            {uploadedFile ? uploadedFile.name : "Click to upload Loan Doc (PDF)"}
                                        </span>
                                        <span className="text-xs text-slate-500 block">
                                            Maximum size 10MB
                                        </span>
                                    </Label>
                                </div>
                                {uploadedFile && (
                                    <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-900/50">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Ready to analyze
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        {activeTab === "manual" ? (
                            <Button
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11"
                                onClick={handleCheck}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Running Checks...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Run Auto-Diligence
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
                                onClick={handleUpload}
                                disabled={loading || !uploadedFile}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing Document...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                        Process & Analyze
                                    </>
                                )}
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <Card className="bg-slate-900 border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg text-slate-400">Risk Assessment Result</CardTitle>
                                        <div className="mt-2">
                                            <RiskBadge status={result.overall_status} score={result.risk_score} />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-white">{result.risk_score}<span className="text-sm text-slate-500 font-normal">/100</span></div>
                                        <p className="text-xs text-slate-500">Risk Score</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator className="bg-slate-800" />
                            <CardContent className="pt-6 space-y-6">

                                {/* Sanctions */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">{getStatusIcon(result.sanctions.status)}</div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white">OFAC Sanctions & AML</h4>
                                        <p className="text-xs text-slate-400 mt-1">{result.sanctions.details}</p>
                                    </div>
                                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">{result.sanctions.status}</div>
                                </div>

                                {/* Corporate */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">{getStatusIcon(result.corporate.status)}</div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white">Corporate Registration</h4>
                                        <p className="text-xs text-slate-400 mt-1">Active: {result.corporate.active ? "Yes" : "No"}</p>
                                    </div>
                                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">{result.corporate.status}</div>
                                </div>

                                {/* Credit */}
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">{getStatusIcon(result.credit.status)}</div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white">Credit Rating ({result.credit.agency})</h4>
                                        <p className="text-xs text-slate-400 mt-1">Rating: <span className="text-white font-mono">{result.credit.rating}</span></p>
                                    </div>
                                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">{result.credit.status}</div>
                                </div>

                            </CardContent>
                            <CardFooter className="bg-slate-950/50 pt-6">
                                <Button
                                    variant="outline"
                                    className="w-full border-slate-700 hover:bg-slate-800 text-slate-300"
                                    onClick={handleDownload}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Full Report (PDF)
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-600">
                            <div className="text-center">
                                <ShieldCheck className="mx-auto h-12 w-12 opacity-20" />
                                <p className="mt-4 text-sm">Enter loan details and run checks to see results.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
