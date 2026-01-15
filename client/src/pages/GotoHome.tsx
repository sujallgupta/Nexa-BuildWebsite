import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GotoHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add the class to body when component mounts
    document.body.classList.add("no-navbar");

    // Cleanup function: remove the class when component unmounts
    return () => {
      document.body.classList.remove("no-navbar");
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050713] text-white px-4">
      {/* Soft background glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 max-w-xl w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-widest text-indigo-400 mb-3">
          404 error
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mb-3">
          Page not found
        </h1>

        <p className="text-gray-400 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg 
          bg-gradient-to-r from-indigo-600 to-purple-600 
          hover:opacity-90 active:scale-95 transition font-medium"
        >
          Go back home
          <ArrowUpRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default GotoHome;
