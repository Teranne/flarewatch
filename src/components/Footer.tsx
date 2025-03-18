
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm pt-10 pb-6 border-t border-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl font-bold text-turquoise-400">
              Flare<span className="text-foreground">Watch</span>
            </span>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlareWatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
