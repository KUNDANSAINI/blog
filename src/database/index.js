import mongoose from 'mongoose'


const connectToDB=async ()=>{
    const connectionUrl='mongodb+srv://kundansaini:zQ0rFuVI5zGIpBWR@cluster0.svbt5jh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    mongoose.connect(connectionUrl).then(()=>{console.log("Connect To DB")}).catch((error)=>{
        console.log(error.message)
    })
}

export default connectToDB;