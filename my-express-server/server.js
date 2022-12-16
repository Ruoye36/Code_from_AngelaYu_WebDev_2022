const express=require("express"); //requires express module
const app=express();  //a function that represents express module

//tune the server to listen to port 3000:
app.listen(3000,function(){
  console.log("Server started on port 3000");
});

//When receive GET request, execute the callback function:
app.get("/",function(request,response){  //parameters: file location (/ is the home root), callback function
  //console.log(request); //check the content of the request in the console
  response.send("<h1>Hello, Express.js user!</h1>");  //send response to the explorer
});

app.get("/contact",function(request,response){
  response.send("Contact me: rvdlMuseum1@rivendell.edu");
});

app.get("/about",function(request,response){
  response.send("This is the toy page I made to learn Express.js.");
});
app.get("/hobbies",function(request,response){
  response.send("<ul><li>Fanwork</li><li>Drawing</li><li>Explore</li>");
});
