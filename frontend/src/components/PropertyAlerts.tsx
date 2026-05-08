
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Bell, Plus, Trash2, Edit3, MapPin } from "lucide-react";

const PropertyAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: "Downtown Condos",
      location: "Downtown area",
      priceRange: [500000, 900000],
      bedrooms: "2+",
      propertyType: "Condo",
      frequency: "daily",
      isActive: true,
      matchesCount: 12
    },
    {
      id: 2,
      name: "Family Homes Westside",
      location: "Westside neighborhoods",
      priceRange: [800000, 1500000],
      bedrooms: "3+",
      propertyType: "House",
      frequency: "weekly",
      isActive: true,
      matchesCount: 8
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    name: "",
    location: "",
    priceRange: [300000, 1000000],
    bedrooms: "any",
    propertyType: "any",
    frequency: "daily"
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const toggleAlert = (id: number) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const createAlert = () => {
    if (newAlert.name && newAlert.location) {
      const alert = {
        ...newAlert,
        id: Date.now(),
        isActive: true,
        matchesCount: Math.floor(Math.random() * 20) + 1
      };
      setAlerts(prev => [...prev, alert]);
      setNewAlert({
        name: "",
        location: "",
        priceRange: [300000, 1000000],
        bedrooms: "any",
        propertyType: "any",
        frequency: "daily"
      });
      setShowCreateForm(false);
    }
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
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">Property Alerts</h2>
          <p className="text-muted-foreground">Get notified when new properties match your criteria</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <Card className="property-card">
          <CardHeader>
            <CardTitle className="text-xl">Create New Alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Alert Name</label>
                <Input
                  placeholder="e.g., Downtown Condos"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, name: e.target.value }))}
                  className="rounded-xl border-2 border-purple-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Enter location"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10 rounded-xl border-2 border-purple-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">
                Price Range: {formatPrice(newAlert.priceRange[0])} - {formatPrice(newAlert.priceRange[1])}
              </label>
              <Slider
                value={newAlert.priceRange}
                onValueChange={(value) => setNewAlert(prev => ({ ...prev, priceRange: value }))}
                max={2000000}
                min={200000}
                step={50000}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Property Type</label>
                <Select
                  value={newAlert.propertyType}
                  onValueChange={(value) => setNewAlert(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger className="rounded-xl border-2 border-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Bedrooms</label>
                <Select
                  value={newAlert.bedrooms}
                  onValueChange={(value) => setNewAlert(prev => ({ ...prev, bedrooms: value }))}
                >
                  <SelectTrigger className="rounded-xl border-2 border-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1+">1+</SelectItem>
                    <SelectItem value="2+">2+</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Frequency</label>
                <Select
                  value={newAlert.frequency}
                  onValueChange={(value) => setNewAlert(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger className="rounded-xl border-2 border-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={createAlert} className="btn-primary">
                Create Alert
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="rounded-xl border-2"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="property-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold">{alert.name}</h3>
                    <Badge
                      variant={alert.isActive ? "default" : "secondary"}
                      className={`px-3 py-1 rounded-full ${
                        alert.isActive ? "gradient-primary text-white" : ""
                      }`}
                    >
                      {alert.isActive ? "Active" : "Paused"}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1 rounded-full">
                      {alert.matchesCount} matches
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">{alert.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price Range:</span>
                      <p className="font-medium">
                        {formatPrice(alert.priceRange[0])} - {formatPrice(alert.priceRange[1])}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium">{alert.propertyType}, {alert.bedrooms} beds</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <p className="font-medium capitalize">{alert.frequency}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAlert(alert.id)}
                    className="rounded-xl"
                  >
                    <Bell className="w-4 h-4 mr-1" />
                    {alert.isActive ? "Pause" : "Resume"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeAlert(alert.id)}
                    className="rounded-xl text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {alerts.length === 0 && (
        <Card className="property-card text-center">
          <CardContent className="p-12">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-4">No Active Alerts</h3>
            <p className="text-muted-foreground mb-6">
              Create your first property alert to get notified when new listings match your preferences.
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Alert
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyAlerts;
