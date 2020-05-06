const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function (req,res) {

    res.sendFile(__dirname+"/signup.html");
  });




app.post("/",function (req,res) {
     let firstName=req.body.fName;
     let lastName=req.body.lName;
     let email=req.body.email;

     let data={
       members:[
         {email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:lastName
          }
        }
       ]
     };
     let jsonData=JSON.stringify(data);
     let options={
       url:"https://us8.api.mailchimp.com/3.0/lists/2ea76020fd",
        method:"POST",
        headers:{
          "Authorization":"HarshS 49bc24c3f4fa8dfbf2dcbda0a26f7ed2-us8"
        },
        body:jsonData
      };
     request(options,function (error,response,body){
          if(error) res.sendFile(__dirname+"/failure.html");
          else  {if(response.statusCode===200){res.sendFile(__dirname+"/success.html");}
          else {res.sendFile(__dirname+"/failure.html");}
     }});
  });


  app.post("/failure",function (req,res) {
    res.redirect("/");
    });
 
app.listen(process.env.PORT || 3000,function() {
    console.log("Server is Running");
});


//2ea76020fd
//49bc24c3f4fa8dfbf2dcbda0a26f7ed2-us8