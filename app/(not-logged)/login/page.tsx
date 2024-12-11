"use client";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth", {
        email,
        password,
      });
      console.log(res.data);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in. Please try again.",
        variant: "destructive",
      });
      console.log("Login error:", error);
    }
  };

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
