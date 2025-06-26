
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-2 border-dashed transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-12">
        <div
          className={`text-center transition-all duration-200 ${
            isDragging ? 'scale-105 opacity-80' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Upload className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-4">
            Upload Image for Analysis
          </h3>
          
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Drag and drop your image here, or click to browse. Our AI will analyze it for potential manipulation using advanced CNN and ELA techniques.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={openFileDialog}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              Choose Image
            </Button>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                JPEG, PNG, GIF
              </span>
              <span>•</span>
              <span>Max 10MB</span>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
