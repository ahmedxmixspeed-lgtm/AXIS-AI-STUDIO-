
import type { AllOptions } from './types';

export const ALL_OPTIONS: AllOptions = {
    aspectRatio: [
        { label: 'Square (1:1)', value: '1:1' },
        { label: 'Portrait (3:4)', value: '3:4' },
        { label: 'Landscape (4:3)', value: '4:3' },
        { label: 'Widescreen (16:9)', value: '16:9' },
        { label: 'Tall (9:16)', value: '9:16' },
    ],
    lightingStyle: [
        { label: 'Soft Studio Light', value: 'soft, even studio lighting' },
        { label: 'Dramatic Hard Light', value: 'dramatic, high-contrast hard lighting' },
        { label: 'Natural Sunlight', value: 'bright, natural sunlight' },
        { label: 'Backlit Glow', value: 'a beautiful backlit glow' },
        { label: 'Moody Cinematic', value: 'moody, cinematic lighting' },
    ],
    cameraPerspective: [
        { label: 'Eye-level Shot', value: 'straight-on eye-level shot' },
        { label: 'High-angle Shot', value: 'high-angle shot looking down' },
        { label: 'Low-angle Shot', value: 'low-angle shot looking up' },
        { label: '45-degree Angle', value: 'dynamic 45-degree angle shot' },
        { label: 'Top-down (Flat Lay)', value: 'top-down flat lay perspective' },
    ],
    imageQuality: [
        { label: 'Hyper-realistic', value: 'hyper-realistic and incredibly detailed' },
        { label: 'Cinematic', value: 'a cinematic, film-like quality' },
        { label: 'Sharp & Crisp', value: 'an ultra-sharp, crisp, and clean look' },
        { label: 'Dreamy & Soft', value: 'a dreamy, soft-focus aesthetic' },
    ],
    colorVibes: [
        { label: 'Vibrant & Punchy', value: 'vibrant, punchy, and saturated' },
        { label: 'Muted & Moody', value: 'muted, moody, and desaturated' },
        { label: 'Warm & Nostalgic', value: 'warm, nostalgic, and golden-hour' },
        { label: 'Cool & Minimalist', value: 'cool, minimalist, and modern' },
        { label: 'Monochromatic', value: 'a sleek monochromatic color scheme' },
    ],
    cameraLens: [
        { label: 'DSLR, 50mm Prime Lens', value: 'a professional DSLR with a 50mm f/1.8 prime lens' },
        { label: 'Shot on iPhone 15 Pro', value: 'a modern smartphone like the iPhone 15 Pro' },
        { label: 'Vintage Film Camera', value: 'a vintage 35mm film camera with a grainy texture' },
        { label: 'Wide-Angle Lens', value: 'a wide-angle lens for an expansive view' },
        { label: 'Macro Lens', value: 'a macro lens for extreme close-up details' },
    ],
    environment: [
        { label: 'On a Marble Surface', value: 'placed on a clean marble surface' },
        { label: 'Floating in Mid-air', value: 'creatively floating in mid-air against a solid color background' },
        { label: 'Minimalist Studio', value: 'in a clean, minimalist studio setting' },
        { label: 'Against a Tropical Background', value: 'against a lush, tropical background with plants' },
        { label: 'On a Wooden Table', value: 'on a rustic wooden table' },
    ],
};
