const cloudinary = require('cloudinary').v2
exports.imageUploadToCloudinary = async(file,folder,height,quality)=>{
        try {
            const options = {folder};
            if(height){
                options.height = height
            }
            if(quality){
                options.quality = quality;
            }
            options.resource_type = "auto"// self find is it video or image
            return await cloudinary.uploader.upload(file,options);
        } catch (error) {
            console.log("Error in Uploading to Cloudinary : ",error.message);
            
            
        }
}