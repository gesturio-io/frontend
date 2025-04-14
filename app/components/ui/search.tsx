'use client'

import * as React from "react"
import { Check, ChevronsUpDown, Search as SearchIcon, User } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Friend {
  id: string
  name: string
  avatar?: string
  email: string
}

interface SearchProps {
  friends: Friend[]
  onSelect: (friend: Friend) => void
}

export function Search({ friends, onSelect }: SearchProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

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
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search friends..." />
          <CommandEmpty>No friends found.</CommandEmpty>
          <CommandGroup>
            {friends.map((friend) => (
              <CommandItem
                key={friend.id}
                value={friend.name}
                onSelect={() => {
                  setValue(friend.name)
                  onSelect(friend)
                  setOpen(false)
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{friend.name}</span>
                    <span className="text-xs text-muted-foreground">{friend.email}</span>
                  </div>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === friend.name ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 