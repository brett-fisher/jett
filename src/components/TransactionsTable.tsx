import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faComment } from "@fortawesome/free-regular-svg-icons"
import { faSackDollar, faLandmark, faList } from "@fortawesome/free-solid-svg-icons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Transaction {
  id: string
  date: Date
  amount: number
  account: string
  category: string
  description: string
}

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'always'
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground">Your transactions</h2>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} className="text-muted-foreground text-sm" />
                  <span>Date</span>
                </div>
              </TableHead>
              <TableHead className="w-[150px]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faSackDollar} className="text-muted-foreground text-sm" />
                  <span>Amount</span>
                </div>
              </TableHead>
              <TableHead className="w-[150px]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faLandmark} className="text-muted-foreground text-sm" />
                  <span>Account</span>
                </div>
              </TableHead>
              <TableHead className="w-[150px]">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faList} className="text-muted-foreground text-sm" />
                  <span>Category</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faComment} className="text-muted-foreground text-sm" />
                  <span>Description</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.account}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 