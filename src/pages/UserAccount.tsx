
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { useProfile } from '@/contexts/profile-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaGrid from '@/components/movie/MediaGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { UserRound, LogOut, Bookmark, Users } from 'lucide-react';

const UserAccount = () => {
  const { user, signout } = useAuth();
  const { userProfiles } = useProfile();
  const navigate = useNavigate();

  // Sample data for demonstration
  const watchlist = userProfiles?.watchlist || [];
  const history = userProfiles?.history || [];

  // Handle logout
  const handleLogout = async () => {
    try {
      await signout();
      navigate('/');
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Account</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/profiles')}
            >
              <Users className="h-4 w-4 mr-2" />
              Switch Profile
            </Button>
          </div>
          
          <Tabs defaultValue="watchlist" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="watchlist">My List</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="info">Account Info</TabsTrigger>
            </TabsList>
            
            {/* Watchlist Tab */}
            <TabsContent value="watchlist">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">My Watchlist</h2>
                <p className="text-muted-foreground">
                  Movies and TV shows you've saved to watch later
                </p>
              </div>
              
              <MediaGrid
                title=""
                items={watchlist}
                layout="grid"
              />
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">Watch History</h2>
                <p className="text-muted-foreground">
                  Movies and TV shows you've watched recently
                </p>
              </div>
              
              <MediaGrid
                title=""
                items={history}
                layout="grid"
              />
            </TabsContent>
            
            {/* Account Info Tab */}
            <TabsContent value="info">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-muted-foreground">{user?.email || 'Not signed in'}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Account Status</p>
                        <Badge variant="outline" className="mt-1">
                          Active
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Subscription</p>
                        <Badge className="bg-turquoise-500 text-white mt-1">
                          Premium
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Profiles</CardTitle>
                    <CardDescription>Manage your profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {userProfiles?.profiles.map((profile) => (
                        <div 
                          key={profile.id} 
                          className="flex items-center p-2 border rounded-md"
                        >
                          <div className="h-10 w-10 rounded-full bg-muted mr-3 flex items-center justify-center">
                            <UserRound className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{profile.name}</p>
                            {profile.isKids && (
                              <Badge variant="outline" className="text-xs">Kids</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/profiles/manage')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Profiles
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Watchlist</CardTitle>
                    <CardDescription>Your saved items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {watchlist.length === 0 ? (
                      <div className="text-center p-6">
                        <Bookmark className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p>Your watchlist is empty</p>
                        <Button className="mt-4" onClick={() => navigate('/movies')}>
                          Browse Movies
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {watchlist.slice(0, 4).map((item: any, idx: number) => (
                          <div key={idx} className="aspect-[2/3] bg-muted rounded-md" />
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/watchlist')}
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      View All Saved Items
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserAccount;
