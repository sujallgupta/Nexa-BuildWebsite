import { Loader2Icon, ArrowUp } from "lucide-react";
import React, { type FormEvent, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";
import { useNavigate } from "react-router-dom";

/* Placeholder texts */
const placeholders = [
  "Ask Nexa to create a website for my...",
  "Ask Nexa to create a landing page for...",
  "Ask Nexa to create a portfolio website for...",
];

const Home = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [placeholder, setPlaceholder] = React.useState("");
  const [textIndex, setTextIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!session?.user) {
        return toast.error("Please sign in to create a project");
      } else if (!input.trim()) {
        return toast.error("Please enter a message");
      }
      setLoading(true);
      const { data } = await api.post("/api/user/project", {
        initial_prompt: input,
      });
      setLoading(false);
      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.error("Error creating project:", error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && input.trim()) {
        onSubmitHandler(e as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };
  /* Animated placeholder logic */
  useEffect(() => {
    // Stop animation when user types
    if (input.length > 0) return;

    const currentText = placeholders[textIndex];
    let timer: number;

    if (!isDeleting && charIndex < currentText.length) {
      timer = window.setTimeout(() => {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 60);
    } else if (isDeleting && charIndex > 0) {
      timer = window.setTimeout(() => {
        setPlaceholder(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 40);
    } else if (!isDeleting && charIndex === currentText.length) {
      timer = window.setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, input]);

  return (
    <>
      <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">
        <a className="flex items-center gap-2 border border-slate-700 rounded-full p-1 pr-3 text-sm mt-20">
          <p className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-xs font-medium text-white">
            EARLY ACCESS
          </p>

          <p className="flex items-center gap-2">
            <svg
              className="mt-px"
              width="6"
              height="9"
              viewBox="0 0 6 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 1 4 3.5L1 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </a>

        <h1 className="text-center text-[40px] leading-[48px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl">
          Turn thoughts into websites instantly, with AI.
        </h1>

        <p className="text-center text-base max-w-md mt-2">
          Create stunning, responsive websites in seconds using the power of AI.
          No coding required.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="bg-white/10 max-w-2xl w-full rounded-xl p-4 mt-10 border border-indigo-600/70 focus-within:ring-2 ring-indigo-500 transition-all"
        >
          <textarea
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-gray-300 resize-none w-full placeholder-gray-400"
            rows={4}
            placeholder={placeholder}
            required
          />

          <button
            type="submit"
            className="
    ml-auto
    flex items-center justify-center
    gap-2
    rounded-full
    px-4 py-2
    bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600
    hover:opacity-90
    active:scale-95
    transition
  "
          >
            {!loading ? (
              <ArrowUp className="size-4 text-white" />
            ) : (
              <>
                {/* Creating */}
                <Loader2Icon className="animate-spin size-4 text-white" />
              </>
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;
