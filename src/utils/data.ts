
import { Category, Product } from './types';

export const categories: Category[] = [
  {
    id: "1",
    name: "Men's Clothing",
    slug: "mens-clothing"
  },
  {
    id: "2",
    name: "Women's Clothing",
    slug: "womens-clothing"
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories"
  },
  {
    id: "4",
    name: "Footwear",
    slug: "footwear"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    slug: "classic-white-t-shirt",
    description: "A timeless classic white t-shirt made from 100% organic cotton for everyday comfort.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "1",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    slug: "slim-fit-jeans",
    description: "Modern slim fit jeans with a comfortable stretch fabric for the perfect fit.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "1",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black", "Gray"],
    inStock: true
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    slug: "summer-floral-dress",
    description: "Light and airy floral dress perfect for summer days and evenings.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "2",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue Floral", "Pink Floral"],
    inStock: true
  },
  {
    id: "4",
    name: "High-Waisted Leggings",
    slug: "high-waisted-leggings",
    description: "Comfortable high-waisted leggings perfect for workouts or casual wear.",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "2",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Gray"],
    inStock: true
  },
  {
    id: "5",
    name: "Leather Watch",
    slug: "leather-watch",
    description: "Classic design watch with genuine leather strap and reliable Japanese movement.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "3",
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    inStock: true
  },
  {
    id: "6",
    name: "Canvas Sneakers",
    slug: "canvas-sneakers",
    description: "Versatile canvas sneakers that go with any casual outfit.",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "4",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Navy"],
    inStock: true
  },
  {
    id: "7",
    name: "Wool Beanie",
    slug: "wool-beanie",
    description: "Soft and warm wool beanie for cold winter days.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "3",
    sizes: ["One Size"],
    colors: ["Gray", "Black", "Navy"],
    inStock: true
  },
  {
    id: "8",
    name: "Denim Jacket",
    slug: "denim-jacket",
    description: "Classic denim jacket with a modern fit, perfect for layering in any season.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "1",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Light Blue"],
    inStock: true
  }
];
