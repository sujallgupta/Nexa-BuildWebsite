import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, FolderIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import api from "@/configs/axios";
import { toast } from "sonner";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/api/project/published");
      setProjects(data.projects);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader2Icon className="size-7 animate-spin text-indigo-300" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-12 min-h-[80vh]">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Community Projects
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Explore what people are building with Nexa
              </p>
            </div>

            {/* Projects Grid */}
            <div className="flex flex-wrap gap-5">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/view/${project.id}`}
                  target="_blank"
                  className="
                    w-72 max-sm:mx-auto
                    bg-gray-900/60 border border-white/10
                    rounded-xl overflow-hidden
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-indigo-500/40
                    hover:shadow-[0_10px_40px_rgba(99,102,241,0.25)]
                  "
                >
                  {/* Preview */}
                  <div className="relative w-full h-40 bg-black/60 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No Preview Available
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 text-white bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h2>
                      <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-full">
                        Website
                      </span>
                    </div>

                    <p className="text-gray-400 mt-1 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs">
                        <span className="size-5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center text-black font-semibold">
                          {project.user?.name?.slice(0, 1) || "N"}
                        </span>
                        <span className="text-gray-200">
                          {project.user?.name || "Nexa"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
            <div
              className="
                mb-6 flex h-16 w-16 items-center justify-center rounded-full
                bg-gradient-to-br from-indigo-500/20 to-purple-500/10
                text-indigo-300
                shadow-[0_0_30px_rgba(99,102,241,0.35)]
              "
            >
              <FolderIcon size={28} />
            </div>

            <h2 className="text-3xl font-semibold text-white">
              No projects yet
            </h2>

            <p className="mt-2 max-w-md text-gray-400">
              Start your first project and let Nexa build a website for you in
              minutes.
            </p>

            <button
              onClick={() => navigate("/")}
              className="
                mt-6 flex items-center gap-2
                rounded-full px-6 py-2.5
                text-white font-medium
                bg-gradient-to-r from-indigo-600 to-purple-600
                hover:brightness-110 active:scale-95 transition
                shadow-[0_0_30px_rgba(99,102,241,0.35)]
              "
            >
              <PlusIcon size={18} />
              Create your first project
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Community;
