import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7E8]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="btn btn-ghost text-orange-700 hover:bg-orange-100 mb-6"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-white border border-orange-100 shadow-md">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-orange-700 mb-4">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-orange-800">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered focus:border-orange-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-orange-800">Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 focus:border-orange-400"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg
                               bg-gradient-to-r from-orange-400 to-orange-500
                               text-white font-semibold
                               hover:from-orange-500 hover:to-orange-600
                               transition-all disabled:opacity-60"
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;
