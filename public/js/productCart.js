Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.img = `./img/card_${item.id_product}.png`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    template: `<div class="section_center">
                <product v-for="item of filtered" :key="item.id_product" :product="item" @add-product="$parent.$refs.cart.addProduct">
                </product>
             </div>`
});
//@click="$root.increace"
Vue.component('product', {
    props: ['product'],
    template: `
<div class="product_card">
        <img class="product_card_img" :src="product.img" alt="Some img">
    <div class ="product_card_text">
        <h3 class ="product_card_text_h3">{{ product.product_name }}</h3>
        <p class ="product_card_text_p">{{ product.descripion }}</p>
        <span class ="product_card_text_price">{{ product.price }} $</span>
    </div>

    <div class="product_card_button">
        <div class="product_card_button_add icon-basket" @click="$emit('add-product', product) && $root.counter++">
            <span class="product_card_button_span">Add to Cart</span>
        </div>
    </div>
</div>`
});
