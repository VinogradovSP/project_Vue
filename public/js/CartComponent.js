Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.img = `./img/card_${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error')
                        }
                    })
            }
        }
    },
    template: `
    <div class="top_right" >
        <div class="top_right__in icon-align-justify">              
            <top_menu></top_menu>
        </div>
     
        <div class="top_right__in entrance icon-l_k"></div>
        <div class="top_right__in icon-basket" type="button" @click="showCart=!showCart" >
            <span class="top_span">{{ $root.counter }}</span>
        </div>
        <div class="basket_product" v-show="showCart">
            <p v-if="!cartItems.length">Basket is empty</p>
            <cart-item v-for="item of cartItems" :key="item.product_name" :cart-item="item" @remove="remove"></cart-item>
        </div>
    </div>
    `
});
Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="basket-element">
            <img class="img" :src="cartItem.img" alt="Some img">
            <div class="basket-item">
                <h3>{{ cartItem.product_name }}</h3>
                <p>{{ cartItem.price }} $</p>
                <p>quantity: <span>{{ cartItem.quantity }}</span></p>
            </div>
            <div class="basket-item">
                <p>{{ cartItem.price*cartItem.quantity }} $</p>
                <button class="basket-btn fas fa-trash-alt" @click="$emit('remove', cartItem) && $root.counter--"></button>
            </div>
    </div>
    `
})
Vue.component('top_menu', {
    template: `
<div class="menu">
   <button class="menu_button"><img src="img/Vector.svg" alt="delete"></button>
    <h3 class="menu_text menu_text_top">MENU</h3>
    <ul>
  <h3 class="menu_text menu_text_red">MAN</h3>
    <a href="#" class="menu_text menu_text_colorA">Accessories</a>
    <a href="#" class="menu_text menu_text_colorA">Bags</a>
    <a href="#" class="menu_text menu_text_colorA">Denim</a>
    <a href="#" class="menu_text menu_text_colorA">T-Shirts</a>
  </ul>
<ul>
    <h3 class="menu_text menu_text_red">WOMAN</h3>
    <a href="#" class="menu_text menu_text_colorA">Accessories</a>
    <a href="#" class="menu_text menu_text_colorA">Jackets & Coats</a>
    <a href="#" class="menu_text menu_text_colorA">Polos</a>
    <a href="#" class="menu_text menu_text_colorA">T-Shirts</a>
    <a href="#" class="menu_text menu_text_colorA">Shirts</a>
</ul>
<ul>
    <h3 class="menu_text menu_text_red">KIDS</h3>
    <a href="#" class="menu_text menu_text_colorA">Accessories</a>
    <a href="#" class="menu_text menu_text_colorA">Jackets & Coats</a>
    <a href="#" class="menu_text menu_text_colorA">Polos</a>
    <a href="#" class="menu_text menu_text_colorA">T-Shirts</a>
    <a href="#" class="menu_text menu_text_colorA">Shirts</a>
    <a href="#" class="menu_text menu_text_colorA">Bags</a>
</ul>
</div>
    `
})