
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Maximize, Volume2, VolumeX } from "lucide-react";

const VirtualTour = ({ propertyId }: { propertyId: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const rooms = [
    {
      name: "Living Room",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      description: "Spacious living area with floor-to-ceiling windows"
    },
    {
      name: "Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      description: "Modern kitchen with premium appliances"
    },
    {
      name: "Master Bedroom",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      description: "Elegant master suite with walk-in closet"
    },
    {
      name: "Bathroom",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
      description: "Luxurious bathroom with marble finishes"
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <Card className="property-card overflow-hidden">
      <div className="relative">
        {/* 360° View Indicator */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="gradient-primary text-white px-3 py-1 rounded-full">
            360° Virtual Tour
          </Badge>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="bg-black/50 text-white hover:bg-black/70 rounded-full w-10 h-10"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Main View */}
        <div className="relative h-96 bg-gradient-to-br from-purple-100 to-blue-100">
          <img
            src={rooms[currentRoom].image}
            alt={rooms[currentRoom].name}
            className="w-full h-full object-cover"
          />
          
          {/* Rotation Indicator */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white">
              <RotateCcw className="w-8 h-8 mx-auto mb-2 animate-spin" />
              <p className="text-sm">360° Interactive View</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-12 h-12"
            onClick={prevRoom}
          >
            ←
          </Button>
          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-12 h-12"
            onClick={nextRoom}
          >
            →
          </Button>
        </div>

        {/* Room Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{rooms[currentRoom].name}</h4>
                  <p className="text-muted-foreground text-sm">{rooms[currentRoom].description}</p>
                </div>
                <Button
                  size="sm"
                  onClick={togglePlay}
                  className="btn-primary"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Room Navigation */}
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Tour Rooms</h3>
          <span className="text-muted-foreground">
            {currentRoom + 1} of {rooms.length}
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {rooms.map((room, index) => (
            <button
              key={index}
              className={`relative rounded-xl overflow-hidden transition-all ${
                index === currentRoom ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentRoom(index)}
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-16 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <span className="text-white text-xs font-medium p-2">{room.name}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualTour;
