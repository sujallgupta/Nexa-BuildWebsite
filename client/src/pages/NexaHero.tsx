import { ArrowUpRightIcon, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";

const NexaHero = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-white px-4 text-center">
      <motion.div
        className="flex items-center gap-3 mb-4 text-sm text-gray-300"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 35 }}
      >
        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur">
          {!session?.user ? (
            <>
              <Wand2 className="size-4 text-indigo-400" />
              <span>Welcome to Nexa</span>
            </>
          ) : (
            <>
              <Wand2 className="size-4 text-indigo-400" />
              <span>
                Welcome back,&nbsp;
                <span className="text-indigo-300 font-medium">
                  {session.user.name?.split(" ")[0] || "there"}
                </span>
              </span>
            </>
          )}
        </span>
      </motion.div>

      <motion.h1
        className="text-[38px] leading-[44px] sm:text-[42px] sm:leading-[48px] md:text-6xl md:leading-[70px] font-semibold tracking-tight max-w-3xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        Turn thoughts into websites instantly, with AI
      </motion.h1>

      <motion.p
        className="text-gray-300 text-sm sm:text-base max-w-md mt-4 sm:mt-5"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 220,
          damping: 30,
        }}
      >
        Describe your idea. Nexa designs, builds, and structures your website in
        minutes — no code required.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-7 sm:mt-8 w-full sm:w-auto"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.25,
          type: "spring",
          stiffness: 220,
          damping: 30,
        }}
      >
        <Link to="/generate-website" className="w-full sm:w-auto">
          <button
            className="
              group flex items-center gap-2
              px-7 py-3 rounded-full font-medium
              w-full sm:w-auto min-w-[210px] justify-center
              bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600
              hover:brightness-110 active:scale-95 transition-all
              shadow-[0_0_40px_rgba(99,102,241,0.35)]
            "
          >
            Generate my website
            <ArrowUpRightIcon className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Link>

        {!session?.user ? (
          <button
            onClick={() => navigate("/auth/signin")}
            className="
              group flex items-center gap-2
              px-7 py-3 rounded-full font-medium
              w-full sm:w-auto min-w-[210px] justify-center
              bg-white/5 backdrop-blur border border-white/15
              hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
              active:scale-95 transition-all
            "
          >
            Get started
            <ArrowUpRightIcon className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/projects")}
            className="
              group flex items-center gap-2
              px-7 py-3 rounded-full font-medium
              w-full sm:w-auto min-w-[210px] justify-center
              bg-white/5 backdrop-blur border border-white/15
              hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
              active:scale-95 transition-all
            "
          >
            Go to my projects
            <ArrowUpRightIcon className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </motion.div>
    </section>
  );
};

export default NexaHero;
