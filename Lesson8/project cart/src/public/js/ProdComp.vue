<template> 
    <div class="products"> 
        <cat-item 
            v-for="product of filtered"
                :key="product.id_product"
                :imgCat="catImg"
                :item="product"
        ></cat-item>
    </div>
</template> 
<script>
import catItem from ('./ProdItemComp.vue')

export default {
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
    }
}
</script>

<style></style>