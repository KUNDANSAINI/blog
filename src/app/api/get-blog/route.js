import connectToDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"


export async function GET(){
    try{
        await connectToDB()
        const AllBlogData=await Blog.find({})
        //console.log(AllBlogData)
        
        if(AllBlogData){
            return NextResponse.json({
                success:true,
                data:AllBlogData
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Something Went Wrong! Please Try Again"
            })
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong! Please Try Again"
        })
    }
}