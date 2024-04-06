import React, { useEffect, useState } from 'react'

function Credits({ active }: { active: boolean }) {
  const [opacity, setOpacity] = useState(0)
  const [y, setY] = useState(100)

  const credits = [
    {
      title: 'Game design & coding',
      name: 'Tomo Myrman'
    },
    {
      title: 'Level design, photos & descriptions',
      name: 'Alva Göthelid'
    },
    {
      title: 'Creature designs',
      name: 'Silviu Buruian'
    },
    {
      title: 'Organizing & social media',
      name: 'Ida Elweskiöld'
    },
    {
      title: 'Storytelling, photos & ideation',
      name: 'Uros Micic'
    },
    {
      title: 'Organizing & ideation',
      name: 'Angel Enakpoke'
    },
    {
      title: 'Ideation & vibes',
      name: 'Alagie "Samba" Tamba'
    }
  ]

  useEffect(() => {
    if (!active) return
    const creditsTimeout = setTimeout(() => {
      setOpacity(80)
      setY(0)
    }, 100)

    return () => {
      clearTimeout(creditsTimeout)
    }
  }, [active])

  if (!active) return null
  return (
    <div
      className="credits-curtain absolute w-full h-full bg-black z-[200] transition-opacity duration-1000"
      style={{
        opacity: `${opacity}%`
      }}
    >
      <div
        className="credits text-2xl px-32 w-full flex flex-col justify-evenly h-full transition-all"
        style={{
          transform: `translateX(0%) translateY(${y}%)`,
          transition: 'transform 20s'
        }}
      >
        <h1 className="text-center">Credits</h1>
        {credits.map((credit, index) => (
          <span
            key={index}
            className="credit-title flex flex-col md:flex-row justify-between break-words gap-8"
          >
            <span>{credit.title}</span>
            <span className="uppercase">{credit.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Credits
