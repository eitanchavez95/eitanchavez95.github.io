"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle, AlertTriangle, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Skills the user has
const userSkills = [
  "aws", "gcp", "azure", "docker", "kubernetes", "helm",
  "terraform", "ansible", "pulumi", "github actions", "gitlab ci", "jenkins",
  "prometheus", "grafana", "datadog", "python", "go", "bash",
  "linux", "ci/cd", "devops", "sre", "infrastructure", "cloud",
  "microservices", "containers", "monitoring", "alerting", "automation",
  "istio", "argocd", "vault", "security", "networking", "load balancing",
];

interface AnalysisResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string;
}

function analyzeJobDescription(jd: string): AnalysisResult {
  const jdLower = jd.toLowerCase();
  const matchedSkills: string[] = [];
  const foundInJD: string[] = [];

  // Common skill variations
  const skillAliases: Record<string, string[]> = {
    "aws": ["aws", "amazon web services", "ec2", "s3", "lambda", "cloudformation"],
    "gcp": ["gcp", "google cloud", "gke", "bigquery"],
    "azure": ["azure", "microsoft azure", "aks"],
    "kubernetes": ["kubernetes", "k8s", "eks", "gke", "aks"],
    "docker": ["docker", "containers", "containerization"],
    "terraform": ["terraform", "iac", "infrastructure as code"],
    "github actions": ["github actions", "github ci"],
    "gitlab ci": ["gitlab ci", "gitlab"],
    "prometheus": ["prometheus"],
    "grafana": ["grafana"],
    "ci/cd": ["ci/cd", "cicd", "continuous integration", "continuous deployment", "pipeline"],
    "python": ["python"],
    "go": ["go", "golang"],
    "linux": ["linux", "unix", "centos", "ubuntu", "debian"],
  };

  // Find skills mentioned in JD
  const jdWords = jdLower.split(/[\s,;.()[\]{}]+/);
  const jdPhrases = jdLower;

  for (const [skill, aliases] of Object.entries(skillAliases)) {
    for (const alias of aliases) {
      if (jdPhrases.includes(alias) || jdWords.includes(alias)) {
        if (!foundInJD.includes(skill)) {
          foundInJD.push(skill);
          if (userSkills.includes(skill)) {
            matchedSkills.push(skill);
          }
        }
        break;
      }
    }
  }

  // Check for other user skills directly
  for (const skill of userSkills) {
    if ((jdPhrases.includes(skill) || jdWords.includes(skill)) && !matchedSkills.includes(skill)) {
      matchedSkills.push(skill);
      if (!foundInJD.includes(skill)) {
        foundInJD.push(skill);
      }
    }
  }

  // Calculate missing skills (in JD but not matched)
  const missingSkills = foundInJD.filter(s => !matchedSkills.includes(s));

  // Add some common requirements that might be missing
  const commonRequirements = ["java", "ruby", "php", "c++", "scala", "rust", "splunk", "elasticsearch", "kafka", "rabbitmq", "redis"];
  for (const req of commonRequirements) {
    if (jdPhrases.includes(req) && !matchedSkills.includes(req) && !missingSkills.includes(req)) {
      missingSkills.push(req);
    }
  }

  // Calculate score
  const totalRelevantSkills = matchedSkills.length + missingSkills.length;
  const score = totalRelevantSkills > 0 ? Math.round((matchedSkills.length / totalRelevantSkills) * 100) : 0;

  // Generate explanation
  let explanation = "";
  if (score >= 80) {
    explanation = "Excellent match! Your skill set aligns very well with this position. You have strong coverage of the core requirements and should be a competitive candidate.";
  } else if (score >= 60) {
    explanation = "Good match! You possess many of the required skills. Consider highlighting your relevant experience and addressing the skill gaps through certifications or projects.";
  } else if (score >= 40) {
    explanation = "Moderate match. While you have some relevant skills, there are notable gaps. This could be a growth opportunity if you're willing to learn quickly.";
  } else {
    explanation = "Limited match based on keyword analysis. This role may require significant upskilling, or the job description may use different terminology than your experience.";
  }

  return { score, matchedSkills, missingSkills, explanation };
}

function ScoreDisplay({ score }: { score: number }) {
  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreStatus = () => {
    if (score >= 80) return { icon: CheckCircle2, text: "EXCELLENT MATCH", color: "text-success" };
    if (score >= 60) return { icon: AlertTriangle, text: "GOOD MATCH", color: "text-warning" };
    return { icon: XCircle, text: "NEEDS REVIEW", color: "text-destructive" };
  };

  const status = getScoreStatus();
  const StatusIcon = status.icon;

  return (
    <div className="text-center p-6 bg-secondary/50 rounded-lg border border-border">
      <p className="text-xs font-mono text-muted-foreground mb-2">COMPATIBILITY SCORE</p>
      <p className={`text-6xl font-mono font-bold ${getScoreColor()}`}>
        {score}%
      </p>
      <div className={`flex items-center justify-center gap-2 mt-3 ${status.color}`}>
        <StatusIcon className="h-4 w-4" />
        <span className="text-xs font-mono">{status.text}</span>
      </div>
    </div>
  );
}

function SkillTags({ skills, type }: { skills: string[]; type: "matched" | "missing" }) {
  const isMatched = type === "matched";
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {isMatched ? (
          <CheckCircle2 className="h-4 w-4 text-success" />
        ) : (
          <XCircle className="h-4 w-4 text-destructive" />
        )}
        <span className="text-xs font-mono text-muted-foreground uppercase">
          {isMatched ? "Matched Skills" : "Gap Analysis"}
        </span>
        <Badge variant="outline" className="text-[10px] font-mono">
          {skills.length}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className={`text-[10px] font-mono capitalize ${
                isMatched
                  ? "bg-success/10 text-success border-success/30"
                  : "bg-destructive/10 text-destructive border-destructive/30"
              }`}
            >
              {skill}
            </Badge>
          ))
        ) : (
          <span className="text-xs text-muted-foreground italic">
            {isMatched ? "No matching skills found" : "No gaps identified"}
          </span>
        )}
      </div>
    </div>
  );
}

export function JDAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const analysisResult = analyzeJobDescription(jobDescription);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setJobDescription("");
    setResult(null);
  };

  return (
    <section id="jd-analyzer" className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            Job Fit Analyzer
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-mono text-foreground">
              <FileText className="h-4 w-4 text-primary" />
              Job Description Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste the job description here to analyze skill compatibility..."
              className="min-h-[200px] font-mono text-sm bg-secondary/50 border-border resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="font-mono gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Analyze Match
                  </>
                )}
              </Button>
              {result && (
                <Button variant="outline" onClick={handleClear} className="font-mono">
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="mt-6 bg-card border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-mono text-foreground">
                <Search className="h-4 w-4 text-primary" />
                Analysis Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score */}
              <ScoreDisplay score={result.score} />

              {/* Skills analysis */}
              <div className="grid gap-6 md:grid-cols-2">
                <SkillTags skills={result.matchedSkills} type="matched" />
                <SkillTags skills={result.missingSkills} type="missing" />
              </div>

              {/* Explanation */}
              <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-xs font-mono text-muted-foreground uppercase mb-2">
                  Assessment
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.explanation}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
