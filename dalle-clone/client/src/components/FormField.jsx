import React from 'react'

const FormField = ({labelName,name,type,placeholder,value,handleChange,isSurpriseMe,handleSurpriseMe}) => {
  return (
    <div>
    <div className='flex items-center gap-3 mb-3'>
      <label 
      htmlFor={name}
      className='text-gray-700 text-sm font-medium block'
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
        type='button'
        onClick={handleSurpriseMe}
        className='text-black text-xs font-semibold bg-slate-200 rounded-md px-2 py-1'
        >
          Surprise Me
        </button>
      )}
    </div>
    <input
    type={type}
    name={name}
    id={name}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    required
    className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6449ff]  focus:border-[#6449ff] p-3 w-full ouline-none block'
    />
    </div>
  )
}

export default FormField