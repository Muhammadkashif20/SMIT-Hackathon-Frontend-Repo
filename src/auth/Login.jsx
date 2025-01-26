import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
          <p className="text-center text-gray-500 mb-8">
            Please login to your account
          </p>

          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6">
            Login
          </button>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Optional Divider and Google Login */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Login;
