import React from 'react'

function Button({
  children,
  onClick
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <div className="flex flex-row justify-center">
      <button
        className="py-3 px-6 font-sans text-lg border-4 border-black border-solid hover:border-white hover:text-white transition-colors duration-100 ease-in-out cursor-pointer z-[80] bg-cover bg-center"
        style={{ backgroundImage: `url('./img/objects/button.webp')` }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
