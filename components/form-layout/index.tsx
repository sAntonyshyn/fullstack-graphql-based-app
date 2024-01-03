'use client'

import { useSession } from 'next-auth/react'
import React, { FC, FormEvent, useCallback, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import Input from "@/components/input";
import { redirect } from "next/navigation";
import {Routes} from "@/constants/routes";

export interface FormState {
  email:string,
  password:string
}

const initialState: FormState = {
  email:'',
  password:''
}

type FormLayoutProps = {
  onSubmit: (state: FormState) => void
  helperText: React.ReactNode;
  buttonText: string;
}
const FormLayout: FC<FormLayoutProps> = ({ onSubmit, helperText, buttonText}) => {
  const { data: session } = useSession();
  const [state, setState] = useState(initialState)

  const _onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()

    onSubmit(state)
  }, [onSubmit, state])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  }, []);

  useLayoutEffect(() => {
    if (session) {
      redirect(Routes.HOME)
    }
  }, [session])

  if (session) {
    return null;
  }

  return (
    <div className='flex justify-around pt-[150px] items-center'>
      <form onSubmit={_onSubmit} className='text-center flex flex-col gap-8'>
        <div className='text-3xl font-semibold'>Welcome to the site!</div>
        <div className='flex flex-col justify-center w-[350px] mx-auto gap-2'>
          <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
          <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>
          <button type='submit' className='bg-teal-300 h-12 rounded-lg'>{buttonText}</button>
        </div>
        <div>
          {helperText}
        </div>
      </form>
      <div>
        <Image
          src="/next.svg"
          alt="Login"
          className="dark:invert"
          width={500}
          height={240}
          priority
        />
      </div>
    </div>
  )
}

export default FormLayout;
