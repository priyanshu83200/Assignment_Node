
// const http =require("http")
// const fs=require("fs")

// const server=http.createServer((req,res)=>{
//     console.log(req.method)
//     if(req.url=="/"){
//         res.end("home page")
//     }else if(req.url=="/About"){
//         res.end("About page" )
//     }else if(req.url=="/product"){
//        fs.readFile("./db.json","utf-8",(err,data)=>{
//         if(err){
//             console.log(err)
//             res.end(err)
//         }else{
//             const newdata=JSON.parse(data)
//             res.end(JSON.stringify(newdata.product))
//         }
//     } )
//     }else if(req.url=="/user"){
//         fs.readFile("./db.json","utf-8",(err,data)=>{
//          if(err){
//              res.end(err)
//          }else{
//              const userdata=JSON.parse(data)
//              res.end(JSON.stringify(userdata.user))
//          }
//      } )
//      }else if(req.url=="/addproduct" && req.method=="POST"){
//        res.end("hello")
//      }
//     else {
//         res.end("404 err")
//     }
// })

// server.listen(8080,()=>{
//     console.log("server is running")
// })

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url == "/") {
        res.end("home page")
    } else if (req.url == "/addproduct" && req.method == "POST") {
        let str = "";
        req.on("data", (chuunk) => {
            str = str + chuunk;
        });
        req.on("close", () => {
            //    fs.appendFile("./db.json", str,(err)=>{
            //     if(err){
            //         res.end(err)
            //     }else{
            //         res.end("data added success")
            //     }
            //    });
            fs.readFile("./db.json", "utf-8", (err, data) => {
                if (err) {
                    res.end(err);
                } else {
                    const productdata=JSON.parse(data)
                    productdata.product.push(JSON.parse(str))
                    fs.writeFile("./db.json",JSON.stringify(productdata),(err)=>{
                        if(err){
                            res.end(err)
                        }else{
                            res.end("data added")
                        }
                    })
                    res.end();
                }
            });
        });

    } else {
        res.end("404");
    }
})

server.listen(8080, () => {
    console.log("server running")
})
