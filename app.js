const express = require('express');
const app = new express();
const fs = require('fs');
app.use(express.json());
const data = require('./data.json');

// GET
app.get('/hospital',(req,res)=>{
    res.send(data)
})

// POST
app.post("/hospital",(req,res)=>{
    data.push(req.body);
    fs.writeFile("data.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("Data cannot be written");
        }
        else{
            res.send("Data written successfully");
        }
    });
});


// PUT
app.put("/hospital/:hospitalName",(req,res)=>{
    let hospitalName = req.params.hospitalName;
    data.forEach((item)=>{
        if(item.hospitalName == hospitalName){
            item.location=req.body.location;
            item.patientCount=req.body.patientCount;
        }
    })
    fs.writeFile("data.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("data could not be updated");
        }
        else{
            res.send("data updated successfully");
        }
    });
});

//DELETE 

app.delete("/hospital/:hospitalName",(req,res)=>{
    let hospitalName = req.params.hospitalName;
    let val = data.filter(item => item.hospitalName !== hospitalName );
    fs.writeFile("data.json",JSON.stringify(val),(err)=>{
        if(err){
            res.send("data could not be deleted");
        }
        else{
            res.send("data deleted successfully");
        }
    });
})

app.listen(3000,()=>{console.log("listening at 3000")})