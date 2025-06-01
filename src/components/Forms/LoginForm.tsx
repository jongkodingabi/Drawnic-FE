import { useState } from "react";
import { login } from "../../Auth/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ball from "../../assets/ball.svg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      localStorage.setItem("auth_token", "true");
      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Failed to login:", error);
      const errorMessage =
        error?.response?.data?.message || // kalau pakai axios dan backend kirim message
        error?.message ||
        "Invalid email or password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white rounded-2xl shadow-2xl flex overflow-hidden max-w-3xl w-full">
        {/* SVG Section */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-400 p-10">
          <img src={ball} className="w-40 invert drop-shadow-lg" alt="ball" />
        </div>
        {/* Form Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-2 text-blue-700 text-center tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please sign in to your account
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          {/* <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
