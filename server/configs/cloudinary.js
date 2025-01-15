import { v2 as cloudinary } from "cloudinary";
export async function cloudinaryConnect(){
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY_CLOUD, 
            api_secret: process.env.API_SECRET_CLOUD,
        })
        console.log("Connected to cloudinary");
        
    } catch (error) {
        console.log("Error in cloudinary : ",error.message);

        
    }
}