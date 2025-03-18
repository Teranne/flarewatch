
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Player = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          className="text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
      
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-white">Video Player for content ID: {id}</h1>
      </div>
    </div>
  );
};

export default Player;
