// var riakclient = require("./index");
//
// var metaObj = { bucketType: "tenant", bucket: "masud", key:"masudjbd@gmail.com"};
// var data = {name: "Shanta", son: "Sifat"};
//
// //store data
// riakclient.save(metaObj, data, function(rs){
//     console.log("Result: "+rs);
// });
//
//  //retrieve data
// riakclient.get(metaObj, function(rs){
//     console.log( rs.value);
//
//     //update data
//     var obj = rs.value;
//     obj.name = "Masud";
//     rs.setValue(obj);
//     riakclient.update(metaObj, rs, function(rs){
//         console.log("Updated Result: "+rs);
//     });
//
//  });
//
//
//     //delete data
// riakclient.delete(metaObj, function(rs){
//     console.log("Result "+ rs);
// });
//
