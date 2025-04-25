import React from "react";
import Link from "next/link";
import { FiLogOut, FiSmartphone } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FiSmartphone className="h-6 w-6 text-blue-600 mr-2" />
              <span className="font-bold text-xl text-gray-800">
                eSIM Manager
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150"
            >
              <FiLogOut className="h-5 w-5 mr-1" />
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
