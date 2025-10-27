"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#FFFFFF]/70 backdrop-blur-md shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-blue-500 font-semibold text-2xl tracking-tight hover:tracking-wider transition-all duration-300">
          EmergencyyCall
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="relative text-gray-700 font-medium hover:text-blue-500 transition-colors duration-300 group"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/history"
            className="relative text-gray-700 font-medium hover:text-blue-500 transition-colors duration-300 group"
          >
            Counseling
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-500 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden bg-white border-t border-gray-200 shadow-inner transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-3 space-y-3">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-500 font-medium transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/history"
            className="text-gray-700 hover:text-blue-500 font-medium transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Counseling
          </Link>
        </div>
      </div>
    </nav>
  );
}
