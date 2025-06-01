import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PreviewDN from "../assets/Dashboard.jpg";
import PreviewDN2 from "../assets/undi.jpg";
import PreviewDN3 from "../assets/players.jpg";
const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-yellow-50 to-white w-full">
      <header className="w-full flex justify-between items-center px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-yellow-400 text-transparent bg-clip-text drop-shadow">
          DrawNic
        </h1>
        <div>
          {isLoggedIn ? (
            <Link to="/dashboard">
              <button className="bg-green-500 hover:bg-green-400 transition-all w-32 md:w-40 p-3 md:p-4 rounded-full text-white font-semibold shadow-lg">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/auth">
              <button className="bg-blue-500 hover:bg-blue-400 transition-all w-32 md:w-40 p-3 md:p-4 rounded-full text-white font-semibold shadow-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center w-full">
        <div className="text-center space-y-6 w-full px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-yellow-300 text-transparent bg-clip-text drop-shadow-lg">
            Welcome to DrawNic
          </h2>
          <p className="text-lg md:text-2xl text-blue-700 font-medium max-w-xl mx-auto">
            The lottery or player drawing system for your mini soccer game.
          </p>
          <div className="mt-14 flex justify-center relative h-56 md:h-64">
            {/* Blue blob background */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                width: "340px",
                height: "260px",
                zIndex: 0,
                filter: "blur(40px)",
                background:
                  "radial-gradient(circle at 60% 40%, #3b82f6 60%, transparent 100%)",
                opacity: 0.5,
              }}
            />
            <img
              src={PreviewDN2}
              alt="Soccer Illustration"
              className="w-40 md:w-70 shadow-lg absolute left-1/2 -translate-x-[110%] top-8 md:top-18 z-20"
              style={{ zIndex: 20 }}
            />
            <img
              src={PreviewDN}
              alt="Soccer Illustration"
              className="w-48 md:w-90 shadow-xl absolute left-1/2 -translate-x-1/2 top-0 z-10"
              style={{ zIndex: 10 }}
            />
            <img
              src={PreviewDN3}
              alt="Soccer Illustration"
              className="w-40 md:w-70 shadow-lg absolute left-1/2 translate-x-[10%] top-8 md:top-18 z-20"
              style={{ zIndex: 20 }}
            />
          </div>
        </div>
      </main>
      <footer className="w-full text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DrawNic. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
