//заглушки (имитация базы данных)
const image = 'https://placehold.it/250x250';
const cartImage = 'https://placehold.it/100x80';


//Заполнение каталога
class ProductsList {
    
    constructor () {
        this.products = [];
        this._init();
    }
    _init () {
        //this.fetchProducts();
        //this.render();
    }
    
    //реализация через промайс
    makeGETRequestPR = (url) => {
            return new Promise ((rez, rej) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) { 
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                
                xhr.open('GET', url, true);
               
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        let obj = JSON.parse(xhr.responseText);
                        rez(obj);
                        //console.log(xhr.responseText);
                    }
                    if (xhr.status !=200) {
                        rej('error');
                    }
                }
                xhr.send();
                
            });  
    }
    
    //реализация через колбэк
    makeGETRequest(url, callback) {
            let xhr;
            
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { 
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            //console.log (xhr.responseText);    
                            let obj = JSON.parse(xhr.responseText);
                                
                                //this.products = obj;
                            
                                callback(obj);
                            }
            }

            xhr.open('GET', url, true);
            xhr.send();
        }
    
    fetchProducts () {
        // реализация через промайс
       this.makeGETRequestPR('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json').then(result => {this.render(result); this.products = result;}).catch(error => {console.log(error)});
        
        //реализация через колбэк
        //this.makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json', this.render)

    }

    render(obj) {
        //console.log(this.products);
        const block = document.querySelector('.products');
        obj.forEach (product => {
            let prod = new Product(product);
            console.log(prod);
            block.insertAdjacentHTML('beforeEnd', prod.render());
            
        }) 
    }
}

class Product {
    constructor (product) {
        this.title = product.product_name;
        this.price = product.price;
        this.image = image;
    }
    render() {
        return `<div class="product-item">
                        <img src="${this.image}" alt="Some img">
                        <div class="desc">
                            <h3>${this.title}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.title}"
                            data-image="${this.image}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
    }
}


// корзина
class Cart {
    
    constructor () {
        this.userCart = [];
        this._init();
    }
         
    makeGETRequestPR1 = (url) => {
            return new Promise ((result, rej) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) { 
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                
                xhr.open('GET', url, true);
                
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        let obj = JSON.parse(xhr.responseText);
                        result(obj);
                        //console.log(xhr.responseText);
                        //console.log(obj);
                    }
                    if (xhr.status !=200) {
                        rej('error');
                    }
                }
                xhr.send();
                
            });  
    }
    
    getCart () {
        this.makeGETRequestPR1('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json').then(result => {this.parseData(result);console.log(result);}).catch(error => {console.log(error)});
        
    }
    

    parseData(Item) {
            console.log (Item.contents);
            
            Item.contents.forEach(items => {
                let ci = new CartItem(items);
                this.userCart.push(ci);
            });      
    }


        
        showCart = () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
            this.renderCart();
        }

       renderCart = () => {
              let allProducts = '';
                for (let el of this.userCart) {
                  console.log(this.userCart);  
                allProducts += `<div class="cart-item">
                            <div class="product-bio">
                                <img src="${el.image}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.title}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-name="${el.title}">&times;</button>
                            </div>
                        </div>`
                }
                document.querySelector(`.cart-block`).innerHTML = allProducts; 
        }
     
    
        addGood = (evt) => {
                
                if (evt.target.classList.contains ('buy-btn')) {
                    let product = evt.target;
                    console.log(product);
                    let productName = product.dataset['name'];
                    console.log(productName);
                    let find = this.userCart.find (element => element.title === productName);
                    if (!find) {
                            console.log(product.dataset['name']);
                            
                            let cItem = new CartItem ({
                                product_name: product.dataset ['name'],
                                price: +product.dataset['price'],
                                img: cartImage,
                                quantity: 1
                            });
                                                      
                            this.userCart.push(cItem);                          
                }  else {
                        find.quantity++;
                    }
                this.renderCart ();
                }   
        }
    
        remGood = (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
             
                let product = evt.target;              
                let productName = product.dataset['name'];                
                let find = this.userCart.find (element => element.title === productName);
             if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.userCart.splice(this.userCart.indexOf(find), 1);
                let r = document.querySelector(`.cart-item[data-name="${productName}"]`)
                console.log(r);
                //document.querySelector(`.cart-item[data-name="${productName}"]`).remove()
            }
            this.renderCart ();
            }
        }
        
    _init() {
            //кнопка скрытия и показа корзины
            document.querySelector('.btn-cart').addEventListener('click', this.showCart);
            //кнопки удаления товара (добавляется один раз)
            document.querySelector('.cart-block').addEventListener ('click', this.remGood);
            //кнопки покупки товара (добавляется один раз)
            document.querySelector('.products').addEventListener ('click', this.addGood);

        }
}

class CartItem {
    constructor (product) {
        this.title = product.product_name;
        this.price = product.price;
        this.image = cartImage;
        this.quantity = product.quantity; 
    }
}

const catalog = new ProductsList();
catalog.fetchProducts();

const cart1 = new Cart();
//можно getCart вызвать в функции _init и не вызывать тут
cart1.getCart();


/*

//const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
//const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
//const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)

//var list = fetchData ();

/*
//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
})


//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push ( {
            title: items[i],
            price: prices[i],
            img: image,
        });
    }
    return arr
};*/

//создание товара
function createProduct (i=0) {
    return {
        id: ids[i],
        name: items[i],
        price: prices[i],
        img: image,
        quantity: 0,
        createTemplate: function () {
 //           return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.name}"
                            data-image="${this.img}"
   //                         data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
        },

        add: function() {
            this.quantity++
        }
    }
};
*/

/*//рендер списка товаров (каталога)
function renderProducts () {
    let arr = [];
    for (item of list) {
        arr.push(item.createTemplate())
    }
    document.querySelector('.products').innerHTML = arr.join('');
}*/

//renderProducts ();


//CART

/*
// Добавление продуктов в корзину
function addProduct (product={}) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (!find) {
        userCart.push ({
            name: product.dataset ['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    }  else {
        find.quantity++
    }
    renderCart ()
}
*/

/*//удаление товаров
function removeProduct (product={}) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        userCart.splice(userCart.indexOf(find), 1);
        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    renderCart ();
}*/
/*

//перерендер корзины
function renderCart () {
    let allProducts = '';
    for (el of userCart) {
//        allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                            </div>
  //                      </div>`
    }

    document.querySelector(`.cart-block`).innerHTML = allProducts;
}
*/
