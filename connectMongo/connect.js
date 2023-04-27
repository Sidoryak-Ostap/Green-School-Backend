const mongoose = require("mongoose")


const conectBD = async (url) =>{


    await mongoose.connect(url).then(() =>{
        console.log("Mongo db is connected");
    }).catch(err =>{
        console.log("Some error occured during connecting Mongo db", );
    })

}


module.exports = {conectBD};