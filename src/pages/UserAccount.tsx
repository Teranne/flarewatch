
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { useProfile } from '@/contexts/profile-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaGrid from '@/components/movie/MediaGrid';
import { Button } from '@/components/ui/button';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  UserRound, 
  Settings, 
  LogOut, 
  Clock, 
  Bookmark, 
  Heart, 
  History, 
  Users,
  Mail,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const UserAccount = () => {
  const { user, signout } = useAuth();
  const { userProfiles, selectedProfile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check if user is authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  // Get user watchlist and history
  const watchlist = userProfiles?.watchlist || [];
  const history = userProfiles?.history || [];

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signout();
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold">Account</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/profiles')}
              className="flex items-center"
            >
              <Users className="h-4 w-4 mr-2" />
              Switch Profile
            </Button>
          </div>
          
          <Tabs defaultValue="watchlist" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="watchlist">My List</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="info">Account Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
            
            {/* Watchlist Tab */}
            <TabsContent value="watchlist" className="animate-fade-in">
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
                emptyMessage="Your watchlist is empty. Add some titles to watch later."
              />
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history" className="animate-fade-in">
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
                emptyMessage="Your watch history is empty. Start watching some content!"
              />
            </TabsContent>
            
            {/* Favorites Tab */}
            <TabsContent value="favorites" className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Favorites</h2>
                  <p className="text-muted-foreground">
                    Your favorite movies and TV shows
                  </p>
                </div>
                
                <Button className="bg-turquoise-500 hover:bg-turquoise-600 text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
              </div>
              
              <div className="min-h-[40vh] flex-center">
                <div className="text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start adding your favorite movies and TV shows
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Account Info Tab */}
            <TabsContent value="info" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Profile Card */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>User Profile</CardTitle>
                      <CardDescription>
                        Manage your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg" alt={user.email || "User"} />
                          <AvatarFallback className="bg-muted text-2xl">
                            {user.email?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold">
                          {user.displayName || user.email?.split('@')[0] || "User"}
                        </h3>
                        <p className="text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="outline">
                        <UserRound className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Main Account Details */}
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Details</CardTitle>
                      <CardDescription>
                        Manage your account information and settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" value={user.email || ""} readOnly />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" value="••••••••" readOnly />
                          <p className="text-xs text-muted-foreground mt-1">
                            Last changed: Never
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Security Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Two-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Login Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified about new sign-ins to your account
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                      <Button className="w-full sm:w-auto bg-turquoise-500 hover:bg-turquoise-600 text-white">
                        <Shield className="h-4 w-4 mr-2" />
                        Update Security
                      </Button>
                      
                      <Button 
                        variant="destructive" 
                        className="w-full sm:w-auto"
                        onClick={handleLogout} 
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut ? (
                          <div className="flex items-center">
                            <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                            Signing Out...
                          </div>
                        ) : (
                          <>
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences" className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">Preferences</h2>
                <p className="text-muted-foreground">
                  Customize your streaming experience
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Playback Settings</CardTitle>
                    <CardDescription>
                      Manage how videos play on FlareWatch
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Autoplay next episode</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically play the next episode in a series
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Autoplay previews</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically play trailers and previews while browsing
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-0.5">
                      <Label>Default Quality</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Select your preferred video quality
                      </p>
                      <select className="w-full p-2 rounded-md border border-input bg-background">
                        <option value="auto">Auto</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Content Preferences</CardTitle>
                    <CardDescription>
                      Set your content language and viewing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-0.5">
                      <Label>Display Language</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Select your preferred interface language
                      </p>
                      <select className="w-full p-2 rounded-md border border-input bg-background">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    
                    <div className="space-y-0.5">
                      <Label>Audio Language</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Select your preferred audio language
                      </p>
                      <select className="w-full p-2 rounded-md border border-input bg-background">
                        <option value="original">Original</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                    
                    <div className="space-y-0.5">
                      <Label>Subtitle Language</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Select your preferred subtitle language
                      </p>
                      <select className="w-full p-2 rounded-md border border-input bg-background">
                        <option value="none">None</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage email and push notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Content Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new movies or shows are added
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Recommendations</Label>
                          <p className="text-sm text-muted-foreground">
                            Get personalized content recommendations
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Watchlist Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about changes to your watchlist items
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Promotions and Offers</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional emails and special offers
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-turquoise-500 hover:bg-turquoise-600 text-white">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Subscription Tab */}
            <TabsContent value="subscription" className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">Subscription</h2>
                <p className="text-muted-foreground">
                  Manage your FlareWatch subscription
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      You are currently on the Free Trial
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg mb-6">
                      <div>
                        <h3 className="font-semibold text-lg">Free Trial</h3>
                        <p className="text-sm text-muted-foreground">
                          Trial ends in 14 days on May 30, 2023
                        </p>
                      </div>
                      <Badge className="bg-turquoise-500">
                        Active
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Your plan includes:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-turquoise-500" />
                          HD video quality
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-turquoise-500" />
                          Watch on 2 screens simultaneously
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-turquoise-500" />
                          Ad-free viewing experience
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-turquoise-500" />
                          Limited catalog access
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-turquoise-500 hover:bg-turquoise-600 text-white">
                      Upgrade Plan
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Manage your payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <div className="p-4 border rounded-md flex items-start space-x-3">
                        <div className="h-10 w-14 bg-muted rounded flex-center">
                          <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Add payment method</p>
                          <p className="text-sm text-muted-foreground">
                            No payment method on file
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Billing Address</h4>
                      <p className="text-sm text-muted-foreground">
                        No billing address on file
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                    <CardDescription>
                      Choose the plan that's right for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <PlanCard 
                        name="Basic"
                        price="$8.99"
                        features={[
                          "Good video quality",
                          "Watch on 1 screen at a time",
                          "Ad-free viewing",
                          "Download on 1 device"
                        ]}
                      />
                      
                      <PlanCard 
                        name="Standard"
                        price="$13.99"
                        featured={true}
                        features={[
                          "Great video quality (1080p)",
                          "Watch on 2 screens at a time",
                          "Ad-free viewing",
                          "Download on 2 devices"
                        ]}
                      />
                      
                      <PlanCard 
                        name="Premium"
                        price="$17.99"
                        features={[
                          "Best video quality (4K, HDR)",
                          "Watch on 4 screens at a time",
                          "Ad-free viewing",
                          "Download on 6 devices",
                          "Spatial audio"
                        ]}
                      />
                    </div>
                  </CardContent>
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

// Helper components

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type PlanCardProps = {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
};

function PlanCard({ name, price, features, featured = false }: PlanCardProps) {
  return (
    <div className={`border rounded-lg overflow-hidden ${
      featured ? 'ring-2 ring-turquoise-500 shadow-lg' : ''
    }`}>
      {featured && (
        <div className="bg-turquoise-500 text-white text-center py-1 text-xs font-medium">
          MOST POPULAR
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 text-turquoise-500 translate-y-1" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full ${
            featured 
              ? 'bg-turquoise-500 hover:bg-turquoise-600 text-white' 
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          {featured ? 'Choose Plan' : 'Select'}
        </Button>
      </div>
    </div>
  );
}

export default UserAccount;
