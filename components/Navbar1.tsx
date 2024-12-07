import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-3 hover:cursor-pointer">
            <Image
              width={50}
              height={50}
              src="/favicon.jpg"
              alt="TaskSyncro Logo"
              className="rounded-lg shadow-md"
            />
            <h1 className="text-xl font-semibold text-gray-800">TaskSyncro</h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/features" className="hover:text-blue-600">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-blue-600">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
        </div>

        {/* Authentication Links */}
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg shadow-sm hover:bg-primary/20 focus:outline-none focus:ring focus:ring-primary/30"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary/50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
