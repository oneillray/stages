import { useState, useEffect } from 'react';
import { getStoredMetrics } from '../utils/storage';
import { HEART_RATE_ZONES, calculateHeartRateZone } from '../utils/calculations';
import type { Metrics } from '../types';

const ZONE_COLORS = [
  'bg-zone-1', // Z1: #C7C7CC from Figma
  'bg-zone-2', // Z2: #00C0E8 from Figma
  'bg-zone-3', // Z3: #34C759 from Figma
  'bg-zone-4', // Z4: #FFCC00 from Figma
  'bg-zone-5', // Z5: #FF8D28 from Figma
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
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex gap-2 px-2 py-3 bg-gray-100 font-semibold text-xs text-gray-700">
              <div className="w-24 flex-shrink-0">Zone</div>
              <div className="flex-1">Range (%)</div>
              <div className="flex-1">Range (BPM)</div>
              <div className="flex-1">Avg (BPM)</div>
              <div className="flex-1">Avg (%)</div>
            </div>

            {/* Rows */}
            <div className="space-y-2 p-2">
              {HEART_RATE_ZONES.map((zone, index) => {
                const calc = calculateHeartRateZone(zone, maxHR);
                // Z1 (light gray) uses dark text, others use white text
                const textColor = index === 0 ? 'text-gray-800' : 'text-white';
                
                return (
                  <div
                    key={zone.name}
                    className={`flex gap-2 items-center px-2 h-14 rounded-lg ${ZONE_COLORS[index]} ${textColor}`}
                  >
                    <div className="w-24 flex-shrink-0 font-semibold text-xs">
                      {zone.name}
                    </div>
                    <div className={`flex-1 text-xs ${index === 0 ? '' : 'font-medium'}`}>
                      {zone.minPercent}-{zone.maxPercent}%
                    </div>
                    <div className={`flex-1 text-xs ${index === 0 ? '' : 'font-medium'}`}>
                      {calc.minBPM}-{calc.maxBPM}
                    </div>
                    <div className={`flex-1 text-xs ${index === 0 ? '' : 'font-medium'}`}>
                      {calc.avgBPM}
                    </div>
                    <div className={`flex-1 text-xs ${index === 0 ? '' : 'font-medium'}`}>
                      {calc.avgPercent}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
