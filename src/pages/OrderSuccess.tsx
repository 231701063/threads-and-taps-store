
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          
          <p className="mb-2">Your order has been placed successfully and will be delivered soon.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6 mt-8">
            <p className="text-sm text-gray-500 mb-2">Order Number</p>
            <p className="text-xl font-medium">{orderNumber}</p>
          </div>
          
          <p className="text-gray-600 mb-8">
            We've sent a confirmation email with your order details. 
            You can also check your order status in your account.
          </p>
          
          <div className="space-x-4">
            <Button asChild>
              <Link to="/orders">View Order</Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
