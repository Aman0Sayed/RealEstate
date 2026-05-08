
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <Card className="property-card max-w-2xl mx-auto text-center">
          <CardContent className="p-16">
            <div className="w-32 h-32 mx-auto mb-8 gradient-primary rounded-full flex items-center justify-center">
              <Home className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gradient mb-6">
              Property Not Found
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              The property you're looking for seems to have moved or doesn't exist. 
              Let's help you find your dream home instead.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
              <Button 
                onClick={() => navigate('/properties')}
                variant="outline"
                className="rounded-xl border-2 border-purple-200"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Properties
              </Button>
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="rounded-xl border-2 border-purple-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
