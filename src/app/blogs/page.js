import BlogOverview from "../component/blog-overview";

async function ListOfBlogs(){
    try{
        const apiResponse=await fetch('http://localhost:3000/api/get-blog',{
            method:"GET",
            cache:"no-store"
        })
        const result=await apiResponse.json()
        return result.data

    }catch(error){
        throw new Error(error)
    }
}

async function Blogs() {

    const BlogList=await ListOfBlogs()
    
    return ( 
        <BlogOverview BlogList={BlogList} />
     );
}

export default Blogs;