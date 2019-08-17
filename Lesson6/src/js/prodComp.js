const catItem = {
    props: ['imgCat','item1'],
    template: ` <div class="product-item">  
                    <img :src="imgCat" alt="Some img">
                    <div class="desc">
                        <h3> {{ item1.product_name }}</h3>
                        <p>{{ item1.price }} $</p>
                        <button class="buy-btn" @click="addProduct (product)">Купить</button>
                    </div>
                </div>`
}

const catalog = {
    data () {
        return {
            products: [],
            catImg: 'https://placehold.it/200x150',
            catalogUrl: '/catalogData.json',
            filtered: [],
            reg: '',
            API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        }
    },
    components: {
        'cat-item': catItem
    },
    method: {
        /*getJSON (url) {
			return fetch (url)
				.then (result => result.json ())
				.catch (error => {
					console.log (error)
			})
		},*/
		
		filter () {
            this.reg = this.$root.$refs.userSearch;
			//this.reg = new RegExp (this.$root.userSearch, 'i')
			//this.filtered = this.products.filter (el => reg.test(el.product_name))
		}
    },
    mounted () {
        this.$parent.getJSON (this.API_URL + this.catalogUrl)
			.then (data => {
				for (let el of data) {
					this.products.push (el)
                    this.filtered.push (el)
				}
			})
    },
    template: `
        <div> 
        <cat-item 
            v-for="product of filtered"
                :key="product.id_product"
                :imgCat="catImg"
                :item1="product"
        ></cat-item>
        </div>`
}

export default catalog