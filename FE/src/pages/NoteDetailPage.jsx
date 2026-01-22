import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated");
      navigate("/");
    } catch {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF7E8] flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7E8]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <div className="flex justify-between mb-6">
            <Link
              to="/"
              className="btn btn-ghost text-orange-700 hover:bg-orange-100"
            >
              <ArrowLeftIcon className="size-5" />
              Back
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-outline border-red-400 text-red-500 hover:bg-red-50"
            >
              <Trash2Icon className="size-5" />
              Delete
            </button>
          </div>

          <div className="card bg-white border border-orange-100 shadow-md">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-orange-800">Title</span>
                </label>
                <input
                  className="input input-bordered focus:border-orange-400"
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-orange-800">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 focus:border-orange-400"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg
                             bg-gradient-to-r from-orange-400 to-orange-500
                             text-white font-semibold
                             hover:from-orange-500 hover:to-orange-600
                             transition-all disabled:opacity-60"
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
