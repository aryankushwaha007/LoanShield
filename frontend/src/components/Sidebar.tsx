import Link from "next/link";
import { LayoutDashboard, FileText, ShieldAlert, PieChart } from "lucide-react";

export function Sidebar() {
    return (
        <div className="h-screen w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col fixed left-0 top-0 z-10">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold tracking-wider text-emerald-400">LOAN<span className="text-white">SHIELD</span></h1>
                <p className="text-xs text-slate-500 mt-1">Due Diligence Platform</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
                    <LayoutDashboard className="w-5 h-5 text-emerald-500" />
                    Dashboard
                </Link>

                <Link href="/diligence" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    Auto-Diligence
                </Link>

                <Link href="/reports" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Risk Reports
                </Link>

                <div className="pt-4 mt-4 border-t border-slate-800">
                    <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
                        <PieChart className="w-5 h-5 text-slate-400" />
                        Analytics
                    </Link>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-400">System Status</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs text-emerald-400">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
