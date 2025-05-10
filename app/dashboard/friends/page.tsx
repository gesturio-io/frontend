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
    <div className="py-8 space-y-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Friends</h1>
            <p className="text-muted-foreground">See and manage your friends</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {loading ? (
            <div className="col-span-full">Loading...</div>
          ) : friends.length === 0 ? (
            <div className="col-span-full text-muted-foreground">You have no friends yet.</div>
          ) : (
            friends.map((req) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
} 