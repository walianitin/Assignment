"use client";

import { useState } from "react";
import WorldMap from "./components/world_map";
import HeroSection from "./components/hero-section";

export default function HomePage() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="w-full max-w-6xl">
      {!showMap ? (
        <div className="flex flex-col items-center justify-center min-h-[85vh] py-10">
          <HeroSection onEnter={() => setShowMap(true)} />
        </div>
      ) : (
        <div className="w-full h-[80vh]">
          <WorldMap />
        </div>
      )}
    </div>
  );
}
