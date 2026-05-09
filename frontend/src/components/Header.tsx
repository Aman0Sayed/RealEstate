import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken, fetchProfile, logout as apiLogout } from '@/lib/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean>(!!getToken());
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const token = getToken();
    if (token) {
      fetchProfile().then((res) => {
        if (!mounted) return;
        if (res && res.role) {
          setRole(res.role);
          setUserName(res.name);
        }
        setAuthed(true);
      }).catch(() => {
        setAuthed(false);
        setRole(null);
        setUserName(null);
      });
    }
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const onTokenChange = () => {
      const token = getToken();
      if (!token) {
        setAuthed(false);
        setRole(null);
        setUserName(null);
        return;
      }
      fetchProfile().then((res) => {
        if (res && res.role) {
          setRole(res.role);
          setUserName(res.name);
        }
        setAuthed(true);
      }).catch(() => {
        setAuthed(false);
        setRole(null);
        setUserName(null);
      });
    };
    window.addEventListener('pp_token_changed', onTokenChange as EventListener);
    return () => window.removeEventListener('pp_token_changed', onTokenChange as EventListener);
  }, []);

  const logout = async () => {
    await apiLogout();
    setAuthed(false);
    setRole(null);
    setUserName(null);
    navigate('/login');
  };

  const handleDashboardNav = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 bg-[#001f3f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CH</span>
            </div>
            <span className="text-lg font-semibold text-[#001f3f]">CloudHome</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {role !== 'admin' ? (
              <>
                <button
                  onClick={() => navigate('/buy')}
                  className="text-gray-700 hover:text-[#001f3f] text-sm font-medium transition-colors"
                >
                  Buy Properties
                </button>
                <button
                  onClick={() => navigate('/rent')}
                  className="text-gray-700 hover:text-[#001f3f] text-sm font-medium transition-colors"
                >
                  Rent Properties
                </button>
                <button
                  onClick={() => navigate('/agents')}
                  className="text-gray-700 hover:text-[#001f3f] text-sm font-medium transition-colors"
                >
                  About CloudHome
                </button>
              </>
            ) : (
              <Badge className="bg-[#FFD700] text-[#001f3f] font-semibold">Property Manager</Badge>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {authed ? (
              <>
                <button
                  onClick={handleDashboardNav}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#001f3f] text-sm font-medium transition-colors"
                >
                  <LayoutDashboard size={16} />
                  <span>{role === 'admin' ? 'Manager' : 'Dashboard'}</span>
                </button>
                <div className="w-px h-6 bg-gray-200"></div>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">{userName ? userName.split(' ')[0] : 'Profile'}</span>
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 border border-gray-300 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#001f3f] hover:bg-[#001a2f] rounded-lg transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {role !== 'admin' ? (
                <>
                  <button
                    onClick={() => { navigate('/buy'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-gray-700 hover:text-[#001f3f] text-sm font-medium py-2 transition-colors"
                  >
                    Buy Properties
                  </button>
                  <button
                    onClick={() => { navigate('/rent'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-gray-700 hover:text-[#001f3f] text-sm font-medium py-2 transition-colors"
                  >
                    Rent Properties
                  </button>
                  <button
                    onClick={() => { navigate('/agents'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-gray-700 hover:text-[#001f3f] text-sm font-medium py-2 transition-colors"
                  >
                    About CloudHome
                  </button>
                </>
              ) : (
                <Badge className="bg-[#FFD700] text-[#001f3f] font-semibold">Property Manager</Badge>
              )}

              <div className="pt-4 border-t border-gray-200 space-y-3">
                {authed ? (
                  <>
                    <button
                      onClick={() => { handleDashboardNav(); setIsMenuOpen(false); }}
                      className="w-full text-left text-gray-700 hover:text-[#001f3f] text-sm font-medium py-2"
                    >
                      {role === 'admin' ? 'Manager Dashboard' : 'My Dashboard'}
                    </button>
                    <button
                      onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
                      className="w-full text-left text-gray-700 hover:text-[#001f3f] text-sm font-medium py-2"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left text-red-600 hover:text-red-700 text-sm font-medium py-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                      className="w-full text-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                      className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-[#001f3f] hover:bg-[#001a2f] rounded-lg transition-colors"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
