"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Friend {
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

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/addfriend?status=accepted`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setFriends(data.data?.friends || []);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchFriends();
  }, []);

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Friends</h1>
      {loading ? (
        <div>Loading...</div>
      ) : friends.length === 0 ? (
        <div className="text-muted-foreground">You have no friends yet.</div>
      ) : (
        <div className="space-y-4">
          {friends.map((req) => (
            <Card key={req.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={req.friend.profile_picture} />
                  <AvatarFallback>
                    {req.friend.firstname
                      ? req.friend.firstname[0]
                      : req.friend.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">
                    {req.friend.firstname && req.friend.lastname
                      ? `${req.friend.firstname} ${req.friend.lastname}`
                      : req.friend.username}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    @{req.friend.username}
                  </div>
                  <div className="text-sm">{req.friend.email}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 