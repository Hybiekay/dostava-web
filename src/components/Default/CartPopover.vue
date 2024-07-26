<template>
    <Popover v-slot="{ open }" class="relative">
        <PopoverButton :class="open ? '' : 'text-opacity-90'"
            class="inline-flex items-center px-3 py-2 text-base font-medium text-white bg-white rounded-md group hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span><img src="/img/icons/cart.svg" class="w-6 h-6" alt="" /></span>
            <span class="text-sm text-black">{{ cartItemCount }}</span>
        </PopoverButton>

        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
            <PopoverPanel
                class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 shadow-xl -left-12 w-96 sm:px-0 lg:max-w-2xl" v-if="settings">
                <div class="p-2 rounded-t-lg bg-gray-50">
                    <a href="##"
                        class="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <span class="flex items-center">
                            <span class="text-sm font-light text-gray-500">
                                Subtotal
                            </span>
                            <p class="text-sm font-medium text-gray-900">{{ currency }}{{ finalTotal.toFixed(2) }}</p>
                        </span>
                        <span class="flex flex-row space-x-5">
                            <a :style="{ 'background-color': settings.colors.primaryColorDark }" href="/cart"
                                class="flex items-center justify-center w-full h-10 p-2 mt-5 text-sm font-light text-white border border-gray-200 rounded-full cursor-pointer">
                                View my cart (3)
                            </a>
                            <a href="/checkout"
                            :style="{ 'background-color': settings.colors.primaryColor }"
                                class="flex items-center justify-center w-full h-10 p-2 mt-5 text-sm font-light text-white border border-gray-200 rounded-full cursor-pointer">
                                checkout
                            </a>
                        </span>
                    </a>
                </div>
                <div class="overflow-hidden overflow-y-scroll bg-white rounded-b-lg h-72" id="journal-scroll">
                    <div class="relative">
                        <div class="w-full ">
                            <div class="p-5" v-for="product in products" :key="product.id">
                                <div class="flex flex-row space-x-2">
                                    <img v-if="product.photo" v-bind:src="product.photo" class="w-24 h-20 rounded-md "
                                        alt="">
                                    <div class="flex flex-col">
                                        <div class="flex justify-between">
                                            <h3 class="text-xs font-medium text-gray-500">{{ truncate(product.name, 20) }}
                                            </h3>
                                            <!-- <h1 class="text-sm font-medium">{{ currency }}{{ product.price }}</h1> -->
                                            <span v-if="product.discount_price > 0">
                                                <p class="text-sm font-medium ">{{ currency }}{{
                                                    product.discount_price.toFixed(2)
                                                }}</p>
                                                <!-- <p class="text-xs tracking-wide ">{{ currency }}<span class="line-through">{{
                                                product.price.toFixed(2) }}</span> </p> -->
                                            </span>
                                            <span v-else>
                                                <p class="text-sm font-medium">{{ currency }}{{ product.price.toFixed(2) }}
                                                </p>
                                            </span>
                                        </div>
                                        <p class="my-2 text-xs font-light text-gray-500">
                                            {{ product.description ? truncate(product.description, 35) : ''}}
                                        </p>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="flex items-center justify-center w-5 h-5 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                                    @click="decrementProduct(product)">
                                                    <img src="/img/icons/remove.svg" class="w-3 h-3" alt="">
                                                </div>
                                                <div class="w-5 h-5 overflow-hidden">
                                                    <div
                                                        class="flex items-center justify-center w-full h-full text-sm font-light text-center">
                                                        {{
                                                            product.quantity
                                                        }}</div>
                                                </div>
                                                <div class="flex items-center justify-center w-5 h-5 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                                                    @click="incrementProduct(product)">
                                                    <img src="/img/icons/plus.svg" class="w-3 h-3" alt="">
                                                </div>
                                            </div>
                                            <button
                                                class="flex items-center justify-center h-5 px-2 rounded-full bg-gray-50"
                                                @click="removeProduct(product.id)">
                                                <img src="/img/icons/delete.svg" class="w-3 h-3" alt="">
                                                <p class="ml-1 text-xs font-light">Remove</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr class="w-full">
                            </div>

                        </div>

                    </div>

                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>
<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
// import { ChevronDownIcon } from '@heroicons/vue/20/solid'

</script>
<script>
// import axios from 'axios'
import { notify } from "@kyvg/vue3-notification"

export default {
    name: 'CartPopover',
    components: {
    },
    data() {
        return {
            finalTotal: 0,
            products: null,
            product: null,
            currency: null,
            quantity: 1,
            settings: null,
            base_url: this.$store.state.baseUrl,
            cart: null,
            subtotal: null,
            total: null,
        }
    },
    mounted() {

        this.$store.dispatch('fetchSettings', this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })

        if (localStorage.getItem("cart")) {
            this.products = JSON.parse(localStorage.getItem("cart"))
        }

        this.finalTotal = this.totalAmt()
    },

    computed: {

        cartItemCount() {
            return this.$store.getters.count;
        },

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

    }
}
</script>
<style>
input:checked+svg {
    display: block;
}

#journal-scroll::-webkit-scrollbar {
    width: 4px;
    cursor: pointer;
    /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/

}

#journal-scroll::-webkit-scrollbar-track {
    background-color: rgba(229, 231, 235, var(--bg-opacity));
    cursor: pointer;
    /*background: red;*/
}

#journal-scroll::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #a0aec0;
    /*outline: 1px solid slategrey;*/
}
</style>
