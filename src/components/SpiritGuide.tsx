import React from 'react'

function SpiritGuide({
  active,
  message,
  name
}: {
  active: boolean
  message: string
  name: string
}) {
  return (
    <>
      <style>
        {`.spirit-guide {
            transform: translateY(100%);
          }

          .spirit-guide.slide-in {
            transition: transform 0.5s ease-in;
            transform: translateY(0);
          }`}
      </style>
      <div
        className={`spirit-guide absolute bottom-0 left-1/2 flex flex-col items-start z-[100] ${
          active && 'slide-in'
        }`}
      >
        <h4 className="text-white bg-black rounded-xl w-60 p-4 text-md">
          {message}
        </h4>
        <div className="h-full w-32 flex">
          <img
            src={`img/spirit-guides/${name.toLowerCase()}.webp`}
            alt="Spirit Guide"
            title="Spirit Guide"
            className="h-full w-full"
          />
        </div>
      </div>
    </>
  )
}

export default SpiritGuide
