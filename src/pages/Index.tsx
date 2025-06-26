
import { useState } from "react";
import { Upload, Shield, Search, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "@/components/ImageUpload";
import AnalysisResults from "@/components/AnalysisResults";
import FeatureSection from "@/components/FeatureSection";

const Index = () => {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">ForensicAI</h1>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              CNN + ELA Detection
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Advanced Image
              <span className="text-blue-600 block">Manipulation Detection</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Powered by cutting-edge CNN and Error Level Analysis technology, 
              our AI system detects image forgeries with unprecedented accuracy, 
              revealing tampered areas and providing detailed authenticity scores.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center space-x-2 text-slate-700">
                <Search className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Deep Learning Analysis</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-700">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Real-time Processing</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-700">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Forensic-grade Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analysis Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!uploadedImage ? (
              <ImageUpload onImageUpload={handleImageUpload} />
            ) : (
              <AnalysisResults 
                imageUrl={uploadedImage} 
                isAnalyzing={!analysisComplete}
                onReset={() => {
                  setUploadedImage(null);
                  setAnalysisComplete(false);
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-semibold">ForensicAI</span>
            </div>
            <p className="text-slate-400">
              Professional image forensics powered by artificial intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
