import { LexiGuardHero } from "@/components/LexiGuardHero";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ClauseAnalysis } from "@/components/ClauseAnalysis";
import { LawCodeAnalyzer } from "@/components/LawCodeAnalyzer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <LexiGuardHero />
      <DocumentUpload />
      <ClauseAnalysis />
      <LawCodeAnalyzer />
    </main>
  );
};

export default Index;