import connectToDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"


export async function DELETE(req) {
    try {
        await connectToDB()
        const { searchParams } = new URL(req.url)
        const BlogID = searchParams.get('id')

        if (!BlogID) {
            return NextResponse.json({
                success: false,
                message: "Blog Id Is Required"
            })
        }

        const deleteBlog = await Blog.findByIdAndDelete(BlogID)

        if (deleteBlog) {
            return NextResponse.json({
                success: true,
                message: "Blog Successfully Deleted"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong! Please Try Again"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong! Please Try Again"
        })
    }
}