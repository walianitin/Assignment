"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, ArrowRight, BarChart3, TrendingUp, MapPin, Layers } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1600;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      {/* Badge */}
      <div
        className={`flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-8 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-foreground/40"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-foreground"></span>
        </span>
        <span className="text-xs font-medium text-muted-foreground tracking-wide">
          World Bank B-Ready 2025 Data
        </span>
      </div>

      {/* Heading */}
      <h1
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-center leading-tight tracking-tight text-balance transition-all duration-700 delay-100 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        The Global Startup
        <br />
        <span className="text-primary">Index Platform</span>
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-5 text-base sm:text-lg text-muted-foreground text-center max-w-xl leading-relaxed text-pretty transition-all duration-700 delay-200 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Compare business environments across the world. Explore regulations,
        infrastructure, and market readiness for 190+ economies.
      </p>

      {/* CTA */}
      <div
        className={`mt-8 flex flex-col sm:flex-row items-center gap-3 transition-all duration-700 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={onEnter}
          className="group flex items-center gap-2 px-7 py-3.5 bg-foreground text-background font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Explore the Platform
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
        <a
          href="https://www.worldbank.org/en/businessready"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors duration-200"
        >
          Learn More
        </a>
      </div>

      {/* Stats Row */}
      <div
        className={`mt-12 w-full grid grid-cols-3 divide-x divide-border border border-border rounded-xl bg-card transition-all duration-700 delay-[400ms] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col items-center py-5 px-2">
          <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
            <AnimatedCounter target={190} suffix="+" />
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground mt-1">Economies</span>
        </div>
        <div className="flex flex-col items-center py-5 px-2">
          <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
            <AnimatedCounter target={9} />
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground mt-1">Key Indicators</span>
        </div>
        <div className="flex flex-col items-center py-5 px-2">
          <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
            <AnimatedCounter target={1200} suffix="+" />
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground mt-1">Data Points</span>
        </div>
      </div>

      {/* Product Screenshot */}
      <div
        className={`mt-10 w-full relative group cursor-pointer transition-all duration-700 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        onClick={onEnter}
      >
        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          <Image
            src="/landing.png"
            alt="World Bank Startup Index - Interactive map showing country comparison data with filters for Business Location, Labor, International Trade, and Taxation"
            width={1200}
            height={480}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.015]"
            priority
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground text-background px-5 py-2.5 rounded-lg font-medium text-sm shadow-lg flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Open Interactive Map
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pills */}
      <div
        className={`mt-8 mb-4 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-[600ms] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {[
          { icon: MapPin, label: "Country Comparison" },
          { icon: BarChart3, label: "Visual Analytics" },
          { icon: Layers, label: "Multi-Indicator" },
          { icon: TrendingUp, label: "Rankings" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-secondary px-3 py-1.5 rounded-full"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
