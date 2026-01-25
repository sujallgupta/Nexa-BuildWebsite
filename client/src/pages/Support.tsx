import React from "react";
import {
  Mail,
  Zap,
  ShieldCheck,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

const Support: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Message sent to Nexa support!", {
      description: "Our team will get back to you shortly.",
    });

    e.currentTarget.reset();
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 ">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left info */}
        <div>
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-wide">
            Nexa Support
          </p>

          <h1 className="text-4xl font-bold text-white mt-3 leading-tight">
            We’re here to help.
          </h1>

          <p className="text-slate-400 mt-4 max-w-md">
            Have a question, found a bug, or want to request a feature? Our
            support team usually responds within 24 hours.
          </p>

          <div className="mt-8 space-y-4 text-slate-300 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-500" />
              <span>hello@nexa.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span>Fast and reliable support</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>Private and secure communication</span>
            </div>
          </div>
        </div>

        {/* Right form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1525] border border-slate-800 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="text-sm text-slate-300">Full name</label>
            <div className="mt-2 flex items-center gap-2 border border-slate-700 rounded-xl px-3 h-11 focus-within:ring-2 focus-within:ring-indigo-500/60 transition">
              <User className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-300">Email address</label>
            <div className="mt-2 flex items-center gap-2 border border-slate-700 rounded-xl px-3 h-11 focus-within:ring-2 focus-within:ring-indigo-500/60 transition">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="you@nexa.ai"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-300">Message</label>
            <div className="mt-2 flex gap-2 border border-slate-700 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/60 transition">
              <MessageSquare className="w-4 h-4 text-slate-400 mt-1" />
              <textarea
                rows={4}
                placeholder="How can Nexa help you?"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-500 resize-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl h-11 flex items-center justify-center gap-2 text-white font-medium"
          >
            <Send className="w-4 h-4" />
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
