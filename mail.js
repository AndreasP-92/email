var nodemailer = require('nodemailer')
    mail     = require('./config/aName')

// require('./server')
    // require('./server')(aName)

var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587,     // secure SMTP
    secure: false,
    auth: {
        user: mail.emailUser, // Insert mail user into a config file using module.exports
        pass: mail.emailPassword // Insert mail password into a config file using module.exports
    },
    tls: {
        rejectUnauthorized: false
    }
});
console.log('mail læst')
let helperOptions = {
    from: `"andreas" <andreas@mrcaptain.info>`,
    to: `<andreas@mrcaptain.info>`,
    subject: `Hallo World!`,
    text: `wow this is wonderful!`
}
transporter.sendMail(helperOptions, (err, info) =>{
    if (err){
        return console.log(err)
    }
    console.log('the message was sent')
    console.log(info)
})