'use client'

import { memo } from 'react'

interface MenuIconProps {
  isOpen: boolean
  onClick: () => void
}

const MenuIcon = memo(({ isOpen, onClick }: MenuIconProps) => {
  return (
    <button
      type="button"
      className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center space-y-1">
          <span 
            className={`block h-0.5 w-5 sm:w-6 bg-white transform transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          />
          <span 
            className={`block h-0.5 w-5 sm:w-6 bg-white transform transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </div>
      </div>
    </button>
  )
})

MenuIcon.displayName = 'MenuIcon'

export default MenuIcon