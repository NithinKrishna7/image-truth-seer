
import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, RotateCcw, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisResultsProps {
  imageUrl: string;
  isAnalyzing: boolean;
  onReset: () => void;
}

const AnalysisResults = ({ imageUrl, isAnalyzing, onReset }: AnalysisResultsProps) => {
  const [progress, setProgress] = useState(0);
  
  // Mock analysis results - replace with actual ML model results
  const mockResults = {
    authenticity: 87.3,
    isForged: false,
    confidence: 94.2,
    elaScore: 0.23,
    analysisTime: 2.4,
    tamperedRegions: []
  };

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  if (isAnalyzing) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-slate-800">Analyzing Image</CardTitle>
          <p className="text-slate-600">Running CNN and ELA analysis...</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Uploaded image" 
                className="max-w-md max-h-64 object-contain rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-blue-600/10 rounded-lg animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Analysis Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
            <div>✓ Image preprocessing</div>
            <div>✓ ELA computation</div>
            <div className={progress > 60 ? "text-blue-600" : ""}>
              {progress > 60 ? "✓" : "⏳"} CNN inference
            </div>
            <div className={progress > 80 ? "text-blue-600" : ""}>
              {progress > 80 ? "✓" : "⏳"} Result generation
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-2xl text-slate-800">Analysis Complete</CardTitle>
                <p className="text-slate-600">Image appears to be authentic</p>
              </div>
            </div>
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Main Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Original Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src={imageUrl} 
              alt="Original" 
              className="w-full rounded-lg shadow-sm"
            />
          </CardContent>
        </Card>

        {/* ELA Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              ELA Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-200 rounded-lg aspect-square flex items-center justify-center text-slate-500">
              ELA visualization would appear here
              <br />
              (Integrated with your ELA processing)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="export">Export Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {mockResults.authenticity}%
                </div>
                <p className="text-slate-600">Authenticity Score</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {mockResults.confidence}%
                </div>
                <p className="text-slate-600">Model Confidence</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                  {mockResults.isForged ? "Forged" : "Authentic"}
                </Badge>
                <p className="text-slate-600 mt-2">Classification</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">ELA Score</label>
                  <p className="text-lg font-semibold">{mockResults.elaScore}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Processing Time</label>
                  <p className="text-lg font-semibold">{mockResults.analysisTime}s</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Model Architecture</label>
                  <p className="text-lg font-semibold">CNN + ELA</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Input Resolution</label>
                  <p className="text-lg font-semibold">128x128</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Analysis Results</CardTitle>
              <p className="text-slate-600">Download your analysis results in various formats</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-12">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="h-12">
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisResults;
