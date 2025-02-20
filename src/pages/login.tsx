"use client";
import { useState } from "react";
import { login, } from "../firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import '../app/globals.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     await googleLogin();
  //     router.push("/dashboard");
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/logo.webp" alt="Logo" width={40} height={40} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-sm text-gray-700">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign in
        </button>

        {/* OR Divider */}
        {/* <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}

        {/* Social Login Buttons */}
        {/* <div className="flex gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-1/2 border py-2 rounded-md hover:bg-gray-100"
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
            Google
          </button>
        </div> */}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
