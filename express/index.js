const express=require("express")
const fs=require("fs")

const cors=require("cors");
const { send } = require("process");



const app=express();
app.use(cors());
app.use(express.json());

// ####get routes####
app.get("/getproduct",(req,res)=>{
      fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
      })
   
})

//#####POST ROUTES#####

    app.post("/add",(req,res)=>{
        fs.readFile("./db.json","utf-8",(err,data)=>{
            if(err)
            {
                res.end(err)
            }
            else{
                const newdata=JSON.parse(data)
                newdata.push(req.body)
                fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    res.end("added")
                })
            }
        })
    })


    //##patch###
   app.patch("/editproduct/:id",(req,res)=>{
   const {id}=req.params;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err);
        }else{
            const newdata=JSON.parse(data)
            const index=newdata.findIndex((el)=>el.id==id);
         
            if(index != -1){
                newdata[index]={...newdata[index],...req.body};
                console.log(newdata)
                res.send("")
                fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                    if(err){
                        res.send(err)
                    }else{
          return  res.send("updated ")
                    }
                })
               
            }else{
                res.send("product not found");
            }
        }
    })
   
   });


app.listen(3444,()=>{
    console.log("server is running on port 3444")
})