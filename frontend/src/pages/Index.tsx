
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Square,
  CheckCircle,
  Award,
  Users,
  Building2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPriceBIF } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();

  const featuredProperties = [
    {
      id: 1,
      title: "Premium Land Plot - Bujumbura",
      price: 2500000,
      address: "Bujumbura",
      beds: 0,
      baths: 0,
      sqft: 5000,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Commercial Land - Gitega",
      price: 3200000,
      address: "Gitega",
      beds: 0,
      baths: 0,
      sqft: 8000,
      image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Residential Land - Ngozi",
      price: 1800000,
      address: "Ngozi",
      beds: 0,
      baths: 0,
      sqft: 6000,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Waterfront Land - Bujumbura",
      price: 4500000,
      address: "Bujumbura",
      beds: 0,
      baths: 0,
      sqft: 12000,
      image: "https://images.unsplash.com/photo-1500382017468-7049fae79eef?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Development Land - Muramvya",
      price: 1400000,
      address: "Muramvya",
      beds: 0,
      baths: 0,
      sqft: 4500,
      image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Prime Land - Gitega CBD",
      price: 2800000,
      address: "Gitega",
      beds: 0,
      baths: 0,
      sqft: 3500,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    }
  ];

  const stats = [
    { icon: Building2, label: "Land Plots Available", value: "18" },
    { icon: Users, label: "Happy Investors", value: "250+" },
    { icon: Award, label: "Years Experience", value: "12+" },
    { icon: CheckCircle, label: "Successful Sales", value: "180+" }
  ];



  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-[#1a472a] to-[#2d6a44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Find Your Land in Burundi
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-12">
              Discover premium land plots across Burundi. Invest in prime locations in Bujumbura, Gitega, Ngozi, and more with STAR Properties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/properties')}
                className="px-8 py-3 text-base font-medium bg-white text-[#1a472a] hover:bg-gray-100 rounded-lg transition-colors"
              >
                Browse Properties
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 text-base font-medium border border-white text-white hover:bg-white hover:text-[#1a472a] rounded-lg transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#1a472a] rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1a472a]">
              Featured Land Plots
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our selection of premium land plots across Burundi, perfect for investment and development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/property/${property.id}`)}>
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">{property.title}</h4>
                  <p className="text-xl font-bold text-[#1a472a] mb-2">
                    {formatPriceBIF(property.price)}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.address}
                  </p>
                  
                  <div className="flex justify-between text-gray-600 text-sm mb-4">
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                  
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-[#1a472a] rounded-lg hover:bg-[#2d6a44] transition-colors">
                    View Details
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className="px-8 py-3 text-base font-medium text-white bg-[#1a472a] hover:bg-[#2d6a44] rounded-lg transition-colors"
              onClick={() => navigate('/properties')}
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#1a472a]">
                About STAR Properties
              </h2>
              <p className="text-gray-600 mb-4">
                STAR Properties is Burundi's leading land investment platform. We connect investors with premium land plots in strategic locations across the country.
              </p>
              <p className="text-gray-600 mb-6">
                Our expert team provides professional guidance to help you identify and secure the perfect land investment opportunities in Burundi.
              </p>
              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3 text-base font-medium text-[#1a472a] border border-[#1a472a] rounded-lg hover:bg-[#1a472a] hover:text-white transition-colors"
              >
                Learn More About Us
              </button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
                alt="Burundi landscape"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a472a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Invest in Burundi Land?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact STAR Properties to explore our premium land plots and find your perfect investment opportunity.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 text-base font-medium bg-white text-[#1a472a] hover:bg-gray-100 rounded-lg transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
