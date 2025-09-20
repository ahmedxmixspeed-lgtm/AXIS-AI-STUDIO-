
export interface EditingOptions {
    aspectRatio: string;
    lightingStyle: string;
    cameraPerspective: string;
    imageQuality: string;
    colorVibes: string;
    cameraLens: string;
    environment: string;
}

export interface ImageFile {
    file: File;
    preview: string;
}

export interface Option {
    label: string;
    value: string;
}

export interface AllOptions {
    aspectRatio: Option[];
    lightingStyle: Option[];
    cameraPerspective: Option[];
    imageQuality: Option[];
    colorVibes: Option[];
    cameraLens: Option[];
    environment: Option[];
}
