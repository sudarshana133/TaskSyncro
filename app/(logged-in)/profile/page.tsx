"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { account } from "@/lib/appwrite";
import React from "react";

const Page = () => {
  const { user } = useUser();
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="mt-4">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          {user?.points !== undefined && (
            <p>
              <strong>Points:</strong> {user.points}
            </p>
          )}
          {user?.role && (
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          )}
        </div>
        <Button
          onClick={async () => {
            await account.deleteSession("current");
            window.location.href = "/login";
          }}
          className="mt-4 bg-red-500 text-white rounded px-4 py-2"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Page;
