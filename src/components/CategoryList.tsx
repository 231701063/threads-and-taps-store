
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/utils/types';

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} to={`/category/${category.slug}`}>
          <Card className="hover-scale h-full">
            <CardContent className="p-6 flex items-center justify-center h-full">
              <h3 className="text-xl font-medium text-center">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
