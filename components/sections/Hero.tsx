"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const FloatingElement = ({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-8, 8, -8] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const router = useRouter();
  return (
    <div className="relative pt-32 sm:pt-40 lg:pt-48 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mx-auto max-w-2xl lg:mx-0 mb-[4.5rem]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Learn Smarter, <span className="block">Not Harder</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Experience personalized micro-learning that adapts to your
                skills and interests. Master new abilities in small, digestible
                pieces tailored just for you.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="text-lg"
                  onClick={() => router.push("/signup")}
                >
                  Start Your Learning Journey
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="mt-[15rem] lg:mt-[4.5rem] flex justify-center relative h-[400px]">
            <div className="relative w-full max-w-[500px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0"
              >
                <FloatingElement>
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80"
                    alt="Student Learning"
                    className="w-64 h-48 object-cover rounded-2xl shadow-2xl absolute -top-4 -left-4 z-20"
                  />
                </FloatingElement>
                <FloatingElement delay={0.3}>
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                    alt="Online Education"
                    className="w-56 h-40 object-cover rounded-2xl shadow-2xl absolute top-1/4 -right-8 z-10"
                  />
                </FloatingElement>
                <FloatingElement delay={0.6}>
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                    alt="Digital Learning"
                    className="w-60 h-44 object-cover rounded-2xl shadow-2xl absolute bottom-0 left-12 z-30"
                  />
                </FloatingElement>
                <div
                  className="absolute inset-[-2rem] bg-gradient-to-r from-background/80 via-background/20 to-background/80 backdrop-blur-[1px] rounded-[2rem]"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, var(--background) 100%)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
