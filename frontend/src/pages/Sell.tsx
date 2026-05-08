
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  TrendingUp, 
  Camera, 
  DollarSign, 
  FileText,
  Calculator,
  BarChart3,
  Eye,
  Scale,
  Upload,
  CheckCircle,
  Star
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sell = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    description: ''
  });

  const services = [
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Get an accurate market valuation of your property with our advanced AI-powered assessment tools.",
      features: ["Automated Valuation Model", "Comparative Market Analysis", "Professional Appraisal", "Real-time Market Updates"],
      color: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Comprehensive market insights to help you price your property competitively and sell faster.",
      features: ["Local Market Trends", "Price History Analysis", "Neighborhood Statistics", "Seasonal Market Data"],
      color: "text-green-600"
    },
    {
      icon: Eye,
      title: "Virtual Tours",
      description: "Professional 360° virtual tours and high-quality photography to showcase your property.",
      features: ["360° Virtual Tours", "Professional Photography", "Drone Footage", "Interactive Floor Plans"],
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Investment Advice",
      description: "Expert guidance on property investment strategies and market timing for optimal returns.",
      features: ["ROI Analysis", "Market Timing Advice", "Investment Strategies", "Portfolio Optimization"],
      color: "text-orange-600"
    },
    {
      icon: Scale,
      title: "Legal Support",
      description: "Professional legal assistance throughout the selling process to ensure smooth transactions.",
      features: ["Contract Review", "Legal Documentation", "Title Services", "Closing Support"],
      color: "text-red-600"
    }
  ];

  const sellingSteps = [
    {
      step: 1,
      title: "Property Assessment",
      description: "We evaluate your property and provide a comprehensive market analysis."
    },
    {
      step: 2,
      title: "Professional Marketing",
      description: "High-quality photos, virtual tours, and strategic listing placement."
    },
    {
      step: 3,
      title: "Buyer Matching",
      description: "Connect with qualified buyers through our extensive network."
    },
    {
      step: 4,
      title: "Negotiation & Closing",
      description: "Expert negotiation and legal support through closing."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPropertyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property details submitted:', propertyDetails);
    // Handle form submission
  };

  return (
    <div className="min-h-screen professional-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gradient mb-6">
              Sell Your Property with Confidence
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get the best value for your property with our comprehensive selling platform. 
              Professional services, expert guidance, and maximum market exposure.
            </p>
          </div>

          {/* Quick Property Submission Form */}
          <Card className="max-w-4xl mx-auto property-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-6 h-6 mr-3 text-blue-600" />
                Get Your Free Property Valuation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Property Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street, City, State"
                      value={propertyDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Input
                      id="propertyType"
                      placeholder="Single Family, Condo, Townhouse"
                      value={propertyDetails.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      placeholder="3"
                      value={propertyDetails.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      placeholder="2"
                      value={propertyDetails.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input
                      id="sqft"
                      placeholder="2500"
                      value={propertyDetails.sqft}
                      onChange={(e) => handleInputChange('sqft', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your property's unique features..."
                    value={propertyDetails.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="btn-primary w-full">
                  Get Free Valuation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Selling Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive services designed to maximize your property's value and ensure a smooth selling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="property-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <service.icon className={`w-6 h-6 mr-3 ${service.color}`} />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 btn-primary">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Selling Process</h2>
            <p className="text-xl text-slate-600">Simple, transparent, and effective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellingSteps.map((step, index) => (
              <Card key={index} className="property-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Why Choose PropertyPulse?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">Maximum Market Exposure</h3>
                    <p className="text-slate-600">Your property gets listed on 100+ real estate websites and platforms.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">Competitive Pricing</h3>
                    <p className="text-slate-600">Data-driven pricing strategies to sell faster and for more money.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Camera className="w-6 h-6 text-purple-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">Professional Marketing</h3>
                    <p className="text-slate-600">High-quality photography, virtual tours, and premium listings.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">Full Legal Support</h3>
                    <p className="text-slate-600">Complete transaction management with legal protection.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <Card className="property-card">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-slate-600 mb-6">
                      Upload your property details and get a free market analysis within 24 hours.
                    </p>
                    <Button className="btn-primary w-full">
                      List Your Property
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sell;
