
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductDetail } from '@/components/ProductDetail';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/utils/data';
import { Product as ProductType } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from API
    setLoading(true);
    setTimeout(() => {
      const foundProduct = products.find(p => p.slug === slug);
      setProduct(foundProduct || null);

      if (foundProduct) {
        // Find related products in same category, excluding the current product
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-80 w-full max-w-3xl bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for does not exist.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/products">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <ProductDetail product={product} />

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="product-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Product;
