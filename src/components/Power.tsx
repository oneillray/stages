import { useState, useEffect } from 'react';
import { getStoredMetrics } from '../utils/storage';
import { POWER_ZONES, calculatePowerZone } from '../utils/calculations';
import type { Metrics } from '../types';

const ZONE_COLORS = [
  'bg-zone-1',
  'bg-zone-2',
  'bg-zone-3',
  'bg-zone-4',
  'bg-zone-5',
  'bg-zone-6',
  'bg-zone-6', // Z7 uses same color as Z6
];

export default function Power() {
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
  
  const { ftp, weight } = metrics;

  return (
    <div className="h-full overflow-y-auto pb-20 px-4">
      <div className="max-w-md mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Power Zones</h1>
        
        {ftp === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Please set your FTP in Settings
          </div>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="flex gap-2 pb-2 border-b-2 border-gray-200 font-semibold text-xs text-gray-600">
              <div className="w-28 flex-shrink-0">Zone</div>
              <div className="flex-1">Range (%)</div>
              <div className="flex-1">Range (W)</div>
              <div className="flex-1">Range (W/kg)</div>
              <div className="flex-1">Avg (W)</div>
              <div className="flex-1">Avg (W/kg)</div>
            </div>

            {/* Rows */}
            {POWER_ZONES.map((zone, index) => {
              const calc = calculatePowerZone(zone, ftp, weight);
              let rangePercent: string;
              if (index === 0) {
                // Z1 shows as < 55%
                rangePercent = '<55%';
              } else if (zone.maxPercent) {
                rangePercent = `${zone.minPercent}-${zone.maxPercent}%`;
              } else {
                rangePercent = `>${zone.minPercent}%`;
              }
              
              return (
                <div
                  key={zone.name}
                  className={`flex gap-2 items-center p-3 rounded-lg ${ZONE_COLORS[index]} text-white`}
                >
                  <div className="w-28 flex-shrink-0 font-semibold text-xs">
                    {zone.name}
                  </div>
                  <div className="flex-1 text-xs">
                    {rangePercent}
                  </div>
                  <div className="flex-1 text-xs font-medium">
                    {calc.maxWatts !== null 
                      ? `${calc.minWatts}-${calc.maxWatts}`
                      : `>${calc.minWatts}`
                    }
                  </div>
                  <div className="flex-1 text-xs font-medium">
                    {calc.maxWkg !== null 
                      ? `${calc.minWkg}-${calc.maxWkg}`
                      : `>${calc.minWkg}`
                    }
                  </div>
                  <div className="flex-1 text-xs font-medium">
                    {calc.avgWatts}
                  </div>
                  <div className="flex-1 text-xs font-medium">
                    {calc.avgWkg}
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
