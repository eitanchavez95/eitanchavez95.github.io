"use client";

import { Terminal, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-secondary border border-border">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            SYSTEM STATUS: OPERATIONAL
          </span>
        </div>

        {/* Name and title */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Terminal className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Alex Chen
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl font-mono text-primary mb-6">
          DevOps Engineer
        </p>

        {/* Value proposition */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Building resilient infrastructure and automating everything in between.
          Specializing in cloud-native architectures, container orchestration,
          and CI/CD pipelines that scale.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="font-mono gap-2"
            onClick={() => scrollToSection("projects")}
          >
            <Activity className="h-4 w-4" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-mono"
            onClick={() => scrollToSection("jd-analyzer")}
          >
            Analyze Job Fit
          </Button>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <p className="text-2xl font-mono font-bold text-primary">5+</p>
            <p className="text-xs text-muted-foreground font-mono">YEARS EXP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-mono font-bold text-primary">99.9%</p>
            <p className="text-xs text-muted-foreground font-mono">UPTIME</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-mono font-bold text-primary">50+</p>
            <p className="text-xs text-muted-foreground font-mono">DEPLOYMENTS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
