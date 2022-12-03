const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()));
app.use({ origin: true, credentials: true});

const stripe = require('stripe')("sk_test_4xxaD3qrDG1JBmbWH8Hp0xFi");
app.post('/checkout', async(req, res, next) => {
    try {
        const session = await stripe.checkout.session.create({
           line_items: req.body.items.map((item) => ({
            currency: 'usd',
            product_data: {item.name,
            name: item.name,
            images: [item.product]
        },
            unit_amount: item.price *100
           })),
           mode: 'payment',
           success_url: "http://localhost:4242/success.html",
           cancel_url: "http://localhost:4242/cancel.html",
        }); 
        res.status(200).json(session)
    } catch (error) {
        next(error);
    }
});


app.listen(4242, () => console.log('app is running on 4242'));