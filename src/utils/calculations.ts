import type { PowerZone, HeartRateZone } from '../types';

export const POWER_ZONES: PowerZone[] = [
  { name: 'Z1 Recovery', minPercent: 0, maxPercent: 54 }, // < 55%
  { name: 'Z2 Endurance', minPercent: 55, maxPercent: 75 },
  { name: 'Z3 Tempo', minPercent: 76, maxPercent: 90 },
  { name: 'Z4 Threshold', minPercent: 91, maxPercent: 105 },
  { name: 'Z5 VO2 Max', minPercent: 106, maxPercent: 120 },
  { name: 'Z6 Anaerobic', minPercent: 121, maxPercent: 150 },
  { name: 'Z7 Neuromuscular', minPercent: 151, maxPercent: null },
];

export const HEART_RATE_ZONES: HeartRateZone[] = [
  { name: 'Z1 Active', minPercent: 50, maxPercent: 60 },
  { name: 'Z2 Aerobic', minPercent: 60, maxPercent: 70 },
  { name: 'Z3 Tempo', minPercent: 70, maxPercent: 80 },
  { name: 'Z4 Threshold', minPercent: 80, maxPercent: 90 },
  { name: 'Z5 Anaerobic', minPercent: 90, maxPercent: 100 },
];

export const calculatePowerZone = (zone: PowerZone, ftp: number, weight: number) => {
  const minWatts = (ftp * zone.minPercent) / 100;
  const maxWatts = zone.maxPercent ? (ftp * zone.maxPercent) / 100 : null;
  const avgWatts = maxWatts ? (minWatts + maxWatts) / 2 : minWatts;
  
  return {
    minWatts: Math.round(minWatts),
    maxWatts: maxWatts ? Math.round(maxWatts) : null,
    minWkg: weight > 0 ? Math.round((minWatts / weight) * 10) / 10 : 0,
    maxWkg: maxWatts && weight > 0 ? Math.round((maxWatts / weight) * 10) / 10 : null,
    avgWatts: Math.round(avgWatts),
    avgWkg: weight > 0 ? Math.round((avgWatts / weight) * 10) / 10 : 0,
  };
};

export const calculateHeartRateZone = (zone: HeartRateZone, maxHR: number) => {
  const minBPM = Math.round((maxHR * zone.minPercent) / 100);
  const maxBPM = Math.round((maxHR * zone.maxPercent) / 100);
  const avgBPM = Math.round((minBPM + maxBPM) / 2);
  const avgPercent = (zone.minPercent + zone.maxPercent) / 2;
  
  return {
    minBPM,
    maxBPM,
    avgBPM,
    avgPercent: Math.round(avgPercent),
  };
};
