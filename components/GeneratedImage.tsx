import React, { useState } from 'react';

interface GeneratedImageProps {
    image: string | null;
    isLoading: boolean;
    error: string | null;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center">
         <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold text-slate-300">Generating your masterpiece...</p>
        <p className="text-sm text-slate-400 mt-1">This can take a moment. The AI is hard at work!</p>
    </div>
);


export const GeneratedImage: React.FC<GeneratedImageProps> = ({ image, isLoading, error }) => {
    const [exportFormat, setExportFormat] = useState<'png' | 'jpeg'>('png');
    const [qualityLabel, setQualityLabel] = useState<'high' | 'medium' | 'low'>('high');

    const qualityMap = {
        high: 0.95,
        medium: 0.8,
        low: 0.6,
    };

    const handleDownload = () => {
        if (!image) return;

        const downloadImage = (url: string, filename: string) => {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const sanitizedFilename = `ai-generated-photo-${Date.now()}`;

        if (exportFormat === 'png') {
            downloadImage(image, `${sanitizedFilename}.png`);
        } else {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const jpegUrl = canvas.toDataURL('image/jpeg', qualityMap[qualityLabel]);
                    downloadImage(jpegUrl, `${sanitizedFilename}.jpg`);
                } else {
                    console.error("Could not get canvas context; falling back to original image.");
                    downloadImage(image, `${sanitizedFilename}.png`);
                }
            };
            img.onerror = () => {
                console.error("Failed to load image for canvas conversion; falling back to original image.");
                downloadImage(image, `${sanitizedFilename}.png`);
            }
            img.src = image;
        }
    };
    
    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner />;
        }
        if (error) {
            return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Generation Failed</h3>
                <p className="text-sm">{error}</p>
            </div>;
        }
        if (image) {
            return (
                <div className="flex flex-col h-full w-full items-center justify-between">
                    <div className="flex-grow w-full mb-4 overflow-hidden flex items-center justify-center">
                        <img src={image} alt="Generated product" className="rounded-lg max-w-full max-h-full object-contain" />
                    </div>
                    
                    {/* Export Controls */}
                    <div className="w-full bg-slate-700/50 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex-1 w-full sm:w-auto">
                            <label htmlFor="format" className="block text-xs font-medium text-slate-300 mb-1">Format</label>
                            <select
                                id="format"
                                value={exportFormat}
                                onChange={(e) => setExportFormat(e.target.value as 'png' | 'jpeg')}
                                className="bg-slate-800 border border-slate-600 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
                            >
                                <option value="png">PNG</option>
                                <option value="jpeg">JPG</option>
                            </select>
                        </div>
                        <div className="flex-1 w-full sm:w-auto">
                             <label htmlFor="quality" className="block text-xs font-medium text-slate-300 mb-1">Quality</label>
                            <select
                                id="quality"
                                value={qualityLabel}
                                onChange={(e) => setQualityLabel(e.target.value as 'high' | 'medium' | 'low')}
                                disabled={exportFormat === 'png'}
                                className="bg-slate-800 border border-slate-600 text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-slate-500"
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-auto sm:self-end">
                             <label className="block text-xs font-medium text-transparent mb-1 sm:block hidden">_</label> {/* Spacer for alignment */}
                             <button
                                onClick={handleDownload}
                                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-200 flex items-center justify-center"
                            >
                                <DownloadIcon />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="text-center text-slate-400">
                <h3 className="text-lg font-semibold">Your generated image will appear here</h3>
                <p className="mt-1 text-sm">Configure your settings and click "Generate Image" to start.</p>
            </div>
        );
    };

    return (
        <div className="bg-slate-800/50 w-full h-full min-h-[400px] lg:min-h-full rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center p-4">
            {renderContent()}
        </div>
    );
};