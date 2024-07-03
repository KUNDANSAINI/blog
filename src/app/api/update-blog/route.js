import connectToDB from "@/database"
import Blog from "@/models/blog"
import Joi from "joi"
import { NextResponse } from "next/server"

const EditBlog=Joi.object({
    title:Joi.string().required(),
    decs:Joi.string().required()
})


export async function PUT(req){
    try{

        await connectToDB()
        const {searchParams}= new URL(req.url)
        const BlogId= searchParams.get("id")

        if(!BlogId){
            return NextResponse.json({
                success:false,
                message:"Blog Id Not Valid"
            })
        }

        const {title,decs}=await req.json()

        const {error}=EditBlog.validate({
            title,decs
        })

        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }

        const UpdateBlog=await Blog.findOneAndUpdate({_id:BlogId},{title,decs},{new:true})

        if(UpdateBlog){
            return NextResponse.json({
                success:true,
                message:"Blog Successfully Updated"
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