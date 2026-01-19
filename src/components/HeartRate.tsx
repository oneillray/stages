import { useState, useEffect } from 'react';
import { getStoredMetrics } from '../utils/storage';
import { HEART_RATE_ZONES, calculateHeartRateZone } from '../utils/calculations';
import type { Metrics } from '../types';

const ZONE_COLORS = [
  'bg-zone-1',
  'bg-zone-2',
  'bg-zone-3',
  'bg-zone-4',
  'bg-zone-5',
];

export default function HeartRate() {
  const [metrics, setMetrics] = useState<Metrics>(getStoredMetrics());
  
  useEffect(() => {
    // Update metrics when component mounts or when storage changes
    const updateMetrics = () => {
      setMetrics(getStoredMetrics());
    };
    
    updateMetrics();
    
    // Listen for custom metrics update event
    window.addEventListener('metricsUpdated', updateMetrics);
    // Also listen for storage changes (cross-tab updates)
    window.addEventListener('storage', updateMetrics);
    
    return () => {
      window.removeEventListener('metricsUpdated', updateMetrics);
      window.removeEventListener('storage', updateMetrics);
    };
  }, []);
  
  const { maxHR } = metrics;

  return (
    <div className="h-full overflow-y-auto pb-20 px-4">
      <div className="max-w-md mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Heart Rate Zones</h1>
        
        {maxHR === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Please set your Max HR in Settings
          </div>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="flex gap-2 pb-2 border-b-2 border-gray-200 font-semibold text-sm text-gray-600">
              <div className="w-24 flex-shrink-0">Zone</div>
              <div className="flex-1">Range (%)</div>
              <div className="flex-1">Range (BPM)</div>
              <div className="flex-1">Avg (BPM)</div>
              <div className="flex-1">Avg (%)</div>
            </div>

            {/* Rows */}
            {HEART_RATE_ZONES.map((zone, index) => {
              const calc = calculateHeartRateZone(zone, maxHR);
              return (
                <div
                  key={zone.name}
                  className={`flex gap-2 items-center p-3 rounded-lg ${ZONE_COLORS[index]} text-white`}
                >
                  <div className="w-24 flex-shrink-0 font-semibold text-sm">
                    {zone.name}
                  </div>
                  <div className="flex-1 text-sm">
                    {zone.minPercent}-{zone.maxPercent}%
                  </div>
                  <div className="flex-1 text-sm font-medium">
                    {calc.minBPM}-{calc.maxBPM}
                  </div>
                  <div className="flex-1 text-sm font-medium">
                    {calc.avgBPM}
                  </div>
                  <div className="flex-1 text-sm font-medium">
                    {calc.avgPercent}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
