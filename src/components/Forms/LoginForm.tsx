import { useState } from "react";
import { login } from "../../Auth/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ball from "../../assets/ball.svg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      localStorage.setItem("auth_token", "true");
      navigate("/dashboard");
      toast.success("Login Successfully");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex overflow-hidden max-w-8xl">
        {/* SVG Section */}
        <div className="hidden md:flex items-center justify-center bg-blue-500 p-8">
          {/* Example SVG, replace with your own */}
          <img src={ball} className="w-30 invert" alt="ball" />
        </div>
        {/* Form Section */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
