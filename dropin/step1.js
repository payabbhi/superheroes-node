const express = require('express');
const app = express();
const chance = require('chance').Chance();
const path = require('path');
const bp = require('body-parser');
const payabbhi = require('payabbhi')(process.env.PA_ACCESS_ID, process.env.PA_SECRET_KEY);

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/step1'));
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
  // Create the Payabbhi Order. Refer to Create Order API at https://payabbhi.com/docs/api/#create-an-order
  payabbhi.orders.create({
    merchant_order_id: `ORD_${chance.string({ length: 5, pool: '0123456789ABCDEF' })}`,
    amount: chance.integer({ min: 100, max: 500 }),
    currency: "INR"
  }, (error, order) => {
      // TIP: At this point, the unique order_id should typically be persisted in your database against the merchant_order_id

      res.render('index', { accessId: process.env.PA_ACCESS_ID, order: order })
  });
})


app.post('/status', (req, res) => {
  var hero = heroes[Math.floor(Math.random() * heroes.length)];

  // At this point, the payment signature needs to be verified
  // NOTE: We will perform the verification in Step 2 of the tutorial
  res.render('status', {
    hero: hero,
    paymentId: req.body.payment_id,
    merchantOrderId: req.body.merchant_order_id
  })

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
