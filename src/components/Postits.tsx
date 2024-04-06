import React, { memo } from 'react'

import cutPercentSides from '../utils/CutPercentSides'

function Postits({ active }: { active: boolean }) {
  const colors = [
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

  const randomColors = () => colors[Math.floor(Math.random() * colors.length)]

  const emojis =
    '🍿 🙌 💯 👆 🎯 🌟 😎 💥 🙏 ✅ 🌈 🦄 🌟 🌸 🍭 🎉 🍦 🎈 🎨 🎀 trust the pro cess'.split(
      ' '
    )

  return (
    <div className={`postits flex flex-row`}>
      {/* randomise emojis order */}

      {emojis
        // .sort(() => Math.random() - 0.5)
        // .slice(0, 15)
        .map((emoji, index) => {
          const colors = randomColors()
          const randomTop = cutPercentSides(Math.floor(Math.random() * 100), 30)
          const randomLeft = cutPercentSides(
            Math.floor(Math.random() * 100),
            15
          )

          return (
            <div
              key={index}
              className={`postit rounded-sm text-xs w-[30px] h-[30px] text-center cursor-pointer z-[100] text-black flex items-center justify-center shadow-md absolute `}
              /* ${
                active ? 'opacity-100' : 'opacity-90'
              } */
              style={{
                backgroundColor: colors[0],
                borderTop: `5px solid ${colors[1]}`,
                top: `${randomTop}%`,
                left: `${randomLeft}%`
              }}
            >
              <span>{emoji}</span>
            </div>
          )
        })}
    </div>
  )
}

export default memo(Postits)
