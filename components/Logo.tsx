'use client'

export default function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group hover:scale-105 transition-transform duration-300 overflow-hidden"
      type="button"
      aria-label="Go to home"
    >
      <div className="h-12 sm:h-14 md:h-16 w-auto relative">
        <img 
          src="/logo/Evanscodes logo.png" 
          alt="Evans Micah Logo" 
          className="h-full w-auto object-contain scale-150"
        />
      </div>
    </button>
  )
}
