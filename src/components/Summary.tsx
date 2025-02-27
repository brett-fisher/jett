import { cn } from "@/lib/utils"

interface SummaryProps {
  className?: string
}

export function Summary({ className }: SummaryProps) {
  const categories = [
    { name: 'Income', amount: 5000 },
    { name: 'Bills', amount: 1500 },
    { name: 'Expenses', amount: 800 },
    { name: 'Debt', amount: 500 },
    { name: 'Invest', amount: 1000 }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-muted-foreground">Summary</h2>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{category.name}</span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(category.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 