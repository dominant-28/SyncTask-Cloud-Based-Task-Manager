import React from 'react'
import clsx from 'clsx'

export default function Title({title,className}) {
  return (
    <div>
      <h2 className={clsx("text-2xl text-white font-semibold capitalize",className)}>
       {title}
      </h2>
    </div>
  )
}
