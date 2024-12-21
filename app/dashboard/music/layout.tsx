import BottomBar from "@/components/music/BottomBar";
import Sidebar from "@/components/music/Sidebar";
import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for large screens */}
        <aside className="hidden md:flex md:w-64 lg:w-72 xl:w-80 h-full transition-all duration-300 ease-in-out">
          <div className="w-full h-full overflow-y-auto bg-white shadow-md">
            <Sidebar user={user} />
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Bottom bar for small screens */}
      <div className="md:hidden">
        <BottomBar />
      </div>
    </div>
  );
};

export default Layout;
