const fs = require ('fs');
const http = require ('http');
const express = require ('express');

const cart = require ('./cart');

const app = express ();

app.use (express.json());
app.use ('/', express.static ('../public'));
//app.use ('/api/cart', cart);

app.get ('/api/products', (req, res) => {
    fs.readFile ('./src/server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0, test: 'no data'}));
        } else {
            res.send (data);
        }
    })
})

app.listen (3001, () => {
    console.log('listening on poer 3001');
});