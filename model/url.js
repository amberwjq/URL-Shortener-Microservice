var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

var urlSchema = new Schema(
  {
    url:String,
    shortenNumber:Number
    
   
});

var Url = mongoose.model('Url', urlSchema);


// make this available to our Node applications
module.exports = Url;
