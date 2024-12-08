"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import the Lucide icons

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-3 hover:cursor-pointer"
        >
          <Image
            width={50}
            height={50}
            src="/favicon.jpg"
            alt="TaskSyncro Logo"
            className="rounded-lg shadow-md"
          />
          <h1 className="text-xl font-semibold text-gray-800">TaskSyncro</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-gray-800 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6 mx-auto">
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/features" className="hover:text-blue-600">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-blue-600">
            Pricing
          </Link>
        </div>

        {/* Authentication Links */}
        <div className="hidden lg:flex space-x-4">
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

      {/* Mobile Navigation Links */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:hidden bg-white text-gray-800 space-y-4 py-4 px-6 text-center mx-auto`}
      >
        <Link href="/features" className="block hover:text-blue-600">
          Features
        </Link>
        <Link href="/pricing" className="block hover:text-blue-600">
          Pricing
        </Link>

        {/* Authentication Links for Mobile */}
        <div className="flex flex-col space-y-4">
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
