
import React from 'react';
import type { ChangeEvent } from 'react';
import type { EditingOptions, Option } from '../types';
import { ALL_OPTIONS } from '../constants';

interface ControlPanelProps {
    options: EditingOptions;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    isEnvironmentEnabled: boolean;
    onEnvironmentToggle: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectGroupProps {
    label: string;
    name: keyof EditingOptions;
    value: string;
    options: Option[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectGroup: React.FC<SelectGroupProps> = ({ label, name, value, options, onChange }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-2 text-sm font-medium text-slate-300">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 transition"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ options, onChange, isEnvironmentEnabled, onEnvironmentToggle }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold mb-6 text-white">Styling Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectGroup label="Aspect Ratio" name="aspectRatio" value={options.aspectRatio} options={ALL_OPTIONS.aspectRatio} onChange={onChange} />
                <SelectGroup label="Lighting Style" name="lightingStyle" value={options.lightingStyle} options={ALL_OPTIONS.lightingStyle} onChange={onChange} />
                <SelectGroup label="Camera Perspective" name="cameraPerspective" value={options.cameraPerspective} options={ALL_OPTIONS.cameraPerspective} onChange={onChange} />
                <SelectGroup label="Image Quality" name="imageQuality" value={options.imageQuality} options={ALL_OPTIONS.imageQuality} onChange={onChange} />
                <SelectGroup label="Color & Vibes" name="colorVibes" value={options.colorVibes} options={ALL_OPTIONS.colorVibes} onChange={onChange} />
                <SelectGroup label="Camera & Lens" name="cameraLens" value={options.cameraLens} options={ALL_OPTIONS.cameraLens} onChange={onChange} />

                {/* Environment Control with Toggle */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="environment" className="text-sm font-medium text-slate-300">Environment / Atmosphere</label>
                        <label htmlFor="env-toggle" className="flex items-center cursor-pointer">
                            <span className="mr-2 text-xs text-slate-400">{isEnvironmentEnabled ? 'Enabled' : 'Disabled'}</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="env-toggle"
                                    className="sr-only"
                                    checked={isEnvironmentEnabled}
                                    onChange={onEnvironmentToggle}
                                />
                                <div className="block bg-slate-600 w-10 h-6 rounded-full"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isEnvironmentEnabled ? 'translate-x-full bg-indigo-400' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                    <select
                        id="environment"
                        name="environment"
                        value={options.environment}
                        onChange={onChange}
                        disabled={!isEnvironmentEnabled}
                        className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 transition disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                        aria-label="Environment / Atmosphere"
                    >
                        {ALL_OPTIONS.environment.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
