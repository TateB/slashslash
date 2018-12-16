var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_live_4OBXikjnchtcU4r9tiZ3zpJR");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

function checkTime() {
  if (Math.round(((new Date()).getTime() / 1000 - 1546300800) * -1 ) < 1) {
    return false;
  } else {
    return true;
  }
};

function isSoldOut() {
  if (db.get('shapes').value() < 50) {
    return false;
  } else {
    return true;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/buynow', function(req, res, next) {
  if (checkTime() == false) {
    res.render('buynow', { itemName: 'SHAPES', itemImg: '/images/blackbox.jpeg', 'itemPrice': 80.00, itemCategory: 't-shirt' });
  } else {
    res.render('soon');
  }
});

router.get('/sphere', function(req, res, next) {
  res.render('sphere');
});

router.get('/buypage', function(req, res, next) {
  if (checkTime() == false) {
    if (req.param('size') == 's' || req.param('size') == 'm' || req.param('size') == 'l') {
      res.render('checkout', { itemSize: req.param('size'), itemName: 'SHAPES T-SHIRT', itemImg: '/images/blackbox.jpeg', 'itemPrice': 80.00 });
    } else {
      res.render('error');
    }
  } else {
    res.render('error');
  }
});

router.post('/charge', function(req, res, next) {
    if (isSoldOut()) {
      res.redirect('/soldout');
    }
    const charge = stripe.charges.create({
      amount: 8000,
      currency: 'aud',
      description: 'SHAPES T-SHIRT size ' + req.body.size,
      source: req.body.stripeToken,
      receipt_email: req.body.email,
      metadata: { 'size': req.body.size }
    });
    res.redirect('/success');  
});

router.get('/success', function(req, res, next) {
  res.render('success');
});

router.post('/webhook/example', function(req, res, next) {
  if (req.body.data.object.object == 'charge') {
    db.update('charged', n => n + 1)
    .write()
    console.log('charge added');
  }
  res.render('success');
});


module.exports = router;
