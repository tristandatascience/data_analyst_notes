
import React from 'react';
import { PrintButton } from './PrintButton';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm print:hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Guide de Révision <span className="text-sky-600">Data Analyst</span>
                    </h1>
                    <PrintButton />
                </div>
            </div>
        </header>
    );
}
