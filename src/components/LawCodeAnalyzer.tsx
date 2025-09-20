import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Shield, Gavel, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LawCodeData {
  section: string;
  title: string;
  description: string;
  punishment: string;
  keyPoints: string[];
  yourRights: string[];
  useInFavor: string[];
  relatedSections: string[];
  realWorldApplication: string;
  category: 'criminal' | 'civil' | 'procedural' | 'constitutional';
}

const mockLawCodes: Record<string, LawCodeData> = {
  "420": {
    section: "Section 420 IPC",
    title: "Cheating and dishonestly inducing delivery of property",
    description: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    punishment: "Imprisonment up to 7 years + Fine",
    keyPoints: [
      "Requires dishonest intention to deceive",
      "Must result in delivery of property",
      "Deception must be the cause of property transfer",
      "Includes alteration of valuable securities"
    ],
    yourRights: [
      "Right to file FIR immediately upon discovering fraud",
      "Right to claim compensation for losses",
      "Right to legal representation during proceedings",
      "Right to appeal if not satisfied with lower court decision"
    ],
    useInFavor: [
      "Document all communications and transactions as evidence",
      "File complaint immediately - don't delay as it weakens your case",
      "Gather witnesses who can testify about the deception",
      "Keep records of financial losses for compensation claims",
      "Use this section if someone deceived you in property/business deals"
    ],
    relatedSections: ["415 (Cheating)", "463 (Forgery)", "468 (Forgery for cheating)"],
    realWorldApplication: "Commonly used in fraud cases involving fake investment schemes, property scams, fake job offers with advance fees, and online shopping frauds where goods are never delivered.",
    category: 'criminal'
  },
  "498A": {
    section: "Section 498A IPC",
    title: "Husband or relative of husband subjecting woman to cruelty",
    description: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment of either description for a term which may extend to three years, and shall also be liable to fine.",
    punishment: "Imprisonment up to 3 years + Fine",
    keyPoints: [
      "Protects women from domestic violence and cruelty",
      "Covers both physical and mental cruelty",
      "Includes harassment for dowry demands",
      "Non-bailable and cognizable offense"
    ],
    yourRights: [
      "Right to file complaint without husband's permission",
      "Right to police protection under Domestic Violence Act",
      "Right to residence and maintenance",
      "Right to free legal aid"
    ],
    useInFavor: [
      "Maintain detailed diary of incidents with dates and times",
      "Take photographs of injuries as evidence",
      "Inform trusted family members/friends who can be witnesses",
      "Keep medical records of treatment for injuries",
      "Record conversations if legally permissible in your state",
      "Contact women's helpline numbers for immediate support"
    ],
    relatedSections: ["304B (Dowry death)", "406 (Criminal breach of trust)", "34 (Common intention)"],
    realWorldApplication: "Used to protect women from domestic violence, dowry harassment, mental torture by in-laws, and cases where women are subjected to cruelty for not meeting dowry demands.",
    category: 'criminal'
  },
  "376": {
    section: "Section 376 IPC",
    title: "Punishment for rape",
    description: "Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.",
    punishment: "Minimum 10 years rigorous imprisonment, may extend to life + Fine",
    keyPoints: [
      "Minimum punishment is 10 years rigorous imprisonment",
      "Can extend to life imprisonment",
      "Covers various forms of sexual assault",
      "Special provisions for aggravated forms"
    ],
    yourRights: [
      "Right to file FIR and have case investigated promptly",
      "Right to medical examination by female doctor if requested",
      "Right to privacy and confidentiality during proceedings",
      "Right to compensation from state government",
      "Right to in-camera trial (closed court proceedings)"
    ],
    useInFavor: [
      "Seek immediate medical attention and preserve evidence",
      "File FIR as soon as possible - time is crucial",
      "Request female police officer for recording statement",
      "Contact NGOs and support groups for counseling and legal aid",
      "Know that your identity will be protected by law",
      "Understand that consent can be withdrawn at any time"
    ],
    relatedSections: ["375 (Definition of rape)", "228A (Disclosure of identity prohibited)", "376A-376E (Various forms of sexual offenses)"],
    realWorldApplication: "Strictly enforced law with severe punishments. Courts have upheld convictions based on victim testimony alone. Recent amendments have made the law more comprehensive and victim-friendly.",
    category: 'criminal'
  }
};

export const LawCodeAnalyzer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<LawCodeData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a law section",
        description: "Please enter an IPC section number (e.g., 420, 498A, 376)",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const cleanQuery = searchQuery.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
      const foundCode = mockLawCodes[cleanQuery];
      
      if (foundCode) {
        setSelectedCode(foundCode);
        toast({
          title: "Law section found!",
          description: `Analysis for IPC Section ${cleanQuery} is ready.`
        });
      } else {
        toast({
          title: "Section not found",
          description: "Try searching for sections like 420, 498A, or 376. More sections coming soon!",
          variant: "destructive"
        });
      }
      setIsSearching(false);
    }, 1500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'criminal': return 'danger';
      case 'civil': return 'primary';
      case 'procedural': return 'warning';
      case 'constitutional': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-card border border-card-border rounded-full px-4 py-2 shadow-elegant mb-4">
              <Gavel className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                IPC Law Code Analysis
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Know Your <span className="bg-hero-gradient bg-clip-text text-transparent">Legal Rights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get detailed explanations of Indian Penal Code sections, understand your rights, 
              and learn how to use the law in your favor
            </p>
          </div>

          {/* Search Section */}
          <Card className="p-8 mb-8 border border-card-border">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="law-search" className="block text-sm font-medium mb-2">
                  Enter IPC Section Number
                </label>
                <Input
                  id="law-search"
                  placeholder="e.g., 420, 498A, 376, 302..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-lg"
                />
              </div>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Section
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results */}
          {selectedCode && (
            <Card className="overflow-hidden border border-card-border shadow-elegant">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-${getCategoryColor(selectedCode.category)} border-${getCategoryColor(selectedCode.category)}`}
                      >
                        {selectedCode.category.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {selectedCode.section}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedCode.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 text-danger" />
                        {selectedCode.punishment}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button variant="success" size="sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Full Text
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rights">Your Rights</TabsTrigger>
                    <TabsTrigger value="strategy">Use in Favor</TabsTrigger>
                    <TabsTrigger value="related">Related Laws</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Legal Description
                      </h4>
                      <p className="text-muted-foreground italic">
                        "{selectedCode.description}"
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6 border border-card-border">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-success" />
                          Key Points
                        </h4>
                        <ul className="space-y-2">
                          {selectedCode.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      <Card className="p-6 border border-card-border">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Gavel className="w-4 h-4 mr-2 text-warning" />
                          Real-World Application
                        </h4>
                        <p className="text-muted-foreground">
                          {selectedCode.realWorldApplication}
                        </p>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="rights" className="space-y-4">
                    <div className="bg-success/5 border border-success/20 rounded-lg p-6">
                      <h4 className="font-semibold mb-4 flex items-center text-success">
                        <Shield className="w-5 h-5 mr-2" />
                        Your Legal Rights Under This Section
                      </h4>
                      <div className="space-y-3">
                        {selectedCode.yourRights.map((right, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{right}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="strategy" className="space-y-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h4 className="font-semibold mb-4 flex items-center text-primary">
                        <Star className="w-5 h-5 mr-2" />
                        How to Use This Law in Your Favor
                      </h4>
                      <div className="space-y-4">
                        {selectedCode.useInFavor.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{index + 1}</span>
                            </div>
                            <span className="text-foreground">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="related" className="space-y-4">
                    <div className="grid gap-4">
                      <h4 className="font-semibold flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Related IPC Sections
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCode.relatedSections.map((section, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => {
                              const sectionNumber = section.match(/\d+[A-Za-z]*/)?.[0];
                              if (sectionNumber) {
                                setSearchQuery(sectionNumber);
                              }
                            }}
                          >
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          )}

          {/* Popular Sections */}
          {!selectedCode && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-8 text-center">Popular IPC Sections</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(mockLawCodes).map(([key, code]) => (
                  <Card 
                    key={key} 
                    className="p-6 border border-card-border hover:shadow-elegant transition-smooth cursor-pointer group"
                    onClick={() => {
                      setSearchQuery(key);
                      setSelectedCode(code);
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant="outline" 
                        className={`text-${getCategoryColor(code.category)} border-${getCategoryColor(code.category)}`}
                      >
                        Section {key}
                      </Badge>
                      <Gavel className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {code.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {code.description.substring(0, 120)}...
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};