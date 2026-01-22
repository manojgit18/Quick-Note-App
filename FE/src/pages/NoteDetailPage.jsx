import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);

        // ✅ normalize old / dirty data
        setNote({
          title: res.data?.title || "",
          content: res.data?.content || "",
        });
      } catch (err) {
        toast.error("Failed to load note",err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!note.title?.trim() || !note.content?.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note permanently?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED]">
        <LoaderIcon className="size-10 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] to-[#FFE8C8]">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="btn btn-ghost text-orange-700 hover:bg-orange-100"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-outline border-orange-400 text-orange-700 hover:bg-orange-100"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete
            </button>
          </div>

          {/* Card */}
          <div className="card bg-white shadow-xl border border-orange-200">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-orange-700 mb-4">
                Edit Note
              </h2>

              {/* Title */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-orange-700 font-medium">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered border-orange-300 focus:border-orange-500 focus:outline-none"
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                  placeholder="Note title"
                />
              </div>

              {/* Content */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-orange-700 font-medium">
                    Content
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-36 border-orange-300 focus:border-orange-500 focus:outline-none"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  placeholder="Write your thoughts..."
                />
              </div>

              {/* Actions */}
              <div className="card-actions justify-end">
                <button
                  className="btn bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
