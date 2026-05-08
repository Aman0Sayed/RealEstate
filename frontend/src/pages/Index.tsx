
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  Star,
  TrendingUp,
  Award,
  Users,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSavedProperties, subscribeToSavedProperties, toggleSavedProperty } from "@/lib/savedProperties";

const Index = () => {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = React.useState<string[]>([]);

  React.useEffect(() => {
    const syncSavedProperties = () => {
      setSavedProperties(getSavedProperties().map((property) => property.id));
    };

    syncSavedProperties();
    return subscribeToSavedProperties(syncSavedProperties);
  }, []);

  const featuredProperties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: 850000,
      address: "123 Main St, Downtown",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      badge: "Featured"
    },
    {
      id: 2,
      title: "Luxury Family Home",
      price: 1250000,
      address: "456 Oak Avenue, Westside",
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      badge: "New"
    },
    {
      id: 3,
      title: "Cozy Suburban Home",
      price: 675000,
      address: "789 Pine Street, Suburbs",
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      badge: "Hot Deal"
    }
  ];

  const stats = [
    { icon: Home, label: "Properties Listed", value: "15,000+" },
    { icon: Users, label: "Happy Clients", value: "8,500+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: TrendingUp, label: "Cities Covered", value: "50+" }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#001f3f]">
              Find Your Perfect Home
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover premium properties with our advanced search technology and expert guidance
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-16 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter location, property type, or keyword..."
                    className="h-12 text-base border-gray-300 focus:border-[#001f3f]"
                  />
                </div>
                <Button 
                  className="h-12 px-8 text-base bg-[#001f3f] hover:bg-[#001a2f] text-white"
                  onClick={() => navigate('/properties')}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Properties
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:border-[#001f3f] hover:text-[#001f3f] transition-colors">
                  New York
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:border-[#001f3f] hover:text-[#001f3f] transition-colors">
                  Los Angeles
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:border-[#001f3f] hover:text-[#001f3f] transition-colors">
                  Chicago
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:border-[#001f3f] hover:text-[#001f3f] transition-colors">
                  Miami
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#001f3f] rounded-lg flex items-center justify-center">
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#001f3f]">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked premium properties that offer the best value and luxury
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors cursor-pointer" onClick={() => navigate(`/property/${property.id}`)}>
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-medium bg-[#001f3f] text-white rounded-full">
                      {property.badge}
                    </span>
                  </div>
                  <button
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    onClick={(event) => {
                      event.stopPropagation();
                      const result = toggleSavedProperty({
                        ...property,
                        images: [property.image],
                        type: "Featured Home",
                        status: "For Sale",
                      });
                      setSavedProperties(result.savedProperties.map((item) => item.id));
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        savedProperties.includes(String(property.id))
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">{property.title}</h4>
                  <p className="text-xl font-bold text-[#001f3f] mb-2">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.address}
                  </p>
                  
                  <div className="flex justify-between text-gray-600 text-sm mb-4">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.beds} beds
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.baths} baths
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-[#FFD700] fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8 (24 reviews)</span>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-[#001f3f] border border-[#001f3f] rounded-lg hover:bg-[#001f3f] hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className="px-8 py-3 text-base font-medium text-white bg-[#001f3f] hover:bg-[#001a2f] rounded-lg transition-colors"
              onClick={() => navigate('/properties')}
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001f3f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property with CloudHome
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 text-base font-medium bg-white text-[#001f3f] hover:bg-gray-100 rounded-lg transition-colors">
              Start Your Search
            </button>
            <button className="px-8 py-3 text-base font-medium border border-white text-white hover:bg-white hover:text-[#001f3f] rounded-lg transition-colors">
              Talk to an Agent
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
