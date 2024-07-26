<template>
    <div class="container max-w-full mx-auto" v-if="vendors">
        <div
            v-if="$route.params.slug.match(/parcel.*/) || $route.params.slug == 'parcel' || $route.params.slug == 'Parcel-delivery' || $route.params.slug.match(/pick.*/)">
            <MainParcel />

            <CategoryHome :categories="categories" class="mx-auto " />
            <VendorList :vendors="vendors" class="" />
        </div>
        <div v-else-if="$route.params.slug == 'taxi-booking' || $route.params.slug == 'taxi' || $route.params.slug.match(/ride.*/) || $route.params.slug.match(/map.*/) || $route.params.slug.match(/fleet.*/)">
            <!-- <h1 class="flex items-center justify-center mt-5 text-2xl font-bold md:mt-28">Taxi booking</h1>
            <p class="flex items-center justify-center text-sm">Not availble on web yet.</p> -->
            <Taxi/>
        </div>
        <div v-else-if="$route.params.slug.match(/service.*/) || $route.params.slug.match(/booking.*/)">
            <HomeBanner />
            <CategoryHome :categories="categories" class="mx-auto " />
            <div class="container p-8 mx-auto mt-10 ">
                

                <!-- <ServiceList :vendors="populars" class="" /> -->
                <ServiceList :vendors="services" class="my-8" />

                <ProductsList :products="products" :responce="resp" @load-more="loadMore" @load-less="loadLess" />
            </div>

        </div>
        <div v-else>
            <HomeBanner />
            <CategoryHome :categories="categories" class="mx-auto " />
            <div class="container p-8 mx-auto mt-10 ">
                

                <VendorList :vendors="vendors" class="" />

                <ProductsList :products="products" :responce="resp" @load-more="loadMore" @load-less="loadLess" />
            </div>


        </div>
    </div>
</template>
<script>
import axios from "axios";
import MainParcel from '@/components/Default/Parcel/MainComponent.vue'
import HomeBanner from '@/components/Default/HomeBanner.vue'
import CategoryHome from '@/components/Default/Categories.vue'
import VendorList from '@/components/Default/VendorList.vue'
import ServiceList from '@/components/Default/ServiceList.vue'
import ProductsList from '@/components/Default/ProductsList.vue'
import Taxi from '@/components/Default/Taxi.vue'
// import { method } from 'cypress/types/bluebird';
export default {
    name: 'DefaultHome',

    data() {
        return {
            categories: null,
            vendors: null,
            products: null,
            base_url: this.$store.state.baseUrl,
            pageNo: 1,
            items: null,
            resp: null,
            services: null,
            populars: null,
        }
    },

    components: {
        CategoryHome,
        VendorList,
        ProductsList,
        HomeBanner,
        MainParcel,
        Taxi,
        ServiceList
    },

    mounted() {
        this.$store.commit('loading', true)
        axios
            .get(this.base_url + 'api/categories?vendor_type_id=' + this.$route.params.id)
            .then((response) => {
                this.categories = response.data.data;
            })
            .catch((error) => console.log(error));

        axios
            .get(this.base_url + 'api/vendors?vendor_type_id=' + this.$route.params.id)
            .then((response) => {
                this.vendors = response.data.data.slice(0, 12);
                this.$store.commit('loading', false)
            })
            .catch((error) => console.log(error));
        axios
            .get(this.base_url + 'api/services?vendor_type_id=' + this.$route.params.id)
            .then((response) => {
                this.services = response.data.slice(0, 20);
                this.$store.commit('loading', false)
            })
            .catch((error) => console.log(error));

        axios
            .get(this.base_url + 'api/products?page=' + this.pageNo + "&vendor_type_id=" + this.$route.params.id)
            .then((response) => {
                this.products = response.data.data;
                this.resp = response.data
                
            })
            .catch((error) => console.log(error));
    },

    methods: {
        loadLess() {
            // this.$store.commit("loading", true)
            
            axios.get(this.base_url + "api/products?vendor_type_id=" + this.$route.params.id)
                .then((response) => {
                    this.resp = response.data
                    this.products = response.data.data;
                })

        },

        loadMore() {
            //   this.$store.commit("loading", true)
            this.pageNo++
            axios.get(this.base_url + "api/products?page=" + this.pageNo + "&vendor_type_id=" + this.$route.params.id)
                .then((response) => {
                    // this.$store.commit("loading", false);
                    this.products = this.products.concat(response.data.data);
                    this.resp = response.data
                    
                   
                })
        },
    }

}
</script>
  
    
  
  