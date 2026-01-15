import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { KPIStats } from '../../types';

interface AuditViewProps {
    stats: KPIStats;
    isAnomalyActive: boolean;
}

const AuditView: React.FC<AuditViewProps> = ({ stats, isAnomalyActive }) => {
    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="bg-white border p-6 rounded-lg shadow-sm border-gray-200">
                <h3 className="text-lg font-bold text-[#003366] mb-6 uppercase flex items-center gap-2 border-b pb-3">
                    <ShieldCheck size={20} className="text-green-600" /> Energy Performance Audit
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-5 bg-blue-50 border border-blue-100 rounded">
                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1 tracking-widest">Current Unit Count</p>
                        <p className="text-3xl font-black text-[#003366]">{Math.round(stats.currentPower * 8)} MWh</p>
                    </div>
                    <div className="p-5 bg-orange-50 border border-orange-100 rounded">
                        <p className="text-[10px] font-bold text-orange-600 uppercase mb-1 tracking-widest">Financial Impact (INR)</p>
                        <p className="text-3xl font-black text-orange-700">₹{(stats.dailyCost * 83 / 3).toLocaleString()}</p>
                    </div>
                    <div className="p-5 bg-green-50 border border-green-100 rounded">
                        <p className="text-[10px] font-bold text-green-600 uppercase mb-1 tracking-widest">Statutory Protocol</p>
                        <p className="text-3xl font-black text-green-700">{isAnomalyActive ? 'ALERT' : 'OPTIMAL'}</p>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase border-b">
                            <tr>
                                <th className="px-6 py-4">Financial Log Date</th>
                                <th className="px-6 py-4 text-right">Avg Load (kW)</th>
                                <th className="px-6 py-4 text-right">Unit Rate</th>
                                <th className="px-6 py-4 text-right">SEC (Specific Consumption)</th>
                                <th className="px-6 py-4 text-center">Protocol Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs font-medium">
                            {[...Array(6)].map((_, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-700 tracking-tight">OCT {28 - i}, 2024</td>
                                    <td className="px-6 py-4 text-right font-mono">{410 + i * 5}</td>
                                    <td className="px-6 py-4 text-right">₹7.05</td>
                                    <td className="px-6 py-4 text-right">0.{88 - i} T/MWh</td>
                                    <td className="px-6 py-4 text-center">
                                        <CheckCircle2 size={16} className="text-green-600 mx-auto" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditView;
