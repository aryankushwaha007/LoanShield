import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RiskBadge } from "@/components/RiskBadge";
import { Plus, ArrowUpRight, TrendingUp, Users, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const trades = [
    { id: "LN-2024-883", borrower: "Acme Corp", amount: "$50,000,000", date: "Today", status: "GREEN", score: 95 },
    { id: "LN-2024-892", borrower: "Omega Shipping", amount: "$120,000,000", date: "Yesterday", status: "AMBER", score: 65 },
    { id: "LN-2024-901", borrower: "Global Trade Ltd", amount: "$35,000,000", date: "Mar 11", status: "RED", score: 0 },
    { id: "LN-2024-915", borrower: "Zenith Tech", amount: "$85,000,000", date: "Mar 10", status: "GREEN", score: 88 },
    { id: "LN-2024-922", borrower: "North Star", amount: "$250,000,000", date: "Mar 09", status: "GREEN", score: 92 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pt-4">

      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1">Welcome back, Senior Analyst.</p>
        </div>
        <Link href="/diligence">
          <Button className="bg-white text-slate-900 hover:bg-slate-200 font-medium px-6">
            <Plus className="w-4 h-4 mr-2" />
            New Diligence Check
          </Button>
        </Link>
      </div>

      {/* Metrics Row - Cleaner, less boxed in */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Active Exposure</span>
          </div>
          <div className="text-2xl font-semibold text-white mt-1">$1.24B</div>
          <div className="text-xs text-emerald-500 flex items-center mt-2">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +2.4% this week
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Loans Monitored</span>
          </div>
          <div className="text-2xl font-semibold text-white mt-1">124</div>
          <div className="text-xs text-slate-500 mt-2">
            Across 12 jurisdictions
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Pending Review</span>
          </div>
          <div className="text-2xl font-semibold text-white mt-1">3</div>
          <div className="text-xs text-amber-500 flex items-center mt-2">
            Requires immediate attention
          </div>
        </div>
      </div>

      {/* Recent Activity Table - Minimalist */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Activity</h3>
          <Button variant="ghost" className="text-slate-400 hover:text-white text-sm">View All</Button>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/30">
          <Table>
            <TableHeader className="bg-slate-900/50">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400 font-medium pl-6">Loan Reference</TableHead>
                <TableHead className="text-slate-400 font-medium">Borrower</TableHead>
                <TableHead className="text-slate-400 font-medium">Amount</TableHead>
                <TableHead className="text-slate-400 font-medium">Date</TableHead>
                <TableHead className="text-right text-slate-400 font-medium pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id} className="border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <TableCell className="font-medium text-slate-300 pl-6 group-hover:text-white">{trade.id}</TableCell>
                  <TableCell className="text-slate-400 group-hover:text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                        {trade.borrower.substring(0, 1)}
                      </div>
                      {trade.borrower}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 font-mono text-sm">{trade.amount}</TableCell>
                  <TableCell className="text-slate-500 text-sm">{trade.date}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end">
                      <RiskBadge status={trade.status} score={trade.score} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
