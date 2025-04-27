import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/utils/data';
import { Product, Category } from '@/utils/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const Products: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep default order
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
    setPriceRange([0, 100]);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our collection of high-quality clothing and accessories. Find your perfect style.
          </p>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <Button variant="outline" onClick={toggleFilters} className="w-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - mobile collapsible, desktop always visible */}
          <aside className={`w-full md:w-64 ${filtersVisible ? 'block' : 'hidden'} md:block`}>
            <div className="sticky top-4 bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {/* Search Filter */}
                <AccordionItem value="search">
                  <AccordionTrigger>Search</AccordionTrigger>
                  <AccordionContent>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="pl-8"
                      />
                      {searchQuery && (
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setSearchQuery('')}
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Category Filter */}
                <AccordionItem value="category">
                  <AccordionTrigger>Category</AccordionTrigger>
                  <AccordionContent>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Price Filter */}
                <AccordionItem value="price">
                  <AccordionTrigger>Price</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Min: ${priceRange[0]}</span>
                        <span>Max: ${priceRange[1]}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePriceChange(0, 25)}
                        >
                          Under $25
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePriceChange(25, 50)}
                        >
                          $25 - $50
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePriceChange(50, 75)}
                        >
                          $50 - $75
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePriceChange(75, 100)}
                        >
                          Over $75
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Sort By */}
                <AccordionItem value="sort">
                  <AccordionTrigger>Sort By</AccordionTrigger>
                  <AccordionContent>
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters} 
                  className="mt-4"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <>
                <div className="text-sm text-gray-500 mb-4">
                  Showing {filteredProducts.length} products
                </div>
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
