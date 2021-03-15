const exrpress = require('express')
const app= exrpress();

const bodyParser= require('body-parser');
const mongoose= require('mongoose');


require("./Employee")

app.use(bodyParser.json());

const Employee= mongoose.model("employee");


//U59aEfLS24vJDzf

const mongoUri="mongodb://myProject:U59aEfLS24vJDzf@cluster0-shard-00-00.zdy3o.mongodb.net:27017,cluster0-shard-00-01.zdy3o.mongodb.net:27017,cluster0-shard-00-02.zdy3o.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-13000m-shard-0&authSource=admin&retryWrites=true&w=majority"
 mongoose.connect(mongoUri ,{
     useNewUrlParser:true,
     useUnifiedTopology:true
 })



 mongoose.connection.on("connected",()=>{
     console.log("connected successfully!!!");
 })

 mongoose.connection.on("error",(err)=>{
     console.log("MY error ",err);
 })

app.get("/",(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.post('/send-data',(req,res)=>{
   const emplo= new Employee({
       name:req.body.name,
       city:req.body.city,
       position: req.body.position,
       salary: req.body.salary,
       contact:req.body.contact,
       email:req.body.email
   })
   emplo.save()
   .then(data=>{
       console.log(data)
       
   }).catch(err=>{
       console.log("my error", err)
   })

})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        city:req.body.city,
        position: req.body.position,
        salary: req.body.salary,
        contact:req.body.contact,
        email:req.body.email
    }).then(data=>{
        console.log(data);
        res.send("Updated")
    }).catch(err=>{
        console.log(err)
    })
})


app.listen(3000,()=>{
    console.log("serving running");
})


