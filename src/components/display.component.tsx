import ImageUpload from './imageUpload.component';

export const DisplayComponent = () => {
    const handleTextExtracted = (text: string) => {
        console.log('Extracted Text:', text);
    };

    return (
        <div>
            <h1>Image Upload with OCR</h1>
            <ImageUpload onTextExtracted={handleTextExtracted} />
        </div>
    );
};