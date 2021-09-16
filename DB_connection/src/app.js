
require("dotenv").config();
const express = require("express")
const path = require("path")
const app = express();
const hbs = require("hbs")
const bcrypt = require("bcryptjs")
const cookieparser = require("cookie-parser")
const port = process.env.port || 5513;

require("./db/dbConnection")
const login = require("./dbschema/schema")
const check = require("../middleware/auth")

const publicpath = path.join(__dirname, "../pubic")
const viewspath = path.join(__dirname, "../views")

//for database to update
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieparser());

app.use(express.static(publicpath));
app.set("view engine", "hbs")
app.set("views", viewspath)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/ashroy", check,(req, res) => {
    res.render("ashroy")
})
app.post("/ashroy", check,(req, res) => {
    res.render("ashroy")
})
app.get("/logout", check, async (req, res) => {
    try {
        //logout from one device
        req.user.tokens = req.user.tokens.filter((element) => {
            return element.token != req.token
        })
        //logout from all device
        // req.user.tokens=[];
        res.clearCookie("cook")
        await req.user.save();
        res.render("index")
    } catch (error) {
        console.log(error)
    }

})

//creating a new user(login) in oue data base
app.post("/index", async (req, res) => {
    try {
        const logined = new login(req.body);
        logined.password = await bcrypt.hash(req.body.password, 10);
        const token = await logined.usertoken();
        const read_to_store = await logined.save();

        //generating cookies
        res.cookie("cook", token)
        console.log("sending")
        res.render("index")
    } catch (error) {
        res.status(404).send(error)
    }
})



app.listen(port, () => {
    console.log("doneeeeeeee");
})