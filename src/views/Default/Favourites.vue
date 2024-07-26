<template>
    <div class="container max-w-6xl p-8 mx-auto" v-if="products">
        <Breadcrumb :thirdCrumb="`My favourites`" />
        
        <div class="w-full p-5 rounded-lg bg-blue-50">
            <h1 class="text-xl font-medium">{{ $t('profile.myFavourites') }}</h1>
        </div>

        <div class="mt-8 md:flex md:justify-between ">
            <div class=" md:w-full">
                <div class="p-2" v-for="product in products" :key="product.id">
                    <div class="flex flex-col space-x-2 md:flex-row md:space-x-5">
                        <router-link
                            :to="{ name: 'DefaultProduct', params: { id: product.product.id, slug: sanitizeTitle(product.product.name ? product.product.name : product.product.vendor.name) } }">
                            <img v-if="product.product.photo" v-bind:src="product.product.photo"
                                class="w-24 h-20 rounded-md md:h-28 md:w-36 " alt="">
                        </router-link>
                        <div class="flex flex-col w-full">
                            <div class="md:flex md:space-x-2 md:justify-between">
                                <h3 class="text-sm">{{ truncate(product.product.name, 60) }}</h3>
                                <div>
                                    <span v-if="product.product.discount_price > 0">
                                        <p class="text-sm tracking-wide ">{{ currency }}{{
                                            product.product.discount_price.toFixed(2)
                                        }}</p>
                                        <p class="text-xs tracking-wide ">{{ currency }}<span class="line-through">{{
                                            product.product.price.toFixed(2) }}</span> </p>
                                    </span>
                                    <span v-else>
                                        <p class="text-sm tracking-wide ">{{ currency }}{{ product.product.price.toFixed(2)
                                        }}</p>
                                    </span>

                                </div>

                                <!-- <h1 class="text-sm font-medium">{{ currency }}{{ product.price }}</h1> -->
                            </div>
                            <p class="my-2 text-xs font-light text-gray-500">
                                {{ truncate(product.product.description, 200) }}
                            </p>
                            <div class="flex justify-between">
                                <div></div>
                                <!-- <div class="flex items-center">
                                    <button
                                        class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                        @click="decrement(product.product)">
                                        <img src="/img/icons/remove.svg" class="w-6 h6" alt="">
                                    </button>
                                    <div class="w-10 h-10 overflow-hidden">
                                        <div
                                            class="flex items-center justify-center w-full h-full text-xl font-light text-center">
                                            <input class="w-full h-full text-xl font-light text-center"
                                                v-model="quantity" />
                                        </div>
                                    </div>
                                    <button
                                        class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                        @click="increment(product.product)">
                                        <img src="/img/icons/plus.svg" class="w-6 h-6" alt="">
                                    </button>
                                </div> -->
                                <button class="flex items-center justify-center h-8 p-3 mt-2 rounded-full bg-blue-50"
                                    @click="addToCart(product.product)">
                                    <img src="/img/shopping-cart.png" class="w-6 h-6" alt="">
                                    <p class="ml-1 text-sm font-light">Add to cart</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr class="w-full mt-2">
                </div>
            </div>



        </div>
        <!-- <Recommended class="mt-10"/> -->
    </div>
</template>
<script>
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification"
import Swal from "sweetalert2/dist/sweetalert2.js"
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
export default {
    name: 'DefaultFavourite',
    components: {
        Breadcrumb
    },
    data() {
        return {
            finalTotal: 0,
            isLoggedIn: false,
            products: null,
            currency: null,
            quantity: 1,
            AuthStr: "Bearer " + localStorage.getItem("authToken"),
            settings: null,
            base_url: this.$store.state.baseUrl,
        }
    },
    mounted() {
        this.$store.commit('loading', true)
        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }

        axios.get(this.base_url + 'api/favourites', {
            'headers': { 'Authorization': this.AuthStr }
        })
            .then((response) => {
                this.products = response.data
                this.$store.commit('loading', false)
            })
            .catch(error => console.log(error))

        this.$store.dispatch('fetchSettings', this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })

    },

    methods: {



        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
        },

        removeProduct(product) {
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            const index = cartItems.findIndex(({ id }) => id === product);
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            this.cart = JSON.parse(localStorage.getItem("cart"));
            notify({
                type: "success",
                title: "Cart",
                text: 'Product Deleted successfully',
            })
            window.location.href = '/cart'
        },


        addToCart(product, quantity = this.quantity, selectedOption = this.selectedOption, selectedOptions = this.selectedOptions) {

            if (product.available_qty >= 1 || product.available_qty == null) {
                if (selectedOption) {
                    this.$store.commit('addToCart', { product, quantity, selectedOption, selectedOptions })

                } else if (this.selectedOptions) {

                    this.$store.commit('addToCart', { product, quantity, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions })

                } else {
                    this.$store.commit('addToCart', { product, quantity });
                }
            } else if (product.available_qty == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Product out of stock',
                })
            }
        },

        increment(product) {
            if (product.available_qty == 0) {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "product out of stock",
                });
            } else {
                let productQunty
                if (product.quantity > 1) {
                    productQunty = product.quantity - 1;
                }
                this.quantity = productQunty
                if (product.discount_price != 0) {
                    this.totalPrice = product.discount_price + this.quantity;
                } else {
                    this.totalPrice = product.price + this.quantity;
                }
            }
        },

        decrement() {
            if (this.quantity === 1) {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "You cannot add 0 product",
                });
            } else {
                this.quantity--;
            }
        },


        sanitizeTitle(title) {
            var slug = "";
            // Change to lower case
            var titleLower = title.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
            // Letter "d"
            slug = slug.replace(/đ/gi, 'd');
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');

            return slug;
        },

    }
}
</script>
