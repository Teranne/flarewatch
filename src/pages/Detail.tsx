
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            Back
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">Detail Page</h1>
          <p>Viewing content with ID: {id}</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Detail;
