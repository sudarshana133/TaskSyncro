"use client";
import { FormEvent, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser, loginWithGoogle } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Check if the user is already logged in
  const checkSession = async () => {
    try {
      const user = await account.get();
      if (user) {
        window.location.href = "/dashboard";
      }
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in. Please try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 sm:px-8 md:px-0">
      <div className="bg-blue-100 p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full mt-4 sm:mt-20 mx-4 sm:mx-0">
        <h1 className="text-2xl font-bold text-center mb-6">TaskSyncro</h1>
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
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
            Don{"'"}t have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
