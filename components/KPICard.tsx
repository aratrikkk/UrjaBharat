
import React from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  unit: string;
  trend?: number;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, unit, trend, icon }) => {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-gray-50 rounded group-hover:bg-blue-50 transition-colors text-[#003366]">
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${trend >= 0 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1 leading-none">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-bold text-[#003366]">{value}</h3>
          {unit && <span className="text-gray-400 text-xs font-bold">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
