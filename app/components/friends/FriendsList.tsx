"use client";

import { Friend } from "../../types/types"; // You should define this type in a shared types file
import { FriendCard } from "./FriendCard";

interface FriendsListProps {
  friends: Friend[];
  loading: boolean;
}

export function FriendsList({ friends, loading }: FriendsListProps) {
  if (loading) {
    return <div className="col-span-full">Loading...</div>;
  }

  if (friends.length === 0) {
    return <div className="col-span-full text-muted-foreground">You have no friends yet.</div>;
  }

  return (
    <>
      {friends.map((req) => (
        <FriendCard key={req.id} friend={req.friend} />
      ))}
    </>
  );
}