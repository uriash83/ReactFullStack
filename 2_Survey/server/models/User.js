const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
})

mongoose.model('users',userSchema);


/*




const userSchema = mongoose.model('users',{
    googleId: String
})



module.exports = userSchema;
*/