<template>
    <div class="container max-w-6xl p-8 mx-auto" v-if="products">
        <Breadcrumb :thirdCrumb="`My Cart`" />
       
        <div class="w-full p-5 rounded-lg bg-blue-50">
            <h1 class="text-xl font-medium">{{ $t('cart.header') }}</h1>
        </div>

        <div class="mt-8 md:flex md:justify-between " v-if="settings">
            <div class=" md:w-7/12">
                <div class="p-2" v-for="product in products" :key="product.id">
                    <div class="flex flex-col space-x-2 md:flex-row md:space-x-5">
                        <img v-if="product.photo" v-bind:src="product.photo" class="w-24 h-20 rounded-md md:h-28 md:w-36 " alt="">
                        <div class="flex flex-col w-full">
                            <div class="md:flex md:space-x-2 md:justify-between">
                                <h3 class="text-sm">{{ truncate(product.name, 60) }}</h3>
                                <div>
                                    <span v-if="product.discount_price > 0">
                                        <p class="text-sm tracking-wide ">{{ currency }}{{ product.discount_price.toFixed(2)
                                        }}</p>
                                        <p class="text-xs tracking-wide ">{{ currency }}<span class="line-through">{{
                                        product.price.toFixed(2) }}</span> </p>
                                    </span>
                                    <span v-else>
                                        <p class="text-sm tracking-wide ">{{ currency }}{{ product.price.toFixed(2) }}</p>
                                    </span>

                                </div>
                                
                                <!-- <h1 class="text-sm font-medium">{{ currency }}{{ product.price }}</h1> -->
                            </div>
                            <p class="my-2 text-xs font-light text-gray-500" v-html="product.description ? truncate(product.description, 500) : ''">
                            </p>
                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <button
                                        class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                        @click="decrementProduct(product)">
                                        <img src="/img/icons/remove.svg" class="w-6 h6" alt="">
                                    </button>
                                    <div class="w-10 h-10 overflow-hidden">
                                        <div
                                            class="flex items-center justify-center w-full h-full text-xl font-light text-center">
                                            {{
                                                    product.quantity
                                            }}</div>
                                    </div>
                                    <button
                                        class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                        @click="incrementProduct(product)">
                                        <img src="/img/icons/plus.svg" class="w-6 h-6" alt="">
                                    </button>
                                </div>
                                <button class="flex items-center justify-center h-8 px-3 mt-2 rounded-full bg-blue-50"
                                    @click="removeProduct(product.id)">
                                    <img src="/img/icons/delete.svg" class="w-6 h-8" alt="">
                                    <p class="ml-1 text-sm font-light">Remove</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr class="w-full">
                </div>
            </div>

            <div class="mt-2 md:w-4/12 md:mt-0" v-if="products">
                <div class="p-3 rounded-lg" :style="{ 'background-color': settings.colors.primaryColorDark }">
                    <div class="flex justify-between">
                        <p class="text-sm font-light text-white">{{ $t('cart.discount') }}</p>
                    </div>
                    <div class="flex items-center justify-between w-full p-1 mt-4 bg-white rounded-lg">
                        <input class="w-full p-2 border-none rounded-lg placeholder:font-light placeholder:text-sm"
                            v-model="coupon" type="text" placeholder="Enter discount code" />
                        <button @click="getCoupon" class="flex items-center p-2 bg-gray-200 rounded-lg cursor-pointer">
                            <img src="/img/icons/chevron_right.svg" class="w-6" alt="">
                            <!-- <SearchIcon class="self-center w-6 h-6 font-black text-black md:w-6 md:h-6" aria-hidden="true" /> -->
                        </button>
                    </div>
                </div>
                
                
                <div class="flex flex-col" v-for="product in products" :key="product.id">
                    <div class="flex justify-between" v-if="product.selectedOption">
                        <p class="text-xs font-light text-gray-500">{{ product.selectedOption ? truncate(product.selectedOption.name, 70) : '' }}</p>
                        <p class="text-xs font-light text-gray-500">{{ currency }}{{ product.selectedOption ? product.selectedOption.price.toFixed(2) : '' }}</p>
                    </div>
                    <div class="flex justify-between" v-for="option in product.selectedOptions" :key="option.id">
                        <p class="text-xs font-light text-gray-500">{{ option ? truncate(option.name, 70) : '' }}</p>
                        <p class="text-xs font-light text-gray-500" v-if="option">{{ currency }}{{ option ? option.price.toFixed(2) : '' }}</p>
                    </div>
                    <div class="flex justify-between mt-2">
                        <p class="text-xs font-light text-gray-500">{{ truncate(product.name, 70) }}</p>
                        <p class="text-xs font-light text-gray-500">{{ currency }}{{ product.totalPrice.toFixed(2) }}</p>
                    </div>
                </div>
                <div class="flex justify-between mt-1">
                        <p class="text-sm font-light text-gray-600">{{ $t('cart.discount') }}</p>
                        <p class="font-bold text-black" v-if="discountAmount">
                            <span v-if="discount.percentage == 1">%</span>
                            <span v-else>{{ currency }}</span>
                            {{ discountAmount }}
                        </p>
                </div>
                <div class="flex justify-between my-1">
                    <p class="font-light text-gray-500 ">{{ $t('cart.subtotal') }}:</p>
                    <p class="font-bold text-gray-500 "> {{ currency }}{{ finalTotal.toFixed(2) }}</p>
                </div>
                <!-- <router-link to="/checkout"
                    class="flex items-center justify-center w-full p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer h-14">
                    Proceed to checkout
                </router-link> -->
                <div class="px-5 mt-10 border-2 border-gray-100 rounded py-7" v-if="!isLoggedIn">
                    <div class="flex justify-between">
                        <div>
                            <p class="font-bold">
                                <!-- {{ $t('cart.haveAnAccount') }}? -->
                                Have an account?
                            </p>
                            <span class="text-sm font-light">

                                <router-link to="/register" class="text-sm font-light underline">
                                    <!-- {{ $t('cart.join')}} -->
                                    Register
                                </router-link>
                                <!-- {{ $t('cart.or') }} -->
                                Or
                                <router-link to="/login" class="underline">
                                    <!-- {{ $t('nav.login') }} -->
                                    Login
                                </router-link>
                                <!-- {{ $t('cart.forAsmootherCheckout') }} -->
                                Checkout
                            </span>
                        </div>
                        <!-- <span class="text-2xl font-bold">
                            <UserIcon class="w-6 h-6 text-black" aria-hidden="true" />
                        </span> -->
                    </div>
                </div>
                <div v-else>
                    <a :style="{ 'background-color': settings.colors.primaryColor }" :href="`checkout`"
                        class="flex items-center justify-center w-full p-2 font-light text-white rounded-full cursor-pointer h-14">
                        {{ $t('cart.continueToCheckout') }}
                    </a>
                </div>
                <!-- <p class="mt-5 text-xs text-center text-gray-500">We accept the following payment options</p> -->
            </div>

        </div>
        <!-- <Recommended class="mt-10"/> -->
    </div>
</template>
<script>
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification"
import Breadcrumb from '@/components/Default/Breadcrumb.vue'

export default {
    name: 'DefaultCart',
    components: {
        Breadcrumb
    },
    data() {
        return {
            finalTotal: 0,
            isLoggedIn: false,
            products: null,
            product: null,
            currency: null,
            quantity: 1,
            coupon: null,
            discount: null,
            discountAmount: null,
            AuthStr: "Bearer " + localStorage.getItem("authToken"),
            orders: null,
            settings: null,
            base_url: this.$store.state.baseUrl,
            cart: null,
            subtotal: null,
            total: null,
        }
    },
    mounted() {
        this.$store.commit('loading', true)
        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }

        this.$store.dispatch('fetchSettings', this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })

        if (localStorage.getItem("cart")) {
            this.products = JSON.parse(localStorage.getItem("cart"))
            this.$store.commit('loading', false)
            // console.log(this.products)
        }

        this.finalTotal = this.totalAmt()
    },

    computed: {

        cartItemCount() {
            return this.$store.getters.count;
        },

    },



    methods: {

        getCoupon() {
            // this.$store.commit('loading', true)
            axios.get(this.base_url + 'api/coupons/' + this.coupon, {
                headers: { Authorization: this.AuthStr },
            })
                .then((response) => {
                    // this.$store.commit('loading', false)
                    this.discount = response.data
                    console.log(response)
                })
                .catch((error) => {
                    this.$store.commit('loading', false)
                    notify({
                        type: "error",
                        title: "Cart",
                        text: error.response.data.message,
                    })
                })

        },

        back() {
            this.$router.back()
        },

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


        cartSubTotal() {
            this.subtotal = 0;
            for (let product of this.$store.state.cart) {
                this.subtotal += Number(product.totalPrice);
                if (product.selectedOptions) {
                    product.selectedOptions.forEach((item) => {
                        this.subtotal += Number(item.price);
                    })
                } if (product.selectedOption) {
                    this.subtotal += Number(product.selectedOption.price);
                }

            }
            return this.subtotal;
        },

        totalAmt() {
            //sum totalprices of products in the cart and divide or subtract discount from it
            //determine whether discount is % or a fixed amount to enable you to calculate the totalAmt
            // this.total = 0;
            this.total = this.cartSubTotal();
            if (this.discount) {
                if (this.discount.expired == false) {
                    this.discount.products.forEach((item) => {
                        const cartItems = JSON.parse(localStorage.getItem("cart"));
                        const index = cartItems.findIndex(({ id }) => id === item.id);
                        if (cartItems[index]) {
                            if (this.discount.percentage == 1) {
                                this.discountAmount = this.discount.discount
                                this.total = this.total - (this.total * (this.discount.discount / 100));
                            } else if (this.discount.percentage == 0) {
                                this.discountAmount = this.discount.discount
                                this.total -= this.discount.discount;
                            }
                            cartItems[index].totalPrice = this.total
                            cartItems[index].discount = this.discountAmount
                            localStorage.setItem("cart", JSON.stringify(cartItems));

                            // localStorage.addItem("discount", this.discount)
                            // localStorage.getItem()
                        }
                    })

                }
            }
            return this.total;
        },

        incrementProduct(product) {
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            const index = cartItems.findIndex(({ id }) => id === product.id);

            if (product.available_qty == 0) {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "Product out of stock",
                });

            } else {
                product.quantity++
                if (product.discount_price != 0) {
                    product.totalPrice = product.discount_price * product.quantity
                    // this.finalTotal = product.totalPrice
                } else {
                    product.totalPrice = product.price * product.quantity
                    // this.finalTotal =  product.totalPrice
                }
                // this.finalTotal = product.totalPrice
                //  update totalPrice in cart in localStorage
                cartItems[index].totalPrice = product.totalPrice;
                cartItems[index].quantity = product.quantity;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                this.$store.state.cart = JSON.parse(localStorage.getItem("cart"));

            }

            this.finalTotal = this.totalAmt()
        },

        decrementProduct(product) {
            const cartItems = JSON.parse(localStorage.getItem("cart"));
            const index = cartItems.findIndex(({ id }) => id === product.id);

            // product.forEach((item, i) => {
            if (product.quantity > 1) {
                product.quantity--
                // reduce quantity by the price of the product
                if (product.discount_price != 0) {
                    product.totalPrice = product.discount_price * product.quantity;
                } else {
                    product.totalPrice = product.price * product.quantity;
                }
                cartItems[index].totalPrice = product.totalPrice;
                cartItems[index].quantity = product.quantity;
                localStorage.setItem("cart", JSON.stringify(cartItems));
                this.$store.state.cart = JSON.parse(localStorage.getItem("cart"));
            } else {
                this.removeProduct(product);
            }

            this.finalTotal = this.totalAmt()
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
