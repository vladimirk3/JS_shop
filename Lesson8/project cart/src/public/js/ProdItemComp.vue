<template> 
    <div class="product-item">  
        <img :src="imgCat" alt="Some img">
        <div class="desc">
            <h3> {{ item.product_name }}</h3>
            <p>{{ item.price }} $</p>
            <button class="buy-btn" @click="$parent.addProduct(item)">Купить</button>
        </div>
    </div>
</template> 

<script>
export default {
    data: function () {
        return {
            
        }
    },
    props: ['imgCat','item'],
}
</script>

<style></style>