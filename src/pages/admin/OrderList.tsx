
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Search, Trash, Edit } from 'lucide-react';
import { OrderStatus } from '@/utils/types';

const OrderList: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Redirect if not admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD-123456',
      customer: 'John Smith',
      email: 'john@example.com',
      date: '2023-04-26',
      total: 89.97,
      status: 'pending' as OrderStatus,
      items: 3
    },
    {
      id: 'ORD-123455',
      customer: 'Emily Johnson',
      email: 'emily@example.com',
      date: '2023-04-25',
      total: 125.50,
      status: 'processing' as OrderStatus,
      items: 2
    },
    {
      id: 'ORD-123454',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      date: '2023-04-24',
      total: 59.99,
      status: 'shipped' as OrderStatus,
      items: 1
    },
    {
      id: 'ORD-123453',
      customer: 'Sarah Davis',
      email: 'sarah@example.com',
      date: '2023-04-23',
      total: 149.95,
      status: 'delivered' as OrderStatus,
      items: 4
    },
    {
      id: 'ORD-123452',
      customer: 'Robert Wilson',
      email: 'robert@example.com',
      date: '2023-04-22',
      total: 74.99,
      status: 'cancelled' as OrderStatus,
      items: 2
    },
    {
      id: 'ORD-123451',
      customer: 'Jennifer Lee',
      email: 'jennifer@example.com',
      date: '2023-04-21',
      total: 99.99,
      status: 'delivered' as OrderStatus,
      items: 3
    },
    {
      id: 'ORD-123450',
      customer: 'David Martinez',
      email: 'david@example.com',
      date: '2023-04-20',
      total: 189.95,
      status: 'delivered' as OrderStatus,
      items: 5
    }
  ];
  
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter by status
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  // Handle updating order status
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
  };

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status color based on status value
  const getStatusColor = (status: OrderStatus) => {
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
        <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by order ID, customer, or email..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              <div>
                <Select 
                  value={statusFilter} 
                  onValueChange={handleStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Select 
                          value={order.status} 
                          onValueChange={(value) => handleUpdateStatus(order.id, value as OrderStatus)}
                        >
                          <SelectTrigger className={`w-32 ${getStatusColor(order.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderList;
