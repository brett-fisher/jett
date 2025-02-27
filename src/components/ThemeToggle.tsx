import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="fixed bottom-6 right-6 bg-card rounded-lg shadow-lg border overflow-hidden">
      <div className="flex items-center">
        <button
          onClick={() => setIsDark(false)}
          className={`p-2.5 transition-colors ${!isDark ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
        >
          <FontAwesomeIcon 
            icon={faSun}
            className="text-sm"
          />
        </button>
        <button
          onClick={() => setIsDark(true)}
          className={`p-2.5 transition-colors ${isDark ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
        >
          <FontAwesomeIcon 
            icon={faMoon}
            className="text-sm"
          />
        </button>
      </div>
    </div>
  )
} 