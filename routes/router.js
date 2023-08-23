const express = require('express');
const nodemailer = require('nodemailer')

const router = new express.Router();


router.post("/register",(req,res)=>{
    // console.log(req.body);

    // mera dil bhi kitna pagal hai ye pyar jo tumse krta hai 

    const {email} = req.body;
    const {useremail} = req.body;

    try{  
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });

        const mailOptions = {
            from : process.env.EMAIL,
            to:email,
            subject:"New Email Received from traffury website",
            html:`<h1>${useremail} has registered with us</h1>`
        }


        transporter.sendMail(mailOptions,(error,info)=>{
            if (error){
                console.log("Error", error)
            } else {
                console.log("Email send" + info.response);
                res.status(201).json({status:201,info})
            }
        })
    
    } catch(error){
        
        res.status(201).json({status:401,error})
    }
})



module.exports = router;