
export const ELECTRICITY_COST_KWH = 0.085; // $ per kWh
export const COMPRESSOR_MAX_POWER = 450; // kW
export const OPTIMAL_EFFICIENCY = 0.92;
export const HOURS_PER_YEAR = 8760;

export const INITIAL_RECOMMS: any[] = [
  {
    id: '1',
    title: 'Dynamic Load Rebalancing',
    description: 'Compressor #2 is operating at a low-efficiency surge point. Shift 40kg/s flow to Compressor #1.',
    impact: 'Reduce energy intensity by 12%',
    estimatedSavings: 340,
    urgency: 'high',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Intercooler Maintenance Flag',
    description: 'Staged temperature delta on Compressor #3 suggests slight fouling in the stage 2 intercooler.',
    impact: 'Avoid 3.5% efficiency degradation',
    estimatedSavings: 85,
    urgency: 'medium',
    timestamp: new Date().toISOString()
  }
];
