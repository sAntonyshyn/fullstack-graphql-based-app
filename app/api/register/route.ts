import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from '@/prisma'
import {connectToDatabase} from "@/helpers/server-helpers";

export async function POST(
  req: Request,
) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT_ROUNDS));

    await connectToDatabase();

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      }
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};