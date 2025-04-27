
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">Threads & Taps</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-black">Products</Link>
            <Link to="/categories" className="text-gray-700 hover:text-black">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-black">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-black">Contact</Link>
          </div>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button with Badge */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 min-w-[1.25rem] h-[1.25rem] flex items-center justify-center p-0 text-[0.7rem]">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/orders" className="w-full">Orders</Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem>
                      <Link to="/admin" className="w-full">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 min-w-[1.25rem] h-[1.25rem] flex items-center justify-center p-0 text-[0.7rem]">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-3 pb-3">
              <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/products" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Products</Link>
              <Link to="/categories" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Categories</Link>
              <Link to="/about" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>About</Link>
              <Link to="/contact" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Contact</Link>
            </div>
            <div className="border-t pt-3">
              {user ? (
                <div className="px-4 space-y-3">
                  <p className="font-medium">{user.name}</p>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Orders</Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMobileMenu}>Admin Dashboard</Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => { logout(); toggleMobileMenu(); }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="px-4">
                  <Link to="/login" onClick={toggleMobileMenu}>
                    <Button className="w-full">Login</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
