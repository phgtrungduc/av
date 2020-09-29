const express = require('express');
const app = express();
const server = require("http").Server(app);
const path = require('path');
const io = require("socket.io")(server);
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs")
app.set("views", "views")


var Room = {};
app.get("/", (req, res) => {
  res.render("trangchu")
})
app.get("/message", (req, res) => {
  res.render("tinnhan")
})
app.get("/:room", (req, res) => {
  var newRoom = req.params.room;
  if (!Room[newRoom]) {
    return res.redirect("/")
  }
  res.render("room", { Room: Room })
  console.log(req.params.room);
})
// const getVisitors = ()=>{
//   let clients = io.sockets.clients().connected;
//   // let users = sockets.map((ele)=>ele.user)
//   console.log(sockets.length);
// }
var name = io.of('/message');

name.on("connection", (socket) => {
  socket.on("room", (room) => {
    Room[room] = { user: [] }
    socket.join(room);
  })
  socket.on("disconnect", () => {
    
  })
})

// const privateMess = io.of("/message");
// privateMess.on("connection", (socket) => {
//   socket.join('some-room');
//   io.to("some-room").emit("welcome", "abc-zo")
// })

server.listen(port, () => {
  console.log(`server chay tren cong ${port}`);
})