
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Activity, Zap, TrendingDown, Settings, Bell, Menu, ChevronRight, 
  ShieldCheck, Cpu, Database, Wrench, BarChart3, Clock, Download, 
  AlertTriangle, FileText, User, Microscope, Target, Info, CheckCircle2,
  LineChart, Terminal, RefreshCw, Layers, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { KPIStats, Recommendation, SensorData } from './types';
import { INITIAL_RECOMMS, ELECTRICITY_COST_KWH } from './constants';
import KPICard from './components/KPICard';
import RecommendationCard from './components/RecommendationCard';
import { getGeneralInsight, generateShiftHandover, diagnoseAnomaly, getPredictiveAnalysis } from './services/geminiService';

type ViewType = 'dashboard' | 'assets' | 'audit' | 'maintenance' | 'ai-lab';

const generateDataPoint = (timeLabel: string, isAnomaly: boolean = false): SensorData => ({
  timestamp: timeLabel,
  powerKW: isAnomaly ? 580 + Math.random() * 50 : 410 + Math.random() * 45,
  flowRate: isAnomaly ? 130 + Math.random() * 10 : 165 + Math.random() * 15,
  pressureIn: 1.0,
  pressureOut: isAnomaly ? 6.1 + Math.random() * 0.3 : 7.2 + Math.random() * 0.4,
  efficiency: isAnomaly ? 0.65 + Math.random() * 0.05 : 0.85 + Math.random() * 0.05,
  temp: isAnomaly ? 42 + Math.random() * 10 : 22 + Math.random() * 4
});

const App: React.FC = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(INITIAL_RECOMMS);
  const [activeTab, setActiveTab] = useState<ViewType>('dashboard');
  const [predictiveReport, setPredictiveReport] = useState<string | null>(null);
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [diagResult, setDiagResult] = useState<string | null>(null);
  const [handoverReport, setHandoverReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setData(Array.from({ length: 24 }).map((_, i) => generateDataPoint(`${i}:00`)));
  }, []);

  // Real-time Data Feed
  useEffect(() => {
    const interval = window.setInterval(() => {
      setData(prev => {
        if (prev.length === 0) return prev;
        const lastTime = prev[prev.length - 1].timestamp;
        const [h, m] = lastTime.split(':').map(Number);
        let nm = m + 5; let nh = h;
        if (nm >= 60) { nm = 0; nh = (h + 1) % 24; }
        const label = `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
        return [...prev.slice(1), generateDataPoint(label, isAnomalyActive)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnomalyActive]);

  // Automated Periodic Analysis
  useEffect(() => {
    if (data.length < 10) return;
    const triggerAnalysis = async () => {
        const trend = data.slice(-10).map(d => `[${d.timestamp}: P:${Math.round(d.powerKW)}kW, Eff:${Math.round(d.efficiency*100)}%]`).join(', ');
        const analysis = await getPredictiveAnalysis(trend);
        setPredictiveReport(analysis);
    };
    const analysisInterval = setInterval(triggerAnalysis, 60000);
    triggerAnalysis();
    return () => clearInterval(analysisInterval);
  }, [data.length]);

  const stats = useMemo<KPIStats>(() => {
    if (!data.length) return { currentPower: 0, dailyCost: 0, efficiency: 0, annualProjectedSavings: 0 };
    const latest = data[data.length - 1];
    return {
      currentPower: Math.round(latest.powerKW),
      dailyCost: Math.round(latest.powerKW * 24 * ELECTRICITY_COST_KWH),
      efficiency: Math.round(latest.efficiency * 100),
      annualProjectedSavings: recommendations.reduce((acc, r) => acc + (r.estimatedSavings * 365), 0)
    };
  }, [data, recommendations]);

  const handleSimulateAnomaly = async () => {
    setIsAnomalyActive(true);
    setDiagResult("Anomaly detected. Core Intelligence Engine performing Root Cause Analysis...");
    const symptoms = "Power spike to 580kW, Flow drop to 130kg/s, Temp increase to 45C. Discharge pressure 6.1 bar.";
    const result = await diagnoseAnomaly(symptoms);
    setDiagResult(result);
  };

  const handleResolveAnomaly = () => {
    setIsAnomalyActive(false);
    setDiagResult(null);
  };

  const handleResetScada = () => {
    setData(Array.from({ length: 24 }).map((_, i) => generateDataPoint(`${i}:00`)));
    setIsAnomalyActive(false);
    setDiagResult(null);
    setPredictiveReport(null);
    setHandoverReport(null);
  };

  const handleDeepAnalytics = async () => {
    setIsAnalyzing(true);
    const trend = data.slice(-15).map(d => `[${d.timestamp}: P:${Math.round(d.powerKW)}kW, Eff:${Math.round(d.efficiency*100)}%]`).join(', ');
    const analysis = await getPredictiveAnalysis(trend);
    setPredictiveReport(analysis);
    setIsAnalyzing(false);
  };

  const handleGenerateHandover = async () => {
    setIsGenerating(true);
    const summary = `Last load: ${stats.currentPower}kW. Avg Efficiency: ${stats.efficiency}%. Active anomalies: ${isAnomalyActive ? 'Critical Temp Alert' : 'None'}.`;
    const report = await generateShiftHandover(summary);
    setHandoverReport(report);
    setIsGenerating(false);
  };

  const renderDashboard = () => (
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
                <button onClick={handleResetScada} className="px-3 py-1 text-[10px] font-bold rounded border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1">
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
                recomm={{...r, estimatedSavings: Math.round(r.estimatedSavings * 83)}} 
                onExecute={(id) => setRecommendations(p => p.filter(x => x.id !== id))} 
              />
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 font-medium">
             <p className="font-bold uppercase mb-1 flex items-center gap-1"><Info size={12}/> Analysis Note</p>
             Directives are based on IS:50001 standards and real-time isentropic calculations derived from secure telemetry.
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaintenance = () => (
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
                         <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                            item.priority === 'Critical' ? 'bg-red-600 text-white' : 
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

  const renderAILab = () => (
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
                  onClick={handleGenerateHandover}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded flex items-center gap-2 transition-all shadow-lg text-sm uppercase tracking-wider"
               >
                 {isGenerating ? <Clock className="animate-spin" size={18} /> : <FileText size={18} />}
                 GENERATE OFFICIAL HANDOVER
               </button>
               <button 
                  disabled={isAnalyzing}
                  onClick={handleDeepAnalytics}
                  className="bg-white text-[#003366] font-bold px-6 py-2 rounded flex items-center gap-2 transition-all shadow-lg text-sm uppercase tracking-wider border border-white"
               >
                 {isAnalyzing ? <RefreshCw className="animate-spin" size={18} /> : <Layers size={18} />}
                 RUN DEEP DATA ANALYTICS
               </button>
               <button onClick={handleResetScada} className="bg-white/10 border border-white/20 px-6 py-2 rounded text-sm font-bold hover:bg-white/20 transition-all uppercase tracking-wider">
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
                       <p className="text-center italic text-xs">Diagnostic engine in passive monitoring mode. <br/> No active thermal or load anomalies to investigate.</p>
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
                          <Activity size={14}/> Integrated Predictive Analysis
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

  const renderAssets = () => (
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

  const renderAudit = () => (
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
                       <td className="px-6 py-4 font-bold text-gray-700 tracking-tight">OCT {28-i}, 2024</td>
                       <td className="px-6 py-4 text-right font-mono">{410 + i * 5}</td>
                       <td className="px-6 py-4 text-right">₹7.05</td>
                       <td className="px-6 py-4 text-right">0.{88-i} T/MWh</td>
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
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
             <img src="https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg" className="h-14" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full p-6 gap-8">
        <aside className="w-72 shrink-0 hidden lg:block">
          <nav className="bg-white rounded border border-gray-200 shadow-sm sticky top-6 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Modules</p>
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="p-2 space-y-1">
              {[
                { id: 'dashboard', label: 'Plant Console', icon: <Zap size={18} /> },
                { id: 'assets', label: 'Fleet Registry', icon: <Database size={18} /> },
                { id: 'audit', label: 'Energy Audits', icon: <FileText size={18} /> },
                { id: 'maintenance', label: 'Maintenance Log', icon: <Wrench size={18} /> },
                { id: 'ai-lab', label: 'Intelligence Lab', icon: <Microscope size={18} />, highlight: true }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
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

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'assets' && renderAssets()}
          {activeTab === 'audit' && renderAudit()}
          {activeTab === 'maintenance' && renderMaintenance()}
          {activeTab === 'ai-lab' && renderAILab()}
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

export default App;
