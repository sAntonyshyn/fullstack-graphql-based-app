'use client'

import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  type: HTMLInputTypeAttribute,
  value: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string
  id: string
  placeholder?: string
}

const Input = ({ type, value, onChange, name, id, placeholder }: InputProps) => {
  return (
    <input id={id} placeholder={placeholder} type={type} value={value} onChange={onChange} name={name} className={`w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black`}/>
  )
}

export default Input
