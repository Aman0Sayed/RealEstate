
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Trash2, Bell } from "lucide-react";

const SavedProperties = () => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: 850000,
      address: "123 Main St, Downtown",
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      savedDate: "2024-01-15",
      alertEnabled: true
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
      savedDate: "2024-01-10",
      alertEnabled: false
    }
  ]);

  const removeSaved = (id: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleAlert = (id: number) => {
    setSavedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, alertEnabled: !item.alertEnabled } : item
      )
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gradient">Saved Properties</h2>
        <Badge variant="outline" className="px-4 py-2 rounded-full">
          {savedItems.length} saved
        </Badge>
      </div>

      {savedItems.length === 0 ? (
        <Card className="property-card text-center">
          <CardContent className="p-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-4">No Saved Properties</h3>
            <p className="text-muted-foreground mb-6">
              Start browsing properties and save your favorites to see them here.
            </p>
            <Button className="btn-primary">Browse Properties</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {savedItems.map((property) => (
            <Card key={property.id} className="property-card group">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`bg-white/90 rounded-full w-10 h-10 ${
                      property.alertEnabled ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => toggleAlert(property.id)}
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/90 hover:bg-red-100 rounded-full w-10 h-10 text-red-500"
                    onClick={() => removeSaved(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-2">{property.title}</h4>
                <p className="text-2xl font-bold text-primary mb-3">
                  {formatPrice(property.price)}
                </p>
                <p className="text-muted-foreground mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.address}
                </p>
                
                <div className="flex justify-between text-muted-foreground mb-4">
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

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Saved {new Date(property.savedDate).toLocaleDateString()}
                  </span>
                  {property.alertEnabled && (
                    <Badge className="gradient-secondary text-white px-2 py-1 text-xs rounded-full">
                      Alert ON
                    </Badge>
                  )}
                </div>
                
                <Button className="w-full btn-primary mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;
