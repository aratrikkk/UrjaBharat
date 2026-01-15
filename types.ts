
export interface SensorData {
  timestamp: string;
  powerKW: number;
  flowRate: number;
  pressureIn: number;
  pressureOut: number;
  efficiency: number;
  temp: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  estimatedSavings: number;
  urgency: 'low' | 'medium' | 'high';
  timestamp: string;
  justification?: string;
}

export interface KPIStats {
  currentPower: number;
  dailyCost: number;
  efficiency: number;
  annualProjectedSavings: number;
}

export type ViewType = 'dashboard' | 'assets' | 'audit' | 'maintenance' | 'ai-lab';
