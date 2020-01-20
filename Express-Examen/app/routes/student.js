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

router.get('/add', (req, res) => {
  res.render('add.ejs', {})
})

router.post('/add', (req,res) => {
  let student = { naam: req.body.naam, geboortedatum: req.body.geboortedatum, studierichting: req.body.studierichting};

  db.collection('students').findOne(student, (err, result) => {
    if(result){
      res.render('bestaatAl.ejs')
    }
    else{
      db.collection('students').insertOne({naam: req.body.naam, geboortedatum: req.body.geboortedatum, studierichting: req.body.studierichting}, (err, result) => {
        if(err) return
        res.redirect('/student')
      })
    }
  })
})

module.exports = router;
