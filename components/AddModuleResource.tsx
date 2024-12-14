"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ShowYoutubeUrlUpload } from "./ShowYoutubeUrlUpload";
import { ShowDocUpload } from "./ShowDocUpload";

const AddModuleResource = ({ slug }: { slug: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleUploadType = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto perspective">
      <div
        className={`relative preserve-3d duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="backface-hidden w-full">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShowYoutubeUrlUpload slug={slug} />
            <div className="mt-4 text-center">
              <p className="mb-2">Want to upload a document?</p>
              <Button onClick={toggleUploadType} variant="outline">
                Upload Document
              </Button>
            </div>
          </div>
        </div>
        <div className="backface-hidden w-full absolute top-0 left-0 rotate-y-180">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ShowDocUpload slug={slug} />
            <div className="mt-4 text-center">
              <p className="mb-2">Want to upload a YouTube URL?</p>
              <Button onClick={toggleUploadType} variant="outline">
                Add YouTube Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModuleResource;
