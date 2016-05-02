## Usage

//init
var riakclient = require("riak-client");
 
//define meta data where object will store 
var metaObj = { bucketType: "tenant", bucket: "custom", key:"mailid@maildomain.com"};

//define object
 var data = {name: "Zephyr", company: "Software"};
 
 //store data
 riakclient.save(metaObj, data, function(rs){
     console.log("Result: "+rs);
 });
 
 //retrieve data and update data
 riakclient.get(metaObj, function(rs){
     console.log( rs.value);
 
     //update data
     var obj = rs.value;
     obj.name = "The DBA"; //updated name
     rs.setValue(obj);
     riakclient.update(metaObj, rs, function(rs){
         console.log("Updated Result: "+rs);
     });
  });
 
 
 //delete data
 riakclient.delete(metaObj, function(rs){
     console.log("Result "+ rs);
 });
 
