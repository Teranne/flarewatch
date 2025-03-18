
import React, { createContext, useContext, useState } from 'react';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
}

interface UserProfileData {
  profiles: Profile[];
  selectedProfile: Profile | null;
  watchlist: any[];
  history: any[];
}

interface ProfileContextType {
  userProfiles: UserProfileData | null;
  loading: boolean;
  error: string | null;
  selectedProfile: Profile | null;
  selectProfile: (profile: Profile) => void;
  addProfile: (profile: Omit<Profile, "id">) => Promise<void>;
  updateProfile: (profileId: string, data: Partial<Profile>) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
  addToWatchlist: (item: any) => Promise<void>;
  removeFromWatchlist: (itemId: number) => Promise<void>;
  addToHistory: (item: any) => Promise<void>;
  isInWatchlist: (itemId: number) => boolean;
}

const defaultProfile: Profile = {
  id: 'default',
  name: 'Default Profile',
  avatar: '/placeholder.svg',
  isKids: false,
};

const defaultUserData: UserProfileData = {
  profiles: [defaultProfile],
  selectedProfile: defaultProfile,
  watchlist: [],
  history: [],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfiles, setUserProfiles] = useState<UserProfileData>(defaultUserData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectProfile = (profile: Profile) => {
    setUserProfiles(prev => ({
      ...prev,
      selectedProfile: profile
    }));
  };

  const addProfile = async (profileData: Omit<Profile, "id">) => {
    const newProfile: Profile = {
      ...profileData,
      id: Date.now().toString(),
    };
    
    setUserProfiles(prev => ({
      ...prev,
      profiles: [...prev.profiles, newProfile]
    }));
  };

  const updateProfile = async (profileId: string, data: Partial<Profile>) => {
    setUserProfiles(prev => ({
      ...prev,
      profiles: prev.profiles.map(profile => 
        profile.id === profileId ? { ...profile, ...data } : profile
      )
    }));
  };

  const deleteProfile = async (profileId: string) => {
    setUserProfiles(prev => ({
      ...prev,
      profiles: prev.profiles.filter(profile => profile.id !== profileId)
    }));
  };

  const addToWatchlist = async (item: any) => {
    setUserProfiles(prev => ({
      ...prev,
      watchlist: [...prev.watchlist, item]
    }));
  };

  const removeFromWatchlist = async (itemId: number) => {
    setUserProfiles(prev => ({
      ...prev,
      watchlist: prev.watchlist.filter(item => item.id !== itemId)
    }));
  };

  const addToHistory = async (item: any) => {
    setUserProfiles(prev => ({
      ...prev,
      history: [item, ...prev.history]
    }));
  };

  const isInWatchlist = (itemId: number) => {
    return userProfiles.watchlist.some(item => item.id === itemId);
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfiles,
        loading,
        error,
        selectedProfile: userProfiles.selectedProfile,
        selectProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        addToWatchlist,
        removeFromWatchlist,
        addToHistory,
        isInWatchlist,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
