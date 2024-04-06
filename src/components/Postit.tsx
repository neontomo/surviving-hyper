import React, { memo, useEffect, useState } from 'react'
import RandomNumber from '../utils/RandomNumber'

function getRandomPostitColors() {
  const colorsAll = [
    ['#EE93B8', '#CA7C9C'],
    ['#F5DE54', '#D0BC47'],
    ['#DE3C1B', '#BC3316'],
    ['#F7AE7A', '#D19367'],
    ['#F1B729', '#CC9B22'],
    ['#35BCEB', '#2D9FC7'],
    ['#99EE70', '#82CA5F'],
    ['#2980B9', '#226C9D'],
    ['#CD84F1', '#AE70CC'],
    ['#FFDA79', '#D8B966']
  ]

  return colorsAll[Math.floor(Math.random() * colorsAll.length)]
}
function Postit({ index }: { index: number }) {
  const [postitColors, setPostitColors] = useState<string[] | null>()
  const [x, setX] = useState<number>(50)
  const [y, setY] = useState<number>(110)

  if (!postitColors) setPostitColors(getRandomPostitColors())

  const transitionTime = RandomNumber({ type: 'int', min: 100, max: 2000 })

  useEffect(() => {
    const id = setInterval(() => {
      const newX = RandomNumber({ type: 'int', min: 0, max: 100 })
      const newY = RandomNumber({ type: 'int', min: 0, max: 100 })
      setX(newX)
      setY(newY)
    }, transitionTime)

    return () => {
      clearInterval(id)
    }
  }, [transitionTime])

  return (
    <>
      <div
        className={`postit postit_${index} rounded-sm text-xs w-[30px] h-[30px] text-center cursor-pointer z-[100] text-black flex items-center justify-center shadow-md absolute`}
        style={{
          backgroundColor: postitColors?.[0] || '#EE93B8',
          borderTop: `5px solid ${postitColors?.[1] || '#CA7C9C'}`,
          transition: `top ${transitionTime / 1000}s, left ${
            transitionTime / 1000
          }s`,
          top: `calc(${y}% - 30px)`,
          left: `calc(${x}% - 30px)`
        }}
      ></div>
    </>
  )
}

export default memo(Postit)
