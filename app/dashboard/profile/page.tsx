'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Flame,
  Globe,
  Mail,
  MapPin,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"
import { fetchHeatmapData } from "@/app/utils/analytics"
import { useUser } from "@/lib/contexts/UserContext"
import { EditProfileForm } from "@/app/components/profile/EditProfileForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type HeatmapData = {
  date: string;
  value: number;
}

interface FriendRequest {
  id: number;
  status: string;
  friend: {
    username: string;
    email: string;
    profile_picture?: string;
    firstname?: string;
    lastname?: string;
  };
}

export default function ProfilePage() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const { userProfile, loading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [requestActionLoading, setRequestActionLoading] = useState<number | null>(null);
  const [requestActionError, setRequestActionError] = useState<string | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [pendingRejectId, setPendingRejectId] = useState<number | null>(null);

  useEffect(() => {
    const loadHeatmapData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchHeatmapData();

        if (result && result.status === 'success' && result.data) {
          setHeatmapData(result.data);
        } else {
          setError('Failed to load heatmap data');
        }
      } catch (err) {
        setError('An error occurred while loading data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeatmapData();

    // Fetch incoming friend requests for the logged-in user
    async function fetchPendingRequests() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/addfriend?status=pending`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setPendingRequests(data.data?.friends || []);
        }
      } catch {
        setPendingRequests([]);
      }
    }
    fetchPendingRequests();
  }, []);

  // Accept/Reject friend request handlers
  const handleRequestAction = async (friend_id: number, action: 'accept' | 'reject') => {
    setRequestActionLoading(friend_id);
    setRequestActionError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/addfriend?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friend_id }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== 'success') {
        throw new Error(data.message || `Failed to ${action} request`);
      }
      // Remove the request from the list
      setPendingRequests((prev) => prev.filter((req) => req.id !== friend_id));
    } catch (err: any) {
      setRequestActionError(err.message || `Failed to ${action} request`);
    } finally {
      setRequestActionLoading(null);
    }
  };

  // Generate placeholder data if backend data is not available
  const generatePlaceholderData = () => {
    const today = new Date();
    const data = [];

    // Create a pattern of activity (more active on weekdays, less on weekends)
    for (let i = 0; i < 120; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Day of week (0 = Sunday, 6 = Saturday)
      const dayOfWeek = date.getDay();

      // More likely to be active on weekdays
      const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;

      // Recent days more likely to have activity
      const recencyFactor = Math.min(1, (120 - i) / 60);

      // Calculate probability of activity
      let activityProbability = isWeekday ? 0.7 : 0.4;
      activityProbability *= recencyFactor;

      // Determine activity level (0-4)
      let value = 0;
      if (Math.random() < activityProbability) {
        // More recent days tend to have higher activity
        const maxValue = Math.ceil(4 * recencyFactor);
        value = Math.floor(Math.random() * maxValue) + 1;
      }

      data.push({ date: date.toISOString().split("T")[0], value });
    }

    return data;
  };

  // Use backend data if available, otherwise use placeholder data
  const displayData = heatmapData.length > 0 ? heatmapData : generatePlaceholderData();

  const achievements = [
    {
      id: 1,
      name: "7-Day Streak",
      description: "Practiced for 7 consecutive days",
      icon: Flame,
      color: "amber",
      completed: true,
    },
    {
      id: 2,
      name: "First Lesson",
      description: "Completed your first lesson",
      icon: CheckCircle,
      color: "green",
      completed: true,
    },
    {
      id: 3,
      name: "Perfect Score",
      description: "Achieved 100% on a test",
      icon: Award,
      color: "blue",
      completed: true,
    },
    {
      id: 4,
      name: "10 Hour Club",
      description: "Practiced for 10+ hours",
      icon: Clock,
      color: "purple",
      completed: false,
      progress: "8/10",
    },
    {
      id: 5,
      name: "Social Butterfly",
      description: "Connected with 5 other learners",
      icon: Users,
      color: "pink",
      completed: false,
      progress: "2/5",
    },
    {
      id: 6,
      name: "Vocabulary Master",
      description: "Learn 100 different signs",
      icon: BookOpen,
      color: "orange",
      completed: false,
      progress: "42/100",
    },
  ]

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "lesson",
      title: "Completed Basic Greetings",
      date: "2 hours ago",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "practice",
      title: "Practiced Numbers & Counting",
      date: "Yesterday",
      icon: Clock,
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 7-Day Streak Badge",
      date: "2 days ago",
      icon: Award,
    },
    {
      id: 4,
      type: "test",
      title: "Passed Common Phrases Test",
      date: "3 days ago",
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "practice",
      title: "Practiced Family Signs",
      date: "4 days ago",
      icon: Clock,
    },
  ]

  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>
        <Button variant="outline" onClick={() => setShowEditForm(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr] xl:grid-cols-[380px_1fr_1fr] xl:gap-6">
        {/* Left Column - Profile Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center pb-6">
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                <AvatarImage
                  src={userProfile?.profile_picture || "/placeholder.svg?height=96&width=96"}
                  alt={`${userProfile?.firstname} ${userProfile?.lastname}`}
                />
                <AvatarFallback className="text-lg font-semibold">
                  {userProfile ? `${userProfile.firstname[0]}${userProfile.lastname[0]}` : 'U'}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">
                {userProfile ? `${userProfile.firstname} ${userProfile.lastname}` : 'Loading...'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {userProfile?.joined_at
                  ? `Joined ${new Date(userProfile.joined_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                  : 'Join date not available'}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span>7 Day Streak</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-amber-500" />
                  <span>Gold Rank</span>
                </Badge>
              </div>

              <div className="mt-6 w-full space-y-3 text-left border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{userProfile?.email || 'No email provided'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{userProfile?.country || 'Location not set'}</span>
                </div>
                {userProfile?.bio && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{userProfile.bio}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Stats</CardTitle>
              <CardDescription>Your progress overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Signs Learned</span>
                </div>
                <span className="font-bold">42</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Learning Time</span>
                </div>
                <span className="font-bold">12h 30m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Days Active</span>
                </div>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Achievements</span>
                </div>
                <span className="font-bold">7</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Learning Activity */}
        <div className="xl:space-y-6">
          {/* Learning Activity Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your daily learning activity over time</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="h-[300px] rounded-md bg-muted/5 p-6">
                <div className="grid h-full grid-cols-[repeat(5,1fr)] items-center justify-items-center gap-2">
                  {Array.from({ length: 5 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="grid grid-rows-7 gap-2">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const dataIndex = weekIndex * 7 + dayIndex;
                        const data = displayData[dataIndex];
                        let bgColor = "bg-muted-foreground/10";

                        if (data && data.value > 0) {
                          if (data.value === 1) bgColor = "bg-primary/30 hover:bg-primary/40";
                          else if (data.value === 2) bgColor = "bg-primary/50 hover:bg-primary/60";
                          else if (data.value === 3) bgColor = "bg-primary/70 hover:bg-primary/80";
                          else bgColor = "bg-primary hover:bg-primary/90";
                        }

                        return (
                          <div
                            key={dayIndex}
                            className={`h-4 w-4 rounded-full transition-colors ${bgColor}`}
                            title={data ? `${data.date}: ${data.value} activities` : "No activity"}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-3 text-xs">
                <span className="text-muted-foreground">Less</span>
                <div className="h-4 w-4 rounded-full bg-muted-foreground/10"></div>
                <div className="h-4 w-4 rounded-full bg-primary/30"></div>
                <div className="h-4 w-4 rounded-full bg-primary/50"></div>
                <div className="h-4 w-4 rounded-full bg-primary/70"></div>
                <div className="h-4 w-4 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">More</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Achievements */}
        <div className="xl:space-y-6">
          {/* Activity & Achievements Tabs */}
          <Card className="h-full">
            <Tabs defaultValue="activity" className="w-full h-full">
              <TabsList className="w-full grid grid-cols-2 p-0">
                <TabsTrigger value="activity" className="rounded-none data-[state=active]:bg-muted/50">Recent Activity</TabsTrigger>
                <TabsTrigger value="achievements" className="rounded-none data-[state=active]:bg-muted/50">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="m-0 p-0">
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <activity.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
              <TabsContent value="achievements" className="m-0 p-0">
                <CardHeader className="pb-2">
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Badges and rewards you've earned</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="grid gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-4 rounded-md border p-4 transition-opacity hover:bg-muted/50 ${!achievement.completed ? "opacity-60" : ""}`}
                      >
                        <div className="rounded-full bg-primary/10 p-2">
                          <achievement.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                            {!achievement.completed && achievement.progress && ` (${achievement.progress})`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Friend Requests Card */}{/* Incoming Friend Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="w-full mb-8">
            <h2 className="text-2xl font-bold mb-4">Incoming Friend Requests</h2>
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center gap-6 p-4 bg-white dark:bg-muted rounded-xl shadow border"
                >
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={req.friend.profile_picture} />
                    <AvatarFallback className="text-lg font-bold">
                      {req.friend.firstname
                        ? req.friend.firstname[0]
                        : req.friend.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-lg truncate">
                      {req.friend.firstname && req.friend.lastname
                        ? `${req.friend.firstname} ${req.friend.lastname}`
                        : req.friend.username}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      @{req.friend.username}
                    </div>
                    <div className="text-sm truncate">{req.friend.email}</div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={requestActionLoading === req.id}
                      onClick={() => handleRequestAction(req.id, "accept")}
                    >
                      {requestActionLoading === req.id ? "Accepting..." : "Accept"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-white"
                      disabled={requestActionLoading === req.id}
                      onClick={() => {
                        setPendingRejectId(req.id);
                        setShowRejectDialog(true);
                      }}
                    >
                      {requestActionLoading === req.id ? "Rejecting..." : "Reject"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {requestActionError && (
              <div className="text-red-500 mt-2">{requestActionError}</div>
            )}
          </div>
        )}
      </div>

      <EditProfileForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
      />

      {/* Confirmation Dialog for Reject */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to reject this friend request?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (pendingRejectId !== null) {
                  await handleRequestAction(pendingRejectId, "reject");
                  setShowRejectDialog(false);
                  setPendingRejectId(null);
                }
              }}
            >
              Yes, Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

