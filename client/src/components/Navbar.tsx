import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [credits, setCredits] = useState(0);

  const { data: session } = authClient.useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data.credits);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("Error fetching credits:", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

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

     
      <nav className="z-20 flex items-center justify-between w-full py-1 px-3 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b border-white/10 text-white">

       
        <Link to="/" className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="Nexa logo"
            className="h-12 sm:h-14 md:h-16 w-auto scale-125 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
          />
        </Link>

        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "Home", path: "/generate-website" },
            { name: "My Projects", path: "/projects" },
            { name: "Community", path: "/community" },
            { name: "Pricing", path: "/pricing" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group relative text-gray-300 hover:text-white transition"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-indigo-400 to-purple-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {!session?.user ? (
            <button
              onClick={() => navigate("/auth/signin")}
              className="
                px-6 py-2 rounded-full text-sm font-medium
                bg-gradient-to-r from-indigo-600 to-purple-600
                hover:brightness-110 active:scale-95 transition
                shadow-[0_0_20px_rgba(99,102,241,0.35)]
              "
            >
              Get started
            </button>
          ) : (
            <>
              {/* Credits */}
              <button
                onClick={() => navigate("/pricing")}
                className="
                  bg-white/5 border border-white/10 backdrop-blur
                  px-4 py-1.5 text-xs sm:text-sm text-gray-200 rounded-full
                  hover:bg-white/10 transition
                "
              >
                Credits : <span className="text-indigo-300">{credits}</span>
              </button>

              {/* User menu */}
              <UserButton size={"icon"} />
            </>
          )}

          {/* Mobile menu button */}
          <button
            id="open-menu"
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl text-white flex flex-col items-center justify-center text-lg gap-8 md:hidden">

          {[
            { name: "Home", path: "/generate-website" },
            { name: "My Projects", path: "/projects" },
            { name: "Community", path: "/community" },
            { name: "Pricing", path: "/pricing" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-300 transition"
            >
              {item.name}
            </Link>
          ))}

          <button
            className="mt-6 aspect-square size-11 flex items-center justify-center rounded-full
                       bg-white text-black hover:bg-gray-200 transition active:scale-95"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;

