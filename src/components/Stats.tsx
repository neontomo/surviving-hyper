import React from 'react'

export default function Stats({
  currentLevel,
  currentHealth,
  objective,
  active,
  invincible
}: {
  currentLevel: number
  currentHealth: number
  objective: string
  active: boolean
  invincible: boolean
}) {
  if (!active) return null
  return (
    <div className="stats absolute z-10 top-0 left-0 w-full">
      <div className="flex flex-row justify-between px-8 py-8">
        <h1 className="opacity-70 hover:opacity-100">
          Level {currentLevel} / 5
        </h1>
        <div className="flex flex-col gap-2 p-8 max-w-72 bg-black rounded-xl text-md zoom-on-hover-small opacity-70 hover:opacity-100">
          <div className="flex flex-row justify-start gap-2">
            <span>Health:</span>
            {Array.from({ length: currentHealth }).map((_, index) => (
              <span key={index} role="img" aria-label="Heart">
                ❤️
              </span>
            ))}
          </div>
          <div className="flex flex-row justify-start gap-2">
            <span>Points:</span>
            {Array.from({ length: currentLevel - 1 }).map((_, index) => (
              <span key={index} role="img" aria-label="Lightbulb">
                💡
              </span>
            ))}
            {currentLevel - 1 === 0 && <span>0</span>}
          </div>
          <div className="flex flex-col text-start justify-start gap-2">
            <span>Objective:</span>
            <span className="break-words">{objective}</span>
          </div>
          {invincible && (
            <div className="flex flex-row text-start justify-start gap-2">
              <span>Invincible:</span>
              <span className="break-words">Yes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
