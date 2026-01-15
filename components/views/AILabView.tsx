import React from 'react';
import {
    Clock, FileText, RefreshCw, Layers, Microscope, ShieldCheck, Activity, Download, Cpu
} from 'lucide-react';

interface AILabViewProps {
    isGenerating: boolean;
    isAnalyzing: boolean;
    diagResult: string | null;
    predictiveReport: string | null;
    handoverReport: string | null;
    onGenerateHandover: () => void;
    onDeepAnalytics: () => void;
    onResetScada: () => void;
}

const AILabView: React.FC<AILabViewProps> = ({
    isGenerating,
    isAnalyzing,
    diagResult,
    predictiveReport,
    handoverReport,
    onGenerateHandover,
    onDeepAnalytics,
    onResetScada
}) => {
    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="bg-[#003366] text-white p-8 rounded-lg shadow-xl relative overflow-hidden border-b-4 border-orange-500">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Core Intelligence Operations Lab</h2>
                    <p className="text-blue-100 mb-6 text-sm max-w-xl font-light">
                        Secure administrative gateway for high-fidelity data analytics, root cause investigation, and automated shift documentation. All procedures comply with National Industrial Protocols.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            disabled={isGenerating}
                            onClick={onGenerateHandover}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded flex items-center gap-2 transition-all shadow-lg text-sm uppercase tracking-wider"
                        >
                            {isGenerating ? <Clock className="animate-spin" size={18} /> : <FileText size={18} />}
                            GENERATE OFFICIAL HANDOVER
                        </button>
                        <button
                            disabled={isAnalyzing}
                            onClick={onDeepAnalytics}
                            className="bg-white text-[#003366] font-bold px-6 py-2 rounded flex items-center gap-2 transition-all shadow-lg text-sm uppercase tracking-wider border border-white"
                        >
                            {isAnalyzing ? <RefreshCw className="animate-spin" size={18} /> : <Layers size={18} />}
                            RUN DEEP DATA ANALYTICS
                        </button>
                        <button onClick={onResetScada} className="bg-white/10 border border-white/20 px-6 py-2 rounded text-sm font-bold hover:bg-white/20 transition-all uppercase tracking-wider">
                            RESET SCADA BRIDGE
                        </button>
                    </div>
                </div>
                <Cpu className="absolute -bottom-10 -right-10 text-white opacity-5 w-64 h-64" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border p-6 rounded-lg shadow-sm border-gray-200">
                    <h3 className="text-lg font-bold text-[#003366] mb-4 flex items-center gap-2 uppercase tracking-tight">
                        <Microscope size={18} /> Root Cause Investigation Log
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[220px] text-xs leading-relaxed text-gray-700 font-medium">
                        {diagResult ? (
                            <div className="whitespace-pre-wrap animate-in slide-in-from-left-2 duration-500">{diagResult}</div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
                                <ShieldCheck size={40} className="mb-2" />
                                <p className="text-center italic text-xs">Diagnostic engine in passive monitoring mode. <br /> No active thermal or load anomalies to investigate.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white border p-6 rounded-lg shadow-sm border-gray-200">
                    <h3 className="text-lg font-bold text-[#003366] mb-4 flex items-center gap-2 uppercase tracking-tight">
                        <Target size={18} /> DATA ANALYTICS & MEASURES
                    </h3>
                    <div className="space-y-3">
                        {predictiveReport ? (
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs leading-relaxed text-blue-900 h-[220px] overflow-y-auto font-medium custom-scrollbar">
                                <p className="font-bold text-[#003366] mb-2 border-b border-blue-200 pb-1 flex items-center gap-1 uppercase tracking-tighter">
                                    <Activity size={14} /> Integrated Predictive Analysis
                                </p>
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {predictiveReport}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3 opacity-60">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                                        <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                ))}
                                <p className="text-center text-[10px] text-gray-400">Awaiting deep data analytics sequence...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {handoverReport && (
                <div className="bg-white border-2 border-[#003366] p-10 rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 font-serif relative">
                    <div className="text-center mb-8 border-b-2 border-gray-100 pb-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="h-12 mx-auto mb-2 opacity-50" />
                        <h1 className="text-xl font-bold text-gray-800 uppercase tracking-widest">BHARAT ENERGY DYNAMICS LTD.</h1>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">OFFICIAL SHIFT HANDOVER PROTOCOL</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase">PROTOCOL NODE ID: BL-04 | TIMESTAMP: {new Date().toLocaleString()}</p>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap text-sm italic">
                        {handoverReport}
                    </div>
                    <div className="mt-12 flex justify-between items-end border-t pt-6">
                        <div className="text-center">
                            <div className="w-32 h-1 border-b border-gray-400 mb-2"></div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">AUTHENTICATED: INDUSTRIAL-CORE-V1</p>
                        </div>
                        <div className="text-right flex gap-2">
                            <button onClick={() => window.print()} className="bg-[#003366] text-white px-4 py-2 rounded text-xs font-bold hover:bg-blue-900 transition-colors flex items-center gap-2">
                                <Download size={16} /> DOWNLOAD OFFICIAL RECORD
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AILabView;
