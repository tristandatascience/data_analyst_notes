
import React from 'react';
import { PrintIcon } from './Icons';

export const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="print:hidden flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors duration-300 shadow-lg"
    >
      <PrintIcon />
      Imprimer le guide
    </button>
  );
};
