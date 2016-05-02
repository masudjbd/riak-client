## Usage

//init
var riakClient = require("riak-client");
 
//define meta data where object will store 
var metaObj = { bucketType: "tenant", bucket: "custom", key:"mailid@maildomain.com"};

//define object
 var data = {name: "Zephyr", company: "Software"};
 
 ### To store data.
 
 riakClient.save(metaObj, data, function(rs){
     console.log("Result: "+rs);
 });
 
 
 
 ### To retrieve data and update data.
 
 riakClient.get(metaObj, function(rs){
     console.log( rs.value);
 
     //update data
     var obj = rs.value;
     obj.name = "The DBA"; //updated name
     rs.setValue(obj);
     riakClient.update(metaObj, rs, function(rs){
         console.log("Updated Result: "+rs);
     });
  });
 
 
 ### To delete data.
 
 riakClient.delete(metaObj, function(rs){
     console.log("Result "+ rs);
 });
 
