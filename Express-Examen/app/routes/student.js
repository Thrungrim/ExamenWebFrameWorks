var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err);
  db = database.db('exam');
})

/* GET home page. */
router.get('/', (req, res) => {
  db.collection('students').find().toArray((err, result) => {
    result = result.sort((a,b) => {
      var x = a.naam > b.naam ? -1:1;
      return x;
    })
      if (err) return
      res.render('lijst.ejs', { studenten: result })
  })
});

module.exports = router;
