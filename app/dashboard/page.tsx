import Welcome from "@/components/client/Welcome";
import Modules from "@/components/Modules";
import Recommendation from "@/components/Recommendation";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="grid gap-8">
        <Welcome />
        <Recommendation />
        <Modules />
      </div>
    </div>
  );
};

export default page;
