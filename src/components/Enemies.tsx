import React, { memo, useEffect } from 'react'

import cutPercentSides from '../utils/CutPercentSides'
import RandomNumber from '../utils/RandomNumber'

function moveSpecificEnemy(enemy: HTMLElement) {
  const enemyTimeout = setTimeout(() => {
    enemy.style.transform = `translateX(${cutPercentSides(
      RandomNumber({ type: 'int', min: 0, max: 100 }),
      20
    )}vw)`
    moveSpecificEnemy(enemy)
  }, RandomNumber({ type: 'int', min: 700, max: 1500 }))

  return () => clearTimeout(enemyTimeout)
}

function Enemies({ amount, active }: { amount: number; active: boolean }) {
  useEffect(() => {
    const enemies = document.querySelectorAll(
      '.enemy'
    ) as NodeListOf<HTMLElement>

    enemies.forEach((enemy) => {
      moveSpecificEnemy(enemy)
    })
  }, [])

  return (
    <div className="enemies absolute bottom-0 left-0 w-full flex flex-row h-20 z-[101]">
      {Array.from({ length: amount }).map((_, index) => {
        const randomMonster = RandomNumber({ type: 'int', min: 1, max: 5 })

        return (
          <div
            key={index}
            className={`enemy enemy_${index} ${active ? 'block' : 'hidden'}`}
            style={{
              transform: `translateX(${cutPercentSides(
                RandomNumber({ type: 'int', min: 0, max: 100 }),
                20
              )}vw)`,
              transition: 'transform 0.5s',
              animationTimingFunction: 'linear'
            }}
          >
            <img
              src={`img/monsters/${randomMonster}.webp`}
              alt="monster"
              className="h-full"
            />
          </div>
        )
      })}
    </div>
  )
}

export default memo(Enemies)
