const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

mongoose.connect("mongodb://127.0.0.1:27017/aashroy", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection done")) //sort arrow function is used here
    .catch((err) => console.log(err));

const schema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password:{
        type:String,
        unique:true,
    },

    tokens: [{
        token: String
    }]
})
//middlewere (generating token)
schema.methods.usertoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY ) ;
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        // console.log(token)
        return token;

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const login = new mongoose.model("users", schema);
module.exports = login;