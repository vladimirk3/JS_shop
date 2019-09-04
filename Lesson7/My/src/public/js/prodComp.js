const catItem = {
    props: ['imgCat','item'],
    template: ` <div class="product-item">  
                    <img :src="imgCat" alt="Some img">
                    <div class="desc">
                        <h3> {{ item.product_name }}</h3>
                        <p>{{ item.price }} $</p>
                        <button class="buy-btn" @click="$parent.addProduct(item)">Купить</button>
                    </div>
                </div>`
}

const catalog = {
    data () {
        return {
            products: [],
            filtered: [],
            catImg: 'https://placehold.it/200x150',
            catalogUrl: '/api/products',
        }
    },
    components: {
        'cat-item': catItem
    },
    methods: {
        addProduct (product) {
			this.$root.$refs.cart.addProduct (product) 
		}
    },
    mounted () {
        this.$parent.getJSON (this.catalogUrl)
			.then (data => {
				for (let el of data) {
					this.products.push (el)
                    this.filtered.push (el)
				}
			})
    },
    template: `
        <div class="products"> 
            <cat-item 
                v-for="product of filtered"
                    :key="product.id_product"
                    :imgCat="catImg"
                    :item="product"
            ></cat-item>
        </div>`
}

export default catalog