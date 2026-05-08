
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, Award, Building, Users, Shield, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

const Agents = () => {
  // Single company model - no public agent submissions
  const companyInfo = {
    name: "CloudHome Properties",
    tagline: "Your Trusted Property Management Company",
    rating: 4.8,
    totalProperties: "500+",
    yearsInBusiness: 15,
    happyClients: "2000+",
    description: "CloudHome Properties is a premier real estate company dedicated to helping you find your perfect home. We manage all property listings centrally, ensuring consistency, quality, and professional service across all our properties.",
    services: [
      "Property Listings Management",
      "Property Inquiries Handling",
      "Virtual Property Tours",
      "Market Analysis",
      "Legal Support",
      "Investment Advice"
    ]
  };

  const teamMembers = [
    {
      id: 1,
      name: "Property Management",
      role: "Listing Manager",
      email: "listings@cloudhome.com",
      phone: "(555) 123-4567",
      description: "Manages all property listings and updates"
    },
    {
      id: 2,
      name: "Customer Support",
      role: "Support Team",
      email: "support@cloudhome.com",
      phone: "(555) 123-4568",
      description: "Handles user inquiries and requests"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001f3f] mb-4">
            About CloudHome
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a professional property management company handling all property listings 
            centrally with expertise, integrity, and dedication to our clients.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Building className="w-8 h-8 mx-auto text-[#001f3f] mb-3" />
            <p className="text-3xl font-bold text-[#001f3f] mb-1">{companyInfo.totalProperties}</p>
            <p className="text-sm text-gray-600">Active Properties</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 mx-auto text-[#001f3f] mb-3" />
            <p className="text-3xl font-bold text-[#001f3f] mb-1">{companyInfo.happyClients}</p>
            <p className="text-sm text-gray-600">Satisfied Clients</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Star className="w-8 h-8 mx-auto text-[#001f3f] mb-3" />
            <p className="text-3xl font-bold text-[#001f3f] mb-1">{companyInfo.rating}</p>
            <p className="text-sm text-gray-600">Client Rating</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
            <Award className="w-8 h-8 mx-auto text-[#001f3f] mb-3" />
            <p className="text-3xl font-bold text-[#001f3f] mb-1">{companyInfo.yearsInBusiness}+</p>
            <p className="text-sm text-gray-600">Years Experience</p>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#001f3f] px-6 py-8">
            <h2 className="text-2xl font-semibold text-white mb-2">{companyInfo.name}</h2>
            <p className="text-gray-300">{companyInfo.tagline}</p>
          </div>
          <div className="p-8">
            <p className="text-gray-700 mb-8 leading-relaxed">{companyInfo.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-6">What We Offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companyInfo.services.map((service, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#001f3f] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose CloudHome</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-[#001f3f] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Centralized Management</h4>
                <p className="text-gray-600 text-sm">All properties are managed exclusively by CloudHome, ensuring consistency and quality across all listings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-[#001f3f] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Service</h4>
                <p className="text-gray-600 text-sm">Our dedicated team provides professional, reliable service to every client for a seamless experience.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-[#001f3f] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Transparent Process</h4>
                <p className="text-gray-600 text-sm">We believe in transparency and open communication throughout the entire property search process.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-[#001f3f] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                <p className="text-gray-600 text-sm">Our experienced team is always ready to answer questions and help you make informed decisions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm text-[#001f3f] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#001f3f] to-[#002d5f] rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-gray-200 mb-6">Sign in to browse our exclusive property listings and submit inquiries.</p>
          <Button className="bg-white text-[#001f3f] hover:bg-gray-100 font-medium">
            Browse Properties
          </Button>
        </div>

        {/* Information Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-blue-900">
            <strong>About Our Model:</strong> CloudHome operates as a centralized property management company. All property listings are managed exclusively by CloudHome. 
            Users can sign up, browse properties, view details, and submit inquiries or requests through our platform. This ensures every property meets our quality standards 
            and every client receives professional, consistent service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Agents;
