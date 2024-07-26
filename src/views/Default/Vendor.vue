<template>
    <div class="object-contain w-full bg-center bg-no-repeat bg-cover md:h-60"
        :style="{ 'backgroundImage': 'url(' + vendor.feature_image + ')' }" v-if="vendor">
        <div class="container flex flex-row max-w-6xl p-8 mx-auto">
            <img v-bind:src="vendor.logo" class="w-20 h-16 pl-2 pr-2 rounded-full md:w-36 md:h-32 " alt="">
            <div>
                <div class="flex">
                    <h1 class="mr-2 text-2xl font-bold text-white">{{ vendor.name }}</h1>
                </div>

                <p class="mt-2 text-sm font-light text-white md:w-4/6">{{ vendor.description }}</p>
                <div>

                </div>
                <p class="text-sm font-light text-white">Delivery {{ currency }}{{ vendor.delivery_fee }} ({{
                    vendor.delivery_time }} mins)</p>
                <div v-if="vendor.vendor_type.slug.match(/pharmacy.*/)" class="flex items-center ">
                    <!-- <div v-if="settings" class="p-1 rounded-md" :style="{ 'background-color': settings.colors.primaryColor }"> -->
                    <a class="flex p-2 mt-2 text-sm text-white bg-blue-500 rounded-full shadow-sm"
                        :href="$router.resolve({ name: 'UploadPrescription', params: { id: vendor.id, slug: sanitizeTitle(`${vendor.name}`) } }).href">
                        <img src="/img/prescription.png" class="w-4 h-4 text-white" alt="">
                        Upload prescription
                    </a>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>

    <div v-if="vendor">
        <div class="bg-slate-50">
            <vue-horizontal class="container flex items-center h-10 mx-auto ">
                <router-link
                    :to="{ name: 'DefaultCategory', params: { id: category.id, slug: sanitizeTitle(category.name) } }"
                    class="px-6 py-16" v-for="category in vendor.categories" :key="category.id">
                    <p class="w-16 text-xs text-gray-500 capitalize truncate">{{ category.name }}</p>
                </router-link>
            </vue-horizontal>
        </div>
        <div class="container px-4 mx-auto mt-5 max-w-7xl">


            <div class="flex flex-col">
                <div class="pb-5" v-for="menu in vendor.menus" :key="menu.id">
                    <p class="text-2xl capitalize">{{ menu.name }}</p>
                    <div class="grid grid-cols-2 gap-5 md:grid-cols-4">

                        <div v-for="(product, index) in menu.products" :key="index">
                            <!-- {{ product }} -->
                            <router-link
                                :to="{ name: 'DefaultProduct', params: { id: product.id, slug: sanitizeTitle(product.name ?? '') } }">
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
                        <!-- <router-link
                            :to="{ name: 'DefaultVendor', params: { id: product.vendor.id, slug: sanitizeTitle(product.vendor.name) } }"
                            class="text-xs text-gray-500 underline ">{{ product.vendor.name }}</router-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ProductsList :products="products" :responce="resp" @load-more="loadMore" @load-less="loadLess" />

    </div>
</template>

<script>
import axios from 'axios';
import VueHorizontal from 'vue-horizontal';
import ProductsList from '@/components/Default/ProductsList.vue'
export default {
    name: 'DefaultVendor',
    data() {
        return {
            vendor: null,
            base_url: this.$store.state.baseUrl,
            currency: null,
            products: null,
            resp: null,
            isLoggedIn: false,
        }
    },
    components: {
        ProductsList,
        VueHorizontal,
        // UploadIcon,
    },

    mounted() {

        this.$store.commit("loading", true)
        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })



        axios
            .get(this.base_url + 'api/products?vendor_id=' + this.$route.params.id)
            .then((response) => {
                this.products = response.data.data;
                this.resp = response
            })
            .catch((error) => console.log(error));

        axios
            .get(this.base_url + 'api/vendors/' + this.$route.params.id)
            .then((response) => {
                this.vendor = response.data;
                console.log(this.vendor)
                this.$store.commit("loading", false)
            })
            .catch((error) => console.log(error));
    },

    methods: {
        loadLess() {
            // this.$store.commit("loading", true)
            this.pageNo--
            axios.get(this.base_url + "api/products?page=" + this.pageNo + "&vendor_id=" + this.$route.params.id)
                .then((response) => {
                    // this.$store.commit("loading", false);
                    this.products = response.data.data.slice(0, 20);

                })

        },

        loadMore() {
            //   this.$store.commit("loading", true)
            this.pageNo++
            axios.get(this.base_url + "api/products?page=" + this.pageNo + "&vendor_id=" + this.$route.params.id)
                .then((response) => {
                    // this.$store.commit("loading", false);
                    this.products = this.products.concat(response.data.data);

                    this.resp = response.data

                })
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
  
    
  
  