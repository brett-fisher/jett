'use client'

import { useAuth } from '@/lib/auth/AuthContext'
import { supabase } from '@/lib/supabase/supabase'
import { redirect } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Dashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    redirect('/auth/signin')
  }

  const handleSignOut = async (): Promise<void> => {
    await supabase.auth.signOut()
    redirect('/auth/signin')
  }

  // Get user initials for avatar fallback
  const getInitials = (name?: string): string => {
    if (!name) return user?.email?.[0].toUpperCase() || '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Welcome to Jett!
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarImage 
                    src={user.user_metadata.avatar_url} 
                    alt={user.user_metadata.full_name || user.email} 
                  />
                  <AvatarFallback>
                    {getInitials(user.user_metadata.full_name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <span className="font-medium">{user.user_metadata.full_name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
} 