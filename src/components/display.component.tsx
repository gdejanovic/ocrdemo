import { useState } from 'react';
import ImageUpload from './imageUpload.component';

export const DisplayComponent = () => {
    const [ ocrText, setOcrText] = useState('');
    const handleTextExtracted = (text: string) => {
        setOcrText(text);
    };

    return (
        <div>
            <h1>Image Upload with OCR</h1>
            <ImageUpload onTextExtracted={handleTextExtracted} />
            { ocrText && <textarea className='text'>{ocrText}</textarea>}
        </div>
    );
};