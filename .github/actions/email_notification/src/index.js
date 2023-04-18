"use strict"
const Mailjet = require('node-mailjet');


async function sendEmail() {
    const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE
    });

    await mailjet
        .post('send', {version: 'v3.1'})
        .request({
            Messages: [
                {
                    From: {
                        Email: "artem.borodavka@applitools.com",
                        Name: "Artem Borodavka"
                    },
                    To: [
                        {
                            Email: "artem.borodavka@applitools.com",
                            Name: "Artem Borodavka"
                        }
                    ],
                    Subject: "SUPPORT MATRIX CRON",
                    TextPart: "Dear Me",
                    HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
                }
            ]
        })
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}


module.exports = {
    sendEmail
}