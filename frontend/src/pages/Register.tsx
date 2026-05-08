import React, { useState } from 'react';
import { register } from '@/lib/api';
import { setToken } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!name || !email || !password || !confirmPassword) {
      return 'All fields are required';
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'Please enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    try {
      const res = await register(name.trim(), email.trim().toLowerCase(), password, 'user');
      if (res && res.token) {
        setToken(res.token);
        navigate('/dashboard');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#001f3f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CH</span>
            </div>
            <span className="text-xl font-semibold text-[#001f3f]">CloudHome</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-white border border-gray-200 p-8 rounded-lg">
            <h1 className="text-2xl font-semibold text-[#001f3f] mb-2">Create Account</h1>
            <p className="text-gray-600 text-sm mb-8">Join CloudHome to find your dream property</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#001f3f] focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(s => !s)}
                    className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#001f3f] hover:bg-[#001a2f] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-gray-500 text-sm">Already have an account?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full border-2 border-[#001f3f] text-[#001f3f] hover:bg-gray-50 font-medium py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-8 text-xs text-gray-600">
            By creating an account you agree to our{' '}
            <button onClick={() => navigate('/terms-of-service')} className="text-[#001f3f] hover:underline font-medium">
              Terms
            </button>
            {' '}and{' '}
            <button onClick={() => navigate('/privacy-policy')} className="text-[#001f3f] hover:underline font-medium">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
