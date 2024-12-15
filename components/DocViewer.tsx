import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { getPDFArrayBuffer } from "@/utils/module-resource-util";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DocViewer = ({ fileId }: { fileId: string }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const previewData = await getPDFArrayBuffer(fileId);
        const pdfBlob = new Blob([previewData], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Failed to fetch or load PDF:", error);
      }
    };

    fetchPdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [fileId]);

  // Dynamically adjust container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto">
      <div className="flex items-center justify-between mt-4 px-2">
        <Button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="
                px-4 py-2 
                bg-primary 
                text-white 
                rounded-md 
                hover:bg-opacity-90 
                disabled:opacity-50 
                disabled:cursor-not-allowed 
                transition-all 
                duration-200
              "
        >
          Previous
        </Button>

        <span className="text-gray-700 font-medium">
          Page {pageNumber} of {numPages}
        </span>

        <button
          onClick={() =>
            setPageNumber((prev) =>
              numPages ? Math.min(prev + 1, numPages) : prev
            )
          }
          disabled={pageNumber >= (numPages || 1)}
          className="
                px-4 py-2 
                bg-primary 
                text-white 
                rounded-md 
                hover:bg-opacity-90 
                disabled:opacity-50 
                disabled:cursor-not-allowed 
                transition-all 
                duration-200
              "
        >
          Next
        </button>
      </div>
      {pdfUrl ? (
        <div className="w-full">
          <Document
            file={pdfUrl}
            onLoadSuccess={onLoadSuccess}
            className="w-full"
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth > 0 ? containerWidth : undefined}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="w-full"
              _className="w-full"
            />
          </Document>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg animate-pulse">Loading PDF...</p>
        </div>
      )}
    </div>
  );
};

export default DocViewer;
