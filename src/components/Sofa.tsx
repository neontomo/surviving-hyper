import React, { memo } from 'react'

function Sofa() {
  return (
    <div className="sofa flex">
      <img src="img/objects/sofa.webp" alt="Sofa" className={`w-36`} />
    </div>
  )
}

export default memo(Sofa)
