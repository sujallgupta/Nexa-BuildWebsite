import { ArrowUpRightIcon} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NexaHero = () => {
  return (
    <>
      
      <motion.div
        className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 size-[520px] rounded-full bg-indigo-600/30 blur-[140px]" />
        <div className="absolute top-[45%] left-[18%] size-[420px] rounded-full bg-pink-600/25 blur-[130px]" />
        <div className="absolute top-[15%] right-[18%] size-[420px] rounded-full bg-blue-600/25 blur-[130px]" />
      </motion.div>

      {/*  Hero Section  */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-white px-4 text-center">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-3 mb-4 text-sm text-gray-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 35 }}
        >
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur">
            ⚡ Smart • Fast • AI-Powered
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-[42px] leading-[48px] md:text-6xl md:leading-[70px] font-semibold tracking-tight max-w-3xl"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
         Turn thoughts into websites instantly, with AI
        </motion.h1>

        
        <motion.p
          className="text-gray-300 text-base max-w-md mt-5"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 220,
            damping: 30,
          }}
        >
          Describe your idea. Nexa designs, builds, and structures your website
          in minutes — no code required.
        </motion.p>

        
        <motion.div
          className="flex flex-col md:flex-row w-full md:w-auto items-center gap-4 mt-7"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.25,
            type: "spring",
            stiffness: 220,
            damping: 30,
          }}
        >
          <Link to="/generate-website">
            <button
              className="
          group mt-8 flex items-center gap-2
          px-7 py-3 rounded-full font-medium
          bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600
          hover:opacity-90 active:scale-95 transition
          shadow-[0_0_40px_rgba(99,102,241,0.35)]
        "
            >
              Generate my website
              <ArrowUpRightIcon className="size-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default NexaHero;

