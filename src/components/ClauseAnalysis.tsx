import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, AlertCircle, MessageCircle, Clock, Scale } from "lucide-react";

interface Clause {
  id: string;
  title: string;
  content: string;
  riskLevel: 'safe' | 'caution' | 'danger';
  score: number;
  category: string;
  explanation: string;
  suggestion?: string;
}

const mockClauses: Clause[] = [
  {
    id: '1',
    title: 'Security Deposit Terms',
    content: 'The tenant shall pay a security deposit equal to two months rent, refundable within 30 days of lease termination...',
    riskLevel: 'safe',
    score: 85,
    category: 'Financial Terms',
    explanation: 'Standard security deposit terms. Two months is reasonable and 30-day return period is fair.',
  },
  {
    id: '2',
    title: 'Termination Notice Period',
    content: 'Either party may terminate this lease with 7 days written notice to the other party...',
    riskLevel: 'caution',
    score: 45,
    category: 'Termination',
    explanation: '7 days notice is unusually short. Most tenancy agreements require 30 days notice.',
    suggestion: 'Request to change this to 30 days notice period for better protection.',
  },
  {
    id: '3',
    title: 'Maintenance Responsibility',
    content: 'Tenant is responsible for all repairs and maintenance, including structural issues and major appliances...',
    riskLevel: 'danger',
    score: 15,
    category: 'Responsibilities',
    explanation: 'This clause is highly unusual and unfavorable. Tenants should not be responsible for structural repairs.',
    suggestion: 'Strongly negotiate to limit tenant responsibility to normal wear and tear only.',
  },
];

export const ClauseAnalysis = () => {
  const getRiskIcon = (level: 'safe' | 'caution' | 'danger') => {
    switch (level) {
      case 'safe':
        return <Shield className="w-4 h-4" />;
      case 'caution':
        return <AlertTriangle className="w-4 h-4" />;
      case 'danger':
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRiskColor = (level: 'safe' | 'caution' | 'danger') => {
    switch (level) {
      case 'safe':
        return 'success';
      case 'caution':
        return 'warning';
      case 'danger':
        return 'danger';
    }
  };

  const overallScore = Math.round(mockClauses.reduce((sum, clause) => sum + clause.score, 0) / mockClauses.length);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Document Analysis Results
            </h2>
            <p className="text-lg text-muted-foreground">
              AI-powered clause-by-clause breakdown with risk assessment
            </p>
          </div>

          {/* Overall Score Card */}
          <Card className="p-8 mb-8 border border-card-border">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  overallScore >= 70 ? 'bg-success-gradient shadow-glow-success' :
                  overallScore >= 40 ? 'bg-warning-gradient shadow-glow-warning' :
                  'bg-danger-gradient shadow-glow-danger'
                }`}>
                  <span className="text-2xl font-bold text-white">{overallScore}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fairness Score</h3>
                <p className="text-muted-foreground">
                  {overallScore >= 70 ? 'Generally Fair' :
                   overallScore >= 40 ? 'Needs Attention' :
                   'High Risk'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Safe Clauses</span>
                  <Badge variant="outline" className="text-success border-success">
                    {mockClauses.filter(c => c.riskLevel === 'safe').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Caution Needed</span>
                  <Badge variant="outline" className="text-warning border-warning">
                    {mockClauses.filter(c => c.riskLevel === 'caution').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk</span>
                  <Badge variant="outline" className="text-danger border-danger">
                    {mockClauses.filter(c => c.riskLevel === 'danger').length}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button variant="hero" size="lg" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask LexiGuard
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <Scale className="w-4 h-4 mr-2" />
                  Compare Document
                </Button>
              </div>
            </div>
          </Card>

          {/* Clause Analysis */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Clause-by-Clause Analysis</h3>
            
            {mockClauses.map((clause) => (
              <Card key={clause.id} className="overflow-hidden border border-card-border hover:shadow-elegant transition-smooth">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        clause.riskLevel === 'safe' ? 'bg-success/10' :
                        clause.riskLevel === 'caution' ? 'bg-warning/10' :
                        'bg-danger/10'
                      }`}>
                        <div className={`${
                          clause.riskLevel === 'safe' ? 'text-success' :
                          clause.riskLevel === 'caution' ? 'text-warning' :
                          'text-danger'
                        }`}>
                          {getRiskIcon(clause.riskLevel)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{clause.title}</h4>
                        <Badge variant="outline" className="mt-1">
                          {clause.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <span className={`font-bold ${
                          clause.riskLevel === 'safe' ? 'text-success' :
                          clause.riskLevel === 'caution' ? 'text-warning' :
                          'text-danger'
                        }`}>
                          {clause.score}/100
                        </span>
                      </div>
                      <Progress 
                        value={clause.score} 
                        className="w-24 h-2"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm italic text-muted-foreground">
                      "{clause.content}"
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-1">AI Analysis:</h5>
                      <p className="text-muted-foreground">{clause.explanation}</p>
                    </div>
                    
                    {clause.suggestion && (
                      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                        <h5 className="font-medium text-accent mb-1">💡 Suggestion:</h5>
                        <p className="text-muted-foreground">{clause.suggestion}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-border">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Ask About This
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="w-3 h-3 mr-1" />
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};