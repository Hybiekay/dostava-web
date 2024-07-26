<template>
    <div class="container px-4 mx-auto mt-5 max-w-7xl" v-if="products || responce">
        <div class="grid grid-cols-2 gap-5 md:grid-cols-4" v-if="products.length != 0">
            <div class="pb-5" v-for="product in products" :key="product.id">
                <router-link
                    :to="{ name: 'DefaultProduct', params: { id: product.id, slug: sanitizeTitle(product.name ? product.name : product.vendor.name) } }">
                    <img v-if="product" v-bind:src="product.photo" class="h-40 md:h-52 w-44 md:w-64" alt="">
                </router-link>
                <div class="flex justify-between mt-2">
                    <p class="text-xs font-light">{{ truncate(product.name, 100) }}</p>
                    <span v-show="isLoggedIn">
                        <button @click="addToFavourite(product)">
                            <img src="/img/icons/favourite-border.svg" class="w-6 h-6" alt="">
                        </button>
                    </span>

                </div>
                <p class="font-medium">{{ currency }}{{ product.price.toFixed(2) }}</p>
                <router-link
                    :to="{ name: 'DefaultVendor', params: { id: product.vendor.id, slug: sanitizeTitle(product.vendor.name) } }"
                    class="text-xs text-gray-500 underline ">{{ product.vendor.name }}</router-link>
            </div>
        </div>
        <div v-if="responce.current_page != responce.last_page" class="flex items-center justify-center mt-5">
            <button @click="$emit('load-more')" class="w-40 p-2 text-sm text-center text-gray-700 bg-gray-300 rounded">{{ $t('pages.seemore') }}</button>
        </div>
        <!-- <p v-else class="text-center text-gray-500">No products</p> -->
        <!-- <p>here = {{ responce.current_page }}</p> -->
        <div v-if="responce.current_page == responce.last_page && responce.last_page > 1" class="flex items-center justify-center mt-5">

            <button @click="$emit('load-less')" class="w-40 p-2 text-sm text-center text-gray-700 bg-gray-300 rounded">{{ $t('pages.seeless') }}</button>
        </div>


    </div>
</template>
<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
export default {
    name: 'ProductsList',

    props: {
        products: Object,
        responce: Object
    },

    data() {
        return {
            currency: null,
            pageNo: 1,
            showMore: true,
            dontShow: false,
            base_url: this.$store.state.baseUrl,
            isLoggedIn: false,
            AuthStr: "Bearer " + localStorage.getItem("authToken"),
        }
    },

    mounted() {
        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"));
        }

        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })
    },


    methods: {

        addToFavourite(product) {

            axios.post(this.base_url + 'api/favourites/',
                {
                    product_id: product.id,
                    is_favourite: true
                }, {
                'headers': { 'Authorization': this.AuthStr }
            })
                .then((response) => {
                    notify({
                        type: "success",
                        title: "Favourited",
                        text: response.data.message,
                    })
                })
                .catch(error => console.log(error))

        },


        showLess(responce) {
            console.log(responce)
            // console.log('products')
            if (responce) {
                if (responce.to == null) {
                    this.dontShow = true;
                    console.log(this.dontShow)
                    this.showMore = false;
                    console.log(responce)
                }
            }
            // if(products == [] ||  Object.keys(products).length === 0){
            //     this.dontShow = true;
            //     this.showMore = false;
            //     console.log(products)
            // } else {
            //     this.showMore = true;
            //     this.dontShow = false
            //     // console.log('here')
            // }
        },


        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
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