const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config({path: './config/config.env'}); 
const stripe = require('stripe')(process.env.SECRET_KEY);


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.post("/checkout", async (req, res) => {
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });
    res.send(JSON.stringify({
        url: session.url
    }));
})

 
app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server running at PORT:${process.env.PORT}`);
})