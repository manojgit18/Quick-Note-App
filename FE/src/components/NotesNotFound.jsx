import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-orange-100 rounded-full p-8">
        <NotebookIcon className="size-10 text-orange-500" />
      </div>

      <h3 className="text-2xl font-bold text-orange-800">
        No notes yet
      </h3>

      <p className="text-orange-900/70">
        Ready to organize your thoughts? Create your first note and get started.
      </p>

      <Link
        to="/create"
        className="px-5 py-2 rounded-lg
                   bg-gradient-to-r from-orange-400 to-orange-500
                   text-white font-semibold
                   hover:from-orange-500 hover:to-orange-600
                   transition-all"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
