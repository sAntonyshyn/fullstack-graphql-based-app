'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import {Routes} from "@/constants/routes";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className='h-[80px]'>
      <nav className='bg-gray-200 flex justify-between px-4 py-6 shadow-xl'>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <div className='flex gap-4'>
          {session ? (
            <button onClick={() => signOut()}>Log out</button>
            ) : (
            <>
              <Link href={Routes.LOGIN}>Sign In</Link>
              <Link href={Routes.SIGN_UP}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
export default Navbar;
