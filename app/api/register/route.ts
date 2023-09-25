import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client"
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function POST(request){
	const body = await request.json();
	const {name,username,password} = body;
	console.log(body);
}
