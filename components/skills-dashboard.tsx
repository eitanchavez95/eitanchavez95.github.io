"use client";

import { Cloud, Box, FileCode, GitBranch, BarChart3, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  status: "healthy" | "warning";
}

const skillCategories: SkillCategory[] = [
  {
    title: "Cloud Platforms",
    icon: <Cloud className="h-4 w-4" />,
    status: "healthy",
    skills: [
      { name: "AWS", level: 95 },
      { name: "GCP", level: 85 },
      { name: "Azure", level: 75 },
    ],
  },
  {
    title: "Containers",
    icon: <Box className="h-4 w-4" />,
    status: "healthy",
    skills: [
      { name: "Docker", level: 95 },
      { name: "Kubernetes", level: 90 },
      { name: "Helm", level: 85 },
    ],
  },
  {
    title: "Infrastructure as Code",
    icon: <FileCode className="h-4 w-4" />,
    status: "healthy",
    skills: [
      { name: "Terraform", level: 92 },
      { name: "Ansible", level: 80 },
      { name: "Pulumi", level: 70 },
    ],
  },
  {
    title: "CI/CD",
    icon: <GitBranch className="h-4 w-4" />,
    status: "healthy",
    skills: [
      { name: "GitHub Actions", level: 95 },
      { name: "GitLab CI", level: 88 },
      { name: "Jenkins", level: 82 },
    ],
  },
  {
    title: "Observability",
    icon: <BarChart3 className="h-4 w-4" />,
    status: "healthy",
    skills: [
      { name: "Prometheus", level: 90 },
      { name: "Grafana", level: 92 },
      { name: "Datadog", level: 85 },
    ],
  },
];

function SkillBar({ name, level }: Skill) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-foreground">{name}</span>
        <span className="font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function SkillPanel({ category }: { category: SkillCategory }) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-mono">
            {category.icon}
            <span className="text-foreground">{category.title}</span>
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span className="text-[10px] font-mono text-success uppercase">
              {category.status}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </CardContent>
    </Card>
  );
}

export function SkillsDashboard() {
  return (
    <section id="skills" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            System Capabilities
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Skills grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillPanel key={category.title} category={category} />
          ))}
        </div>

        {/* Summary metrics */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">TOTAL SKILLS</p>
              <p className="text-xl font-mono font-bold text-primary">15</p>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">AVG PROFICIENCY</p>
              <p className="text-xl font-mono font-bold text-primary">86%</p>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">CERTIFICATIONS</p>
              <p className="text-xl font-mono font-bold text-primary">6</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
