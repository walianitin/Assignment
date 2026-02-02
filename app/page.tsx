"use client";

import { useState } from "react";
import WorldMap from "./components/world_map";
import Image from "next/image";
import { Globe, ArrowRight, BarChart3 } from "lucide-react";

export default function HomePage() {
  const [showMap, setShowMap] = useState(false);
  
  return (
    <div className="w-full max-w-6xl">
      {!showMap ? (
        <div className="flex flex-col items-center justify-center min-h-[85vh] gap-8 ">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                World Bank
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight dark:text-gray-300">
              Startup Index
            </h1>
            <p className="text-lg text-gray-500 max-w-lg mx-auto">
              Compare the best business environments to start and grow your venture
            </p>
          </div>
               {/* CTA Button */}
          <button
            onClick={() => setShowMap(true)}
            className="flex items-center gap-2 px-8 py-4 bg-gray-800  text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Go to Platform
            <ArrowRight className="h-5 w-5" />
          </button>
          {/* Image */}
          <div className="relative group cursor-pointer" onClick={() => setShowMap(true)}>
            <div className="absolute -inset-1 bg-linear-to-r from-gray-400 to-gray-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative overflow-hidden rounded-xl">
              <Image 
                src="/landing.png" 
                alt="World Bank Startup Index" 
                width={1000} 
                height={400}
                className="relative shadow-xl group-hover:scale-[1.02] transition-transform duration-300"
              />
              {/* Left fade */}
              <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent pointer-events-none"></div>
              {/* Right fade */}
              <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>9 Key Indicators</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              <span>190+ Countries</span>
            </div>
          </div>

    
        </div>
      ) : (
        <div className="w-full h-[80vh]">
          <WorldMap />
        </div>
      )}
    </div>
  );
}