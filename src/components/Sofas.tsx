import React, { memo } from 'react'
import Sofa from './Sofa'

function Sofas({ amount }: { amount: number }) {
  return (
    <div className="sofas w-[70%] flex flex-row justify-between mx-auto items-end">
      {Array.from({ length: amount }).map((_, index) => (
        <Sofa key={index} />
      ))}
    </div>
  )
}

export default memo(Sofas)
