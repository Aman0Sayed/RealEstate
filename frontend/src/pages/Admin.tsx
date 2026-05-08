import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  User,
  Home,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Building,
  DollarSign,
  MapPin,
  Bed,
  Bath,
  Square,
  Image,
  Filter,
  Settings
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

interface PropertyRequest {
  _id: string;
  propertyId: { _id: string; title: string; price: number };
  userId: { _id: string; name: string };
  userName: string;
  userEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: string;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: 'available' | 'pending' | 'sold' | 'reserved';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  description: string;
}

const Admin = () => {
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PropertyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedRequest, setSelectedRequest] = useState<PropertyRequest | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [role, setRole] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().then((res) => {
      if (res && res.role === 'admin') {
        setRole(res.role);
      } else {
        navigate('/');
      }
    }).catch(() => {
      navigate('/');
    });
  }, [navigate]);

  if (role !== 'admin') {
    return <div>Loading...</div>;
  }

  // Form states for adding/editing properties
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: 0,
    location: '',
    type: 'House',
    status: 'available',
    beds: 1,
    baths: 1,
    sqft: 1000,
    image: '',
    description: ''
  });

  // Mock data for properties
  const mockProperties: Property[] = [
    {
      _id: '1',
      title: 'Modern Downtown Loft',
      price: 850000,
      location: 'Manhattan, NY',
      type: 'Condo',
      status: 'available',
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      description: 'Beautiful modern loft in the heart of downtown'
    },
    {
      _id: '2',
      title: 'Luxury Family Home',
      price: 1250000,
      location: 'Brooklyn, NY',
      type: 'House',
      status: 'available',
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
      description: 'Spacious family home with modern amenities'
    },
    {
      _id: '3',
      title: 'Cozy Suburban Home',
      price: 675000,
      location: 'Queens, NY',
      type: 'House',
      status: 'sold',
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop',
      description: 'Perfect starter home in quiet neighborhood'
    }
  ];

  // Simulate fetching data
  useEffect(() => {
    const mockRequests: PropertyRequest[] = [
      {
        _id: '1',
        propertyId: { _id: 'p1', title: 'Modern Downtown Apartment', price: 450000 },
        userId: { _id: 'u1', name: 'John Doe' },
        userName: 'John Doe',
        userEmail: 'john@example.com',
        status: 'pending',
        message: 'Very interested in this property, would like to schedule a viewing',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
      },
      {
        _id: '2',
        propertyId: { _id: 'p2', title: 'Suburban Family Home', price: 650000 },
        userId: { _id: 'u2', name: 'Jane Smith' },
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        status: 'approved',
        message: 'Interested in learning more about the property',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
      },
      {
        _id: '3',
        propertyId: { _id: 'p3', title: 'Beachfront Villa', price: 1200000 },
        userId: { _id: 'u3', name: 'Mike Johnson' },
        userName: 'Mike Johnson',
        userEmail: 'mike@example.com',
        status: 'rejected',
        message: 'Price inquiry for bulk purchase',
        createdAt: new Date(Date.now() - 5 * 24 * 3600000).toISOString()
      },
      {
        _id: '4',
        propertyId: { _id: 'p1', title: 'Modern Downtown Apartment', price: 450000 },
        userId: { _id: 'u4', name: 'Sarah Wilson' },
        userName: 'Sarah Wilson',
        userEmail: 'sarah@example.com',
        status: 'pending',
        message: 'Looking to schedule a viewing this weekend',
        createdAt: new Date(Date.now() - 1 * 3600000).toISOString()
      }
    ];
    
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
    setProperties(mockProperties);
    setLoading(false);
  }, []);

  // Filter requests based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(req => req.status === statusFilter));
    }
  }, [statusFilter, requests]);

  const handleStatusChange = (requestId: string, newStatus: 'approved' | 'rejected') => {
    const updated = requests.map(req =>
      req._id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    
    toast({
      title: "Request Updated",
      description: `Property request has been ${newStatus}`,
    });
    setIsDetailDialogOpen(false);
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      price: 0,
      location: '',
      type: 'House',
      status: 'For Sale',
      beds: 1,
      baths: 1,
      sqft: 1000,
      image: '',
      description: ''
    });
    setIsPropertyDialogOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setIsPropertyDialogOpen(true);
  };

  const handleSaveProperty = () => {
    if (!formData.title || !formData.location || formData.price === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (editingProperty) {
      // Update existing property
      setProperties(properties.map(p => 
        p._id === editingProperty._id ? { ...p, ...formData as Property } : p
      ));
      toast({
        title: "Success",
        description: "Property updated successfully",
      });
    } else {
      // Add new property
      const newProperty: Property = {
        _id: Date.now().toString(),
        ...formData as Property
      };
      setProperties([...properties, newProperty]);
      toast({
        title: "Success",
        description: "Property added successfully",
      });
    }
    
    setIsPropertyDialogOpen(false);
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties(properties.filter(p => p._id !== propertyId));
    toast({
      title: "Success",
      description: "Property deleted successfully",
    });
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
      title: "Total Properties",
      value: properties.length.toString(),
      icon: Building,
      color: "bg-blue-50 text-[#001f3f]"
    },
    {
      title: "Total Requests",
      value: requests.length.toString(),
      icon: Home,
      color: "bg-purple-50 text-purple-700"
    },
    {
      title: "Pending Requests",
      value: requests.filter(r => r.status === 'pending').length.toString(),
      icon: Clock,
      color: "bg-amber-50 text-amber-700"
    },
    {
      title: "Approved",
      value: requests.filter(r => r.status === 'approved').length.toString(),
      icon: CheckCircle,
      color: "bg-green-50 text-green-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#001f3f] mb-2">
                Property Manager Dashboard
              </h1>
              <p className="text-gray-600">Manage all CloudHome properties and customer requests</p>
            </div>
            <div className="flex items-center space-x-2 bg-[#FFD700] text-[#001f3f] px-4 py-2 rounded-lg font-semibold">
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Properties ({properties.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Requests ({requests.length})
            </TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Property Listings</h2>
              <Button onClick={handleAddProperty} className="bg-[#001f3f] hover:bg-[#001a2f] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {properties.map((property) => (
                <Card key={property._id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">{property.title}</h3>
                        <Badge className={property.status === 'For Sale' ? 'bg-[#001f3f]' : 'bg-green-600'}>
                          {property.status}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-[#001f3f] mb-2">
                        ${property.price.toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <Bed className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                        <span className="text-sm text-gray-600">{property.beds} beds</span>
                      </div>
                      <div className="text-center">
                        <Bath className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                        <span className="text-sm text-gray-600">{property.baths} baths</span>
                      </div>
                      <div className="text-center">
                        <Square className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                        <span className="text-sm text-gray-600">{(property.sqft / 1000).toFixed(1)}k sqft</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditProperty(property)}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDeleteProperty(property._id)}
                        variant="outline" 
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Customer Inquiries</span>
                  <div className="flex items-center space-x-2 text-sm font-normal text-gray-600">
                    <Filter className="w-4 h-4" />
                    <span>{filteredRequests.length} requests</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Button 
                    onClick={() => setStatusFilter('all')}
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    className={statusFilter === 'all' ? 'bg-[#001f3f]' : ''}
                  >
                    All
                  </Button>
                  <Button 
                    onClick={() => setStatusFilter('pending')}
                    variant={statusFilter === 'pending' ? 'default' : 'outline'}
                    className={statusFilter === 'pending' ? 'bg-amber-600' : ''}
                  >
                    Pending
                  </Button>
                  <Button 
                    onClick={() => setStatusFilter('approved')}
                    variant={statusFilter === 'approved' ? 'default' : 'outline'}
                    className={statusFilter === 'approved' ? 'bg-green-600' : ''}
                  >
                    Approved
                  </Button>
                  <Button 
                    onClick={() => setStatusFilter('rejected')}
                    variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                    className={statusFilter === 'rejected' ? 'bg-red-600' : ''}
                  >
                    Rejected
                  </Button>
                </div>

                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading requests...</div>
                ) : filteredRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No requests found</div>
                ) : (
                  <div className="space-y-3">
                    {filteredRequests.map((request) => (
                      <div
                        key={request._id}
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsDetailDialogOpen(true);
                        }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                      >
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="pt-1">
                            {getStatusIcon(request.status)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{request.propertyId.title}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{request.userName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{request.userEmail}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{formatDate(request.createdAt)}</p>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Request Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Request Details</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              {/* Property Info */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Property</h3>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{selectedRequest.propertyId.title}</p>
                    <div className="flex items-center space-x-2 mt-1 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>${selectedRequest.propertyId.price.toLocaleString()}</span>
                    </div>
                  </div>
                  {getStatusBadge(selectedRequest.status)}
                </div>
              </div>

              {/* User Info */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-900">{selectedRequest.userName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-900">{selectedRequest.userEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Requested {formatDate(selectedRequest.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedRequest.message && (
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Customer Message
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRequest.message}</p>
                </div>
              )}

              {/* Actions */}
              {selectedRequest.status === 'pending' && (
                <div className="flex items-center space-x-3 pt-4">
                  <Button
                    onClick={() => handleStatusChange(selectedRequest._id, 'approved')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Request
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(selectedRequest._id, 'rejected')}
                    variant="outline"
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Request
                  </Button>
                </div>
              )}

              {selectedRequest.status !== 'pending' && (
                <div className="text-center py-4 bg-gray-50 rounded-lg text-gray-600">
                  <p>This request has already been marked as <strong>{selectedRequest.status}</strong></p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Property Dialog */}
      <Dialog open={isPropertyDialogOpen} onOpenChange={setIsPropertyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
                <Input 
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Modern Downtown Loft"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <Input 
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  placeholder="e.g., 850000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <Input 
                value={formData.location || ''}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., Manhattan, NY"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  value={formData.type || 'House'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none"
                  aria-label="Property Type"
                >
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={formData.status || 'available'}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'available' | 'pending' | 'sold' | 'reserved'})}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none"
                  aria-label="Property Status"
                >
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <Input 
                  type="number"
                  value={formData.beds || 1}
                  onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <Input 
                  type="number"
                  value={formData.baths || 1}
                  onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sqft</label>
                <Input 
                  type="number"
                  value={formData.sqft || 1000}
                  onChange={(e) => setFormData({...formData, sqft: parseInt(e.target.value) || 1000})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <Input 
                value={formData.image || ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea 
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter property description"
                className="resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSaveProperty}
                className="flex-1 bg-[#001f3f] hover:bg-[#001a2f] text-white"
              >
                {editingProperty ? 'Update Property' : 'Add Property'}
              </Button>
              <Button 
                onClick={() => setIsPropertyDialogOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
