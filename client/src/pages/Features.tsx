import SectionTitle from "../components/SectionTitle";
import { SparklesIcon, LayoutIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { JSX } from "react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const featuresData: Feature[] = [
  {
    icon: SparklesIcon,
    title: "AI Website Generation",
    description:
      "Describe your idea and Nexa instantly generates a complete, structured, production-ready website.",
  },
  {
    icon: LayoutIcon,
    title: "Smart Layouts",
    description:
      "Automatically designed sections, components, and UI flows optimized for startups and products.",
  },
  {
    icon: ZapIcon,
    title: "Instant Deployment",
    description:
      "From prompt to live website in minutes with fast builds, clean code, and scalable structure.",
  },
];

export default function Features(): JSX.Element {
  const refs = useRef<HTMLDivElement[]>([]);

  return (
    <section>
      <SectionTitle
        title="Why build with Nexa?"
        description="Nexa turns ideas into high-quality websites using AI — faster, smarter, and without writing code."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-12 px-6">
        {featuresData.map((feature, index) => (
          <motion.div
            key={feature.title}
            ref={(el) => {
              if (el) refs.current[index] = el;
            }}
            className="
              hover:-translate-y-1 p-6 rounded-2xl space-y-4 
              bg-white/5 border border-white/10 backdrop-blur 
              max-w-[320px] w-full transition
            "
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 260,
              damping: 30,
            }}
          >
            <feature.icon className="size-9 text-indigo-400" />

            <h3 className="text-base font-semibold text-white">
              {feature.title}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
      
    </section>
    
  );
}
