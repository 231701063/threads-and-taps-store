
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if cart is empty
    if (!isLoading && items.length === 0) {
      navigate('/cart');
    }
  }, [items, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-80 w-full max-w-3xl bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {!user ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Please login to continue</h2>
            <p className="text-gray-500 mb-6">You need to be logged in to complete your purchase.</p>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-100 rounded-md p-4">
                <h2 className="font-medium">Cash on Delivery</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Payment will be collected when your order is delivered.
                </p>
              </div>
            </div>
            
            <CheckoutForm />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
