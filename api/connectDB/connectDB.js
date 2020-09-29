const mysql = require('mysql')
const con = mysql.createConnection({
  host: "localhost",
  user: "phuongtrungduc",
  password: "duc123456",
  database: "test"
});


const insertUser = (username, password, email) => {
  var sql = `INSERT INTO login VALUES (null,"${username}", "${password}","${email}",0,"default.png")`;
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

const loginUser = (username) => {
  var sql = `SELECT * FROM login where username = '${username}'`;
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


const getDetail = (id) => {
  var sql = `SELECT * from categories where id = ${id}`;
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


const getMyCart = (username) => {
  var sql = `SELECT name,my_cart.number,price,id_category FROM login,categories,my_cart
      where login.id = my_cart.id_user
      and categories.id=my_cart.id_category
      and username='${username}'`;
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

const insertCart = (object) => {
  var sql = `INSERT INTO my_cart VALUES ('${object.id_user}','${object.id_category}',1)`;
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

const updateNumber = (id_user, id_category, number) => {
  var sql = `UPDATE my_cart SET number=${number} WHERE id_user=${id_user} and id_category=${id_category}`;
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

const deleteCart = (id_user, id_category) => {
  var sql = `DELETE FROM my_cart WHERE id_user=${id_user} AND id_category= ${id_category}`;
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

const addCategory = (name, number, type, price, createdBy, link) => {
  var sql = `INSERT INTO categories (id, name, number, type, price, createdBy, link) VALUES (null,'${name}', ${number}, '${type}', ${price}, '${createdBy}','${link}')`;
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
const changeAvatar = (newAvatar, username) => {
  var sql = `UPDATE login SET avatar = "${newAvatar}" WHERE username ="${username}"`
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

const getAvatar = (username) => {
  var sql = `SELECT avatar FROM login WHERE username ="${username}"`
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

const getMyItem = (username) => {
  var sql = `SELECT * from categories where createdBy='${username}'`;
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

const updateItem = (id, number) => {
  var sql = `UPDATE categories SET number=${number} WHERE id=${id}`;
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
module.exports = {
  insertUser: insertUser,
  loginUser: loginUser,
  getAllCategories: getAllCategories,
  getDetail: getDetail,
  getMyCart: getMyCart,
  insertCart: insertCart,
  updateNumber: updateNumber,
  deleteCart: deleteCart,
  addCategory: addCategory,
  changeAvatar: changeAvatar,
  getAvatar: getAvatar,
  getMyItem: getMyItem,
  updateItem: updateItem
}