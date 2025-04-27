
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/utils/types';
import { Trash, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const handleIncreaseQuantity = () => {
    onUpdateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.product.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border-b py-4">
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <Link to={`/product/${item.product.slug}`}>
          <img 
            src={item.product.imageUrl} 
            alt={item.product.name} 
            className="h-full w-full object-cover rounded"
          />
        </Link>
      </div>
      
      <div className="flex-grow px-4">
        <Link to={`/product/${item.product.slug}`}>
          <h3 className="font-medium">{item.product.name}</h3>
        </Link>
        <div className="text-sm text-gray-500 mt-1">
          Size: {item.size} | Color: {item.color}
        </div>
        <div className="font-semibold mt-2">${item.product.price.toFixed(2)}</div>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border rounded mr-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDecreaseQuantity}
            disabled={item.quantity <= 1}
            className="h-8 w-8"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleIncreaseQuantity}
            className="h-8 w-8"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onRemove(item.product.id)}
          className="text-red-600 hover:text-red-800 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
