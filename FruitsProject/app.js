const mongoose=require('mongoose');
const url='mongodb://localhost:27017/fruitsDB';

main().catch(err=>console.log(err));
async function main(){

  //open the connection
  await mongoose.connect(url);

  //the fruit schema (blueprint, structure)
  const fruitSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Please check your fruit. No name has been specified!"]
    },
    rating:{
      type:Number,
      min:1,
      max:10
    },
    review:String
  });

  //the person schema
  const personSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Plase check your person. No name has been provided!"]
    },
    age:{
      type:Number,
      min:0,
      max:150
    },
    favouriteFruit:fruitSchema
  });


  //create a new collection called "fruits" (mongoose automatically converts singular form into plural form), and stick it to the schema
  const Fruit=new mongoose.model("Fruit",fruitSchema);

  //create a new collection called "persons"
  const Person=new mongoose.model("Person",personSchema);


  const fruit=new Fruit({
    name:"Apple",
    rating:7.0,
    review:"Pretty solid fruit"
  });
  const fruit1=new Fruit({
    name:"Banana",
    rating:8.0,
    review:"Good for breakfast"
  });
  const fruit2=new Fruit({
    name:"Kiwi",
    rating:6.0,
    review:"Sometimes hurts my mouth"
  })
  const fruit3=new Fruit({
    name:"Peach",
    rating:9.0,
    review:"Sensual and sweet fruit"
  })
  const fruit4=new Fruit({
    name:"Pineapple",
    rating:7.5,
    review:"Tropical!"
  });

const fruit5=new Fruit({
  name:"Mango",
  rating:10,
  review:"Alison's favourite"
})
fruit5.save();

  const person=new Person({
    name:"John",
    age:37,
  });
  const person1=new Person({
    name:"Amy",
    age:12,
    favouriteFruit:fruit4
  })

Person.updateOne({name:"John"},{favouriteFruit:fruit5},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated John's fav fruit to mango");
  }
})
  // Fruit.insertMany([fruit1,fruit2],function(err){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("Successfully saved all fruits to the fruitsDB");
  //   }
  // })

  Fruit.find(function(err,fruits){
    if(err){
      console.log(err);
    }else{

      //good practice: close the mongoose connection
      //mongoose.connection.close();

      // for(let fruit of fruits){
      //   console.log(fruit.name);
      // }
      //OR
      fruits.forEach(function(fruit){
        console.log(fruit.name);
      })
    }
  });

  Fruit.updateOne({_id:"633b16cbfdf6e0becf78d77e"},{name:"Peach"},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully update the document");
    }
  })

  Fruit.deleteOne({name:"Peach"},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully deleted the document");
    }
  });

  Person.deleteMany({name:"John"},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully deleted all Johns");
    }
  })

  //await fruit.save(); //insert one item into the collection, happens every time command "node app.js" is executed
  await person.save();
  person1.save();
  //mongoose.connection.close();
}
