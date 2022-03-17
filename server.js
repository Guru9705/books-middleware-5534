const express = require("express");
const books = require("./books.json")

const fs=require("fs")
const PORT = 8000;
var book=""
let app = express();

// app.get("/", (req, res) => {
//     res.sendFile(`${__dirname}/index.html`)
// })

function logger(req, res, next) {
  
    const obj = {
        "api_requested_by":"Gursimar"
    }
   // console.log("{ api_requested_by: Gursimar}");
    next();
    if (req.url == "/") {
        obj["books"] = books;
        console.log(obj)
    } else  {
        obj["book"] = book;
        console.log(obj)
    }
    //console.log("bye")
}

app.get("/", [logger],(req, res) => {
    res.json(books)
})

app.post("/books", [logger,express.json()],(req, res) => {
    books.push(req.body);
    fs.writeFileSync("books.json",JSON.stringify(books))
    res.json(req.body)
})

app.get("/books/:id", [logger] ,(req, res) => {
    const { id } = req.params;
    book = books.find((book) => book.id == parseInt(id));
    res.json(book)
})

app.patch("/books/:id", [logger,express.json()],(req, res) => {
    const { id } = req.params;
    const newbooks = books.map((book) => {
        if (book.id == id) {
            book.first_name=req.body.first_name
        }
        return book
    });
    fs.writeFileSync("books.json",JSON.stringify(newbooks))
    res.json(newbooks)
})

app.delete("/books/:id",[logger], (req, res) => {
    const { id } = req.params;
    const newbooks = books.filter((book) => book.id !== parseInt(id));
    fs.writeFileSync("books.json",JSON.stringify(newbooks))
    res.json(newbooks)
})

app.listen(PORT,()=> {
    console.log("listening",PORT)
})