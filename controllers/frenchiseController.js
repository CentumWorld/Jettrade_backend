const BusinessDeveloper = require("../model/businessDeveloperSchema");
exports.getBusinessDeveloperByReferrralId = async (req,res)=>{
    try {
        const {frenchiseReferalId} = req.body;
        const businessDeveloperes =await BusinessDeveloper.find({referredId:frenchiseReferalId});
        if(!businessDeveloperes){
            res.status(402).json({ message: "invalid id" });
        }
        res.status(200).json({message:"find successfully businessDeveloper",data:businessDeveloperes})
        
    } catch (error) {
        res.status(500).json({message:"invalid error occured",error:error.message})
    }
}


// const Frenchise = require("../model/frenchiseSchema")

// exports.getFranchisesByReferralId = async (req, res) => {
//   try {
//     const {stateReferralId} = req.body;
//     const frenchises = await Frenchise.find({referredId:stateReferralId})
//     if (!frenchises) {
//       res.status(402).json({ message: "invalid id" });
//     }
//     res.status(200).json({ message: "find successfully frenchise",data:frenchises });
//   } catch (error) {
//     res.status.json({ message: "an error ocu=cured", error: error.message });
//   }
// };
