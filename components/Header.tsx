
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          AI Professional Headshot <span className="text-cyan-400">Generator</span>
        </h1>
        <p className="mt-2 text-gray-400">Transform your photos into polished headshots instantly.</p>
      </div>
    </header>
  );
};
