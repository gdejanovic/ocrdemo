import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

interface ImageUploadProps {
    onTextExtracted: (text: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onTextExtracted }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [ocrInProgress, setOcrInProgress] = useState(false);

    useEffect(() => {
        Tesseract.createWorker()
            .then((worker) => {
                setTesseractWorker(worker);
            })
            .catch((error) => {
                console.error('Failed to initialize Tesseract worker:', error);
            });

        return () => {
            if (tesseractWorker) {
                tesseractWorker.terminate();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [tesseractWorker, setTesseractWorker] = useState<Tesseract.Worker | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            setSelectedImage(file);
            performOCR(file);
        }
    };

    const performOCR = async (imageFile: File) => {
        setOcrInProgress(true);

        try {
            if (tesseractWorker) {
                await tesseractWorker.load();
                await tesseractWorker.loadLanguage('eng');
                await tesseractWorker.initialize('eng');
                await tesseractWorker.setParameters({
                    tessedit_ocr_engine_mode: 1,
                });

                const { data } = await tesseractWorker.recognize(imageFile);
                const extractedText = data.text;
                onTextExtracted(extractedText);
            }
        } catch (error) {
            console.error('OCR Error:', error);
        } finally {
            setOcrInProgress(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {ocrInProgress ? <p>Performing OCR...</p> : null}
            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />}
        </div>
    );
};

export default ImageUpload;
