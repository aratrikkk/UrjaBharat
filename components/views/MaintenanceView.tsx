import React from 'react';
import { Wrench, Calendar, Activity, Cpu } from 'lucide-react';

interface MaintenanceViewProps {
    isAnomalyActive: boolean;
}

const MaintenanceView: React.FC<MaintenanceViewProps> = ({ isAnomalyActive }) => {
    return (
        <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-[#003366] mb-6 uppercase flex items-center gap-2 border-b pb-3">
                        <Wrench size={20} className="text-orange-500" /> Asset Maintenance Ledger
                    </h3>
                    <div className="space-y-4">
                        {[
                            { id: 'MT-401', asset: 'Compressor Unit-1', task: 'Stage-2 Lubricant Analysis', date: 'Oct 30, 2024', priority: 'Medium', status: 'Scheduled' },
                            { id: 'MT-402', asset: 'Main Cooling Tower', task: 'Statutory Safety Valve Audit', date: 'Oct 28, 2024', priority: 'High', status: 'Completed' },
                            { id: 'MT-403', asset: 'Compressor Unit-3', task: 'Inlet Guide Vane Calibration', date: 'Oct 29, 2024', priority: isAnomalyActive ? 'Critical' : 'High', status: isAnomalyActive ? 'Action Required' : 'Planned' },
                            { id: 'MT-404', asset: 'Switchgear Panel B', task: 'Infrared Thermal Scanning', date: 'Nov 02, 2024', priority: 'Low', status: 'Pending' },
                        ].map((item, idx) => (
                            <div key={idx} className={`p-4 border rounded flex justify-between items-center transition-all ${item.status === 'Action Required' ? 'bg-red-50 border-red-200' : 'bg-white hover:bg-gray-50'}`}>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-gray-100 p-2 rounded text-[#003366]">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">{item.id} | {item.asset}</p>
                                        <p className="text-sm font-bold text-gray-800">{item.task}</p>
                                        <p className="text-[10px] text-gray-500 font-medium">Next Service Date: {item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${item.priority === 'Critical' ? 'bg-red-600 text-white' :
                                            item.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {item.priority}
                                    </span>
                                    <p className={`text-[10px] font-bold mt-1 ${item.status === 'Action Required' ? 'text-red-700 animate-pulse' : 'text-gray-400'}`}>
                                        {item.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                        <h3 className="text-sm font-bold text-[#003366] mb-4 uppercase flex items-center gap-2">
                            <Activity size={16} /> MTBF Analytics
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded border">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Mean Time Between Failure</p>
                                <p className="text-xl font-black text-[#003366]">1,420 Hours</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded border">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">System Availability</p>
                                <p className="text-xl font-black text-green-700">98.4%</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#003366] text-white p-6 rounded-lg shadow-lg relative overflow-hidden">
                        <p className="relative z-10 text-[10px] font-bold text-blue-200 uppercase mb-2">Technical Support</p>
                        <p className="relative z-10 text-xs leading-relaxed opacity-80 mb-4 italic">"Maintenance cycles are dynamically adjusted based on real-time efficiency degradation factors."</p>
                        <button className="relative z-10 w-full bg-white/10 border border-white/20 py-2 rounded text-[10px] font-bold uppercase hover:bg-white/20 transition-all">
                            View BHEL Manuals
                        </button>
                        <Cpu className="absolute -bottom-10 -right-10 text-white opacity-5 w-32 h-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceView;
