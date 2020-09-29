require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const token = require("./token/token");
const { isAuth } = require('./authentication/authToken');
const cors = require("cors")
const DB = require("./connectDB/connectDB");
const multer = require("multer");
const path = require("path")

const fs = require("fs");
app.use(cookieParser())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json())

app.use(cors())
app.use(express.static('uploads'))
app.use(express.static('avatar'))


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log( { username, password });
    DB.loginUser(username)
        .then((data) => {
            let hashPass = data[0].password;
            bcrypt.compare(password, hashPass).then((result) => {
                if (result === true) {
                    let time_expired = 604800;
                    token.generateToken({ username: username, id: data[0].id }, process.env.ACCESS_TOKEN, time_expired)
                        .then((data) => {
                            res.json({
                                status: "success",
                                access_token: data,
                            })
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.json({
                        status: "password failed"
                    })
                }
            })
        })
        .catch((err) => {
            res.json({
                status: "username failed"
            })
        })



})




app.post("/register", async (req, res) => {
    var { username, password, email } = req.body;
    var salt = await bcrypt.genSaltSync();
    bcrypt.hash(password, salt).then((result) => {
        DB.insertUser(username, result, email)
            .then((data) => {
                res.send("success")
            })
            .catch((err) => {
                res.send(err.sqlMessage)
            })
    })
        .catch((err) => {
            res.send(err.message)
        })
})
app.get("/register/username", (req, res) => {
    let username = req.query.username;
    DB.loginUser(username)
        .then((data) => {
            if (data.length > 0) res.send("failed")
            else res.send("success")
        })
})

app.get("/", (req, res) => {
    DB.getAllCategories()
        .then((data) => {
            res.send(data);
        })
})



app.get("/cart", isAuth, (req, res) => {
    var { username, id } = req.body;
    DB.getMyCart(username)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get("/detail/:id", (req, res) => {
    DB.getDetail(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.send("id failed"))
})

app.get("/detail/:id", (req, res) => {
    DB.getDetail(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.send("id failed"))
})

app.post("/addtocart", isAuth, (req, res) => {
    var object = {
        id_user: req.body.id,
        id_category: req.body.id_category,
    }
    DB.insertCart(object)
        .then((data) => {
            res.send("success");
        })
        .catch((err) => res.send("failed"))
})

app.get("/updatecart", isAuth, (req, res) => {
    var id_user = req.body.id;
    var id_category = req.query.id_category;
    var number = req.query.number;
    DB.updateNumber(id_user, id_category, number)
        .then((data) => {
            res.send("success")
        })
        .catch((err) => {
            res.send("failed")
        })
})

app.get("/deletecart", isAuth, (req, res) => {
    var id_user = req.body.id;
    var id_category = req.query.id_category;
    DB.deleteCart(id_user, id_category)
        .then((data) => {
            res.send("success")
        })
        .catch((err) => {
            res.send("failed")
        })
})
app.get("/getinforuser", isAuth, (req, res) => {
    var username = req.body.username;
    DB.loginUser(username)
        .then((data) => {
            var { username, id, email, isAdmin, avatar } = data[0];
            var response = {
                username: username,
                id: id,
                email: email,
                avatar: avatar,
                role: isAdmin === 0 ? "User" : "Admin"
            }
            res.send(response)
        })
        .catch((err) => {
            res.send(err)
        })
})

let upload = multer({ dest: 'uploads/' }).single("images");
app.post("/addcategory", isAuth, (req, res) => {
    var createdBy = req.body.username;
    upload(req, res, (err) => {
        if (err) {
            res.send("failed to upload file")
        }
        else {
            var file = req.file.originalname;
            var firstName = file.split('.')[0];
            var lastName = file.split('.')[1];
            var newName = req.file.filename + "." + lastName
            fs.rename("./uploads/" + req.file.filename, "./uploads/" + newName, (err) => {
                if (err) res.send("failed to save file")
                else {
                    var { name, number, type, price } = req.body;
                    DB.addCategory(name, number, type, price, createdBy, newName)
                        .then((data) => {
                            res.send("success")
                        })
                        .catch((err) => {
                            res.send("failed add to db " + err.sqlMessage)
                        })
                }
            })

        }
    });
})

let uploadAvatar = multer({ dest: 'avatar/' }).single("images");
app.post("/changeavatar", isAuth, (req, res) => {
    var username = req.body.username;
    uploadAvatar(req, res, (err) => {
        if (err) {
            res.send("failed to upload file")
        }
        else {
            var file = req.file.originalname;
            var firstName = file.split('.')[0];
            var lastName = file.split('.')[1];
            var newName = req.file.filename + "." + lastName
            fs.rename("./avatar/" + req.file.filename, "./avatar/" + newName, (err) => {
                if (err) res.send("failed to save file")
                else {
                    DB.changeAvatar(newName, username)
                        .then((response) => {
                            res.send("success")
                        })
                        .catch((err) => {
                            res.send("failed add to db " + err.sqlMessage)
                        })
                }
            })

        }
    });
})

app.get("/my-item", isAuth, (req, res) => {
    var username = req.body.username;
    DB.getMyItem(username)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

app.get("/getavatar", (req, res) => {
    let username = req.query.username;
    DB.getAvatar(username)
        .then((response) => {
            res.send(response[0].avatar)
        })
        .catch((err) => {
            res.send(err.sqlMessage)
        })
})

app.post("/updateitem", isAuth, (req, res) => {
    let id = req.body.id_category
    let number = req.body.number
    console.log(id,number);
    DB.updateItem(id, number)
        .then((result) => {
            res.send("success");
        })
        .catch((err) => {
            res.send(err)
        })
})

app.listen(port, (req, res) => {
    console.log(`server run on port ${port}`);
})
