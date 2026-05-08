
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Home,
  Send,
  FileText,
  MessageSquare,
  Plus,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { getSavedProperties, subscribeToSavedProperties } from "@/lib/savedProperties";

interface PropertyRequest {
  _id: string;
  propertyId: { _id: string; title: string; price: number };
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: string;
}

interface SavedProperty {
  id: string;
  title: string;
  price: number;
  address: string;
  images?: string[];
  beds?: number;
  baths?: number;
  sqft?: number;
  type?: string;
  status?: string;
}

const Dashboard = () => {
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simulate fetching user's requests
  useEffect(() => {
    const mockRequests: PropertyRequest[] = [
      {
        _id: '1',
        propertyId: { _id: 'p1', title: 'Modern Downtown Apartment', price: 450000 },
        status: 'pending',
        message: 'Very interested in this property, would like to schedule a viewing',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
      },
      {
        _id: '2',
        propertyId: { _id: 'p2', title: 'Suburban Family Home', price: 650000 },
        status: 'approved',
        message: 'Interested in learning more about the property',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
      },
      {
        _id: '3',
        propertyId: { _id: 'p3', title: 'Cozy Townhouse', price: 520000 },
        status: 'rejected',
        message: 'Price inquiry for bulk purchase',
        createdAt: new Date(Date.now() - 5 * 24 * 3600000).toISOString()
      }
    ];

    setRequests(mockRequests);
    setSavedProperties(getSavedProperties());
    setLoading(false);
  }, []);

  useEffect(() => {
    const syncSavedProperties = () => {
      setSavedProperties(getSavedProperties());
    };

    return subscribeToSavedProperties(syncSavedProperties);
  }, []);

  const handleSubmitRequest = async () => {
    if (!selectedPropertyId || !requestMessage.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a property and enter a message",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRequest: PropertyRequest = {
        _id: Date.now().toString(),
        propertyId: { _id: selectedPropertyId, title: 'Selected Property', price: 0 },
        status: 'pending',
        message: requestMessage,
        createdAt: new Date().toISOString()
      };

      setRequests([newRequest, ...requests]);
      setIsNewRequestDialogOpen(false);
      setSelectedPropertyId('');
      setRequestMessage('');
      
      toast({
        title: "Request Submitted",
        description: "Your property request has been sent to the manager",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit request",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-50 text-green-700 border border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-50 text-red-700 border border-red-200">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-amber-50 text-amber-700 border border-amber-200">Pending</Badge>;
    }
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const reqDate = new Date(date);
    const diffMs = now.getTime() - reqDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return reqDate.toLocaleDateString();
  };

  const stats = [
    {
      title: "Total Requests",
      value: requests.length.toString(),
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Pending",
      value: requests.filter(r => r.status === 'pending').length.toString(),
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Approved",
      value: requests.filter(r => r.status === 'approved').length.toString(),
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Saved Properties",
      value: savedProperties.length.toString(),
      icon: Home,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#001f3f] mb-2">My Dashboard</h1>
          <p className="text-gray-600">Track your property requests and saved properties</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} p-6 rounded-lg border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 opacity-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">My Requests</TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">Saved Properties</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-[#001f3f] data-[state=active]:text-white">Activity</TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Property Requests</CardTitle>
                  <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#001f3f] hover:bg-[#001a2f] text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        New Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Property Request</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Select Property
                          </label>
                          <select
                            value={selectedPropertyId}
                            onChange={(e) => setSelectedPropertyId(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none"
                            disabled={submitting}
                            aria-label="Select Property"
                          >
                            <option value="">Choose a property...</option>
                            <option value="p1">Modern Downtown Apartment - $450,000</option>
                            <option value="p2">Suburban Family Home - $650,000</option>
                            <option value="p3">Beachfront Villa - $1,200,000</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Message
                          </label>
                          <Textarea
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                            placeholder="Tell the manager about your interest in this property..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none min-h-[120px]"
                            disabled={submitting}
                          />
                        </div>

                        <div className="flex space-x-3 pt-2">
                          <Button
                            onClick={() => setIsNewRequestDialogOpen(false)}
                            variant="outline"
                            disabled={submitting}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSubmitRequest}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={submitting}
                          >
                            {submitting ? 'Submitting...' : 'Submit Request'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading requests...</div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No requests yet</p>
                    <p className="text-sm text-gray-500">Submit your first property request to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {requests.map((request) => (
                      <div
                        key={request._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="pt-1">
                            {getStatusIcon(request.status)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{request.propertyId.title}</h4>
                            {request.message && (
                              <p className="text-sm text-gray-600 mt-1 flex items-start space-x-1">
                                <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{request.message}</span>
                              </p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">${request.propertyId.price.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <p className="text-sm text-gray-500">{formatDate(request.createdAt)}</p>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Properties Tab */}
          <TabsContent value="saved" className="space-y-4">
            <Card className="bg-white border-0 shadow-md">
              <CardHeader>
                <CardTitle>Saved Properties ({savedProperties.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {savedProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No saved properties yet</p>
                    <Button
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => navigate('/properties')}
                    >
                      Browse Properties
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedProperties.map((property) => (
                      <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden">
                          {property.images?.[0] ? (
                            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                          ) : (
                            <Home className="w-12 h-12 text-white opacity-30" />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900">{property.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{property.address}</p>
                          <p className="text-lg font-bold text-gray-900 mt-3">${property.price.toLocaleString()}</p>
                          <Button
                            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                            onClick={() => navigate(`/property/${property.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-white border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Submitted request for", property: "Modern Downtown Apartment", time: "2 hours ago", type: "request" },
                    { action: "Saved", property: "Suburban Family Home", time: "1 day ago", type: "save" },
                    { action: "Request approved for", property: "Luxury Penthouse", time: "3 days ago", type: "approved" },
                    { action: "Viewed", property: "Cozy Townhouse", time: "1 week ago", type: "view" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.action} <span className="text-blue-600">{activity.property}</span>
                        </p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      <Eye className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
