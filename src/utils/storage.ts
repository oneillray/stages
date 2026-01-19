import type { Metrics, HistoryEntry } from '../types';

const METRICS_KEY = 'cycling-zones-metrics';
const HISTORY_KEY = 'cycling-zones-history';

export const getStoredMetrics = (): Metrics => {
  const stored = localStorage.getItem(METRICS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { ftp: 0, maxHR: 0, weight: 0 };
};

export const saveMetrics = (metrics: Metrics): void => {
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
  
  // Dispatch custom event to notify components of metrics change
  window.dispatchEvent(new CustomEvent('metricsUpdated'));
  
  // Add to history
  const history = getHistory();
  const newEntry: HistoryEntry = {
    date: new Date().toISOString().split('T')[0],
    ...metrics,
  };
  
  // Only add if values actually changed
  const lastEntry = history[history.length - 1];
  if (!lastEntry || 
      lastEntry.ftp !== metrics.ftp || 
      lastEntry.maxHR !== metrics.maxHR || 
      lastEntry.weight !== metrics.weight) {
    history.push(newEntry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
};

export const getHistory = (): HistoryEntry[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};
