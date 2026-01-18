import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Step = {
  title: string;
  description: string;
};

const leftSteps: Step[] = [
  {
    title: "AI Generates Smart Layouts",
    description:
      "Our AI Layout Generator creates a complete website structure with proper sections, spacing, and layout flow, ensuring a clean, modern, and high-conversion design from the start.",
  },
  {
    title: "Website Is Optimized & Published",
    description:
      "Performance Optimization is applied automatically to improve speed, structure, and responsiveness, so your website is fast, stable, and ready to publish across all devices.",
  },
];

const rightSteps: Step[] = [
  {
    title: "Describe Your Website Idea",
    description:
      "Explain your business type, target audience, and style in a few words. Our system understands your intent and prepares everything needed to build a website that fits your vision.",
  },
  {
    title: "Content Is Written Automatically",
    description:
      "The AI Content Writer generates headlines, section text, and call-to-actions tailored to your website goals, keeping everything clear, engaging, and optimized for user interaction.",
  },
];

export default function BuildProcess() {
  const segmentRefs = useRef<HTMLDivElement[]>([]);
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const updated = segmentRefs.current.map((el) => {
        if (!el) return 0;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.6;
        const end = windowHeight * 0.25;

        let percent = (start - rect.top) / (start - end);
        percent = Math.min(Math.max(percent, 0), 1);

        return percent;
      });

      setProgress(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      id="process"
      className="flex flex-col items-center mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 text-white"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.p
        className="text-white text-xs sm:text-sm tracking-wide text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        SIMPLE 4-STEP PROCESS
      </motion.p>

      <motion.h3
        className="text-2xl sm:text-3xl md:text-4xl max-w-sm sm:max-w-md text-center mt-3 sm:mt-4 font-semibold"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Build Your Website in Just Four Simple Steps
      </motion.h3>

      {/* Body */}
      <div className="flex flex-col md:flex-row mt-16 sm:mt-20 md:mt-32 w-full max-w-6xl gap-16 md:gap-0">
        {/* Left */}
        <div>
          {leftSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="max-w-lg min-h-[180px] sm:min-h-[200px] md:h-60 mt-0 md:mt-60 text-center md:text-left"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
            >
              <h3 className="text-xl font-semibold underline decoration-indigo-500 underline-offset-4">
                {step.title}
              </h3>
              <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Middle line */}
        <div className="hidden md:flex flex-col items-center mx-6">
          <div className="size-4 bg-indigo-500 rounded-full" />

          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                ref={(el) => {
                  if (el) segmentRefs.current[i] = el;
                }}
                className="relative w-0.5 mx-6 lg:mx-10 h-52 lg:h-60 bg-white/20 overflow-hidden"
              >
                <div
                  style={{ height: `${progress[i] * 100}%` }}
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 to-purple-500 transition-all"
                />
              </div>
              <div
                className={`size-4 rounded-full transition ${
                  progress[i] > 0.95 ? "bg-indigo-500" : "bg-white/30"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Right */}
        <div>
          {rightSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`max-w-lg min-h-[180px] sm:min-h-[200px] md:h-60 text-center md:text-left ${
                index === 0 ? "mt-0" : "mt-0 md:mt-60"
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 120,
              }}
            >
              <h3 className="text-xl font-semibold underline decoration-purple-500 underline-offset-4">
                {step.title}
              </h3>
              <p className="mt-6 text-gray-300 text-sm/6">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
