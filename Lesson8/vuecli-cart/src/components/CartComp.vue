<template>
    <div style="display:inline">
        <button class="btn-cart" type="button" @click="shown = !shown">Корзина</button>
        <div class="cart-block" v-show="shown">
            <p v-if="!cartItems.length"> Cart is empty </p>
            <cart-item 
            v-for="product of cartItems"
            :key="product.id_product"
            :img="imgCart"
            :item="product"
            ></cart-item>
        </div>
    </div>
</template>

<script>
import cartItem from './CartItem.vue'

export default {
    data: function () {
        return {
            imgCart: 'https://placehold.it/100x80',
            cartUrl: `/api/cart`,
            cartItems: [],
            shown: false,
        }
    },
    props: ['product'],
    components: {
        'cart-item': cartItem
    },
    
    methods: {
        addProduct (product) {
            let find = this.cartItems.find (el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJSON (`/api/cart/${find.id_product}`, {quantity: 1})
                    .then (data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJSON ('/api/cart', prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);            
                        }
                    })
            }
        },
        removeProduct (product) {
            
            if (product.quantity > 1) {
                this.$parent.putJSON (`/api/cart/${product.id_product}`, {quantity: -1})
                    .then (data => {
                        if (data.result)
                            product.quantity--;
                    })
            } else {
                this.$parent.deleteJSON (`/api/cart/${product.id_product}`, product)
                    .then (data => {
                        if (data.result) {this.cartItems.splice (this.cartItems.indexOf (product),1)}
                    })
            }
        }
    },
    mounted () {
        this.$parent.getJSON (this.cartUrl)
			.then (data => {
				for (let el of data.contents) {
					this.cartItems.push (el)
				}
			})
    }
}

</script>

<style>
</style>