import React, { useState } from 'react';
import type { CustomizationOptions } from '../types';
import { SKIN_RETOUCHING_OPTIONS, HAIRSTYLE_OPTIONS, FACIAL_EXPRESSION_OPTIONS, WARDROBE_OPTIONS } from '../constants';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-3 text-left font-semibold text-gray-200 hover:text-white transition-colors"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="py-4 space-y-4">{children}</div>
      </div>
    </div>
  );
};


interface CustomizationStudioProps {
  customizations: CustomizationOptions;
  onCustomizationChange: (newCustomizations: CustomizationOptions) => void;
}

const renderSelect = (id: string, label: string, name: string, value: string, options: string[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

const renderCustomInput = (id: string, name: string, value: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => (
  <div className="mt-2">
     <label htmlFor={id} className="sr-only">{placeholder}</label>
    <input
      id={id}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>
);

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({ customizations, onCustomizationChange }) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('appearance');

    const handleToggle = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      onCustomizationChange({
        ...customizations,
        [e.target.name]: e.target.value,
      });
    };

    return (
        <div className="space-y-2">
            <AccordionItem title="Appearance & Touch-ups" isOpen={openAccordion === 'appearance'} onToggle={() => handleToggle('appearance')}>
                {renderSelect('skin-retouching', 'Skin Retouching', 'skinRetouching', customizations.skinRetouching, SKIN_RETOUCHING_OPTIONS, handleChange)}
                
                {renderSelect('hairstyle', 'Hairstyle', 'hairstyle', customizations.hairstyle, HAIRSTYLE_OPTIONS, handleChange)}
                {customizations.hairstyle === 'Custom...' && renderCustomInput('custom-hairstyle', 'customHairstyle', customizations.customHairstyle, 'Describe custom hairstyle...', handleChange)}
                
                {renderSelect('facial-expression', 'Facial Expression', 'facialExpression', customizations.facialExpression, FACIAL_EXPRESSION_OPTIONS, handleChange)}
                {customizations.facialExpression === 'Custom...' && renderCustomInput('custom-facial-expression', 'customFacialExpression', customizations.customFacialExpression, 'Describe custom expression...', handleChange)}
            </AccordionItem>

            <AccordionItem title="Wardrobe Selection" isOpen={openAccordion === 'wardrobe'} onToggle={() => handleToggle('wardrobe')}>
                {renderSelect('wardrobe', 'Wardrobe', 'wardrobe', customizations.wardrobe, WARDROBE_OPTIONS, handleChange)}
                {customizations.wardrobe === 'Custom...' && renderCustomInput('custom-wardrobe', 'customWardrobe', customizations.customWardrobe, 'Describe custom wardrobe...', handleChange)}
            </AccordionItem>
        </div>
    );
};
