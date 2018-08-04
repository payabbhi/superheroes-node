const express = require('express');
const app = express();
const chance = require('chance').Chance();
const path = require('path');
const bp = require('body-parser');
const payabbhi = require('payabbhi')(process.env.PA_ACCESS_ID, process.env.PA_SECRET_KEY);

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/step4'));
app.use(express.static(path.join(__dirname, '../assets')))
app.use(bp.urlencoded({ extended: true }));

const heroes = [
	{ name: 'Batman',          image: 'http://www.puffgames.com/batman-begins-batman-1.jpg'},
	{ name: 'Superman',        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/SupermanRoss.png/250px-SupermanRoss.png'},
	{ name: 'Aquaman',         image: 'https://www.secretcompassonline.com/temp/product_view//PRIME1_Aquaman_1.jpg'},
	{ name: 'Spiderman',       image: 'https://cdn.movieweb.com/img.news.tops/NE8z5UPfURs7c8_1_b/The-Amazing-Spider-Man-Ends-With-A-Funeral.jpg'},
]


app.get('/', (req, res) => {

  // The merchant_order_id is typically the identifier of the Customer Order, Booking etc in your system.
  var merchantOrderId = `ORD_${chance.string({ length: 5, pool: '0123456789ABCDEF' })}`;
  // Create the Payabbhi Order. Refer to Create Order API at https://payabbhi.com/docs/api/#create-an-order
  payabbhi.orders.create({
    merchant_order_id: merchantOrderId,
    amount: chance.integer({ min: 100, max: 500 }),
    currency: "INR"
  }, (error, order) => {
      // TIP: At this point, the unique order_id should typically be persisted in your database against the merchant_order_id

      res.render('index', {
        accessId: process.env.PA_ACCESS_ID,
        merchantOrderId: merchantOrderId,
        order: order,
        error: error
      })
  });
})


app.post('/status', (req, res) => {
  var hero = heroes[Math.floor(Math.random() * heroes.length)];


  // Here we will verify the payment signature
  payabbhi.verifyPaymentSignature({
    "order_id": req.body.order_id,
    "payment_id": req.body.payment_id,
    "payment_signature": req.body.payment_signature
  });

  // TIP: At this point we should typically look up the merchant_order_id corresponding to the order_id in the Payment response
  // The status of the order, booking etc identified by the merchant_order_id,
  // should be now updated in your database to indicate that it is paid.
  // You may also persist the payment_id in the database against the merchant_order_id.

  payabbhi.payments.retrieve(req.body.payment_id, function (error, payment) {
    res.render('status', {
      hero: hero,
      merchantOrderId: req.body.merchant_order_id,
      payment: payment,
      error: error
    })
  });

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
