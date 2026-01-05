import React from 'react';

interface RiskBadgeProps {
    status: string; // GREEN, AMBER, RED
    score?: number;
}

export function RiskBadge({ status, score }: RiskBadgeProps) {
    const getColors = () => {
        switch (status) {
            case 'GREEN':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'AMBER':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'RED':
                return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getColors()} font-mono font-bold uppercase tracking-wide w-fit`}>
            <span className={`w-2 h-2 rounded-full ${status === 'GREEN' ? 'bg-emerald-500' : status === 'AMBER' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
            {status}
            {score !== undefined && <span className="ml-1 opacity-75">({score})</span>}
        </div>
    );
}
