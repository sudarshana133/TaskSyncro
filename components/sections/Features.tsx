"use client";

import { motion } from "framer-motion";
import { Brain, Music, Trophy, Users, Vote } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    name: "Personalized Learning",
    description:
      "AI-powered content tailored to your unique learning style and goals",
    icon: Brain,
  },
  {
    name: "Public Modules & Voting",
    description:
      "Create and vote on lessons in our collaborative learning environment",
    icon: Vote,
  },
  {
    name: "AI Suggestions",
    description:
      "Adaptive learning powered by AI based on your progress and preferences",
    icon: Users,
  },
  {
    name: "Music Integration",
    description:
      "Enhanced learning experience with integrated background music",
    icon: Music,
  },
  {
    name: "Leaderboard & Gamification",
    description:
      "Earn points and compete with others in a friendly learning environment",
    icon: Trophy,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Features that Make Learning Enjoyable
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how TaskSyncro transforms your learning experience with
            these powerful features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add more feature details or interactive elements here */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
