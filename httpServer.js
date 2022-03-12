var http = require("http");
const fs=require("fs")
const users=require("./users.json")

const server = http.createServer((res, resp) => {
    console.log(res.url);
    console.log(res.method)
    if (res.url == "/" && res.method=="GET") {
        resp.write("Welcome to Home page")
    } else if (res.url == "/users" && res.method=="GET") {
      //  console.log(users)
       resp.write(JSON.stringify(users))
    } else if (res.url == "/users" && res.method=="POST") {
        

        res.on('data', function (body) {
            console.log("body",JSON.parse(body))
            users.push(JSON.parse(body))
        });

        res.on('end', function () {
            console.log(users)
             fs.writeFileSync("users.json",JSON.stringify(users))
           
        });

    } else if (res.url == "/users" && res.method == "PATCH") {
        res.on('data', function (body) {
            const obj=JSON.parse(body)
            const id = obj.id;
            const name = obj.first_name;
            users.map((u) => {
                if (u.id == id) {
                    u.first_name=name
                }
                return u;
            })
        });
   
        res.on('end', function () {
            console.log(users)
             fs.writeFileSync("users.json",JSON.stringify(users))
           
        });

        
    } else if (res.url == "/users" && res.method == "DELETE") {
        var data = [];
    res.on('data', function (body) {
        const obj=JSON.parse(body)
        const id = obj.id;
        data=users.filter((u)=>u.id!==id)
    });

    res.on('end', function () {
        console.log(data)
         fs.writeFileSync("users.json",JSON.stringify(data))
       
    });
    }
       
    resp.end();
    
})

server.listen(8000, () => {
    console.log("start server")
})

