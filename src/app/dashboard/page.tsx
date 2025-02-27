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
import { FinanceOverview } from '@/components/FinanceOverview'
import { Summary } from '@/components/Summary'
import { TransactionsTable } from '@/components/TransactionsTable'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Dashboard() {
  const { user, loading } = useAuth()

  // Sample transactions data
  const transactions = [
    {
      id: '1',
      date: new Date('2024-01-14'),
      amount: -20000,
      account: 'Main Account',
      category: 'Bills',
      description: 'Rent Payment'
    },
    {
      id: '2',
      date: new Date('2024-01-14'),
      amount: 12850,
      account: 'Savings',
      category: 'Income',
      description: 'Salary Deposit'
    },
    {
      id: '3',
      date: new Date('2024-01-14'),
      amount: -10973,
      account: 'Credit Card',
      category: 'Shopping',
      description: 'Electronics Purchase'
    },
    {
      id: '4',
      date: new Date('2024-01-14'),
      amount: -14300,
      account: 'Main Account',
      category: 'Bills',
      description: 'Car Payment'
    },
    {
      id: '5',
      date: new Date('2024-01-14'),
      amount: 38257,
      account: 'Investment',
      category: 'Returns',
      description: 'Stock Dividends'
    }
  ]

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
    <>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
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

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <FinanceOverview 
                moneyIn={5000}
                moneyOut={2500}
                leftToSpend={2500}
              />
            </div>
            <div className="col-span-1">
              <Summary />
            </div>
          </div>

          <TransactionsTable transactions={transactions} />
        </div>
      </div>
      <ThemeToggle />
    </>
  )
} 