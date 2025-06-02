"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface FriendCardProps {
  friend: {
    username: string;
    email: string;
    profile_picture?: string;
    firstname?: string;
    lastname?: string;
  };
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={friend.profile_picture} />
          <AvatarFallback>
            {friend.firstname ? friend.firstname[0] : friend.username[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-lg">
            {friend.firstname && friend.lastname
              ? `${friend.firstname} ${friend.lastname}`
              : friend.username}
          </div>
          <div className="text-sm text-muted-foreground">
            @{friend.username}
          </div>
          <div className="text-sm">{friend.email}</div>
        </div>
      </CardContent>
    </Card>
  );
}