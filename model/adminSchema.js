const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isOnline:{
        type:Boolean,
        Default:false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
    
})

adminSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
       // await this.save();
        return token;
    }catch (error){
        console.log(error);
    }
}

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin