import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Bed, Bath, Square, Heart, Share, Phone, Mail, Calendar, ArrowLeft, Star } from "lucide-react";
import Header from "@/components/Header";
import VirtualTour from "@/components/VirtualTour";
import MapView from "@/components/MapView";
import { getProperty } from '@/lib/api';
import { getFallbackPropertyById, normalizeProperty } from "@/lib/propertyCatalog";
import { isPropertySaved, toggleSavedProperty } from "@/lib/savedProperties";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setCurrentImageIndex(0);
    setIsSaved(isPropertySaved(id));
    getProperty(id)
      .then((res) => {
        if (res && !res.message) {
          setProperty(normalizeProperty(res));
          return;
        }

        const fallback = getFallbackPropertyById(id);
        setProperty(fallback ? normalizeProperty(fallback) : null);
      })
      .catch((err) => {
        console.error(err);
        const fallback = getFallbackPropertyById(id);
        setProperty(fallback ? normalizeProperty(fallback) : null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

  const mapProperties = [{ ...property, image: property.images[0] }];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-xl border-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Properties
        </Button>

        {/* Enhanced Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-96 lg:h-[600px] object-cover rounded-3xl shadow-deep"
            />
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-3">
            {property.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className={`w-full h-20 lg:h-32 object-cover rounded-2xl cursor-pointer transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'ring-4 ring-primary shadow-lg' 
                    : 'opacity-70 hover:opacity-100 hover:shadow-lg'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <Card className="property-card">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
                    <p className="text-muted-foreground flex items-center text-xl">
                      <MapPin className="w-6 h-6 mr-3" />
                      {property.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {formatPrice(property.price)}
                    </p>
                    <Badge className="gradient-secondary text-white px-4 py-2 rounded-full">{property.type}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-gray-100">
                  <div className="text-center">
                    <Bed className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-2xl font-bold">{property.beds}</p>
                    <p className="text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-2xl font-bold">{property.baths}</p>
                    <p className="text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Square className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-2xl font-bold">{property.sqft.toLocaleString()}</p>
                    <p className="text-muted-foreground">Sq Ft</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-2xl font-bold">{property.yearBuilt}</p>
                    <p className="text-muted-foreground">Year Built</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const result = toggleSavedProperty(property);
                      setIsSaved(result.saved);
                    }}
                    className="flex-1 h-12 rounded-xl border-2"
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 rounded-xl border-2">
                    <Share className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Virtual Tour */}
            <VirtualTour propertyId={property.id} />

            {/* Property Location Map */}
            <Card className="property-card">
              <CardHeader>
                <CardTitle className="text-2xl">Property Location</CardTitle>
              </CardHeader>
              <CardContent>
                <MapView properties={mapProperties} />
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="property-card">
              <CardHeader>
                <CardTitle className="text-2xl">About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">{property.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="property-card">
              <CardHeader>
                <CardTitle className="text-2xl">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-purple-50 rounded-xl">
                      <div className="w-3 h-3 gradient-primary rounded-full mr-4"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Enhanced Agent Card */}
            <Card className="property-card">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <Avatar className="w-20 h-20 mr-4 ring-4 ring-purple-100">
                    <AvatarImage src={property.owner?.avatar || ''} />
                    <AvatarFallback>{property.owner?.name ? property.owner.name.split(' ').map((n:any) => n[0]).join('').slice(0,2) : 'NA'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl">{property.owner?.name}</h3>
                    <p className="text-primary font-medium">{property.owner?.email}</p>
                    <div className="flex items-center mt-2">
                      <span className="ml-1 text-muted-foreground">Contact: {property.owner?.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full btn-primary h-12" onClick={() => property.owner?.phone ? window.location.href = `tel:${property.owner.phone}` : null}>
                    <Phone className="w-5 h-5 mr-2" />
                    {property.owner?.phone || 'Call Owner'}
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl border-2" onClick={() => property.owner?.email ? window.location.href = `mailto:${property.owner.email}` : null}>
                    <Mail className="w-5 h-5 mr-2" />
                    Email Owner
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl border-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Tour
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Overview */}
            <Card className="property-card">
              <CardHeader>
                <CardTitle className="text-xl">Property Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type:</span>
                    <span className="font-semibold">{property.type}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built:</span>
                    <span className="font-semibold">{property.yearBuilt}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parking:</span>
                    <span className="font-semibold">{property.parkingSpaces} space{property.parkingSpaces === 1 ? '' : 's'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lot Size:</span>
                    <span className="font-semibold">{property.lotSize}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Mortgage Calculator */}
            <Card className="property-card gradient-accent text-white">
              <CardHeader>
                <CardTitle className="text-xl text-white">Mortgage Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/90">Home Price</label>
                    <p className="text-2xl font-bold">{formatPrice(property.price)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/90">Down Payment (20%)</label>
                    <p className="text-xl font-semibold">{formatPrice(property.price * 0.2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white/90">Estimated Monthly Payment</label>
                    <p className="text-3xl font-bold">{formatPrice(Math.round((property.price * 0.8 * 0.006)))}/mo</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-white text-white hover:bg-white hover:text-primary rounded-xl"
                    onClick={() => navigate('/mortgage')}
                  >
                    Get Full Calculation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
