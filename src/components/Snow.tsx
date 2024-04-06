import React, { memo } from 'react'
import RandomNumber from '../utils/RandomNumber'

function Snow() {
  const amountSnowing = 50
  const amountSnowToShovel = 20

  return (
    <>
      <style>
        {`
        .snowflake {
            animation: falling linear infinite;
        }
        @keyframes falling {
            0% { top: -10%; }
            100% { top: 100%; }
        }
        `}
      </style>
      <div className="snow-falling-container">
        {Array.from({ length: amountSnowing }).map((_, index) => {
          const randomLeft = Math.floor(Math.random() * 100)

          return (
            <span
              key={index}
              className={`snowflake snowflake_${index} absolute z-[150] top-[-10%] transform-gpu`}
              style={{
                left: `${randomLeft}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${RandomNumber({
                  type: 'int',
                  min: 3,
                  max: 10
                })}s`
              }}
            >
              *
            </span>
          )
        })}
      </div>
      <div className="snow-container flex flex-row p-0 m-0 h-8">
        {Array.from({ length: amountSnowToShovel }).map((_, index) => {
          return (
            <div key={index} className={`snow snow_${index}`}>
              <img
                src={`img/objects/snow.webp`}
                alt="Snow"
                className="object-cover h-full"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default memo(Snow)
