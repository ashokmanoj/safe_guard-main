import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, Heart, Menu, X } from 'lucide-react';
import { RootState } from '../store/store';
import { clearUser, setUser } from '../store/slices/userSlice';
import Cookies from 'js-cookie';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      const userId = Cookies.get('user_id');
      if (userId) {
        dispatch(setUser(userId));
      }
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('user_id');
    Cookies.remove('user_email');
    Cookies.remove('user_name');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setIsMenuOpen(false); // Close menu on logout
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false); // Close menu when a link is clicked

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-purple-100 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              SafeGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/location" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Location
                </Link>
                <Link to="/period-details" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Period Details
                </Link>
                <Link to="/report" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Report
                </Link>
                <Link to="/contacts" className="text-gray-700 hover:text-purple-500">
                  Phone Book
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="button-gradient text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-8 w-8 text-pink-500" /> : <Menu className="h-8 w-8 text-pink-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-purple-200 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors" onClick={closeMenu}>
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link to="/location" className="text-gray-600 hover:text-purple-600 transition-colors" onClick={closeMenu}>
                  Location
                </Link>
                <Link to="/period-details" className="text-gray-600 hover:text-purple-600 transition-colors" onClick={closeMenu}>
                  Period Details
                </Link>
                <Link to="/report" className="text-gray-600 hover:text-purple-600 transition-colors" onClick={closeMenu}>
                  Report
                </Link>
                <Link to="/contacts" className="text-gray-700 hover:text-purple-500" onClick={closeMenu}>
                  Phone Book
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors" onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="button-gradient text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
