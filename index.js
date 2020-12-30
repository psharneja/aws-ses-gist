const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

// AWS.config.update({ region: process.env.REGION });

// function sendEmailSES(email, name, otp) {

//   const fromEmail = FROM_ARRAY[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
let email = 'someonesomewhere@gmail.com';
let fromEmail = 'noreply@verifiedemail.com';
let name = 'Random Person';
let otp = '123344';

let params = {
    Destination: {
        /* required */
        ToAddresses: [
            email,
            /* more items */
        ]
    },
    Message: {
        /* required */
        Body: {
            /* required */
            Html: {
                Charset: "UTF-8",
                Data: `<h3>Hi ${name}!</h3><br/>
         <p>Your OTP for Something Something Service Hub is:<em> ${otp}</em></p><br/>
         
         <p>Regards,<br/>
         Something Something Service Hub Team</p>`
            },
            Text: {
                Charset: "UTF-8",
                Data: `Hi  ${name}! 
         Your Login OTP is ${otp}`
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: `${otp} is the  OTP for Something Something Service Hub!`
        }
    },
    Source: fromEmail,
    /* required */
    ReplyToAddresses: [
        fromEmail,
        /* more items */
    ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({
    apiVersion: '2010-12-01'
}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
    function (data) {
        console.log(data.MessageId);
    }).catch(
    function (err) {
        console.error(err, err.stack);
    });

// }