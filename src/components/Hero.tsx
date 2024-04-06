import React, { memo } from 'react'

function Hero({
  heroX,
  heroY,
  heroDirection
}: {
  heroX: number
  heroY: number
  heroDirection: number
}) {
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
    </div>
  )
}

export default memo(Hero)
