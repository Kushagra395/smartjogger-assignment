import { useEffect, useState } from 'react';
import React from 'react';

const getConnection = () => {
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
};

const NetworkStatus = () => {
  const [networkType, setNetworkType] = useState('unknown');
  const [effectiveType, setEffectiveType] = useState('unknown');

  useEffect(() => {
    const connection = getConnection();

    const updateNetworkInfo = () => {
      if (connection) {
        setNetworkType(connection.type);
        setEffectiveType(connection.effectiveType);
      }
    };

    updateNetworkInfo();

    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  const getColor = () => {
    if (effectiveType === '4g') return 'bg-green-600 text-white';
    if (effectiveType === '3g') return 'bg-yellow-500 text-black';
    return 'bg-red-600 text-white';
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-slate-800 p-5 rounded-2xl shadow-xl mb-6">
      <h2 className="text-xl font-semibold mb-3 text-indigo-300">🌐 Network Status</h2>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-800 rounded-xl p-4 border border-indigo-400">
          <p className="text-sm text-gray-400">Connection Type</p>
          <p className="text-xl font-bold text-white capitalize">{networkType}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-indigo-400">
          <p className="text-sm text-gray-400">Effective Network</p>
          <p className={`text-xl font-bold rounded-lg px-2 py-1 mt-1 inline-block ${getColor()}`}>
            {effectiveType}
          </p>
        </div>
      </div>

      {effectiveType !== '4g' && (
        <div className="mt-4 p-4 bg-red-800 text-white text-center rounded-xl border border-red-400 animate-pulse">
          ⚠️ Your network might be slow. Location updates may lag.
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
