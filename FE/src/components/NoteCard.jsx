import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note", error);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-white border border-orange-100
                 border-t-4 border-t-orange-400
                 hover:shadow-lg transition-all duration-200"
    >
      <div className="card-body">
        <h3 className="card-title text-orange-800">
          {note.title}
        </h3>

        <p className="text-orange-900/70 line-clamp-3">
          {note.content}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-orange-900/50">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4 text-orange-500" />
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
