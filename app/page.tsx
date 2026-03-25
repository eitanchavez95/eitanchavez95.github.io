import { Hero } from "@/components/hero";
import { SkillsDashboard } from "@/components/skills-dashboard";
import { Projects } from "@/components/projects";
import { JDAnalyzer } from "@/components/jd-analyzer";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <SkillsDashboard />
      <Projects />
      <JDAnalyzer />
      <Footer />
    </main>
  );
}
