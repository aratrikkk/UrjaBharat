import React from 'react';
import {
    Zap, TrendingDown, Activity, ShieldCheck, BarChart3, RefreshCw,
    Terminal, Clock, Target, Info
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import KPICard from '../KPICard';
import RecommendationCard from '../RecommendationCard';
import { KPIStats, Recommendation, SensorData } from '../../types';

interface DashboardViewProps {
    stats: KPIStats;
    isAnomalyActive: boolean;
    data: SensorData[];
    predictiveReport: string | null;
    recommendations: Recommendation[];
    onResetScada: () => void;
    setRecommendations: React.Dispatch<React.SetStateAction<Recommendation[]>>;
}

const DashboardView: React.FC<DashboardViewProps> = ({
    stats,
    isAnomalyActive,
    data,
    predictiveReport,
    recommendations,
    onResetScada,
    setRecommendations
}) => {
    return (
        <div className="animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KPICard label="Active Grid Load" value={stats.currentPower} unit="kW" icon={<Zap size={18} />} trend={isAnomalyActive ? 42 : -1.2} />
                <KPICard label="Projected Daily Cost" value={`₹${(stats.dailyCost * 83).toLocaleString()}`} unit="" icon={<TrendingDown size={18} />} />
                <KPICard label="Thermal Efficiency" value={stats.efficiency} unit="%" icon={<Activity size={18} />} trend={isAnomalyActive ? -25 : 0.5} />
                <KPICard label="Annual Savings Goal" value={`₹${(stats.annualProjectedSavings * 83).toLocaleString()}`} unit="" icon={<ShieldCheck size={18} />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-[#003366] flex items-center gap-2 uppercase tracking-tight">
                                <BarChart3 size={20} /> Real-Time Telemetry Stream
                            </h3>
                            <div className="flex gap-2">
                                <button onClick={onResetScada} className="px-3 py-1 text-[10px] font-bold rounded border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">
                                    <RefreshCw size={12} /> RESET BRIDGE
                                </button>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="timestamp" stroke="#6b7280" fontSize={10} hide />
                                    <YAxis stroke="#6b7280" fontSize={10} axisLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="powerKW" stroke={isAnomalyActive ? "#dc2626" : "#003366"} fill={isAnomalyActive ? "#fee2e2" : "#f0f4f8"} strokeWidth={3} isAnimationActive={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-slate-800 p-3 px-6 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                                <Terminal size={16} className="text-emerald-400" /> Core Intelligence Analytics
                            </h3>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Live Prediction Feed</span>
                        </div>
                        <div className="p-6 bg-slate-900 text-emerald-400 font-mono text-xs h-[250px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                            {predictiveReport ? (
                                <div className="whitespace-pre-wrap animate-in fade-in duration-1000">
                                    <p className="text-white mb-2 font-bold underline">REPORTING CYCLE: {new Date().toLocaleTimeString()}</p>
                                    {predictiveReport}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                                    <Clock size={14} /> Processing telemetry trend data for next 4-hour forecast and mandatory measures...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex flex-col h-full">
                    <h3 className="text-md font-bold text-[#003366] mb-4 uppercase border-b pb-3 flex items-center gap-2">
                        <Target size={18} /> Optimization Directives
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {recommendations.map(r => (
                            <RecommendationCard
                                key={r.id}
                                recomm={{ ...r, estimatedSavings: Math.round(r.estimatedSavings * 83) }}
                                onExecute={(id) => setRecommendations(p => p.filter(x => x.id !== id))}
                            />
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 font-medium">
                        <p className="font-bold uppercase mb-1 flex items-center gap-1"><Info size={12} /> Analysis Note</p>
                        Directives are based on IS:50001 standards and real-time isentropic calculations derived from secure telemetry.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
