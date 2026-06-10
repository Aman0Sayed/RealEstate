import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPriceBIF } from "@/lib/utils";
import { listProperties } from "@/lib/api";

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

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadProperties = async () => {
      try {
        const data = await listProperties();
        if (!isMounted) return;

        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Filter properties based on search
    const filtered = properties.filter(property =>
      property.title.toLowerCase().includes(searchLocation.toLowerCase()) ||
      property.address.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchLocation, properties]);

  const formatPrice = formatPriceBIF;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#1a472a] to-[#2d6a44] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Land Plots in Burundi</h1>
          <p className="text-lg text-gray-200">Browse our available land plots across Burundi for investment and development</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Input
              placeholder="Search by location or property name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="h-12 text-base border-gray-300"
            />
          </div>
          <p className="text-gray-600 mt-4">{filteredProperties.length} properties found</p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p>Loading properties...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No properties found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/property/${property.id}`)}>
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{property.title}</h3>
                    <p className="text-2xl font-bold text-[#1a472a] mb-3">
                      {formatPrice(property.price)}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </p>
                    
                    {property.description && (
                      <p className="text-gray-600 text-sm mb-4">
                        {property.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between text-gray-600 text-sm mb-6">
                      <span className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.sqft.toLocaleString()} sqft
                      </span>
                    </div>
                    
                    <Button className="w-full bg-[#1a472a] hover:bg-[#2d6a44] text-white">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
