import {
  Home,
  User,
  Settings,
  Group,
  StopCircleIcon,
  GroupIcon,
  LucideGroup,
  PersonStanding,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-blue-700 text-white p-2 rounded-full shadow-lg md:hidden"
        onClick={() => setOpen(true)}
        style={{ display: open ? "none" : "block" }}
        aria-label="Open sidebar"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <aside
        className={`h-screen w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white flex flex-col shadow-xl fixed top-0 left-0 transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-3xl font-extrabold tracking-wide border-b border-blue-500 flex items-center gap-2 relative">
          <span className="bg-white text-blue-700 rounded-full px-2 py-1 text-lg">
            D
          </span>
          Drawnic
          <button
            className="absolute right-2 top-2 text-blue-700 bg-white rounded-full p-1 hover:bg-blue-100 md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l8 8M6 14L14 6" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2 text-white">
          <Link to="/dashboard">
            <div className="flex text-white items-center gap-3 p-3 rounded-lg hover:bg-blue-500/70 transition font-medium">
              <Home size={22} /> <span>Dashboard</span>
            </div>
          </Link>
          <Link to="/players">
            <div className="flex text-white items-center gap-3 p-3 rounded-lg hover:bg-blue-500/70 transition font-medium">
              <User size={22} /> <span>Players</span>
            </div>
          </Link>{" "}
          <Link to="/teams">
            <div className="flex text-white items-center gap-3 p-3 rounded-lg hover:bg-blue-500/70 transition font-medium">
              <Group size={22} /> <span>Teams</span>
            </div>
          </Link>
          <Link to="/drawpage">
            <div className="flex text-white items-center gap-3 p-3 rounded-lg hover:bg-blue-500/70 transition font-medium">
              <StopCircleIcon size={22} /> <span>Draw Page</span>
            </div>
          </Link>
          <Link to="/playersByTeam">
            <div className="flex text-white items-center gap-3 p-3 rounded-lg hover:bg-blue-500/70 transition font-medium">
              <PersonStanding size={22} /> <span>Players by team</span>
            </div>
          </Link>
          <Link to="/assign-players">
            <div className="flex text-white items-center gap-3 p-3 rounded-lg hover:bg-blue-500/70 transition font-medium">
              <Send size={22} /> <span>Assign Manually</span>
            </div>
          </Link>
        </nav>
        <div className="p-4 border-t border-blue-500 text-xs text-center opacity-80">
          &copy; 2025 Drawnic
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
