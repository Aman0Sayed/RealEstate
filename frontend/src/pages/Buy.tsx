
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { getSavedProperties, subscribeToSavedProperties, toggleSavedProperty } from "@/lib/savedProperties";

const Buy = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const syncSavedProperties = () => {
      setSavedProperties(getSavedProperties().map((property) => property.id));
    };

    syncSavedProperties();
    return subscribeToSavedProperties(syncSavedProperties);
  }, []);

  const properties = [
    {
      id: "1",
      title: "Modern Downtown Loft",
      price: 850000,
      location: "Manhattan, NY",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Condo",
      status: "For Sale"
    },
    {
      id: "2",
      title: "Luxury Family Home",
      price: 1250000,
      location: "Brooklyn, NY", 
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "House",
      status: "For Sale"
    },
    {
      id: "3",
      title: "Cozy Suburban Home",
      price: 675000,
      location: "Queens, NY",
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "House", 
      status: "For Sale"
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || property.type === selectedType;
    const matchesPrice = !selectedPrice || 
      (selectedPrice === '0-500k' && property.price <= 500000) ||
      (selectedPrice === '500k-1m' && property.price > 500000 && property.price <= 1000000) ||
      (selectedPrice === '1m-plus' && property.price > 1000000);
    const matchesBeds = !selectedBeds || property.beds >= parseInt(selectedBeds);
    
    return matchesSearch && matchesType && matchesPrice && matchesBeds;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#001f3f] mb-2">Properties for Sale</h1>
          <p className="text-gray-600">Browse our exclusive collection of properties managed by CloudHome</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Location</label>
              <Input 
                placeholder="Search by location, neighborhood..." 
                className="h-10 border-gray-300 focus:border-[#001f3f]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select 
                className="h-10 w-full px-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Property Type"
              >
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select 
                className="h-10 w-full px-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                aria-label="Price Range"
              >
                <option value="">All Prices</option>
                <option value="0-500k">$0 - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-plus">$1M+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <select 
                className="h-10 w-full px-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none"
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                aria-label="Bedrooms"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-[#001f3f] text-white rounded-lg hover:bg-[#001a2f] transition-colors flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-medium">{filteredProperties.length} properties found</p>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-[#001f3f] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-[#001f3f] text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-[#001f3f] text-white rounded">
                    {property.status}
                  </span>
                  <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title="Save property"
                    onClick={() => {
                      const result = toggleSavedProperty({
                        ...property,
                        address: property.location,
                        status: property.status,
                        images: [property.image],
                      });
                      setSavedProperties(result.savedProperties.map((item) => item.id));
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        savedProperties.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">{property.title}</h3>
                  <p className="text-xl font-bold text-[#001f3f] mb-3">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {property.location}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 text-gray-600 text-sm mb-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <Bed className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">{property.beds} beds</span>
                    </div>
                    <div className="text-center">
                      <Bath className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">{property.baths} baths</span>
                    </div>
                    <div className="text-center">
                      <Square className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">{(property.sqft / 1000).toFixed(1)}k sqft</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-[#001f3f] hover:bg-[#001a2f] text-white"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-48 h-40 object-cover"
                  />
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </p>
                        </div>
                        <Badge className="bg-[#001f3f] text-white">For Sale</Badge>
                      </div>
                      <p className="text-2xl font-bold text-[#001f3f] mb-3">{formatPrice(property.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span className="flex items-center"><Bed className="w-4 h-4 mr-1" />{property.beds} beds</span>
                        <span className="flex items-center"><Bath className="w-4 h-4 mr-1" />{property.baths} baths</span>
                        <span className="flex items-center"><Square className="w-4 h-4 mr-1" />{property.sqft.toLocaleString()} sqft</span>
                      </div>
                      <Button
                        className="bg-[#001f3f] hover:bg-[#001a2f] text-white"
                        onClick={() => navigate(`/property/${property.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('');
                setSelectedPrice('');
                setSelectedBeds('');
              }}
              variant="outline"
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;
