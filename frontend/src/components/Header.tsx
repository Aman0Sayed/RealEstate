import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-end h-10 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-700 hover:text-[#001f3f]">
              <Phone size={16} />
              <span>(123) 456-7890</span>
            </a>
            <a href="mailto:info@realestate.com" className="flex items-center space-x-2 text-gray-700 hover:text-[#001f3f]">
              <Mail size={16} />
              <span>info@realestate.com</span>
            </a>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-[#1a472a] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-xl font-bold text-[#1a472a]">STAR Properties</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/properties')}
              className="text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors"
            >
              Properties
            </button>
            <button
              onClick={() => navigate('/about')}
              className="text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2 bg-[#1a472a] text-white text-sm font-medium rounded-lg hover:bg-[#2d6a44] transition-colors"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors py-2"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/properties');
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors py-2"
              >
                Properties
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors py-2"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-[#1a472a] text-sm font-medium transition-colors py-2"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 bg-[#1a472a] text-white text-sm font-medium rounded-lg hover:bg-[#2d6a44] transition-colors w-full mt-2"
              >
                Get in Touch
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;