"use client";
import React, { useState, useEffect } from "react";
import { PlayCircle, PauseCircle, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updatePoints } from "@/utils/user";

const Timer = ({ user }: { user: User }) => {
  const [time, setTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [lastStopTime, setLastStopTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const MAX_TIME = 1800; // 30 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime + accumulatedTime >= MAX_TIME) {
            clearInterval(timer);
            setIsRunning(false);
            toast({
              title: "Session Complete",
              description: "You have reached the maximum allowed time.",
            });
            return MAX_TIME - accumulatedTime;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, accumulatedTime, toast]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    if (time + accumulatedTime < MAX_TIME) {
      setIsRunning(true);
    } else {
      toast({
        title: "Timer Error",
        description: "Maximum time already reached. Please reset the timer.",
        variant: "destructive",
      });
    }
  };

  const stopTimer = async () => {
    setIsRunning(false);
    const totalTimeNow = time + accumulatedTime;
    const timeDifference = totalTimeNow - lastStopTime;

    try {
      if (timeDifference >= 60) {
        // Only update points if new session is at least 1 minute
        await updatePoints(timeDifference, user.$id);
        toast({
          title: "Points Updated",
          description: `You earned points for ${formatTime(
            timeDifference
          )} of learning.`,
        });
        setLastStopTime(totalTimeNow);
      } else {
        toast({
          title: "Session Too Short",
          description: "Session was less than 1 minute. No points awarded.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to stop the timer.",
        variant: "destructive",
      });
    }

    setAccumulatedTime(totalTimeNow);
    setTime(0);
  };

  const resetTimer = async () => {
    const finalTime = time + accumulatedTime;
    const timeDifference = finalTime - lastStopTime;

    if (timeDifference >= 60) {
      try {
        await updatePoints(timeDifference, user.$id);
        toast({
          title: "Timer Reset",
          description: "Your points have been updated, and the timer is reset.",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to reset the timer.",
          variant: "destructive",
        });
      }
    }
    setIsRunning(false);
    setTime(0);
    setAccumulatedTime(0);
    setLastStopTime(0);
  };

  const totalTime = time + accumulatedTime;

  return (
    <div className="flex items-center space-x-4 p-2 bg-white shadow rounded-md">
      <div className="flex items-center space-x-2">
        <PlayCircle
          onClick={startTimer}
          className={`w-6 h-6 cursor-pointer ${
            isRunning || totalTime >= MAX_TIME
              ? "text-gray-300"
              : "text-blue-500 hover:text-blue-600"
          }`}
        />
        <PauseCircle
          onClick={stopTimer}
          className={`w-6 h-6 cursor-pointer ${
            !isRunning
              ? "text-gray-300"
              : "text-yellow-500 hover:text-yellow-600"
          }`}
        />
        <RotateCw
          onClick={resetTimer}
          className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer"
        />
      </div>
      <div className="h-6 w-[1px] bg-gray-300"></div>
      <div className="text-sm font-mono text-gray-800">
        {formatTime(totalTime)}
      </div>
    </div>
  );
};

export default Timer;
