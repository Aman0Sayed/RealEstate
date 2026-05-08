
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers } from "lucide-react";

const MapView = ({ properties = [] }: { properties?: any[] }) => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState('satellite');

  // Mock properties for demo purposes
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: 850000,
      lat: 40.7589,
      lng: -73.9851,
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Luxury Family Home",
      price: 1250000,
      lat: 40.7505,
      lng: -73.9934,
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Cozy Suburban Home",
      price: 675000,
      lat: 40.7614,
      lng: -73.9776,
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop"
    }
  ];

  const displayProperties = properties.length > 0 ? properties : mockProperties;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative h-[600px] bg-gray-100 rounded-2xl overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => setMapStyle(mapStyle === 'satellite' ? 'street' : 'satellite')}
        >
          <Layers className="w-4 h-4 mr-2" />
          {mapStyle === 'satellite' ? 'Street' : 'Satellite'}
        </Button>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-green-400"></div>
        </div>
        
        {/* Property Markers */}
        {displayProperties.map((property, index) => (
          <div
            key={property.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            style={{
              left: `${20 + (index * 25)}%`,
              top: `${30 + (index * 15)}%`
            }}
            onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
          >
            <div className={`w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${
              selectedProperty?.id === property.id ? 'ring-4 ring-white' : ''
            }`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            
            {/* Property Popup */}
            {selectedProperty?.id === property.id && (
              <Card className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 property-card">
                <CardContent className="p-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <h4 className="font-bold text-lg mb-2">{property.title}</h4>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {formatPrice(property.price)}
                  </p>
                  <div className="flex justify-between text-sm text-muted-foreground mb-3">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                  <Button className="w-full btn-primary">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
          <h4 className="font-semibold mb-2">Properties</h4>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 gradient-primary rounded-full"></div>
            <span className="text-sm">{displayProperties.length} listings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
