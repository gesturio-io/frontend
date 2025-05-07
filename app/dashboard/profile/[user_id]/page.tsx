"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserProfile {
  user_id: number;
  firstname: string;
  lastname: string;
  profile_picture?: string;
  username: string;
  email: string;
}

export default function UserProfilePage() {
  const { user_id } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isFriend, setIsFriend] = useState<"accepted" | "pending" | false | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/search?id=${user_id}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        // Find the user with exact user_id
        const found = data.find((u: UserProfile) => String(u.user_id) === String(user_id));
        if (!found) throw new Error("User not found");
        setUser(found);
        // Check friendship status
        try {
          const friendRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/addfriend?id=${user_id}`,
            { credentials: 'include' }
          );
          if (friendRes.ok) {
            const friendData = await friendRes.json();
            const isFriends = friendData.data?.friends;
            const status = friendData.data?.status;
            if (isFriends && status === "accepted") {
              setIsFriend("accepted");
            } else if (isFriends && status === "pending") {
              setIsFriend("pending");
            } else if (isFriends) {
              setIsFriend("accepted"); // fallback if status missing but friends is true
            } else {
              setIsFriend(false);
            }
          } else {
            setIsFriend(false);
          }
        } catch {
          setIsFriend(false);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    }
    if (user_id) fetchUser();
  }, [user_id]);

  const handleAddFriend = async () => {
    setAdding(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/addfriend?action=add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ friend_id: user?.user_id }),
      });
      const data = await res.json();
      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to add friend");
      }
      setAdded(true);
    } catch (err: any) {
      setError(err.message || "Failed to add friend");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
  <div className="min-h-screen w-full bg-background flex items-center justify-center pt-16 px-4">
    <div className="flex flex-col justify-center items-center max-w-md w-full px-8">
      <Avatar className="h-40 w-40 mb-6 shadow-lg border-4 border-primary">
        <AvatarImage src={user.profile_picture} />
        <AvatarFallback className="text-4xl">{user.firstname[0]}</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-extrabold mb-2 text-center">
        {user.firstname} {user.lastname}
      </h1>
      <div className="text-lg text-muted-foreground mb-1">Username: @{user.username}</div>
      <div className="text-lg mb-6">Email: {user.email}</div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {isFriend === "accepted" ? (
        <div className="text-green-600 font-semibold mt-2">Friends</div>
      ) : isFriend === "pending" ? (
        <div className="text-yellow-600 font-semibold mt-2">Pending</div>
      ) : isFriend === false ? (
        <Button onClick={handleAddFriend} disabled={adding || added} className="px-8 py-3 text-lg">
          {added ? "Friend Request Sent" : adding ? "Sending Request..." : "Send Friend Request"}
        </Button>
      ) : null}
    </div>
  </div>
);

} 