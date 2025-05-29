import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="top-0">
        <Link to="/auth">
          <button className="bg-blue-500 hover:bg-blue-400 transition-all w-40 p-4 rounded-full text-white">
            Login
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center text-4xl">
        <h1 className="font-semibold bg-gradient-to-r from-blue-600 to-yellow-300 inline-block text-transparent bg-clip-text">
          DrawNic
        </h1>
        <h4 className="font-semibold text-2xl text-blue-600">
          the lottery or player drawing system in the mini soccer game.{" "}
        </h4>
      </div>
    </>
  );
};

export default LandingPage;
