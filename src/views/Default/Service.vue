<template>
    <div class="container p-8 mx-auto max-w-7xl" v-if="vendor">
        <Breadcrumb :routeName="`DefaultVendor`" :routeId="vendor.vendor.id" :routeSlug="vendor.vendor.name"
            :secondCrumb="vendor.vendor.name" :thirdCrumb="vendor.name" />

        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-10">
            <div>
                <img v-if="vendor.photo" :src="vendor.photo" class="h-80 w-96" />
                <vue-horizontal ref="horizontal" class="horizontal" responsive v-if="vendor">
                    <div v-for="photo in vendor.photos" :key="photo.id" class="flex flex-row px-2 mt-2 mb-10">
                        <a @click="selectedImage(photo)"
                            class="flex flex-col items-center justify-center w-24 h-24 p-2 border border-gray-200 rounded-xl hover:border-gray-600 hover:border-2">
                            <img v-if="vendor" :src="photo" class="w-20 h-20 rounded-xl" />
                        </a>
                    </div>
                </vue-horizontal>
            </div>
            <div class="md:w-11/12">
                <div class="mb-2 md:flex md:justify-between">
                    <div>
                        <p class="text-2xl text-gray-700 md:hidden">{{ truncate(vendor.name, 25) }}</p>
                        <p class="hidden text-2xl text-gray-700 md:flex">{{ vendor.name }}</p>
                        <span v-if="vendor.discount_price > 0">
                            <p class="mt-2 text-2xl tracking-wide">{{ currency }}{{
                                vendor.discount_price.toFixed(2)
                            }} / {{ vendor.duration }}</p>
                            <p class="mt-2 text-sm tracking-wide">{{ currency }}<span class="line-through">{{
                                vendor.price.toFixed(2)
                            }}</span> </p>
                        </span>
                        <span v-else>
                            <p class="mt-2 text-2xl tracking-wide">{{ currency }}{{ vendor.price.toFixed(2) }} / {{
                                vendor.duration }}</p>
                        </span>

                    </div>

                </div>
                <div class="flex mt-5" v-if="settings">
                    <button :style="{ 'background-color': settings.colors.primaryColor }" @click="addToCart(vendor)"
                        class="flex items-center justify-center w-full p-2 font-light text-white rounded-full cursor-pointer h-14">
                        Book
                    </button>

                </div>
                <p class="mt-5 text-sm font-light text-gray-500" v-html="vendor.description">
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import VueHorizontal from 'vue-horizontal';
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
// import { UploadIcon } from '@heroicons/vue/solid'
export default {
    name: 'DefaultService',
    data() {
        return {
            vendor: null,
            base_url: this.$store.state.baseUrl,
            currency: null,
            resp: null,
            settings: null,
        }
    },
    components: {
        VueHorizontal,
        Breadcrumb,
    },

    mounted() {

        this.$store.commit("loading", true)
        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })

        axios
            .get(this.base_url + 'api/services/' + this.$route.params.id)
            .then((response) => {
                this.vendor = response.data;
                console.log(this.vendor)
                this.$store.commit("loading", false)
            })
            .catch((error) => console.log(error));
    },

    methods: {

        selectedImage(image) {
            this.product.photo = image;
        },

        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
        },

        addToCart(vendor) {
            // let item = JSON.parse(localStorage.getItem("cart"));
            // if(item != null){
            //     notify({
            //         type: "error",
            //         title: "Cart",
            //         text: "You ",
            //     });
            // }
            this.$store.commit('bookVendor', { vendor});
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
  
    
  
  