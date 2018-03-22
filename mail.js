var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587,     // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    auth: {
        user: 'burger',
        pass: 'password'
    },
    tls: {
        rejectUnauthorized: false
    }
});
let helperOptions = {
    from: '"andreas" <andreas@mrcaptain.info>',
    to: '<andreas@mrcaptain.info>',
    subject: 'Hallo World!',
    text: 'wow this is wonderful!'
}
transporter.sendMail(helperOptions, (err, info) =>{
    if (err){
        return console.log(err)
    }
    console.log('the message was sent')
    console.log(info)
})