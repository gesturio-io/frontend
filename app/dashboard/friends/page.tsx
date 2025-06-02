"use client";

import { useEffect, useState } from "react";
import { FriendsList } from "../../components/friends/FriendsList";
import { Friend } from "../../types/types"; // Define this type

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
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Friends</h1>
            <p className="text-muted-foreground">See and manage your friends</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          <FriendsList friends={friends} loading={loading} />
        </div>
      </div>
    </div>
  );
}