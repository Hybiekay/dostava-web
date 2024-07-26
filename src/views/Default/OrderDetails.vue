<template>
    <div class="font-sans antialiased text-gray-700 bg-gray-50" v-if="order">
        <div class="container p-8 mx-auto max-w-7xl" v-show="isLoggedIn">
            <div v-if="order">
                <div class="flex justify-between">
                    <h4 class="text-sm font-bold text-black md:text-2xl ">Order #{{ order.code }}</h4>
                    <h4 class="text-xs font-medium text-gray-500 md:text-sm ">Order placed {{ order.formatted_date }}</h4>
                </div>

                <div class="mb-5 bg-white border border-gray-200 rounded-lg" v-for="item in order.products" :key="item.id">
                    <div class="p-8 md:flex md:justify-between">
                        <div class="flex items-center justify-center bg-gray-100 rounded-xl h-44 w-44">
                            <img :src="item.product.photo" class="w-16 md:w-36 rounded-xl" alt="">
                        </div>
                        <div class="mt-2">
                            <p class="font-medium md:w-96 ">{{ item.product.name }}</p>
                            <p class="font-medium " v-if="item.product.discount_price">{{ currency }}{{
                                item.product.discount_price.toFixed(2) }}</p>
                            <p class="font-medium " v-else>{{ currency }}{{ item.product.price.toFixed(2) }}</p>
                            <p class="text-sm text-gray-500 w-96">{{ item.description }}</p>
                            <p class="text-sm text-gray-500 w-96">{{ item.quantity }}Product(s)</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-black">Vendor Information</p>
                            <p class="text-sm text-gray-500">{{ order.vendor.name }}</p>
                            <p class="text-sm text-gray-500">{{ order.vendor.email }}</p>
                            <p class="text-sm text-gray-500">{{ order.vendor.phone }}</p>
                            <p class="text-sm text-gray-500">{{ order.vendor.address ?? '' }}</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-black">Delivery Address</p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.address :
                                'Pick up' }}</p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.city : '' }}
                            </p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.country : ''
                            }}</p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.state : ''
                            }}</p>
                        </div>
                    </div>
                    <div class="p-8">
                        <p class="text-sm">Note:</p>
                        <p class="text-xs">{{ order.note }}</p>
                    </div>
                    <hr>
                    <div class="p-8 ">
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                            <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" :style="{ 'width': width + '%' }">
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div v-for="stat in order.statuses" :key="stat.id"
                                class="mb-1 text-base font-medium dark:text-white">{{ stat.name }}</div>
                        </div>

                    </div>
                </div>
                <span v-if="order.type == 'parcel'">
                    <div class="mb-5 bg-white border border-gray-200 rounded-lg">
                        <div class="p-8 md:flex md:justify-between">
                            <div class="flex items-center justify-center bg-gray-100 rounded-xl h-44 w-44">
                                <img :src="order.vendor.feature_image" class="w-16 md:w-36 rounded-xl" alt="">
                            </div>
                            <div class="mt-2">
                                <p class="font-medium md:w-96 ">{{ order.vendor.name }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.email }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.phone }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.address ?? '' }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-black ">Pickup Location</p>
                                <p class="text-sm text-gray-500">{{ order.pickup_location ? order.pickup_location.address :
                                    '' }}</p>
                                <p class="text-sm text-gray-500">{{ order.pickup_location ? order.pickup_location.city : ''
                                }}</p>
                                <p class="text-sm text-gray-500">{{ order.pickup_location ? order.pickup_location.state : ''
                                }}</p>
                                <p class="text-sm text-gray-500">{{ order.pickup_location ? order.pickup_location.country :
                                    '' }}</p>
                            </div>

                            <!-- here -->

                        </div>
                        <div class="p-8">
                            <p class="text-sm">Note:</p>
                            <p class="text-xs">{{ order.note }}</p>
                        </div>

                        <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                            <!-- <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                                    :style="{ 'width': width + '%' }">
                                </div> -->
                        </div>
                        <div class="px-8 py-2 ">
                            <div class="mt-2">
                                <p class="text-black ">Stops</p>
                                <div v-for="(stop, i) in order.stops" :key="stop.id">
                                    <div class="md:flex md:justify-between">
                                        <!-- <div> -->

                                        <p class="text-sm">Stop {{ i + 1 }}</p>
                                        <p class="text-sm font-medium text-gray-700 ">{{ stop.delivery_address ?
                                            stop.delivery_address.address :
                                            '' }}</p>
                                        <p class="text-sm font-medium text-gray-700 ">{{ stop.delivery_address ?
                                            stop.delivery_address.name :
                                            '' }}</p>
                                        <p class="text-sm font-medium text-gray-700 ">{{ stop.delivery_address ?
                                            stop.delivery_address.city :
                                            '' }}</p>
                                        <p class="text-sm font-medium text-gray-700 ">{{ stop.delivery_address ?
                                            stop.delivery_address.state :
                                            '' }}</p>
                                        <p class="text-sm font-medium text-gray-700 ">{{ stop.delivery_address ?
                                            stop.delivery_address.country :
                                            '' }}</p>
                                        <p class="text-sm text-gray-500">{{ stop ?
                                            stop.name
                                            : '' }}</p>
                                        <p class="text-sm text-gray-500">{{ stop ? stop.phone
                                            :
                                            '' }}</p>
                                        <p class="text-sm text-gray-500">{{ stop ?
                                            stop.note
                                            : '' }}</p>

                                        <!-- </div> -->
                                    </div>
                                </div>

                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                <!-- <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                                    :style="{ 'width': width + '%' }">
                                </div> -->
                            </div>
                            <div class="flex justify-between">
                                <div v-for="stat in order.statuses" :key="stat.id"
                                    class="mb-1 text-base font-medium dark:text-white">{{ stat.name }}</div>
                            </div>

                        </div>
                    </div>
                </span>
                <span v-if="order.type == 'pharmacy'">
                    <div class="mb-5 bg-white border border-gray-200 rounded-lg">
                        <div class="p-8 md:flex md:justify-between">
                            <div class="flex items-center justify-center bg-gray-100 rounded-xl h-44 w-44">
                                <img :src="order.vendor.feature_image" class="w-16 md:w-36 rounded-xl" alt="">
                            </div>
                            <div class="mt-2">
                                <p class="font-medium md:w-96 ">{{ order.vendor.name }}</p>
                                <!-- <p class="font-medium " v-if="item.product.discount_price">{{ currency }}{{ item.product.discount_price.toFixed(2) }}</p> -->
                                <!-- <p class="font-medium " v-else>{{ currency }}{{ item.product.price.toFixed(2) }}</p> -->
                                <!-- <p class="text-sm text-gray-500 w-96">{{ item.description }}</p> -->
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-black">Vendor Information</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.name }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.email }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.phone }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.address ?? '' }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-black">Delivery Address</p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.address
                                    :
                                    'Pick up' }}</p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.city :
                                    '' }}
                                </p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.country
                                    : ''
                                }}</p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.state :
                                    ''
                                }}</p>
                            </div>
                        </div>
                        <div class="p-8">
                            <p class="text-sm">Note:</p>
                            <p class="text-xs">{{ order.note }}</p>
                        </div>
                        <hr>
                        <div class="p-8 ">
                            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                                    :style="{ 'width': width + '%' }">
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div v-for="stat in order.statuses" :key="stat.id"
                                    class="mb-1 text-base font-medium dark:text-white">{{ stat.name }}</div>
                            </div>

                        </div>
                    </div>
                </span>
                <span v-if="order.taxi_order != null">
                    <div class="mb-5 bg-white border border-gray-200 rounded-lg">
                        <div class="p-8 md:flex md:justify-between">
                            <div class="flex items-center justify-center bg-gray-100 rounded-xl h-44 w-44 md:mr-2">
                                <img :src="order.taxi_order.vehicle_type.photo" class="w-16 md:w-36 rounded-xl" alt="">
                            </div>
                            <div class="mt-2">
                                <p class="font-medium md:w-96 ">{{ order.taxi_order.vehicle_type.name }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-black">Drop off Location</p>
                                <p class="text-sm text-gray-500">{{ order.taxi_order.dropoff_address }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-black">Pick up Location</p>
                                <p class="text-sm text-gray-500">{{ order.taxi_order.pickup_address }}</p>
                            </div>
                        </div>
                        <div class="p-8">
                            <p class="text-sm">Note:</p>
                            <p class="text-xs">{{ order.note }}</p>
                        </div>

                        <hr>
                        <div class="p-8 ">
                            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                                    :style="{ 'width': width + '%' }">
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div v-for="stat in order.statuses" :key="stat.id"
                                    class="mb-1 text-base font-medium dark:text-white">{{ stat.name }}</div>
                            </div>

                        </div>
                    </div>
                </span>
                <span v-if="order.order_service != null">
                    <div class="mb-5 bg-white border border-gray-200 rounded-lg" v-if="order">
                        <div class="p-8 md:flex md:justify-between">
                            <div class="flex items-center justify-center bg-gray-100 rounded-xl h-44 w-44 md:mr-2">
                                <img :src="order.order_service.service.photo" class="w-16 md:w-36 rounded-xl" alt="">
                            </div>
                            <div class="mt-2">
                                <p class="font-medium ">{{ order.order_service.service.name }}</p>
                                <p class="text-sm text-gray-500">{{ order.order_service.service.duration }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-black">Vendor Information</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.name }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.email }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.phone }}</p>
                                <p class="text-sm text-gray-500">{{ order.vendor.address ?? '' }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-black">Delivery Address</p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.address
                                    :
                                    'Pick up' }}</p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.city :
                                    '' }}
                                </p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.country
                                    : ''
                                }}</p>
                                <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.state :
                                    ''
                                }}</p>
                            </div>
                        </div>
                        <div class="p-8">
                            <p class="text-sm">Note:</p>
                            <p class="text-xs">{{ order.note }}</p>
                        </div>
                        
                        <hr>
                        <div class="p-8 ">
                            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                                <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                                    :style="{ 'width': width + '%' }">
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div v-for="stat in order.statuses" :key="stat.id"
                                    class="mb-1 text-base font-medium dark:text-white">{{ stat.name }}</div>
                            </div>

                        </div>
                    </div>
                </span>
                <div class="mt-5 bg-gray-100 border border-gray-200 rounded-lg">
                    <div class="p-8 md:flex md:justify-between">

                        <div class="mt-2">
                            <p class="text-sm text-black">Billing address</p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.address :
                                'Pickup' }}</p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.city : '' }}
                            </p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.country : ''
                            }}</p>
                            <p class="text-sm text-gray-500">{{ order.delivery_address ? order.delivery_address.state : ''
                            }}</p>
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-black">Payment information</p>
                            <div class="flex flex-row">
                                <img :src="order.payment_method.photo" class="w-8" alt="">
                                <div>
                                    <p class="text-sm text-gray-500">{{ order.payment_method.name }}</p>
                                    <p class="text-sm text-gray-500">{{ order.payment_method.slug }}</p>
                                </div>
                            </div>

                        </div>
                        <div class="mt-2 md:w-96">
                            <div class="flex justify-between my-2">
                                <p class="text-sm">Tip</p>
                                <p class="text-sm font-medium">{{ currency }}{{ order.tip }}</p>
                            </div>
                            <hr>
                            <div class="flex justify-between my-2">
                                <p class="text-sm">Subtotal</p>
                                <p class="text-sm font-medium">{{ currency }}{{ order.sub_total }}</p>
                            </div>
                            <hr>
                            <div class="flex justify-between my-2">
                                <p class="text-sm">Shipping</p>
                                <p class="text-sm font-medium">{{ currency }}{{ order.delivery_fee }}</p>
                            </div>
                            <hr>
                            <div class="flex justify-between my-2">
                                <p class="text-sm">Tax</p>
                                <p class="text-sm font-medium">{{ currency }}{{ order.tax }}</p>
                            </div>
                            <hr>
                            <div class="flex justify-between my-2">
                                <p class="text-sm">Order Total</p>
                                <p class="text-sm font-medium text-blue-600">{{ currency }}{{ order.total }}</p>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'OrderDetails',
    components: {

    },
    data() {
        return {
            order: null,
            AuthStr: "Bearer " + localStorage.getItem("authToken"),
            currency: null,
            pageNo: 1,
            page: 1,
            perPage: 20,
            pagination: null,
            base_url: this.$store.state.baseUrl,
            settings: null,
            isLoggedIn: false,
            width: 0
        };
    },

    mounted() {
        this.$store.commit('loading', true)
        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }

        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })

        axios.get(this.base_url + 'api/orders/' + this.$route.params.id, {
            'headers': { 'Authorization': this.AuthStr }
        })
            .then((response) => {
                this.order = response.data
                console.log(this.order)
                this.$store.commit('loading', false)

            })
            .catch(error => console.log(error))

        // console.log(this.width)
    },

    computed: {
        // width() {
        // let width
        // this.order.statuses.forEach((item) => {
        //     width = 25
        //     let data = item
        //     data
        // })
        // return this.settings
        // }
    },

    methods: {


        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
        },

        sanitizeTitle(title) {
            var slug = "";
            // Change to lower case
            var titleLower = title.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
            // Letter "d"
            slug = slug.replace(/đ/gi, "d");
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, "");
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, "-");

            return slug;
        },
    },
}
</script>