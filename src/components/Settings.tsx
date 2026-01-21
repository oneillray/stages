import { useState, useEffect } from 'react';
import { getStoredMetrics, saveMetrics, getHistory } from '../utils/storage';
import type { Metrics, HistoryEntry } from '../types';
import logo from '../assets/logo.svg';

export default function Settings() {
  const [metrics, setMetrics] = useState<Metrics>(getStoredMetrics());
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleChange = (field: keyof Metrics, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newMetrics = { ...metrics, [field]: numValue };
    setMetrics(newMetrics);
    saveMetrics(newMetrics);
    setHistory(getHistory());
  };

  return (
    <div className="h-full overflow-y-auto pb-20 px-4">
      <div className="max-w-md mx-auto py-6">
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="STAGES Logo" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="ftp" className="block text-sm font-medium text-gray-700 mb-2">
              FTP (Watts)
            </label>
            <input
              id="ftp"
              type="number"
              value={metrics.ftp || ''}
              onChange={(e) => handleChange('ftp', e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter FTP"
            />
          </div>

          <div>
            <label htmlFor="maxHR" className="block text-sm font-medium text-gray-700 mb-2">
              Max HR (BPM)
            </label>
            <input
              id="maxHR"
              type="number"
              value={metrics.maxHR || ''}
              onChange={(e) => handleChange('maxHR', e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Max HR"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              value={metrics.weight || ''}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Weight"
            />
          </div>

          <div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              {showHistory ? 'Hide' : 'Show'} History
            </button>
          </div>

          {showHistory && history.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-3">History</h2>
              <div className="space-y-2">
                {[...history].reverse().map((entry, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="text-sm font-medium text-gray-900">{entry.date}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      FTP: {entry.ftp}W • Max HR: {entry.maxHR} BPM • Weight: {entry.weight} kg
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showHistory && history.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No history yet. Changes will be logged here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
