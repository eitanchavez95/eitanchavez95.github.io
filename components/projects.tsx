"use client";

import { ExternalLink, GitBranch, Layers, Server, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  architecture: string;
  techStack: string[];
  icon: React.ReactNode;
  status: "production" | "staging" | "development";
}

const projects: Project[] = [
  {
    title: "Kubernetes Multi-Cluster Platform",
    description: "Designed and implemented a multi-region Kubernetes platform supporting 200+ microservices with automated failover and load balancing.",
    architecture: "Multi-region K8s clusters with Istio service mesh, ArgoCD for GitOps, and custom operators for automated scaling.",
    techStack: ["Kubernetes", "Istio", "ArgoCD", "Terraform", "Go"],
    icon: <Layers className="h-5 w-5" />,
    status: "production",
  },
  {
    title: "Zero-Trust Security Pipeline",
    description: "Built comprehensive security scanning pipeline integrated into CI/CD, reducing vulnerabilities by 85% before production.",
    architecture: "SAST/DAST scanning, container image scanning, secrets detection, and automated policy enforcement with OPA.",
    techStack: ["GitHub Actions", "Trivy", "Snyk", "OPA", "Vault"],
    icon: <Shield className="h-5 w-5" />,
    status: "production",
  },
  {
    title: "Real-Time Observability Stack",
    description: "Deployed unified observability platform providing metrics, logs, and traces for 50+ services with custom alerting.",
    architecture: "Prometheus + Thanos for metrics, Loki for logs, Tempo for traces, all visualized in Grafana with custom dashboards.",
    techStack: ["Prometheus", "Grafana", "Loki", "Tempo", "AlertManager"],
    icon: <Zap className="h-5 w-5" />,
    status: "production",
  },
  {
    title: "Infrastructure Cost Optimizer",
    description: "Automated infrastructure cost analysis and optimization tool that reduced cloud spend by 40% through right-sizing.",
    architecture: "Python-based analyzer with AWS Cost Explorer API, automated recommendations, and Slack notifications.",
    techStack: ["Python", "AWS SDK", "Lambda", "DynamoDB", "CloudWatch"],
    icon: <Server className="h-5 w-5" />,
    status: "staging",
  },
];

const statusColors = {
  production: "bg-success/20 text-success border-success/30",
  staging: "bg-warning/20 text-warning border-warning/30",
  development: "bg-primary/20 text-primary border-primary/30",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              {project.icon}
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-foreground leading-tight">
                {project.title}
              </CardTitle>
              <Badge
                variant="outline"
                className={`mt-1 text-[10px] font-mono uppercase ${statusColors[project.status]}`}
              >
                {project.status}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        
        {/* Architecture diagram placeholder */}
        <div className="p-3 bg-secondary/50 rounded-md border border-border">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Architecture
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[10px] font-mono bg-secondary text-secondary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            Deployed Systems
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Projects grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
