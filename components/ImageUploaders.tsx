
import React from 'react';
import { ImageUploader } from './ImageUploader';

interface ImageUploadersProps {
    onProductImageChange: (file: File | null) => void;
    onStyleImageChange: (file: File | null) => void;
    productImagePreview: string | undefined;
    styleImagePreview: string | undefined;
}

export const ImageUploaders: React.FC<ImageUploadersProps> = ({
    onProductImageChange,
    onStyleImageChange,
    productImagePreview,
    styleImagePreview,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
                id="product-image"
                title="1. Upload Product Photo"
                description="This is the main image you want to transform."
                onFileChange={onProductImageChange}
                previewUrl={productImagePreview}
            />
            <ImageUploader
                id="style-image"
                title="2. Upload Style Reference (Optional)"
                description="Provide an image for style inspiration."
                onFileChange={onStyleImageChange}
                previewUrl={styleImagePreview}
            />
        </div>
    );
};
