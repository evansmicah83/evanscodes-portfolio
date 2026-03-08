'use client'

import { createContext, useContext, useState } from 'react'

interface MathModeContextType {
  mathMode: boolean
  toggleMathMode: () => void
}

const MathModeContext = createContext<MathModeContextType | undefined>(undefined)

export function MathModeProvider({ children }: { children: React.ReactNode }) {
  const [mathMode, setMathMode] = useState(false)

  const toggleMathMode = () => {
    setMathMode(!mathMode)
    
    // Auto-scroll to math content section when toggled on
    if (!mathMode) {
      setTimeout(() => {
        const mathSection = document.getElementById('learning')
        if (mathSection) {
          mathSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <MathModeContext.Provider value={{ mathMode, toggleMathMode }}>
      {children}
    </MathModeContext.Provider>
  )
}

export function useMathMode() {
  const context = useContext(MathModeContext)
  if (!context) {
    throw new Error('useMathMode must be used within MathModeProvider')
  }
  return context
}

export function MathModeToggle() {
  const { mathMode, toggleMathMode } = useMathMode()

  return (
    <button
      onClick={toggleMathMode}
      className="fixed bottom-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg"
      title="Toggle Math Mode"
    >
      {mathMode ? '∑ Math ON' : '∑ Math OFF'}
    </button>
  )
}