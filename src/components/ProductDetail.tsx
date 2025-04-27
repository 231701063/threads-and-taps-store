
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '@/utils/types';
import { useCart } from '@/contexts/CartContext';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
        
        <div className="mt-6 space-y-6">
          <p className="text-gray-600">{product.description}</p>
          
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Color Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center border rounded-md">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="rounded-none rounded-l-md"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="px-4 py-2 text-center w-12 border-x">
                    {quantity}
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon"
                    onClick={increaseQuantity}
                    className="rounded-none rounded-r-md"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          
          {/* Additional product information */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-medium mb-2">Product Details</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Materials: Premium quality fabrics</li>
              <li>Care: Machine wash cold, tumble dry low</li>
              <li>Made in: Ethical manufacturing facilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
