
import React from 'react';
import { Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a472a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1a472a] font-bold text-sm">SP</span>
              </div>
              <h3 className="text-xl font-semibold">STAR Properties Burundi</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              STAR Properties is your premier destination for land investment opportunities in Burundi. We offer carefully selected plots across the country for development and investment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors text-sm">Home</Link>
              <Link to="/properties" className="block text-gray-300 hover:text-white transition-colors text-sm">Properties</Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">About Us</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Property Sales</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Property Rentals</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Consultation</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Market Analysis</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href="mailto:info@burundiproperties.bi" className="text-gray-300 hover:text-white text-sm">info@burundiproperties.bi</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Avenue du Japon<br />Rohero, Bujumbura, Burundi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 STAR Properties Burundi. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
