// const jwt = require("jsonwebtoken");
// // let generateToken = (user, secretSignature, tokenLife) => {
// //     return new Promise((resolve, reject) => {
// //       const userData = {
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //       }
// //       // Thực hiện ký và tạo token
// //       jwt.sign(
// //         {data: userData},
// //         secretSignature,
// //         {
// //           algorithm: "HS256",
// //           expiresIn: tokenLife,
// //         },
// //         (error, token) => {
// //           if (error) {
// //             return reject(error);
// //           }
// //           resolve(token);
// //       });
// //     });
// //   }

// //   let userData = {
// //     _id:"123",
// //     name:"phuongtrungduc",
// //     email:"phgtrungduc@gmail.com"
// //   }

// //   generateToken(userData,"secret","7d")
// //   .then((res)=>{
// //       console.log(res);
// //   })
// //   .catch((err)=>{
// //       console.log(err);
// //   })


// // let promise  =(number)=> new Promise((resolve,reject)=>{
// //   if (number%2===0){
// //     resolve(number)
// //   }
// //   else {
// //     reject("abc")
// //   }
// // })
// // promise(2)
// // .then((res)=>{
// //   console.log(res)
// // })
// // .catch((err)=>{
// //   console.log(err);
// // })

// const mysql = require('mysql');
// const bcrypt = require("bcrypt")
// // const con = mysql.createConnection({
// //   host: "localhost",
// //   user: "phgtrungduc",
// //   password: "duc123456",
// //   database: "test"
// // });
// // const loginUser = (username, password) => {
// //   var sql = `SELECT * FROM login where username = '${username}'`;
// //   return new Promise((resolve,reject)=>{
// //     con.query(sql,(err, result, fields)=>{
// //       if (!err) {
// //         resolve(result)
// //       }
// //       else {
// //         reject(err);
// //       }
// //     })
// //   });
// // }
// // loginUser("1234").then((data)=>{
// //   if (data[0].username==='1234') console.log("success");
// // })
// // .catch((err)=>{
// //   console.log(err);


// // let generateToken1 = async (data, secretSignature, tokenLife) => {
// //    await jwt.sign(data,secretSignature,{algorithm: "HS256",expiresIn: tokenLife},(error, token) => {
// //       if (error) {
// //         console.log(error);
// //       }
// //       else {
// //         console.log(token);
// //       }
// //   });
// // }

// // let token = generateToken1({name:"Duc"}, "phuongtrungduc","15d")
// let abc = async ()=>{
//   let salt = await bcrypt.genSalt();
//   bcrypt.hash("duc",salt).then((res)=>{
//     console.log(res)
//   })
// }
// abc();

// bcrypt.compare('duc','$2b$10$vchieMOW2RyvsDpRqu5gveFQN6zPlix/Mks9ZZQ6r0JMEiTeTUF0O').then((res)=>{
//   console.log(res);
// })

// var array = [
//   {value:1},
//   {value:10},
//   {value:2},
//   {value:5},
//   {value:3},
// ]
// var maxo = 0;
// array.forEach(e => {
//   e.value >maxo? e.value:maxo;
// });
// console.log(maxo);

const mysql = require('mysql');
const DB = require("./connectDB/connectDB")

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "phgtrungduc",
//   password: "duc123456",
//   database: "test"
// });


// const insertCart = (object) => {
//   var sql = `INSERT INTO my_cart VALUES (${object.id_user},${object.id_category},1)`;
//   return new Promise((resolve, reject) => {
//     con.query(sql, (err, result) => {
//       if (!err) {
//         resolve(result);
//       }
//       else {
//         reject(err);
//       }
//     })
//   })
// }
// var object = { 
//   id_user: 4,
//   id_category:4
// }
// insertCart(object)
// .then((res)=>{
//   console.log(res);
// })
// .catch((err)=>{
//   console.log(err.sqlMessage);
// })


// DB.insertUser("admin2","admin2","admin2")
// .then((res)=>{
//   console.log(res);
// })
// .catch((err)=>{
//   console.log(err.sqlMessage);
// })
const con = mysql.createConnection({
    host: "localhost",
    user: "phuongtrungduc",
    password: "duc123456",
    database: "test"
});
const getAllCategories = () => {
    var sql = "SELECT * FROM categories";
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (!err) {
                resolve(result);
            }
            else {
                reject(err);
            }
        })
    })
}
var check = async () => {
    let abc = await getAllCategories();
    console.log(abc[0].number);
} 
check();