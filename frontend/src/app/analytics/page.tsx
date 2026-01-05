"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Mock Data for "Portfolio Risk Distribution"
const RISK_DISTRIBUTION_DATA = [
    { name: 'Low Risk', value: 65, color: '#10b981' }, // Emerald-500
    { name: 'Medium Risk', value: 25, color: '#f59e0b' }, // Amber-500
    { name: 'High Risk', value: 10, color: '#ef4444' }, // Red-500
];

// Mock Data for "Weekly Volume"
const WEEKLY_VOLUME_DATA = [
    { day: 'Mon', volume: 12, processed: 10 },
    { day: 'Tue', volume: 19, processed: 18 },
    { day: 'Wed', volume: 15, processed: 14 },
    { day: 'Thu', volume: 22, processed: 20 },
    { day: 'Fri', volume: 30, processed: 28 },
    { day: 'Sat', volume: 8, processed: 8 },
    { day: 'Sun', volume: 5, processed: 5 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Analytics Dashboard</h2>
                <p className="text-slate-400">Real-time insights into portfolio health and operational velocity.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">

                {/* Portfolio Risk Distribution - Pie Chart */}
                <Card className="col-span-3 bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Portfolio Risk Distribution</CardTitle>
                        <CardDescription className="text-slate-400">Current exposure breakdown by risk category.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={RISK_DISTRIBUTION_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {RISK_DISTRIBUTION_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#f8fafc' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Volume - Bar Chart */}
                <Card className="col-span-4 bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Weekly Processing Volume</CardTitle>
                        <CardDescription className="text-slate-400">Number of loan documents processed vs. completed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={WEEKLY_VOLUME_DATA}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                    <Tooltip
                                        cursor={{ fill: '#334155', opacity: 0.2 }}
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                        labelStyle={{ color: '#94a3b8' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar dataKey="volume" name="Total Incoming" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                    <Bar dataKey="processed" name="Completed" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Metrics Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Avg. Risk Score", value: "72/100", change: "+2.5%", color: "text-emerald-500" },
                    { title: "Avg. Processing Time", value: "1.2s", change: "-0.3s", color: "text-emerald-500" },
                    { title: "Documents Pending", value: "23", change: "+5", color: "text-amber-500" },
                    { title: "Critical Alerts", value: "3", change: "-1", color: "text-rose-500" }
                ].map((stat, i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <p className={`text-xs ${stat.color} flex items-center mt-1`}>
                                {stat.change} from last week
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
