const myReferral = require("../model/myReferralSchema");



exports.getAllMemberByReferralId = async(req,res)=>{
    try {
        const {businessDevRefferalId} = req.body;
        const r= myReferral.find({referr})
    } catch (error) {
        
    }
}