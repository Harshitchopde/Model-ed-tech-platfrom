
import { createTransport } from "nodemailer";
const mailSender = async(email,title,body)=>{
    try {
        const transpoter = createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        const info =await transpoter.sendMail({
            from:'StudyNotion | Harshit Chopde 🙏🏻 ',
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
export default mailSender;