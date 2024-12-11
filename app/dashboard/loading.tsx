import { Loader2 } from "lucide-react";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full p-12 bg-white rounded-xl shadow-md">
      <Loader2 className="animate-spin text-blue-500" size={48} />
      <span className="ml-4 text-gray-600 text-xl">Loading modules...</span>
    </div>
  );
};
export default Loading;
