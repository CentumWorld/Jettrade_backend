const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.set('strictQuery',true);
dotenv.config();
mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
    console.log('connection sucessfull');
}).catch((err)=>{
    console.log(err);
})