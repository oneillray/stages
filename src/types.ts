export interface Metrics {
  ftp: number;
  maxHR: number;
  weight: number;
}

export interface HistoryEntry {
  date: string;
  ftp: number;
  maxHR: number;
  weight: number;
}

export type Tab = 'settings' | 'heart' | 'power';

export interface PowerZone {
  name: string;
  minPercent: number;
  maxPercent: number | null;
}

export interface HeartRateZone {
  name: string;
  minPercent: number;
  maxPercent: number;
}
