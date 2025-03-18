
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md shadow-md py-3 px-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-turquoise-400">
            Flare<span className="text-foreground">Watch</span>
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => window.location.href = '/login'}>
            Sign In
          </Button>
          <Button className="bg-turquoise-500 text-white hover:bg-turquoise-600">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
