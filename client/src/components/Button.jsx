import React from 'react'
import clsx from 'clsx'

export default function Button({icon,className,label,type,onClick=()=>{

}}) {
  return (
    <div>
    <button
    type={type || 'button'}
    className={clsx("px-3 py-2 outline-none ",className)}
     onClick={onClick}>
    <span>{label}</span>
    {icon && icon}
</button>
    </div>
  )
}
