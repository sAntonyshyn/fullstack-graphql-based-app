'use client'

import React, { useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import FormLayout, { FormState } from "@/components/form-layout";
import {Routes} from "@/constants/routes";

const Login = () => {
  const router = useRouter()

  const onSubmit = useCallback((state: FormState) => {
    signIn('credentials', {
      ...state,
      redirect:false,
    })
      .then((callback) => {
        if (callback?.ok) {
          console.log('success')
          router.push(Routes.HOME)
        }

        if (callback?.error) {
          throw new Error('Wrong Credentials')
        }
      })
  }, [router])

  return (
    <FormLayout
      onSubmit={onSubmit}
      helperText={<span>Haven&apos;t got an account ? <Link href={Routes.SIGN_UP} className="underline">Sign Up</Link></span>}
      buttonText={'Log In'}
    />
  )
}

export default Login;
