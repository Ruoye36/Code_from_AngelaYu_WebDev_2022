const myExpress=require("express");
const bodyParser=require("body-parser");
const app=myExpress();
app.use(bodyParser.urlencoded({extended:true}));
const myPort=3000;

app.listen(3000,function(){
  console.log("Server started on port "+myPort);
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  console.log(req.body);
  var num1=Number(req.body.num1);
  var num2=Number(req.body.num2);
  res.send("Result: "+(num1+num2));
});

app.get("/bmicalculator",function(req,res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmicalculator",function(req,res){
  var height=parseFloat(req.body.height);
  var weight=parseFloat(req.body.weight);
  res.send("Your BMI is "+(weight/height/height));
});
