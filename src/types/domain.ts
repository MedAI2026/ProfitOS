import { LucideIcon } from 'lucide-react';

export type RoleId = 'opsLead' | 'shiftLead' | 'trader' | 'plantLeader';

export interface RoleProfile {
  id: RoleId;
  name: string;
  tagline: string;
  priorities: string[];
  heroFocus: string;
}

export type Tone = 'sky' | 'mint' | 'ember' | 'blush';
export type Trend = 'up' | 'down' | 'stable';
export type AgentStatus = 'running' | 'watching' | 'warning';
export type UnitStatus = 'optimal' | 'watch' | 'constrained';

export interface NavItem {
  path: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}

export interface SummaryMetric {
  id: string;
  title: string;
  value: number;
  unit: string;
  delta: number;
  deltaLabel: string;
  tone: Tone;
  description: string;
  explanation: string;
}

export interface TimeSeriesPoint {
  label: string;
  revenue: number;
  cost: number;
  margin: number;
  spotPrice: number;
  carbon: number;
  risk: number;
  load: number;
}

export interface UnitSnapshot {
  id: string;
  name: string;
  type: string;
  capacityMw: number;
  currentLoadMw: number;
  optimalLoadRange: [number, number];
  heatLoadTph: number;
  marginalCost: number;
  marginalRevenue: number;
  netContribution: number;
  carbonIntensity: number;
  dispatchFlexibility: string;
  status: UnitStatus;
  constraint: string;
  opportunity: string;
}

export interface MarketWindow {
  id: string;
  period: string;
  spotPrice: number;
  bidRange: [number, number];
  expectedMargin: number;
  confidence: number;
  riskBoundary: string;
  recommendation: string;
}

export interface CostDriver {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number;
  reason: string;
  tone: Tone;
}

export interface DeepRegulationCase {
  id: string;
  label: string;
  compensation: number;
  energyPenalty: number;
  incrementalRevenue: number;
  equipmentStress: number;
  recommendedRange: string;
}

export interface CarbonSnapshot {
  carbonPrice: number;
  quotaUsedPct: number;
  dailyEmission: number;
  carbonRevenue: number;
  carbonIntensityAvg: number;
}

export interface ConstraintItem {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
  scope: string;
  impact: string;
}

export interface ArchitecturePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tone: Tone;
}

export interface AgentCard {
  id: string;
  name: string;
  domain: string;
  status: AgentStatus;
  confidence: number;
  triggerSource: string;
  currentFocus: string;
  latestOutput: string;
  recommendedAction: string;
  summary: string[];
}

export interface ScriptStep {
  id: string;
  actor: string;
  summary: string;
  effect: string;
}

export interface ScenarioAdjustment {
  revenueDelta: number;
  costDelta: number;
  carbonDelta: number;
  riskDelta: number;
}

export interface ScenarioScript {
  id: string;
  title: string;
  summary: string;
  trigger: string;
  beforeRevenue: number;
  afterRevenue: number;
  riskBoundary: string;
  outcome: string;
  actions: string[];
  steps: ScriptStep[];
  adjustment: ScenarioAdjustment;
}

export interface SandboxParams {
  loadDelta: number;
  coalPriceDelta: number;
  heatLoadDelta: number;
  spotPriceDelta: number;
  deepRegulationDelta: number;
  carbonPriceDelta: number;
}

export interface SandboxPreset {
  id: string;
  title: string;
  description: string;
  params: SandboxParams;
  focus: string;
}

export interface SandboxOutcome {
  totalRevenue: number;
  totalCost: number;
  carbonImpact: number;
  riskIndex: number;
  marginalSpread: number;
  recommendedStrategy: string;
  actionBullets: string[];
  contributionSeries: Array<{
    name: string;
    base: number;
    scenario: number;
  }>;
}

export interface DecisionItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  impact: string;
  detail: string;
}
