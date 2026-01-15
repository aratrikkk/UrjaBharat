import React from 'react';
import { Info, User } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="bg-white border-b-4 border-[#003366] z-50 shadow-sm">
            <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GoI" className="h-16" />
                    <div className="border-l-2 pl-6 border-gray-100">
                        <h1 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-1 leading-none">Ministry of Power</h1>
                        <h2 className="text-2xl font-black text-[#003366] tracking-tighter uppercase leading-none mt-1">Bharat Energy Intelligence <span className="text-orange-500">Portal</span></h2>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">(A Govt. of India Strategic Node)</p>
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <div className="hidden xl:flex flex-col items-end">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Control Center</span>
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-1 uppercase tracking-tighter">
                            <Info size={14} className="text-blue-500" /> Regional Zone: Node-04-A
                        </span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg" className="h-14" alt="Digital India" />
                </div>
            </div>
        </header>
    );
};

export default Header;
