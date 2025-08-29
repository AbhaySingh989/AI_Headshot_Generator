
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ImageViewer } from './components/ImageViewer';
import { ActionButton } from './components/ActionButton';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CustomizationStudio } from './components/CustomizationStudio';
import { generateHeadshot } from './services/geminiService';
import { HEADSHOT_STYLES } from './constants';
import type { HeadshotStyle, CustomizationOptions } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageType, setOriginalImageType] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HEADSHOT_STYLES[0]);
  const [customBackgroundPrompt, setCustomBackgroundPrompt] = useState<string>('');
  const [customizations, setCustomizations] = useState<CustomizationOptions>({
    skinRetouching: 'Subtle Blemish Removal',
    hairstyle: 'Keep Original',
    customHairstyle: '',
    facialExpression: 'Confident',
    customFacialExpression: '',
    wardrobe: 'Business Suit (Dark)',
    customWardrobe: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const MAX_WIDTH = 1024;
    const MAX_HEIGHT = 1024;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        setError("Failed to read file.");
        return;
      }
      const img = new Image();
      img.src = event.target.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Failed to process image: could not get canvas context.');
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        const base64String = dataUrl.split(',')[1];

        setOriginalImage(base64String);
        setOriginalImageType(mimeType);
        setGeneratedImage(null);
        setError(null);
      };
      img.onerror = () => {
          setError("Failed to load the image for processing. It might be corrupted or in an unsupported format.");
      };
    };
    reader.onerror = () => {
      setError("Failed to read the uploaded file.");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !originalImageType) {
      setError("Please upload an image first.");
      return;
    }
    if (selectedStyle.id === 'custom' && !customBackgroundPrompt.trim()) {
      setError("Please describe your custom background scene.");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    
    const buildPrompt = (): string => {
        let promptParts: string[] = ["Transform this image into a professional headshot."];

        // Wardrobe
        if (customizations.wardrobe && customizations.wardrobe !== 'Keep Original') {
            const wardrobeText = customizations.wardrobe === 'Custom...' ? customizations.customWardrobe : customizations.wardrobe;
            if (wardrobeText.trim()) promptParts.push(`The subject should be wearing ${wardrobeText}.`);
        }

        // Hairstyle
        if (customizations.hairstyle && customizations.hairstyle !== 'Keep Original') {
            const hairstyleText = customizations.hairstyle === 'Custom...' ? customizations.customHairstyle : customizations.hairstyle;
            if (hairstyleText.trim()) promptParts.push(`Their hairstyle should be ${hairstyleText}.`);
        }

        // Facial Expression
        if (customizations.facialExpression && customizations.facialExpression !== 'Keep Original') {
            const expressionText = customizations.facialExpression === 'Custom...' ? customizations.customFacialExpression : customizations.facialExpression;
            if (expressionText.trim()) promptParts.push(`Their expression should be ${expressionText}.`);
        }
        
        // Skin Retouching
        if (customizations.skinRetouching && customizations.skinRetouching !== 'None') {
            promptParts.push(`Apply ${customizations.skinRetouching.toLowerCase()}.`);
        }

        // Background
        const backgroundPrompt = selectedStyle.id === 'custom'
            ? `The background should be: ${customBackgroundPrompt}`
            : selectedStyle.prompt;

        if (backgroundPrompt.trim()) {
            promptParts.push(backgroundPrompt);
        }

        return promptParts.join(' ');
    };

    const prompt = buildPrompt();

    try {
      const newImage = await generateHeadshot(originalImage, originalImageType, prompt);
      setGeneratedImage(newImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, originalImageType, selectedStyle, customizations, customBackgroundPrompt]);

  const handleDownloadClick = () => {
    if (!generatedImage) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;

    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `professional_headshot_${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">1. Upload Your Photo</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">2. Customize Your Headshot</h2>
              <h3 className="text-lg font-semibold mb-3 text-gray-300">Background Style</h3>
              <StyleSelector
                styles={HEADSHOT_STYLES}
                selectedStyle={selectedStyle}
                onStyleSelect={setSelectedStyle}
              />
               {selectedStyle.id === 'custom' && (
                <div className="mt-4">
                  <label htmlFor="custom-bg" className="block text-sm font-medium text-gray-400 mb-1">Custom Background Prompt</label>
                  <input
                    id="custom-bg"
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g., a vibrant co-working space"
                    value={customBackgroundPrompt}
                    onChange={(e) => setCustomBackgroundPrompt(e.target.value)}
                  />
                </div>
              )}
              <div className="border-t border-gray-700 my-6"></div>
              <h3 className="text-lg font-semibold mb-3 text-gray-300">Advanced Options</h3>
              <CustomizationStudio
                customizations={customizations}
                onCustomizationChange={setCustomizations}
              />
            </div>


             <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
               <h2 className="text-xl font-bold mb-4 text-cyan-400">3. Generate Headshot</h2>
                <ActionButton
                    onClick={handleGenerateClick}
                    disabled={!originalImage || isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Headshot'}
                </ActionButton>
             </div>
          </div>

          {/* Right Column: Image Display */}
          <div className="lg:w-2/3 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageViewer title="Original Image" imageData={originalImage ? `data:${originalImageType};base64,${originalImage}` : null} />
              
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg z-10">
                    <LoadingSpinner />
                  </div>
                )}
                <ImageViewer title="Generated Headshot" imageData={generatedImage ? `data:image/png;base64,${generatedImage}` : null} />
              </div>
            </div>
            
            {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">{error}</div>}

            {generatedImage && !isLoading && (
               <div className="mt-4 text-center">
                    <ActionButton onClick={handleDownloadClick}>
                        Download Headshot
                    </ActionButton>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
