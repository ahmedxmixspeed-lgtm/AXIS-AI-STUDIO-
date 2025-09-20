
import React, { useRef } from 'react';
import type { ChangeEvent } from 'react';

interface ImageUploaderProps {
    id: string;
    title: string;
    description: string;
    onFileChange: (file: File | null) => void;
    previewUrl?: string;
}

const UploadIcon: React.FC = () => (
    <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
    </svg>
);

const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, description, onFileChange, previewUrl }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        onFileChange(file || null);
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFileChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleContainerClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-slate-400 mb-4">{description}</p>
            <div
                onClick={handleContainerClick}
                className="flex-grow flex items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700/50 transition-colors"
            >
                {previewUrl ? (
                    <div className="relative w-full h-full group">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
                         <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                            aria-label="Remove image"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon />
                        <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500">PNG, JPG, WEBP</p>
                    </div>
                )}
                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileSelect}
                />
            </div>
        </div>
    );
};
