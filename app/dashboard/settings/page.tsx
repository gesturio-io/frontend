'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email_notifications: false,
    course_notifications: false,
    progress_notifications: false
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    email: '',
    otp: '',
    new_password: '',
    showOtpFields: false
  });

  // Account deletion state
  const [deleteData, setDeleteData] = useState({
    password: ''
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    preferred_language: 'en',
    difficulty_level: 'intermediate',
    daily_goal: 30
  });

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profile_visibility: false,
    show_progress: false,
    activity_feed: false
  });

  // Fetch initial data
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        
        // Fetch notification preferences
        const notifRes = await fetch(`${apiUrl}/settings/notifications/`, {
          credentials: 'include'
        });
        if (!notifRes.ok) throw new Error('Failed to fetch notifications');
        const notifData = await notifRes.json();
        setNotifications(notifData);
        
        // Fetch user preferences
        const prefRes = await fetch(`${apiUrl}/settings/preferences/`, {
          credentials: 'include'
        });
        if (!prefRes.ok) throw new Error('Failed to fetch preferences');
        const prefData = await prefRes.json();
        setPreferences(prefData);
        
        // Fetch privacy settings
        const privacyRes = await fetch(`${apiUrl}/settings/privacy/`, {
          credentials: 'include'
        });
        if (!privacyRes.ok) throw new Error('Failed to fetch privacy settings');
        const privacyData = await privacyRes.json();
        setPrivacy({
          profile_visibility: privacyData.profile_visibility === 'public',
          show_progress: privacyData.show_progress,
          activity_feed: privacyData.activity_feed || false
        });

      } catch (error: any) {
        toast.error(error.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [apiUrl]);

  // Handle notification preferences update
  const handleNotificationUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/settings/notifications/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(notifications)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Update failed');
      }
      toast.success('Notification preferences updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update notification preferences');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP request
  const handleRequestOtp = async () => {
    if (!passwordData.email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/settings/password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: passwordData.email })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'OTP request failed');
      }
      
      toast.success('OTP sent to your email');
      setPasswordData(prev => ({
        ...prev,
        showOtpFields: true
      }));
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!passwordData.otp) {
      toast.error('Please enter the OTP');
      return;
    }
    if (passwordData.new_password.length < 5) {
      toast.error('Password must be at least 5 characters');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/settings/password/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          otp: passwordData.otp,
          new_password: passwordData.new_password
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Password change failed');
      }
      
      toast.success('Password changed successfully');
      setPasswordData({
        email: '',
        otp: '',
        new_password: '',
        showOtpFields: false
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  // Handle preferences update
  const handlePreferencesUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/settings/preferences/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(preferences)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Update failed');
      }
      toast.success('Preferences updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  // Handle privacy settings update
  const handlePrivacyUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/settings/privacy/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          profile_visibility: privacy.profile_visibility ? 'public' : 'private',
          show_progress: privacy.show_progress,
          activity_feed: privacy.activity_feed
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Update failed');
      }
      toast.success('Privacy settings updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update privacy settings');
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleAccountDeletion = async () => {
    if (!deleteData.password) {
      toast.error('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      
      // First verify password
      const verifyRes = await fetch(`${apiUrl}/settings/accounts/delete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password: deleteData.password })
      });
      
      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        throw new Error(errorData.message || 'Password verification failed');
      }
      
      // Then delete account
      const deleteRes = await fetch(`${apiUrl}/settings/accounts/delete/`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!deleteRes.ok) {
        throw new Error('Account deletion failed');
      }
      
      toast.success('Account deleted successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-6">
      {/* Header with title and logout button */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>
      
      {/* Main settings content */}
      <div className="grid gap-6 lg:grid-cols-[350px_1fr] xl:grid-cols-[380px_1fr_1fr] xl:gap-6">
        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={passwordData.email}
                  onChange={(e) => setPasswordData({...passwordData, email: e.target.value})}
                  disabled={passwordData.showOtpFields}
                />
              </div>
              
              {!passwordData.showOtpFields ? (
                <Button 
                  onClick={handleRequestOtp}
                  disabled={loading || !passwordData.email}
                >
                  Request OTP
                </Button>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input 
                      id="otp" 
                      type="text" 
                      placeholder="Enter OTP" 
                      value={passwordData.otp}
                      onChange={(e) => setPasswordData({...passwordData, otp: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input 
                      id="new_password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                    />
                    <p className="text-sm text-muted-foreground">Password must be at least 5 characters</p>
                  </div>
                  <Button 
                    onClick={handlePasswordChange}
                    disabled={loading || !passwordData.otp || passwordData.new_password.length < 5}
                  >
                    Change Password
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch 
                  checked={notifications.email_notifications}
                  onCheckedChange={(checked) => {
                    setNotifications({...notifications, email_notifications: checked});
                    handleNotificationUpdate();
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Course Updates</Label>
                  <p className="text-sm text-gray-500">Get notified about new content</p>
                </div>
                <Switch 
                  checked={notifications.course_notifications}
                  onCheckedChange={(checked) => {
                    setNotifications({...notifications, course_notifications: checked});
                    handleNotificationUpdate();
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Progress Reminders</Label>
                  <p className="text-sm text-gray-500">Daily learning reminders</p>
                </div>
                <Switch 
                  checked={notifications.progress_notifications}
                  onCheckedChange={(checked) => {
                    setNotifications({...notifications, progress_notifications: checked});
                    handleNotificationUpdate();
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Language</Label>
                <Select
                  value={preferences.preferred_language}
                  onValueChange={(value) => {
                    setPreferences({...preferences, preferred_language: value});
                    handlePreferencesUpdate();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select
                  value={preferences.difficulty_level}
                  onValueChange={(value) => {
                    setPreferences({...preferences, difficulty_level: value});
                    handlePreferencesUpdate();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Daily Goal (minutes)</Label>
                <Input 
                  type="number" 
                  value={preferences.daily_goal}
                  onChange={(e) => {
                    setPreferences({...preferences, daily_goal: parseInt(e.target.value) || 0});
                  }}
                  onBlur={handlePreferencesUpdate}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-gray-500">Show your profile to other learners</p>
                </div>
                <Switch 
                  checked={privacy.profile_visibility}
                  onCheckedChange={(checked) => {
                    setPrivacy({...privacy, profile_visibility: checked});
                    handlePrivacyUpdate();
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Progress Sharing</Label>
                  <p className="text-sm text-gray-500">Share your learning progress</p>
                </div>
                <Switch 
                  checked={privacy.show_progress}
                  onCheckedChange={(checked) => {
                    setPrivacy({...privacy, show_progress: checked});
                    handlePrivacyUpdate();
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activity Feed</Label>
                  <p className="text-sm text-gray-500">Show your activity in the community</p>
                </div>
                <Switch 
                  checked={privacy.activity_feed}
                  onCheckedChange={(checked) => {
                    setPrivacy({...privacy, activity_feed: checked});
                    handlePrivacyUpdate();
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Label>Delete Account</Label>
                <p className="text-sm text-gray-500">Permanently delete your account and all associated data</p>
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="Enter your password to confirm" 
                    value={deleteData.password}
                    onChange={(e) => setDeleteData({...deleteData, password: e.target.value})}
                  />
                  <Button 
                    variant="destructive"
                    onClick={handleAccountDeletion}
                    disabled={loading}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}