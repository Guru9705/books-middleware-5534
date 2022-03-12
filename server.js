const express = require("express");
const users=require("./users.json")
const PORT = 8000;

let app = express();

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.listen(PORT,()=> {
    console.log("listening",PORT)
})