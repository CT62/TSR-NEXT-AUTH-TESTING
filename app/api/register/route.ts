import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client"
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function POST(request){
	const body = await request.json()

	const {name,username,password} = body.data;
	console.log(name);
	console.log(username);
	console.log(password);
	if(!name || !username || !password){
		return new NextResponse("Missing name, email, or password",{status: 400});
	}
	const exist = await prisma.user.findUnique({
		where:{
			username: username,
		}
	});
	if(exist){
		return new NextResponse("User already exists",{status:400});
	}
	
	const hashedPassword = await bcrypt.hash(password,10);
	const user = await prisma.user.create({
		data:{
			name,
			username,
			hashedPassword
		}
	});
	console.log(await prisma.user.findMany())
	return NextResponse.json(user)
}
