import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative flex flex-col items-center justify-center max-w-7xl mx-auto my-28 md:my-40 px-6 text-white overflow-hidden">

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur text-xs text-gray-200">
        <SparklesIcon className="size-3.5 text-indigo-400" />
        Build with Nexa in minutes
      </div>

      {/* Heading */}
      <h3 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-semibold text-center max-w-2xl leading-tight 
                     bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
        Your website is just one prompt away.
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm md:text-base text-gray-300 max-w-md text-center leading-relaxed">
        Describe your idea and Nexa instantly builds a structured, responsive,
        and production-ready website — no code required.
      </p>

      
      <Link to="/generate-website">
        <button
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          className="
            group mt-8 flex items-center gap-2
            px-8 py-3.5 rounded-full font-medium
            bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600
            hover:brightness-110 active:scale-95 transition-all duration-300
            shadow-[0_0_45px_rgba(139,92,246,0.45)]
          "
        >
          Generate my website
          <ArrowUpRightIcon className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </Link>

      
      <img
        src="hand.png"
        alt="Nexa AI hand"
        className="
          w-36 sm:w-40 md:w-52 mt-16 md:mt-20
          opacity-90
          contrast-125 brightness-90 saturate-125
          drop-shadow-[0_0_60px_rgba(99,102,241,0.35)]
          cursor-pointer transition-transform duration-500 hover:scale-105
        "
        onClick={() =>
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
      />
    </section>
  );
}
