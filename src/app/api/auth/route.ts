import { NextResponse } from "next/server";

export async function POST(request: Request){
    try{

        const body = await request.json()
        const {email, password, accessToken} = body

        const response = NextResponse.json({
            success:true
        })

        response.cookies.set("nhost-token", accessToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge: 60*60*24*7
        })

        return response
        
    }
    catch(e){
        return NextResponse.json({error:"Internal server error"}, {status:500})
    }
}