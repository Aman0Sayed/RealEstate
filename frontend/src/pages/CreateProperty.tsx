import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { createProperty, fetchProfile } from '@/lib/api';

const CreateProperty = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [sqft, setSqft] = useState(0);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data: any = {
        title,
        price: Number(price),
        address,
        beds: Number(beds),
        baths: Number(baths),
        sqft: Number(sqft),
        type,
        description,
        images: images.split(',').map(s => s.trim()).filter(Boolean)
      };

      const res = await createProperty(data);
      if (res && res._id) {
        navigate(`/property/${res._id}`);
      } else if (res && res.message) {
        setError(res.message);
      } else {
        setError('Failed to create property');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create Property</h2>
          {error && <div className="text-red-500 mb-3">{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 border rounded-lg" />
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="w-full p-3 border rounded-lg" />
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" className="w-full p-3 border rounded-lg" />
            <div className="grid grid-cols-3 gap-3">
              <input value={beds} onChange={e => setBeds(Number(e.target.value))} placeholder="Beds" type="number" className="p-3 border rounded-lg" />
              <input value={baths} onChange={e => setBaths(Number(e.target.value))} placeholder="Baths" type="number" className="p-3 border rounded-lg" />
              <input value={sqft} onChange={e => setSqft(Number(e.target.value))} placeholder="Sqft" type="number" className="p-3 border rounded-lg" />
            </div>
            <input value={type} onChange={e => setType(e.target.value)} placeholder="Type (House, Condo...)" className="w-full p-3 border rounded-lg" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded-lg" />
            <input value={images} onChange={e => setImages(e.target.value)} placeholder="Image URLs (comma separated)" className="w-full p-3 border rounded-lg" />
            <div className="flex justify-between">
              <button type="button" className="btn-outline" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Property'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
