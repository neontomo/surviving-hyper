// TODO: fix the intro to be responsive and not just for desktop and add second character
import React, { useEffect, useState } from 'react'
import Button from './Button'

type IntroProps = {
  currentIntro: number
  setCurrentIntro: (value: number) => void
  setIntroCompleted: (value: boolean) => void
  setGameOver: (value: boolean) => void
}
export default function Intro({
  currentIntro,
  setCurrentIntro,
  setIntroCompleted,
  setGameOver
}: IntroProps) {
  const [currentCharacterSide, setCurrentCharacterSide] = useState(false)

  useEffect(() => {
    const intervalCharacter = setInterval(() => {
      setCurrentCharacterSide(!currentCharacterSide)
    }, 300)

    return () => {
      clearInterval(intervalCharacter)
    }
  }, [currentCharacterSide])

  return (
    <div
      className="intro flex h-full w-full grow bg-cover bg-center"
      style={{
        backgroundImage: `url('img/areas/level-0.webp')`
      }}>
      <div className="flex flex-col md:hidden text-white m-auto p-8 gap-8">
        <h1 className="text-white text-5xl text-center">Surviving Hyper</h1>
        <p className="text-2xl break-words">
          To play this game, you need to be on a desktop computer. If you are on
          a desktop computer, please resize your browser window to be wider.
          Thank you!
          <br />
          <br />- The Hyper Island students
        </p>
      </div>
      <div className="hidden md:flex flex-col m-auto items-center justify-evenly gap-8 h-[90%]">
        {(currentIntro < 4 || currentIntro === 5) && (
          <>
            <h1 className="text-white text-8xl">Surviving Hyper</h1>
            <img
              src={`/img/notes/intro${currentIntro}.webp`}
              alt="Hyper Island"
              className="w-[60%] zoom-on-hover-small"
            />

            <div className="flex flex-row justify-center">
              <Button
                onClick={() => {
                  if (currentIntro === 5) {
                    setIntroCompleted(true)
                    setGameOver(false)
                    sessionStorage.setItem('introCompleted', 'true')
                    return
                  }
                  if (currentIntro + 1 === 4) {
                    setIntroCompleted(true)
                    sessionStorage.setItem('introCompleted', 'true')
                    return
                  }
                  setCurrentIntro(currentIntro + 1)
                }}>
                {currentIntro === 5
                  ? "Nevermind, let's try again..."
                  : 'Continue...'}
              </Button>
            </div>
          </>
        )}
        {/* {currentIntro === 4 && (
          <div className="flex w-[100vw] justify-center">
            <div className="w-1/2 flex flex-col items-center gap-4">
              <h2 className="text-white">Choose your character</h2>
              <div className="flex flex-row justify-evenly w-full">
                <img
                  src={`img/characters/hero1-${
                    currentCharacterSide ? 0 : 1
                  }.webp`}
                  alt="Hyper Island"
                  onClick={() => {
                    setIntroCompleted(true)
                    sessionStorage.setItem('introCompleted', 'true')
                  }}
                  className="cursor-pointer hover:opacity-80"
                />
                <img
                  src={`img/characters/hero2-${
                    currentCharacterSide ? 0 : 1
                  }.webp`}
                  alt="Hyper Island"
                  onClick={() => {
                    if (currentIntro >= 4) {
                      setIntroCompleted(true)
                      sessionStorage.setItem('introCompleted', 'true')
                    }
                  }}
                  className="cursor-pointer hover:opacity-80"
                />
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}
