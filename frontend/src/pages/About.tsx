import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Building2, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Award,
      title: "15+ Years Experience",
      description: "Industry-leading expertise in real estate with a proven track record"
    },
    {
      icon: Users,
      title: "150+ Satisfied Clients",
      description: "Trusted by families and investors across the region"
    },
    {
      icon: Building2,
      title: "12 Quality Properties",
      description: "Carefully selected premium properties in prime locations"
    },
    {
      icon: CheckCircle,
      title: "200+ Successful Sales",
      description: "Helping clients find their perfect properties year after year"
    }
  ];

  const team = [
    {
      name: "John Smith",
      title: "Owner & Lead Agent",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Sarah Johnson",
      title: "Senior Agent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Mike Davis",
      title: "Property Consultant",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#1a472a] to-[#2d6a44] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About STAR Properties</h1>
          <p className="text-lg text-gray-200">Burundi's leading land investment platform</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#1a472a]">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                We believe in more than just buying and selling properties. We're committed to creating lasting relationships with our clients and helping them make informed decisions about one of the most important investments of their lives.
              </p>
              <p className="text-gray-600 mb-6">
                Our team combines extensive market knowledge with personalized service to ensure each client receives the attention and expertise they deserve.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 text-base font-medium bg-[#1a472a] text-white rounded-lg hover:bg-[#2d6a44] transition-colors"
              >
                Contact Us Today
              </button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="Our Mission"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16 text-[#001f3f] text-center">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-[#001f3f] rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16 text-[#001f3f] text-center">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#001f3f]">Our Values</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We conduct all business with honesty and transparency, always putting our clients' interests first.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise</h3>
                <p className="text-gray-600">
                  Our team stays up-to-date with market trends and property values to provide the best advice.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Excellence</h3>
                <p className="text-gray-600">
                  We're committed to exceeding expectations with personalized service and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001f3f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team today and let's find your perfect home together.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 text-base font-medium bg-white text-[#001f3f] hover:bg-gray-100 rounded-lg transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
