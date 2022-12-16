const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();


app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
/*
const obj={
  name:"Rhea",
  favouriteElf:"Fingolfin"
}
console.log(weatherData);
console.log(JSON.stringify(obj));
*/
  });
  //res.send("Server is up and running.");


app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="27461cb1049fffa9ea0050590bfdc113";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const desc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      // console.log(temp);
      // console.log(desc);
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+desc+"</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>"); //multiple writes are allowed in each get, but
      res.write("<img src="+imageURL+">");
      res.send(); //only one send is allowed in each get!!! "有来有回"

     });
  });
})
