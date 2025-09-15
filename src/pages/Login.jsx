import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setUser } = useAuth();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-10 flex flex-col items-center animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-2xl shadow-md mb-3">
            CRM
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="bg-gray-50 w-full p-6 rounded-xl shadow-inner flex flex-col items-center space-y-4">
          <h2 className="text-lg font-medium text-blue-700">
            Login with Google
          </h2>
          <GoogleLogin
            onSuccess={(cred) => {
              const decoded = jwtDecode(cred.credential);
              setUser(decoded);
            }}
            onError={() => console.log("Login Failed")}
          />
        </div>

        <p className="mt-6 text-sm text-gray-400">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
