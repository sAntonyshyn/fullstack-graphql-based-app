'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FormLayout, {FormState} from "@/components/form-layout";
import { Routes } from "@/constants/routes";

const SignUp = () => {
  const router = useRouter()

  const onSubmit = useCallback(async (state: FormState) => {
    const data = await fetch('/api/register', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(state)
    });
    const res = await data.json();

    if (res.user) {
      router.push(Routes.LOGIN)
    }

    console.log(res);
  }, [router])

  return (
    <FormLayout
      onSubmit={onSubmit}
      helperText={<span>Do you have an account ? <Link href={Routes.LOGIN} className="underline">Sign In</Link></span>}
      buttonText={'Sign Up'}
    />
  )
}

export default SignUp;
