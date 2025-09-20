import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, FileText, Zap, Users } from "lucide-react";
import heroImage from "@/assets/hero-legal.jpg";

export const LexiGuardHero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-gradient opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-card border border-card-border rounded-full px-4 py-2 shadow-elegant">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  AI-Powered Legal Assistant
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Understand</span>{" "}
                <span className="bg-hero-gradient bg-clip-text text-transparent">
                  Legal Documents
                </span>{" "}
                <span className="text-foreground">Instantly</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Transform complex contracts, rental agreements, and legal terms into clear, 
                actionable guidance. Get risk analysis, negotiation tips, and plain-language 
                summaries in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Start Analyzing Documents
                <FileText className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">256-bit encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">GDPR compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">SOC 2 certified</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="LexiGuard Legal Document Analysis Interface"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 p-4 shadow-glow-success border border-success/20 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success-gradient rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-success">Safe Clause</p>
                  <p className="text-xs text-muted-foreground">Standard terms detected</p>
                </div>
              </div>
            </Card>
            
            <Card className="absolute -bottom-4 -right-4 p-4 shadow-glow-primary border border-primary/20 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-primary">AI Analysis</p>
                  <p className="text-xs text-muted-foreground">Complete in 2.4s</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From tenants to small business owners, LexiGuard makes legal documents accessible
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border border-card-border hover:shadow-elegant transition-smooth group">
              <div className="w-12 h-12 bg-success-gradient rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-spring">
                <Shield className="w-6 h-6 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant risk heatmaps with green, amber, and red clause classifications. 
                Know what's safe and what needs attention.
              </p>
            </Card>
            
            <Card className="p-8 border border-card-border hover:shadow-elegant transition-smooth group">
              <div className="w-12 h-12 bg-hero-gradient rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-spring">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Plain Language</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complex legal jargon translated into clear, understandable language. 
                Available in multiple languages with voice narration.
              </p>
            </Card>
            
            <Card className="p-8 border border-card-border hover:shadow-elegant transition-smooth group">
              <div className="w-12 h-12 bg-warning-gradient rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-spring">
                <Users className="w-6 h-6 text-warning-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Guidance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get personalized negotiation tips, alternative clauses, and actionable 
                checklists tailored to your situation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};