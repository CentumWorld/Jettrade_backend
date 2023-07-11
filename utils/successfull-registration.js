require('dotenv').config();

//const adminControllers = require('../controllers/adminControllers');

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken);

module.exports = function SuccessfullRegistrationSms(to, credential) {


    client.messages
        .create({ body: `You have successfully registered, your UserID is:- ${credential.userid} and Password is:-${credential.password} Link:-${"https://www.centumworld.com/"}`, from: "+14406353895", to: to })
        .then((e) => {
          
        })
        .catch(e => console.log("err", e))
}