
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/userModel');




const CheckUserPosibilities = async (req,res,next) =>{

 try {

    
    const {token} = req.query;

    if(!token)
    {
      res.status(404).send('Access is denied')
    }
    const check_token = jwt.verify(token, 'secret123');
   
    
    const user = await UserModel.findOne({_id: check_token._id});

    if(!user)
    {
        return res.status(400).send('Aceess Denied');
    }

    next();
   
    } 
    
  catch (error) {
    console.log(error);
 }

}



module.exports = {CheckUserPosibilities};