"use client";

import { FormEvent, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser, loginWithGoogle } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader";

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Check if the user is already logged in
  const checkSession = async () => {
    try {
      await account.get(); // Check for an active session
      window.location.href = "/dashboard";
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      window.location.href = "/dashboard";
    } catch (error:any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.log("Login error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-100 p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">TaskSyncro</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button
            type="button"
            className="w-full bg-green-500 text-white hover:bg-green-600"
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </Button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
