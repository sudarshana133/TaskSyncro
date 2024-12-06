"use client";

import { FormEvent, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser, loginWithGoogle, registerUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader";

const SignupPage = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const checkSession = async () => {
    try {
      await account.get();
      window.location.href = "/dashboard";
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerUser(username, email, password);
      if (res) {
        await loginUser(email, password);
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.log("Registration error:", error);
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
        <form className="space-y-4" onSubmit={(e) => handleRegister(e)}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            required
          />
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
            Register
          </Button>
          <Button
            type="button"
            className="w-full bg-green-500 text-white hover:bg-green-600"
            onClick={loginWithGoogle}
          >
            Sign up with Google
          </Button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;