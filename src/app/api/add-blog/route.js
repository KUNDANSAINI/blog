import connectToDB from "@/database"
import Blog from "@/models/blog"
import Joi from "joi"
import { NextResponse } from "next/server"

const AddNewBlog=Joi.object({
    title:Joi.string().required(),
    decs:Joi.string().required()
})


export async function POST(req){
    try{
        await connectToDB()
        
        const Blogdata=await req.json()
        const {title,decs}=Blogdata

        const {error}=AddNewBlog.validate({
            title,decs
        })

        if(error){
            return NextResponse({
                success:false,
                message:error.details[0].message
            })
        }

        const createBlog=await Blog.create(Blogdata)

        if(createBlog){
            return NextResponse.json({
                success:true,
                message: "Blog Successfully Created"
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Something Went Wrong ! Please Try Again"
            })
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong ! Please Try Again"
        })
    }
}