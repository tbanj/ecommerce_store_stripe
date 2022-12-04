const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// app.use(express.static(__dirname + './public'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true}));

const PORT = process.env.PORT || 4242;

const stripe = require("stripe")("sk_test_51MAzYNLKodB3e6CIWjd8ifHj8vJINoxObreXc6Cu7LT03D6xdo6WbSyUAK8ILcHtfGIuU1b5un7J2EW6ZKcTVf6D00Tf5p5oY0");
app.post('/checkout', async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            // for shipping
            payment_method_types: ['card'],
            shipping_address_collection: {allowed_countries: ['US', 'CA']},
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'usd'},
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                  },
                },
              },
            ],

            line_items: req.body.items.map((item) => (
           /*  {
            currency: 'usd',
            product_data: {
            name: item.name,
            images: [item.product]
        },
            unit_amount: item.price * 100
           } */
           {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.product]
                },
                unit_amount:  item.price * 100
           },
           quantity: item.quantity,

        }
           )),
           mode: 'payment',
           success_url: "https://majastoreserver.mybluemix.net/success.html",
           cancel_url: "https://majastoreserver.mybluemix.net/cancel.html",
        }); 
        res.status(200).json(session)
    } catch (error) {
        next(error);
    }
});


app.listen(PORT, () => console.log(`app is running on ${PORT}`));