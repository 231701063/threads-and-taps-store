
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { products, categories } from '@/utils/data';
import { Navigate } from 'react-router-dom';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    sizes: [] as string[],
    colors: [] as string[],
    inStock: true
  });

  // Predefined options
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', '30', '32', '34', '36', '38', '7', '8', '9', '10', '11'];
  const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Brown', 'Gray', 'Navy', 'Pink', 'Orange', 'Beige'];

  // Redirect if not admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  // Load product data if editing
  useEffect(() => {
    if (id && id !== 'new') {
      const existingProduct = products.find(p => p.id === id);
      if (existingProduct) {
        setFormData({
          name: existingProduct.name,
          slug: existingProduct.slug,
          description: existingProduct.description,
          price: existingProduct.price.toString(),
          imageUrl: existingProduct.imageUrl,
          category: existingProduct.category,
          sizes: existingProduct.sizes,
          colors: existingProduct.colors,
          inStock: existingProduct.inStock
        });
      } else {
        // Product not found, redirect to products page
        toast({
          title: "Product not found",
          description: "The product you're trying to edit doesn't exist.",
          variant: "destructive"
        });
        navigate('/admin/products');
      }
    }
  }, [id]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug when name changes
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  // Handle checkbox changes for sizes and colors
  const handleCheckboxChange = (
    type: 'sizes' | 'colors',
    value: string,
    checked: boolean
  ) => {
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          [type]: [...prev[type], value]
        };
      } else {
        return {
          ...prev,
          [type]: prev[type].filter(item => item !== value)
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.sizes.length === 0) {
      toast({
        title: "Missing sizes",
        description: "Please select at least one size.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.colors.length === 0) {
      toast({
        title: "Missing colors",
        description: "Please select at least one color.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call to save product
    setTimeout(() => {
      toast({
        title: id === 'new' ? "Product created" : "Product updated",
        description: `${formData.name} has been ${id === 'new' ? 'created' : 'updated'} successfully.`,
      });
      navigate('/admin/products');
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {id === 'new' ? 'Add New Product' : 'Edit Product'}
          </h1>
          <Button variant="outline" asChild>
            <Link to="/admin/products">Cancel</Link>
          </Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      disabled
                    />
                    <p className="text-xs text-gray-500">Auto-generated from name</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, inStock: checked as boolean})
                      }
                    />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>
                </div>

                {/* Description and Variants */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Available Sizes *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {sizeOptions.map(size => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={`size-${size}`}
                            checked={formData.sizes.includes(size)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('sizes', size, checked as boolean)
                            }
                          />
                          <Label htmlFor={`size-${size}`}>{size}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Available Colors *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {colorOptions.map(color => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={formData.colors.includes(color)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('colors', color, checked as boolean)
                            }
                          />
                          <Label htmlFor={`color-${color}`}>{color}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-6">
              <div className="flex justify-end gap-4 w-full">
                <Button variant="outline" type="button" asChild>
                  <Link to="/admin/products">Cancel</Link>
                </Button>
                <Button type="submit">
                  {id === 'new' ? 'Create Product' : 'Update Product'}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductForm;
