var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
      
      // create a schema
var  counterSchema = new Schema(
    {
        name:String,
        point:Number
       
    });
var Counter = mongoose.model('Counter', counterSchema);
Counter.find({}).exec(function(err, collection) {
if(collection.length === 0)
    {
       Counter.create({name: "userid",
      point: 0}, function(err, doc) {
    console.log(doc);
    }
       
      );  
}

  
});
  
module.exports =Counter;
