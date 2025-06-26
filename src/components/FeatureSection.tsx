
import { Shield, Zap, Search, BarChart3, Download, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced CNN Detection",
      description: "State-of-the-art convolutional neural networks trained on thousands of manipulated images for superior accuracy."
    },
    {
      icon: Search,
      title: "Error Level Analysis",
      description: "ELA technique reveals compression artifacts and inconsistencies that indicate image manipulation."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get results in seconds with our optimized inference pipeline and efficient preprocessing."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive authenticity scores, confidence levels, and technical analysis metrics."
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Download professional forensic reports in PDF format with detailed analysis summaries."
    },
    {
      icon: Users,
      title: "Forensic Grade",
      description: "Built for professionals - law enforcement, journalists, and digital forensics experts."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Cutting-Edge Image Forensics
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our advanced AI system combines multiple detection techniques to provide 
            the most accurate and reliable image authenticity analysis available.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to detect image manipulation?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Upload your image and let our AI-powered forensics system analyze it for authenticity 
              using advanced CNN and ELA techniques.
            </p>
            <div className="flex justify-center space-x-2 text-sm text-slate-500">
              <span>✓ No registration required</span>
              <span>•</span>
              <span>✓ Instant results</span>
              <span>•</span>
              <span>✓ Professional accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
