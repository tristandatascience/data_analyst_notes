
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-12 page-break-before">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 border-b-4 border-sky-500 pb-2 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
};

// Custom style for printing
const style = document.createElement('style');
style.innerHTML = `
@media print {
  .page-break-before {
    page-break-before: always;
  }
  @page {
    margin: 1.5cm;
  }
}
`;
document.head.appendChild(style);
