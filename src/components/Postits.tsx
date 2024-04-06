import React, { memo, useEffect, useState } from 'react'
import Postit from './Postit'

function Postits({ active }: { active: boolean }) {
  if (!active) return null

  const amountPostits = 20

  return (
    <div className={`postits flex flex-row`}>
      {Array.from({ length: amountPostits }).map((_, index) => {
        return <Postit key={index} index={index} />
      })}
    </div>
  )
}

export default memo(Postits)
