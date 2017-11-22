var Url = require('../model/url');
var Counter = require('../model/counter')
module.exports=function(app){


app.route('/new/*')
  .get(function(req, res, next) {

  var path = req.params[0];
  console.log(path);
  if(isValidateURL(path)){
      Url.findOne({url:path},function(err,result){
      if(err) console.log(err);
      if (!result)
        {
          Counter.findOneAndUpdate(
            {name:"userid"},
            { $inc:{ point: 1} },
            {returnNewDocument: true}, 
            createNewUrl
          
        )}
      else
        {
           console.log("Already has this document    "+result);
          
           res.json({ "original_url":path, "short_url":"https://url-shorten-api.glitch.me/"+result.shortenNumber })
        }
     
    }
 )
    
  }

  else
    {
      res.json({"error":"The URL is invalid!"});
    }
 
 function createNewUrl(err, object) {
   console.log("object.point___"+object.point);
   console.log("path_____"+path);
   if (err){
              console.warn(err.message);  // returns error if no matching object found
          }else{       
            Url.create({
              url: path,
              shortenNumber:object.point},
              function(err,result){
               if (err) return console.log(err);
               console.log("saved!!!!");
              res.json({ "original_url":path, "short_url":"https://url-shorten-api.glitch.me/"+object.point})
              
             });
          }
          } 
  
  });

function isValidateNumber(path){
    var pathRE = /^[0-9]/; 
  if (path.match(pathRE)) {
    return true; 
  } else {
    console.log( "The URL is invalid!" );
    return false;
  }
}  
 
function isValidateURL(path){
   var pathRE = /^http(s)?:\/\/www.[a-z0-9]+.com/; 
  if (path.match(pathRE)) {
    return true; 
  } else {
    console.log( "The URL is invalid!" );
    return false;
  }
}
  
  
app.route('/([0-9]+)')
  .get(function(req,res){
    console.log("URL is a number");
  
    var path = req.url.slice(1);
    console.log(path);
    Url.findOne({shortenNumber:path},function(err,result){
      if(err) console.log(err);
      if (!result){
        res.json({"error":"No corresponding number in database!"});
      }
      else
        {
          console.log(result.url);
          res.redirect(result.url);
        }
    })
    
  })

  
app.route('/')
    .get(function(req, res) {
  console.log("req is____"+req.url);
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})
}
