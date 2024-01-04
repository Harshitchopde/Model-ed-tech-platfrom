
const nodemailer = require("nodemailer")
const mailSender = async(email,title,body)=>{
    try {
        const transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        const info = transpoter.sendMail({
            from:'Harshit Chopde | 🙏🏻 ',
            to:`${email}`,// list of reciver
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info)
        return info
    } catch (error) {
        console.log("Error in sendMail :",error);
        
        throw error;
    }
}
module.exports = mailSender;