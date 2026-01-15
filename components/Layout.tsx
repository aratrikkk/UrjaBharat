import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { ViewType } from '../types';
import { User } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: ViewType;
    setActiveTab: (tab: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
            <Header />

            <div className="flex flex-1 max-w-[1600px] mx-auto w-full p-6 gap-8">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-[#003366] uppercase tracking-tight flex items-center gap-3">
                            <div className="w-2 h-8 bg-orange-500" />
                            {activeTab === 'dashboard' ? 'Operational Briefing' : activeTab.replace('-', ' ')}
                        </h2>
                        <div className="flex gap-4">
                            <div className="bg-white border px-4 py-2 rounded flex items-center gap-3 shadow-sm border-gray-200">
                                <User size={16} className="text-[#003366]" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase leading-none tracking-tighter">Authorized Admin</span>
                                    <span className="text-xs font-black text-gray-700">SR-SUPERVISOR-94</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {children}
                </main>
            </div>

            <footer className="bg-white border-t border-gray-200 py-6 px-10 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">
                    Official Intelligence & Decision Support Portal - Bharat Energy Dynamics (A Govt. of India Enterprise)
                </p>
            </footer>
        </div>
    );
};

export default Layout;
