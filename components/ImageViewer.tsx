
import React from 'react';

interface ImageViewerProps {
  title: string;
  imageData: string | null;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ title, imageData }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col h-full">
      <h3 className="text-lg font-bold mb-4 text-center text-cyan-400">{title}</h3>
      <div className="flex-grow flex items-center justify-center bg-gray-900 rounded-md min-h-[250px] aspect-square w-full">
        {imageData ? (
          <img src={imageData} alt={title} className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="mt-2 text-sm">Image will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
};
