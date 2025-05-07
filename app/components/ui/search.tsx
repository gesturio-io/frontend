'use client'

import * as React from "react"
import { Check, ChevronsUpDown, Search as SearchIcon, User } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Friend {
  user_id: number;
  firstname: string;
  lastname: string;
  profile_picture?: string;
  username: string;
  email: string;
}

interface SearchProps {
  onSelect: (friend: Friend) => void;
}

export function Search({ onSelect }: SearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [results, setResults] = React.useState<Friend[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch friends from API as user types
  React.useEffect(() => {
    const fetchFriends = async () => {
      if (!value) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/search?q=${encodeURIComponent(value)}`,
        {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(fetchFriends, 300); // debounce
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          <span>Search friends...</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search friends..."
            value={value}
            onValueChange={setValue}
          />
          <CommandEmpty>{loading ? 'Searching...' : 'No friends found.'}</CommandEmpty>
          <CommandGroup>
            {results.map((friend) => (
              <CommandItem
                key={friend.user_id}
                value={friend.username}
                onSelect={() => {
                  setValue(friend.username);
                  onSelect(friend);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={friend.profile_picture} />
                    <AvatarFallback>{friend.firstname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{friend.firstname} {friend.lastname} (@{friend.username})</span>
                    <span className="text-xs text-muted-foreground">{friend.email}</span>
                  </div>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === friend.username ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 