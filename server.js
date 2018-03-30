var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    config = require('./config/aName')

// PORT ----------------------------

var app = express();
var port = 3000;

// ENGINE -----------------------------

    app.set('view engine', 'ejs');
    app.use(express.static('public'));

// RENDER ---------------------------

    app.get('/', function(req,res){
        res.render('index.ejs')
    })

// GETTING FORM DATA VIA BODY PARSER

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

// EMAIL FUNCTION

    app.post('/send-email', function (req, res) {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.office365.com', // Office 365 server
            port: 587,     // secure SMTP
            secure: false,
            auth: {
                user: config.emailUser, // Insert mail user into a config file using module.exports
                pass: config.emailPassword // Insert mail password into a config file using module.exports
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let mailOptions = {
            from: '"www.mrcaptain.info" <mail@mrcaptain.info>', // sender address
            to: `<andreas@mrcaptain.info>`, // reciver
            subject: `Fra Mrcaptain.info ` + req.body.subject, // Subject line
            html:`<h3>Fra</h3>` + req.body.from + `<br>` + `<h3>Besked</h3>` + req.body.message, // plain text bodyy
        };
        let dato = new Date()
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(dato + error);
            }
            console.log(dato + 'Message %s sent: %s', info.messageId, info.response);
                res.render('index');
            });
        });

// LISTENING ------------------------

    app.listen(port, function(req, res){
      console.log('Server is running at port: ',port);
 });