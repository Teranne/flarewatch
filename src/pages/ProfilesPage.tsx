
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilesPage = () => {
  const { action, id } = useParams<{ 
    action?: string; 
    id?: string;
  }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {action === 'edit' ? 'Edit Profile' : 
             action === 'new' ? 'Create Profile' : 
             action === 'manage' ? 'Manage Profiles' : 
             'Select Profile'}
          </h1>
          
          {id && <p>Profile ID: {id}</p>}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-card rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium">Profile 1</h3>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-medium">Add Profile</h3>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilesPage;
