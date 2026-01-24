import SectionTitle from "../components/SectionTitle";
import { ChevronDownIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type FaqItem = {
  question: string;
  answer: string;
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const data: FaqItem[] = [
    {
      question: "What is Nexa and how does it work?",
      answer:
        "Nexa is an AI-powered website builder. You describe what you want to build, and Nexa automatically generates a complete, structured, and responsive website within seconds.",
    },
    {
      question: "Do I need coding or design experience?",
      answer:
        "No. Nexa is built for founders, students, and creators. You don’t need to know coding or design — Nexa handles layout, content, and structure for you.",
    },
    {
      question: "What kind of websites can I build with Nexa?",
      answer:
        "You can build startup websites, SaaS landing pages, AI tools, portfolios, MVPs, product launch pages, and business websites.",
    },
    {
      question: "Can I customize the website Nexa creates?",
      answer:
        "Yes. You can refine layouts, sections, features, and content using simple prompts. Nexa updates your website without rebuilding everything.",
    },
    {
      question: "Is the generated website production-ready?",
      answer:
        "Yes. Nexa creates responsive, structured, and performance-focused websites that are ready to deploy and scale.",
    },
    {
      question: "Can I deploy my site and continue editing later?",
      answer:
        "Absolutely. You can publish your site, iterate on it anytime, and keep improving it as your product or startup evolves.",
    },
  ];

  return (
    <section className="relative mt-17 px-6 text-white">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-indigo-500/10 blur-[120px] -z-10" />

      <SectionTitle
        title="Frequently asked questions"
        description="Everything you need to know about building websites with Nexa."
      />

      <div className="mx-auto mt-14 space-y-4 w-full max-w-2xl">
        {data.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={item.question}
              className="
                group flex flex-col rounded-2xl 
                border border-white/10 
                bg-gradient-to-b from-white/[0.08] to-white/[0.02]
                backdrop-blur-md
                shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
              "
              initial={{ y: 70, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 160,
                damping: 20,
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="
                  flex w-full items-center justify-between gap-4 
                  p-5 text-left font-medium
                  hover:bg-white/10 transition rounded-2xl
                "
              >
                <div className="flex items-center gap-3">
                  <SparklesIcon className="size-4 text-indigo-400 shrink-0 opacity-70" />
                  <span className="text-sm md:text-base">{item.question}</span>
                </div>

                <ChevronDownIcon
                  className={`size-5 shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 text-indigo-400"
                      : "text-gray-400 group-hover:text-gray-300"
                  }`}
                />
              </button>

              <div
                className={`px-5 text-sm text-gray-300 transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="pt-1 leading-relaxed">{item.answer}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
