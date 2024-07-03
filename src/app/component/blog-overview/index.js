'use client'

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function BlogOverview({ BlogList }) {

    const [openBlog, setOpenBlog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [decs, setDecs] = useState('')
    const [editBlog, setEditBlog] = useState(null)

    const router=useRouter();

    useEffect(()=>{
        router.refresh();
    },[])

    const handleblogform = async (e) => {
        try {
            const data = { title, decs }
            setLoading(true)
            //console.log(data)
            const apiResponse = editBlog!==null ? 
            await fetch(`/api/update-blog/?id=${editBlog}`,{
                method:"PUT",
                body:JSON.stringify(data)
            })            
            : await fetch(`/api/add-blog`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            const result = await apiResponse.json()
            if (result.success) {
                setTitle(title)
                setDecs(decs)
                setEditBlog(null)
                setLoading(false)
                setOpenBlog(false)
                router.refresh()
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            setDecs('')
            setTitle('')
        }
    }

    async function handleDelete(e,id){
        try{
            const apiResponse=await fetch(`/api/delete-blog/?id=${id}`,{
                method:"DELETE"
            })
            const result=await apiResponse.json()

            if(result.success){
                router.refresh()
            }

        }catch(error){
            console.log(error)
        }
    }

    const handleUpdate=(e,blog)=>{
        setEditBlog(blog._id)
        setTitle(blog.title)
        setDecs(blog.decs)
        setOpenBlog(true)
    }
   

    //console.log(editBlog)

    return (
        <div className="min-h-screen flex flex-col gap-10 p-6">
            <div>
                <Link href={'/'}><Button>Go To Home</Button></Link>
            </div>
            <div>
                <Button onClick={() => setOpenBlog(true)}>Add New Blog</Button>
            </div>
            <div>
                {/* ALL BLOG DATA LIST */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                    {
                        BlogList && BlogList.length > 0 ?
                            BlogList.map(blog =>
                                <Card className='p-5' key={blog._id}>
                                    <CardContent>
                                        <CardTitle className='mb-5'>{blog.title}</CardTitle>
                                        <CardDescription>{blog.decs}</CardDescription>
                                        <div className="mt-5 flex gap-5 items-center">
                                            <Button onClick={(e)=>{handleUpdate(e,blog)}}>Edit</Button>
                                            <Button onClick={(e)=>{handleDelete(e,blog._id)}}>Delete</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : <Label className="text-3xl font-bold">No Data Found, Please Add A Blog</Label>
                    }
                </div>

                {/* Add Blog DATA Form */}
                <Dialog open={openBlog} onOpenChange={() => {
                    setOpenBlog(false)
                    setDecs('')
                    setTitle('')
                    setEditBlog(null)
                }}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editBlog ? "EDIT BLOG" : "ADD NEW BLOG"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    name="title"
                                    placeholder='Blog Title'
                                    id="title"
                                    className="col-span-3"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Decripation
                                </Label>
                                <Input
                                    name="decs"
                                    placeholder="Blog Decripation"
                                    id="decs"
                                    className="col-span-3"
                                    value={decs}
                                    onChange={(e) => { setDecs(e.target.value) }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={(e) => { handleblogform(e) }} type="submit">
                                {
                                    loading ? 'Saving Changes' : "Save Changes"
                                }
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default BlogOverview;