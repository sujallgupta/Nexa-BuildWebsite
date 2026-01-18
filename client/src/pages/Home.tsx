import { Loader2Icon, ArrowUp } from "lucide-react";
import React, { type FormEvent, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";
import { useNavigate } from "react-router-dom";
import { placeholders, quickPrompts } from "@/assets/assets";

const Home = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [placeholder, setPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!session?.user)
        return toast.error("Please sign in to create a project");
      if (!input.trim()) return toast.error("Please enter a message");

      setLoading(true);

      const { data } = await api.post("/api/user/project", {
        initial_prompt: input,
      });

      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (input.length > 0) return;

    const currentText = placeholders[textIndex];
    let timer: number;

    if (!isDeleting && charIndex < currentText.length) {
      timer = window.setTimeout(() => {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 55);
    } else if (isDeleting && charIndex > 0) {
      timer = window.setTimeout(() => {
        setPlaceholder(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else if (!isDeleting && charIndex === currentText.length) {
      timer = window.setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, input]);

  useEffect(() => {

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  return () => {
   
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  };
}, []);

  return (
    <section className="min-h-screen inset-0 top-16 flex items-center justify-center px-4 text-white font-poppins overflow-hidden">
      <div className="w-full max-w-3xl flex flex-col items-center space-y-6">
        <h1 className="text-center text-[40px] leading-[48px] md:text-5xl md:leading-[70px] font-semibold">
          Build something with{" "}
          <span className="inline-block bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Nexa
          </span>
        </h1>

        <p className="text-center text-base text-gray-300 max-w-md">
          Describe the website you want to create.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="bg-white/10 w-full rounded-xl p-4 border border-white/15 backdrop-blur focus-within:ring-2 ring-indigo-500/60 transition"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder={placeholder}
            required
            className="bg-transparent outline-none text-gray-100 resize-none w-full placeholder-gray-400"
          />

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 active:scale-95 transition"
            >
              {!loading ? (
                <ArrowUp className="size-4" />
              ) : (
                <Loader2Icon className="animate-spin size-4" />
              )}
            </button>
          </div>
        </form>

        <div className="w-full flex flex-wrap justify-center gap-2">
          {quickPrompts.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setInput(item.prompt)}
              className="px-3 py-1.5 rounded-full text-xs bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] transition"
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          No credit card required • Build in minutes • Production-ready
        </p>
      </div>
    </section>
  );
};

export default Home;
