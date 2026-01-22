import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-[#FFF4E0] to-[#FFE8C2] border-b border-orange-200">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-orange-700 font-mono tracking-tight">
            QuickNote
          </h1>

          <Link
            to={"/create"}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-gradient-to-r from-orange-400 to-orange-500
                       text-white font-semibold
                       hover:from-orange-500 hover:to-orange-600
                       transition-all duration-200 shadow-sm"
          >
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
