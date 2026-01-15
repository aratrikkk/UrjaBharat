import React from 'react';
import { Zap, Database, FileText, Wrench, Microscope, ShieldCheck } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
    activeTab: ViewType;
    setActiveTab: (tab: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Plant Console', icon: <Zap size={18} /> },
        { id: 'assets', label: 'Fleet Registry', icon: <Database size={18} /> },
        { id: 'audit', label: 'Energy Audits', icon: <FileText size={18} /> },
        { id: 'maintenance', label: 'Maintenance Log', icon: <Wrench size={18} /> },
        { id: 'ai-lab', label: 'Intelligence Lab', icon: <Microscope size={18} />, highlight: true }
    ];

    return (
        <aside className="w-72 shrink-0 hidden lg:block">
            <nav className="bg-white rounded border border-gray-200 shadow-sm sticky top-6 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Modules</p>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="p-2 space-y-1">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as ViewType)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded text-sm font-bold transition-all ${activeTab === item.id ? 'bg-[#003366] text-white shadow-lg' : 'text-gray-600 hover:bg-blue-50'} ${item.highlight && activeTab !== item.id ? 'text-indigo-600 border-l-4 border-indigo-600' : ''}`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>
                <div className="mt-8 p-6 bg-gray-50 border-t">
                    <div className="text-[9px] text-gray-400 font-bold uppercase mb-4 tracking-widest leading-none border-b pb-2">Regulatory Compliance</div>
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-600">
                        <ShieldCheck size={14} className="text-green-600" /> IS:15895 Compliant
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
                        <ShieldCheck size={14} className="text-green-600" /> ISO:50001 (Energy)
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
