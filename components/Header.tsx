import React from 'react';

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.653-2.653L11.25 18l1.938-.648a3.375 3.375 0 002.653-2.653L16.25 13l.648 1.938a3.375 3.375 0 002.653 2.653L21.5 18l-1.938.648a3.375 3.375 0 00-2.653 2.653z" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center gap-3">
                <SparkleIcon className="w-10 h-10" />
                Axis AI Studio
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                Transform your product photos into professional-grade commercial shots. Select your style, and let AI do the rest.
            </p>
        </header>
    );
};