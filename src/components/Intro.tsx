import React, { useEffect, useState } from 'react'

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
      }}
    >
      <div className="fixed top-[-2000px]">
        <img src="img/characters/hero1-loop.gif" alt="Hyper Island" />
        <img src="img/characters/hero2-loop.gif" alt="Hyper Island" />
      </div>
      <div className="flex flex-col m-auto items-center justify-evenly gap-8 h-[90%]">
        {(currentIntro < 4 || currentIntro === 5) && (
          <>
            <h1 className="text-white text-8xl">Surviving Hyper</h1>
            <img
              src={`/img/notes/intro${currentIntro}.webp`}
              alt="Hyper Island"
              className="w-[60%] zoom-on-hover-small"
            />

            <div className="flex flex-row justify-center">
              <button
                className="py-4 px-8 font-sans text-xl border-4 border-black border-solid bg-white hover:bg-black hover:text-white transition-colors duration-200 ease-in-out cursor-pointer"
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
                }}
              >
                {currentIntro === 5
                  ? "Nevermind, let's try again..."
                  : 'Continue...'}
              </button>
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
