import React from 'react';
import { KPIStats } from '../../types';

interface AssetsViewProps {
    stats: KPIStats;
    isAnomalyActive: boolean;
}

const AssetsView: React.FC<AssetsViewProps> = ({ stats, isAnomalyActive }) => {
    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold text-[#003366] uppercase tracking-tighter">Industrial Fleet Registry</h3>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded">HEALTH POLLING: 4S</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(id => {
                    const unitPower = Math.round(stats.currentPower / 3 + (Math.random() * 10 - 5));
                    const unitHealth = isAnomalyActive ? 60 + Math.random() * 10 : 92 + Math.random() * 5;
                    return (
                        <div key={id} className="bg-white border-t-4 border-[#003366] rounded shadow-sm hover:shadow-md transition-all overflow-hidden">
                            <div className="p-4 bg-gray-50 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-700">TAG: UNIT-{id}-CENTRIFUGAL</span>
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${isAnomalyActive ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {isAnomalyActive ? 'ALERT' : 'NOMINAL'}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Dynamic Load</span>
                                        <span className="text-2xl font-black text-gray-800">{unitPower} kW</span>
                                    </div>
                                    <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-sm ${unitHealth < 75 ? 'border-red-500 text-red-500' : 'border-[#003366] text-[#003366]'}`}>
                                        {Math.round(unitHealth)}%
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-500">Isentropic Eff.</span>
                                        <span className="text-gray-800">{(stats.efficiency - (id * 2))}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-500">Vibration (RMS)</span>
                                        <span className="text-gray-800">{isAnomalyActive ? '4.8 mm/s' : '1.2 mm/s'}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-500">Thermal Profile</span>
                                        <span className={`font-bold ${isAnomalyActive ? 'text-red-500' : 'text-gray-800'}`}>{isAnomalyActive ? 'Critical' : 'Stable'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AssetsView;
