import React from 'react'
import clsx from 'clsx'
const Textbox = React.forwardRef(({placeholder,type,label,classname,register,name,error,onChange,autoComplete}, ref) => {

  return (
    <div className='w-full flex flex-col gap-1'>{
      label &&(
        <label htmlFor={name} className='text-teal-200'>
          {label}
        </label>
        
      )
    }
    
      <div>
        <input 
        autoComplete={autoComplete? autoComplete:"off"}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        {...register} 
        aria-invalid={error?"true":"false"} 
        className={clsx("bg-[#1E2738] px-3 py-2.5 2xl:py-3 border border-teal-700 placeholder-gray-500 text-teal-200 outline-none text-base focus:ring-2 ring-teal-200", classname)} />
      </div>
      <div>
        {error&&(
          <span role='alert' className='text-red-500 text-sm'>
            {error}
          </span>
        )}
    </div>
    </div>
  )

})
export default Textbox;