"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Playlists } from "@/components/music/Playlists";

const Page = () => {
  const [isMobilePage, setIsMobilePage] = useState(false);
  const router = useRouter();

  // Check if the user is on a mobile device or not
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobilePage(true);
      } else {
        setIsMobilePage(false);
        router.push("/dashboard");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  return (
    <>
      {isMobilePage ? (
        <div>
          <Playlists />
        </div>
      ) : (
        <h1>This is not a mobile page</h1>
      )}
    </>
  );
};

export default Page;