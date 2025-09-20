import React, { useState, useEffect, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { GeneratedImage } from './components/GeneratedImage';
import { PromptDisplay } from './components/PromptDisplay';
import { generateStyledImage, enhancePrompt } from './services/geminiService';
import type { EditingOptions, ImageFile } from './types';
import { ALL_OPTIONS } from './constants';
import { Header } from './components/Header';
import { ImageUploaders } from './components/ImageUploaders';
import { fileToGenerativePart } from './utils/fileUtils';

const App: React.FC = () => {
    const [productImage, setProductImage] = useState<ImageFile | null>(null);
    const [styleImage, setStyleImage] = useState<ImageFile | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isPromptLocked, setIsPromptLocked] = useState(false);
    const [isEnvironmentEnabled, setIsEnvironmentEnabled] = useState(true);
    const [editingOptions, setEditingOptions] = useState<EditingOptions>({
        aspectRatio: ALL_OPTIONS.aspectRatio[0].value,
        lightingStyle: ALL_OPTIONS.lightingStyle[0].value,
        cameraPerspective: ALL_OPTIONS.cameraPerspective[0].value,
        imageQuality: ALL_OPTIONS.imageQuality[0].value,
        colorVibes: ALL_OPTIONS.colorVibes[0].value,
        cameraLens: ALL_OPTIONS.cameraLens[0].value,
        environment: ALL_OPTIONS.environment[0].value,
    });

    const handleOptionsChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditingOptions(prev => ({ ...prev, [name]: value }));
    };

    const handleEnvironmentToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setIsEnvironmentEnabled(e.target.checked);
    };

    const handleProductImageChange = (file: File | null) => {
        if (file) {
            setProductImage({ file, preview: URL.createObjectURL(file) });
        } else {
            setProductImage(null);
        }
    };
    
    const handleStyleImageChange = (file: File | null) => {
        if (file) {
            setStyleImage({ file, preview: URL.createObjectURL(file) });
        } else {
            setStyleImage(null);
        }
    };
    
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGeneratedPrompt(e.target.value);
        if (!isPromptLocked) {
            setIsPromptLocked(true);
        }
    };

    const handleResetPrompt = () => {
        setIsPromptLocked(false);
    };

    useEffect(() => {
        if (isPromptLocked) return;

        const { aspectRatio, lightingStyle, cameraPerspective, imageQuality, colorVibes, cameraLens, environment } = editingOptions;

        const styleReferenceText = styleImage ? "The desired style is heavily inspired by the reference photo provided. " : "";
        const environmentText = isEnvironmentEnabled ? `Place the product in an environment that feels like it is ${environment}. ` : '';

        const prompt = `Create a professional, high-end commercial product photograph of the subject in the primary uploaded image. ${styleReferenceText}The final image must have a ${aspectRatio} aspect ratio. The lighting should be ${lightingStyle}. Position the camera for a ${cameraPerspective}. The overall image quality should be ${imageQuality}, featuring ${colorVibes} colors. The shot should appear as if taken with a ${cameraLens}. ${environmentText}The final image should be clean, professional, and eye-catching.`;
        
        setGeneratedPrompt(prompt.replace(/\s\s+/g, ' ').trim());
    }, [editingOptions, styleImage, isEnvironmentEnabled, isPromptLocked]);

    const handleEnhancePrompt = useCallback(async () => {
        if (!generatedPrompt) return;

        setIsEnhancingPrompt(true);
        setError(null);
        try {
            const enhanced = await enhancePrompt(generatedPrompt);
            setGeneratedPrompt(enhanced);
            setIsPromptLocked(true);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "Failed to enhance prompt.");
        } finally {
            setIsEnhancingPrompt(false);
        }
    }, [generatedPrompt]);
    
    const handleGenerate = useCallback(async () => {
        if (!productImage) {
            setError("Please upload a product image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const productPart = await fileToGenerativePart(productImage.file);
            const stylePart = styleImage ? await fileToGenerativePart(styleImage.file) : null;
            
            const result = await generateStyledImage(productPart, stylePart, generatedPrompt);

            if (result.image) {
                setGeneratedImage(`data:image/png;base64,${result.image}`);
            } else {
                setError(result.text || "Failed to generate image. The model did not return an image.");
            }

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [productImage, styleImage, generatedPrompt]);
    
    return (
        <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8">
                        <ImageUploaders 
                            onProductImageChange={handleProductImageChange}
                            onStyleImageChange={handleStyleImageChange}
                            productImagePreview={productImage?.preview}
                            styleImagePreview={styleImage?.preview}
                        />
                        <ControlPanel 
                            options={editingOptions} 
                            onChange={handleOptionsChange}
                            isEnvironmentEnabled={isEnvironmentEnabled}
                            onEnvironmentToggle={handleEnvironmentToggle}
                        />
                        <PromptDisplay 
                            prompt={generatedPrompt} 
                            onChange={handlePromptChange}
                            onReset={handleResetPrompt}
                            isLocked={isPromptLocked}
                            onEnhance={handleEnhancePrompt}
                            isEnhancing={isEnhancingPrompt}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={!productImage || isLoading || isEnhancingPrompt}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2 text-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : 'Generate Image'}
                        </button>
                    </div>

                    {/* Right Column: Output */}
                    <div className="h-full">
                        <GeneratedImage image={generatedImage} isLoading={isLoading} error={error} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;