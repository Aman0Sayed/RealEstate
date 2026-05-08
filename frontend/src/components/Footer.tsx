
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#001f3f] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                <span className="text-[#001f3f] font-bold text-lg">CH</span>
              </div>
              <h3 className="text-xl font-semibold">CloudHome</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in finding the perfect property. We make real estate simple, transparent, and accessible for everyone.
            </p>
            <div className="flex space-x-3">
              <button className="p-2 border border-gray-600 rounded-lg hover:bg-white hover:text-[#001f3f] transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-600 rounded-lg hover:bg-white hover:text-[#001f3f] transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-600 rounded-lg hover:bg-white hover:text-[#001f3f] transition-colors">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-600 rounded-lg hover:bg-white hover:text-[#001f3f] transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/buy" className="block text-gray-300 hover:text-white transition-colors text-sm">Buy Properties</Link>
              <Link to="/rent" className="block text-gray-300 hover:text-white transition-colors text-sm">Rent Properties</Link>
              <Link to="/agents" className="block text-gray-300 hover:text-white transition-colors text-sm">Find Agents</Link>
              <Link to="/dashboard" className="block text-gray-300 hover:text-white transition-colors text-sm">Dashboard</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Property Valuation</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Market Analysis</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Virtual Tours</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Investment Advice</a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@cloudhome.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">123 Real Estate Ave, NY 10001</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-semibold">Newsletter</h5>
              <p className="text-sm text-gray-300">Stay updated with market trends and new listings</p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400 h-10"
                />
                <button className="px-4 py-2 bg-[#FFD700] text-[#001f3f] rounded-lg hover:bg-yellow-400 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 CloudHome. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
