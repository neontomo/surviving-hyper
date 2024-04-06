import React, { memo } from 'react'

function Light({ active }: { active: boolean }) {
  return (
    <>
      {active ? (
        <h1 className="light text-5xl absolute right-2 bottom-2 z-[100]">💡</h1>
      ) : null}
    </>
  )
}

export default memo(Light)
