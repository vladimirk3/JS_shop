const fs = require ('fs');
const http = require ('http');

const cart = require ('./cart')

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
}

let handler = (req, res, action, fileName) => {
    fs.readFile (fileName, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0, text: 'file not found'}))
        } else {
            let {newCart, name} = actions [action] (JSON.parse(data), req); 
            let tNewCart = JSON.parse(newCart);
            tNewCart.amount = 0;
            tNewCart.countGoods = 0;
            for (let el of tNewCart.contents) {
                tNewCart.amount += el.price*el.quantity;
                tNewCart.countGoods += el.quantity;
            }
            newCart = JSON.stringify(tNewCart);
            fs.writeFile (fileName, newCart, (err) => { 
                if (err) {
                    res.sendStatus (404, JSON.stringify ({result: 0, text: 'file not found'}))
                } else {
                    res.send({result: 1, text: 'ok'}
                    )
                }
            })
        }
    })
    
}

module.exports = handler