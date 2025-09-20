import React, { useRef, useState } from 'react';

interface PromptDisplayProps {
    prompt: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onReset: () => void;
    isLocked: boolean;
    onEnhance: () => void;
    isEnhancing: boolean;
}

const ResetIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
);

const EnhanceIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 2.05c-.34.18-.58.53-.62.94l-.25 2.51a4.995 4.995 0 00-3.26 3.26l-2.51.25a1.001 1.001 0 00-.94.62 1 1 0 00.18.99l2.4 2.4a5.02 5.02 0 000 7.08l-2.4 2.4a1 1 0 00-.18.99c.04.41.28.76.62.94l2.51.25a4.995 4.995 0 003.26 3.26l.25 2.51c.18.34.53.58.94.62a1 1 0 00.99-.18l2.4-2.4a5.02 5.02 0 007.08 0l2.4-2.4a1 1 0 00.18-.99c-.04-.41-.28-.76-.62-.94l-2.51-.25a4.995 4.995 0 00-3.26-3.26l-.25-2.51a1.001 1.001 0 00-.62-.94 1 1 0 00-.99.18l-2.4 2.4a5.02 5.02 0 00-7.08 0l-2.4-2.4a1 1 0 00-.99-.18zM12 9a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 10-2 0 1 1 0 002 0zm-4 1a1 1 0 100-2 1 1 0 000 2zm1 4a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
    </svg>
);


export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, onChange, onReset, isLocked, onEnhance, isEnhancing }) => {
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCopy = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            navigator.clipboard.writeText(prompt).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };
    
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">Customizable Prompt</h2>
                <div className="flex items-center gap-2">
                    {isLocked && (
                         <button
                            onClick={onReset}
                            className="bg-slate-700 text-slate-300 px-3 py-1 text-xs font-semibold rounded-md hover:bg-slate-600 transition-colors flex items-center gap-1.5"
                            title="Reset prompt to match styling controls"
                        >
                            <ResetIcon />
                            Reset
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        className="bg-slate-700 text-slate-300 px-3 py-1 text-xs font-semibold rounded-md hover:bg-slate-600 transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={onChange}
                    className="w-full h-32 p-3 bg-slate-900/70 border border-slate-700 rounded-lg text-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Customizable Prompt"
                    placeholder="Describe the image you want to create or let the controls generate a prompt for you..."
                />
                 <button
                    onClick={onEnhance}
                    disabled={isEnhancing || !prompt.trim()}
                    className="absolute bottom-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 text-xs font-semibold rounded-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Enhance prompt with AI"
                >
                    {isEnhancing ? (
                        <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enhancing...
                        </>
                    ) : (
                        <>
                            <EnhanceIcon />
                            Enhance
                        </>
                    )}
                </button>
            </div>
             {isLocked && !isEnhancing && (
                <p className="text-xs text-amber-400/80 mt-3">
                    You are in manual edit mode. The prompt will not update from the controls above.
                </p>
            )}
        </div>
    );
};