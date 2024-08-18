import Bill from "@/app/model/Bill";
import { connectToDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export  async function POST(req){
    try {
        await connectToDB();
        const {no,items,total}=await req.json();
        console.log(no)
        await Bill.create({no,items,total});
        return NextResponse.json({message:"Created"})
    } catch (error) {
        
    }
}
export async function GET(){
    try {
        await connectToDB()
        return NextResponse.json({data:await Bill.find()})
    } catch (error) {
        
    }
}