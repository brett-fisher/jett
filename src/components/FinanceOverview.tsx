import { cn } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoneyBillTrendUp, faMoneyBillTransfer, faPiggyBank } from "@fortawesome/free-solid-svg-icons"

interface FinanceOverviewProps {
  moneyIn: number
  moneyOut: number
  leftToSpend: number
  className?: string
}

export function FinanceOverview({ moneyIn, moneyOut, leftToSpend, className }: FinanceOverviewProps) {
  // Format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-muted-foreground">Financing overview</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon 
              icon={faMoneyBillTrendUp} 
              className="text-muted-foreground text-sm"
            />
            <span className="text-sm text-muted-foreground">Money In</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{formatCurrency(moneyIn)}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon 
              icon={faMoneyBillTransfer} 
              className="text-muted-foreground text-sm"
            />
            <span className="text-sm text-muted-foreground">Money Out</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{formatCurrency(moneyOut)}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon 
              icon={faPiggyBank} 
              className="text-muted-foreground text-sm"
            />
            <span className="text-sm text-muted-foreground">Left to Spend</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{formatCurrency(leftToSpend)}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 