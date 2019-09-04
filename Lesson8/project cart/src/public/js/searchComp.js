const search = {
    data () {
        return {
            catalogUrl: '/api/products',
            userSearch: ''
        }
    },
    components: {
    },
    methods: {
		filterItems () {
			let reg = new RegExp (this.userSearch, 'i')
			this.$root.$refs.catalog.filtered = this.$root.$refs.catalog.products.filter(el => reg.test(el.product_name))
		},
    },
    mounted () {
    },
    template: `
    <form action="#" class="search-form" @submit.prevent="filterItems()">
        <input type="text" class="search-field" v-model="userSearch">
        <button class="btn-search" type="submit" @click = "filterItems()">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
}

export default search