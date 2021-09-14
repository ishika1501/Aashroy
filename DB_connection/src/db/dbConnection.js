const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/aashroy", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection done")) //sort arrow function is udes here
    .catch((err) => console.log("error ho gya h"));

