
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/utils/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add with default size and color
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };

  return (
    <Card className="overflow-hidden hover-scale">
      <Link to={`/product/${product.slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="bg-red-500 text-white px-3 py-1 rounded-md font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.category === '1' ? "Men's" : product.category === '2' ? "Women's" : product.category === '3' ? "Accessories" : "Footwear"}</p>
          <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleAddToCart(e)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};
