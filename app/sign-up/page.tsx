'use client'

import React, {useCallback, useLayoutEffect} from 'react'
import {redirect, useRouter} from 'next/navigation'
import Link from 'next/link'
import FormLayout, {FormState} from "@/components/form-layout";
import { Routes } from "@/constants/routes";
import {useSession} from "next-auth/react";

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();

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
  }, [router]);


  useLayoutEffect(() => {
    if (session) {
      redirect(Routes.HOME)
    }
  }, [session])

  if (session) {
    return null;
  }

  return (
    <FormLayout
      onSubmit={onSubmit}
      helperText={<span>Do you have an account ? <Link href={Routes.LOGIN} className="underline">Sign In</Link></span>}
    />
  )
}

export default SignUp;
