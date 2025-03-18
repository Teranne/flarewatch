
import React from 'react';

const MediaGrid = ({ title, items = [], layout = 'grid' }: { 
  title: string;
  items: any[];
  layout?: 'grid' | 'carousel';
  genreMap?: Record<number, string>;
  mediaView?: 'poster' | 'backdrop';
  className?: string;
  emptyMessage?: string;
}) => {
  return (
    <div className="py-6 px-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      
      {items.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No items found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-card rounded-lg p-4">
              {item.title || item.name || 'Untitled'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGrid;
