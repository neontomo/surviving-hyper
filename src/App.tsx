import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import Intro from './components/Intro'
import Level from './components/Level'

function App() {
  const [currentIntro, setCurrentIntro] = useState(1)
  const [introCompleted, setIntroCompleted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentHealth, setCurrentHealth] = useState(4)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('introCompleted')) setIntroCompleted(true)
  }, [])

  return (
    <div className="bg-black block h-[100vh]">
      {!introCompleted && !gameOver && (
        <Intro
          currentIntro={currentIntro}
          setCurrentIntro={setCurrentIntro}
          setIntroCompleted={setIntroCompleted}
          setGameOver={setGameOver}
        />
      )}
      {introCompleted && !gameOver && (
        <div className="text-white text-2xl">
          <Level
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            currentHealth={currentHealth}
            setCurrentHealth={setCurrentHealth}
            setGameOver={setGameOver}
          />
        </div>
      )}
      {gameOver && (
        <Intro
          currentIntro={5}
          setCurrentIntro={setCurrentIntro}
          setIntroCompleted={setIntroCompleted}
          setGameOver={setGameOver}
        />
      )}
    </div>
  )
}

export default App
