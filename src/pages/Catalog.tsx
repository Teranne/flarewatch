
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Catalog = () => {
  const { category, subcategory } = useParams<{ 
    category?: string;
    subcategory?: string;
  }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {category || 'All'} {subcategory ? `- ${subcategory}` : ''}
          </h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg aspect-[2/3] flex items-center justify-center">
                Item {index + 1}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
