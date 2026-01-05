import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
    const reports = [
        { id: "RPT-2024-001", name: "Weekly Risk Summary - March W2", date: "2024-03-12" },
        { id: "RPT-2024-002", name: "Sanctions Hit Report", date: "2024-03-10" },
        { id: "RPT-2024-003", name: "Portfolio Credit Degradation", date: "2024-03-08" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Risk Reports</h2>
                <p className="text-slate-400">Archived due diligence reports and audit trails.</p>
            </div>

            <div className="grid gap-4">
                {reports.map((report) => (
                    <Card key={report.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-500/10 p-3 rounded-lg">
                                    <FileText className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                                    <p className="text-sm text-slate-500">{report.id} • Generated on {report.date}</p>
                                </div>
                            </div>
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
