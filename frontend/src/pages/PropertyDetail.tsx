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
