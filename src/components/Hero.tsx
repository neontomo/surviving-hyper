import React, { memo, useEffect, useState } from 'react'

function Hero({
  heroX,
  heroY,
  heroDirection,
  currentLevel
}: {
  heroX: number
  heroY: number
  heroDirection: number
  currentLevel: number
}) {
  const [shovelTilted, setShovelTilted] = useState(false)
  useEffect(() => {
    if (currentLevel !== 5) return
    const shovelInterval = setInterval(() => {
      setShovelTilted((prev) => !prev)
    }, 300)

    return () => clearInterval(shovelInterval)
  }, [currentLevel])
  return (
    <div
      className={`hero h-32 absolute bottom-0 transform transition-all duration-100 ease-in-out z-[100]`}
      style={{ left: `${heroX}px`, bottom: `${heroY}px` }}
    >
      <img
        src={`img/characters/hero1-${heroDirection === 1 ? 1 : 0}.webp`}
        alt="Hero"
        className={`h-full`}
      />
      {currentLevel === 5 && (
        <img
          src="img/objects/shovel.webp"
          alt="Shovel"
          className={`h-3/4 relative ${
            shovelTilted ? ' -rotate-12' : 'rotate-0'
          } ${heroDirection === 1 ? 'scale-x-[-1] -left-16' : '-left-2'}`}
        />
      )}
    </div>
  )
}

export default memo(Hero)
