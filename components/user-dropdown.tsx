"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, Trophy, LogOut, Flame, Loader2 } from "lucide-react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth-client"


interface UserDropdownProps {
  user: {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date
    updatedAt?: Date
    emailVerified?: boolean
  }
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter()

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await signOut()
    },
    onSuccess: () => {
      router.push("/")
      router.refresh()
    },
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
              <Flame className="h-3 w-3 text-orange-500" />
              <span>1,250 Aura</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/leaderboard" className="cursor-pointer">
            <Trophy className="mr-2 h-4 w-4" />
            <span>Leaderboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            signOutMutation.mutate()
          }}
          disabled={signOutMutation.isPending}
          className="cursor-pointer"
        >
          {signOutMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
