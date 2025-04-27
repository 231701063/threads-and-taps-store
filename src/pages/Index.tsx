
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryList } from '@/components/CategoryList';
import { categories, products } from '@/utils/data';

const Index: React.FC = () => {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Fashion that speaks to your style
            </h1>
            <p className="mt-4 text-lg text-gray-600 md:text-xl">
              Discover the latest trends in fashion and explore our new collection of clothing and accessories.
            </p>
            <div className="mt-8 space-x-4">
              <Button asChild size="lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Fashion collection"
              className="rounded-lg object-cover w-full h-80 md:h-96 lg:h-[500px]"
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Categories</h2>
          <Link to="/categories" className="text-gray-600 hover:text-black">
            View all →
          </Link>
        </div>
        <CategoryList categories={categories} />
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-gray-600 hover:text-black">
            View all →
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-12">
        <div className="bg-gray-100 rounded-lg p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Summer Collection 2025</h3>
            <p className="text-gray-600 mb-6">
              Get ready for summer with our new collection of lightweight and breathable clothing. Perfect for hot days.
            </p>
            <Button asChild>
              <Link to="/category/summer-collection">Explore Collection</Link>
            </Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-yellow-100 to-transparent"></div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12">
        <div className="bg-gray-900 text-white rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 rounded-l-md text-black"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
