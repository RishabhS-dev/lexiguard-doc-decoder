import { LexiGuardHero } from "@/components/LexiGuardHero";
import { DocumentUpload } from "@/components/DocumentUpload";
import { ClauseAnalysis } from "@/components/ClauseAnalysis";

const Index = () => {
  return (
    <main className="min-h-screen">
      <LexiGuardHero />
      <DocumentUpload />
      <ClauseAnalysis />
    </main>
  );
};

export default Index;