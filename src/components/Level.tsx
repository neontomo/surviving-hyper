import React, { useCallback, useEffect, useState } from 'react'
import Sofas from './Sofas'
import Hero from './Hero'
import Stats from './Stats'
import Postits from './Postits'
import Light from './Light'
import SpiritGuide from './SpiritGuide'
import LevelCompletedMessage from './LevelCompletedMessages'
import Enemies from './Enemies'

export default function Level({
  currentLevel,
  setCurrentLevel,
  currentHealth,
  setCurrentHealth,
  setGameOver
}: {
  currentLevel: number
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>
  currentHealth: number
  setCurrentHealth: React.Dispatch<React.SetStateAction<number>>
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const speed = 50
  const [heroX, setHeroX] = useState<number>(0)
  const [heroY, setHeroY] = useState<number>(0)
  const [heroDirection, setHeroDirection] = useState<number>(0)
  const [onSofa, setOnSofa] = useState<boolean>(false)
  const [lightActive, setLightActive] = useState<boolean>(true)
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false)
  const [pausedGame, setPausedGame] = useState<boolean>(false)

  function twoElementsCheckCollision(
    element1: HTMLElement,
    element2: HTMLElement
  ) {
    const rect1 = element1.getBoundingClientRect()
    const rect2 = element2.getBoundingClientRect()

    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height
    )
  }

  const checkCollision = useCallback(() => {
    const hero = document.querySelector('.hero') as HTMLElement
    const sofas = document.querySelectorAll('.sofa') as NodeListOf<HTMLElement>
    const light = document.querySelector('.light') as HTMLElement
    const enemies = document.querySelectorAll(
      '.enemy'
    ) as NodeListOf<HTMLElement>

    let sofaCollisions = 0
    let enemyCollision = 0

    sofas.forEach((sofa) => {
      if (twoElementsCheckCollision(hero, sofa)) {
        sofaCollisions++
      }
    })

    enemies.forEach((enemy) => {
      if (twoElementsCheckCollision(hero, enemy)) {
        enemyCollision++
      }
    })

    if (light && twoElementsCheckCollision(hero, light)) {
      // FOUND THE LIGHT
      setLightActive(false)
      setLevelCompleted(true)

      const winTimeout = setTimeout(
        () => {
          setCurrentLevel((prevLevel) => {
            if (prevLevel < 5) return prevLevel + 1
            return 0
          })
          setHeroX(0)
          setTimeout(() => {
            setLightActive(true)
            setLevelCompleted(false)
          }, 200)
        },

        5000
      )

      return () => {
        clearTimeout(winTimeout)
      }
    }

    if (sofaCollisions > 0) {
      setOnSofa(true)
    } else {
      setOnSofa(false)
    }

    if (enemyCollision > 0 && sofaCollisions === 0) {
      setPausedGame(true)
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        animationFrameId = requestAnimationFrame(() => {
          setHeroX((prevX) => {
            if (prevX <= 0) return 0
            return prevX - speed
          })
          setHeroDirection(1)
        })
      }
      if (event.key === 'ArrowRight') {
        animationFrameId = requestAnimationFrame(() => {
          setHeroX((prevX) => {
            if (prevX >= window.innerWidth - 32) return window.innerWidth - 32
            return prevX + speed
          })
          setHeroDirection(0)
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    const collisionInterval = setInterval(() => {
      checkCollision()
    }, 10)

    return () => {
      clearInterval(collisionInterval)
    }
  }, [checkCollision])

  useEffect(() => {
    const sofaHeight = document.querySelector('.sofa')?.clientHeight ?? 0
    if (onSofa) {
      setHeroY(sofaHeight)
    } else {
      setHeroY(0)
    }
  }, [onSofa])

  useEffect(() => {
    if (!pausedGame) return
    setCurrentLevel(currentLevel)
    setCurrentHealth((prev) => prev - 1)
    setHeroX(0)
    setHeroY(0)
    setHeroDirection(0)
    setLightActive(true)
    setLevelCompleted(false)

    const pausedTimeout = setTimeout(() => {
      setPausedGame(false)
    }, 500)

    return () => {
      clearTimeout(pausedTimeout)
    }
  }, [pausedGame, currentLevel, setCurrentLevel, setCurrentHealth])

  useEffect(() => {
    if (currentHealth <= 0) {
      setGameOver(true)
      setCurrentLevel(1)
      setCurrentHealth(3)
    }
  }, [currentHealth, setCurrentLevel, setCurrentHealth])

  return (
    <>
      <Stats
        currentLevel={currentLevel}
        currentHealth={currentHealth}
        objective={LevelCompletedMessage[currentLevel - 1].objective}
      />
      {currentLevel < 5 && (
        <div>
          {/*  <Postits active={!levelCompleted} /> */}
          <Light active={!levelCompleted} />
          <SpiritGuide
            active={
              levelCompleted && !lightActive && heroX > window.innerWidth - 300
            }
            message={LevelCompletedMessage[currentLevel - 1].message}
            name={LevelCompletedMessage[currentLevel - 1].name}
          />
          <Enemies
            amount={currentLevel < 3 ? currentLevel : 2}
            active={!levelCompleted && !pausedGame}
          />
        </div>
      )}

      <Hero heroX={heroX} heroY={heroY} heroDirection={heroDirection} />
      <div
        className={`level bg-gray-800 h-[100vh] w-full flex flex-col grow justify-end bg-cover bg-center ${
          levelCompleted || currentLevel === 5 ? 'opacity-100' : 'opacity-30'
        }`}
        style={{
          backgroundImage: `url('img/areas/level-${currentLevel}.webp')`
        }}
      >
        {currentLevel < 5 && (
          <div>
            <Sofas amount={5 - currentLevel > 2 ? 6 - currentLevel : 3} />
          </div>
        )}
      </div>
    </>
  )
}
