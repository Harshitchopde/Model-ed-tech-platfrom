import { v2 as cloudinary } from 'cloudinary';
export async function imageUploadToCloudinary(file, folder, height, quality) {
    try {
        const options = { folder };
        if (height) {
            options.height = height
        }
        if (quality) {
            options.quality = quality;
        }
        options.resource_type = "auto"// self find is it video or image
        // the latter function require path and options  || my error i give object insted of path
        // return await cloudinary.uploader.upload(file.tempFilePath,options);
       
        // Use the 'on' method to listen for the 'progress' event in upload_stream insted of uplaod
            
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.log("Error in Uploading to Cloudinary : ", error.message);


    }
}