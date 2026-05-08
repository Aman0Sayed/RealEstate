import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Bed, Bath, Square, Heart, Filter, Grid, List, SlidersHorizontal, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import { listProperties } from '@/lib/api';
import { fallbackProperties, getPropertyId, normalizeProperty } from "@/lib/propertyCatalog";
import { getSavedProperties, subscribeToSavedProperties, toggleSavedProperty } from "@/lib/savedProperties";

const Properties = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list" | "map">("grid");
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([200000, 2000000]);
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listProperties().then((res) => {
      if (Array.isArray(res)) setProperties(res);
      else setProperties([]);
    }).catch(err => { console.error(err); setProperties([]); }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const syncSavedProperties = () => {
      setSavedProperties(getSavedProperties().map((property) => property.id));
    };

    syncSavedProperties();
    return subscribeToSavedProperties(syncSavedProperties);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayProperties = (properties.length ? properties : fallbackProperties).map(normalizeProperty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="property-card sticky top-24">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gradient">
                  <SlidersHorizontal className="w-6 h-6 mr-3" />
                  Filters
                </h3>
                
                {/* Search Location */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Enter location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-2 border-purple-100 focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000000}
                    min={200000}
                    step={50000}
                    className="w-full"
                  />
                </div>

                {/* Property Type */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3">Property Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-purple-100">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-3">Bedrooms</label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="h-12 rounded-xl border-2 border-purple-100">
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full btn-primary h-12">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Properties List */}
          <div className="lg:w-3/4">
            {/* Enhanced Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold text-gradient mb-2">Properties for Sale</h2>
                <p className="text-xl text-muted-foreground">{displayProperties.length} exceptional properties found</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant={viewType === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("grid")}
                  className="rounded-xl"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewType === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("list")}
                  className="rounded-xl"
                >
                  <List className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewType === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("map")}
                  className="rounded-xl"
                >
                  <Map className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Map View */}
            {viewType === "map" && (
              <div className="mb-8">
                <MapView properties={displayProperties} />
              </div>
            )}

            {/* Enhanced Properties Grid/List */}
            {viewType !== "map" && (
              <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "space-y-8"}>
                {displayProperties.map((property) => (
                  <Card 
                    key={property.id} 
                    className={`property-card group ${viewType === "list" ? "flex" : ""}`}
                  >
                    <div className={`relative overflow-hidden ${viewType === "list" ? "w-1/3" : ""}`}>
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                          viewType === "list" ? "w-full h-full" : "w-full h-64"
                        }`}
                      />
                      <div className="absolute top-6 left-6">
                        {property.featured && (
                          <Badge className="gradient-secondary text-white px-4 py-2 rounded-full">
                            ✨ Featured
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-6 right-6 bg-white/90 hover:bg-white rounded-full w-12 h-12"
                        onClick={() => {
                          const result = toggleSavedProperty(property);
                          setSavedProperties(result.savedProperties.map((item) => item.id));
                        }}
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            savedProperties.includes(getPropertyId(property))
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </Button>
                    </div>
                    
                    <CardContent className={`p-8 ${viewType === "list" ? "flex-1" : ""}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {property.title}
                        </h4>
                        <Badge variant="outline" className="rounded-full">{property.type}</Badge>
                      </div>
                      
                      <p className="text-3xl font-bold text-primary mb-4">
                        {formatPrice(property.price)}
                      </p>
                      
                      <p className="text-muted-foreground mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        {property.address}
                      </p>

                      {viewType === "list" && (
                        <p className="text-muted-foreground mb-6">{property.description}</p>
                      )}
                      
                      <div className="flex justify-between text-muted-foreground mb-6">
                        <span className="flex items-center">
                          <Bed className="w-5 h-5 mr-2" />
                          {property.beds} beds
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-5 h-5 mr-2" />
                          {property.baths} baths
                        </span>
                        <span className="flex items-center">
                          <Square className="w-5 h-5 mr-2" />
                          {property.sqft.toLocaleString()} sqft
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full btn-primary"
                        onClick={() => navigate(`/property/${property.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
