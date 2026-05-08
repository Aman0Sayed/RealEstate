import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Phone, Save, User } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchProfile, put } from '@/lib/api';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchProfile()
      .then((res) => {
        setProfile(res);
        setName(res?.name || '');
        setPhone(res?.phone || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const data: any = {};
      if (name) data.name = name;
      if (phone) data.phone = phone;
      if (password) data.password = password;

      const res = await put('/users/me', data);
      if (res && res._id) {
        setMessage('Profile updated successfully.');
        setProfile(res);
      } else if (res && res.message) {
        setMessage(res.message);
      }
    } catch (err: any) {
      setMessage(err.message || 'Update failed');
    } finally {
      setSaving(false);
      setPassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-32 text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-gray-700">Profile data is not available.</p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#001f3f] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-semibold">
                {(profile?.name || 'U')
                  .split(' ')
                  .map((part: string) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <h1 className="text-2xl font-bold text-[#001f3f]">{profile?.name || 'User'}</h1>
              <p className="text-gray-600 mt-1">{profile?.email}</p>
              <div className="mt-6 grid grid-cols-1 gap-3 text-sm">
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-left">
                  <p className="text-gray-500">Role</p>
                  <p className="font-semibold text-gray-900 capitalize">{profile?.role || 'member'}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-left">
                  <p className="text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{profile?.phone || 'Not added yet'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-[#001f3f]">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {message && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  {message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Full Name</span>
                  <div className="relative mt-2">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input className="pl-10 h-11" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Phone Number</span>
                  <div className="relative mt-2">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input className="pl-10 h-11" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">New Password</span>
                <div className="relative mt-2">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="password"
                    className="pl-10 h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep your current password"
                  />
                </div>
              </label>

              <div className="flex justify-end">
                <Button className="bg-[#001f3f] hover:bg-[#001a2f] text-white" onClick={save} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
