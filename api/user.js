var express = require('express');
var router = express.Router();



router.use((req, res, next) => {
   console.log("start user")
   next();
})
router.get('/', function (req, res, next) {
   res.render('user');
   next();
});
router.use((req, res, next) => {
   console.log("end");
   next();
})
router.get('/:id', function (req, res) {

   res.send('Hello user with ' + req.params.id);
});

//export this router to use in our index.js
module.exports = router;

