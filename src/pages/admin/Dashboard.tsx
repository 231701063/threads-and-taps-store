
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Redirect if not admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  // Mock data for admin dashboard
  const recentOrders = [
    {
      id: 'ORD-123456',
      customer: 'John Smith',
      date: '2023-04-26',
      amount: 89.97,
      status: 'pending'
    },
    {
      id: 'ORD-123455',
      customer: 'Emily Johnson',
      date: '2023-04-25',
      amount: 125.50,
      status: 'processing'
    },
    {
      id: 'ORD-123454',
      customer: 'Michael Brown',
      date: '2023-04-24',
      amount: 59.99,
      status: 'shipped'
    },
    {
      id: 'ORD-123453',
      customer: 'Sarah Davis',
      date: '2023-04-23',
      amount: 149.95,
      status: 'delivered'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild>
            <Link to="/admin/products/new">Add New Product</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-3xl font-bold">125</h3>
                <p className="text-xs text-green-500 mt-1">+14% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Products</p>
                <h3 className="text-3xl font-bold">45</h3>
                <p className="text-xs text-green-500 mt-1">8 new products</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-purple-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <h3 className="text-3xl font-bold">89</h3>
                <p className="text-xs text-green-500 mt-1">+5% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-3xl font-bold">$8,250</h3>
                <p className="text-xs text-green-500 mt-1">+12% from last month</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/orders/${order.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link to="/admin/orders">View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Link to="/admin/products">
            <Card className="h-full hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <Package className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-medium">Manage Products</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Add, edit, or delete products from your store.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/orders">
            <Card className="h-full hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <ShoppingCart className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-medium">Manage Orders</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  View and process customer orders.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/admin/customers">
            <Card className="h-full hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <Users className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-medium">Manage Customers</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  View customer information and purchase history.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
