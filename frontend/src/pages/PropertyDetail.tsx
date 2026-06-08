import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Square, ArrowLeft, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPriceBIF } from "@/lib/utils";

interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  description?: string;
  type?: string;
}

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    // Fetch property from backend
    fetch(`http://localhost:4000/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex items-center justify-center py-20">Loading...</div>
      <Footer />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex items-center justify-center py-20">Property not found</div>
      <Footer />
    </div>
  );

  const formatPrice = formatPriceBIF;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/properties')}
          className="mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Properties
        </Button>

        {/* Property Image and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-96 lg:h-[600px] object-cover rounded-lg mb-8"
            />
            
            {/* Property Description */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-[#1a472a]">About This Land Plot</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || `This is a premium land plot located in ${property.address}. The plot covers ${property.sqft.toLocaleString()} square feet and presents an excellent opportunity for investment and development. Perfect for building residential or commercial projects in a growing area of Burundi.`}
                </p>
              </CardContent>
            </Card>

            {/* Property Features */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#1a472a]">Plot Size</h2>
                <div className="text-center">
                  <Square className="w-8 h-8 mx-auto mb-2 text-[#1a472a]" />
                  <p className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Square Feet</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Price and Contact */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <Card className="sticky top-20 mb-6">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold text-[#1a472a] mb-2">{property.title}</h1>
                <p className="text-gray-600 mb-6 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.address}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-600 text-sm mb-2">Price</p>
                  <p className="text-4xl font-bold text-[#1a472a]">
                    {formatPrice(property.price)}
                  </p>
                </div>

                {property.type && (
                  <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                    <p className="text-gray-600 text-sm">Property Type</p>
                    <p className="font-semibold text-gray-900">{property.type}</p>
                  </div>
                )}

                <Button
                  onClick={() => navigate('/contact')}
                  className="w-full mb-3 bg-[#1a472a] hover:bg-[#2d6a44] text-white py-3 text-base font-medium"
                >
                  Schedule a Viewing
                </Button>

                {/* Contact Information */}
                <Card className="mt-6 border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-gray-900">Contact Us</h3>
                    
                    <div className="space-y-4">
                      <a href="tel:+257223456789" className="flex items-center text-gray-600 hover:text-[#1a472a] transition-colors">
                        <Phone className="w-5 h-5 mr-3 text-[#1a472a]" />
                        <span>(123) 456-7890</span>
                      </a>
                      
                      <a href="mailto:info@burundiproperties.bi" className="flex items-center text-gray-600 hover:text-[#1a472a] transition-colors">
                        <Mail className="w-5 h-5 mr-3 text-[#1a472a]" />
                        <span>info@realestate.com</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
