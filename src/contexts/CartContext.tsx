
import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartItem, Product } from '../utils/types';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart', error);
      }
    }
  }, []);
  
  // Update local storage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  // Add item to cart
  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setItems(prevItems => {
      // Check if product already exists in cart with same size and color
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === product.id && 
          item.size === size && 
          item.color === color
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart.`,
        });
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
        return [...prevItems, { product, quantity, size, color }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
      return updatedItems;
    });
  };
  
  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
