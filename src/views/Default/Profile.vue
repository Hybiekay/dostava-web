<template>
  <div class="container p-8 mx-auto font-sans antialiased max-w-7xl" v-show="isLoggedIn">
    <div v-if="orders">
    <Breadcrumb :thirdCrumb="`My Orders`" />
    <div class="flex flex-col md:flex-row">
     
      <div class="flex md:flex-col md:w-3/12 md:space-y-3">
        <button @click="showOrders"
          :class="[sOrders ? 'flex flex-row items-center justify-center h-10 p-2 bg-gray-100 rounded-full w-36' : 'h-10 w-36 flex flex-row justify-center items-center']">
          <img src="/img/icons/receipt_long.png" class="w-4 h-4 mr-2" alt="">
          <p class="text-xs font-light">{{ $t('orders.header') }}</p>
        </button>
        <button @click="showAccount"
          :class="[sAccount ? 'flex flex-row items-center justify-center h-10 p-2 bg-gray-100 rounded-full w-36' : 'h-10 w-36 flex flex-row justify-center items-center']">
          <img src="/img/icons/person.png" class="w-4 h-4 mr-2" alt="">
          <p class="text-xs font-light">{{ $t('orders.accountSettings') }}</p>
        </button>
        <button @click="showAddress"
          :class="[sAddress ? 'flex flex-row items-center justify-center h-10 p-2 bg-gray-100 rounded-full w-36' : 'h-10 w-36 flex flex-row justify-center items-center']">
          <img src="/img/icons/local_shipping.png" class="w-5 h-4 mr-2" alt="">
          <p class="text-xs font-light">{{ $t('profile.address') }}</p>
        </button>
      </div>
      <div class="w-9/12 " v-if="sOrders">
        <p class="mt-5 mb-5 text-sm font-medium md:mt-0">{{ $t('orders.header') }}</p>
        <span v-if="orders">
          <div v-if="orders.length > 0">
            <div class="max-w-full" v-for="order in orders" :key="order.id">
              <div v-if="order.products.length != 0">
                <router-link :to="{ name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(order.code) } }"
                  class="flex justify-between space-x-5 text-sm text-gray-600" v-for="item in order.products"
                  :key="item.id">
                  <div class="">
                    <img :src="item.product.photo" class="w-16 md:w-28 rounded-xl" alt="">
                    <div class="flex flex-col md:hidden">
                      <p class="w-32 text-sm">{{ truncate(item.product.name, 40) }}</p>
                      <p class="text-sm font-light">{{ order.products.length }} Product(s)</p>
                    </div>
                  </div>

                  <div class="flex-col hidden md:flex">
                    <p class="w-32 text-sm">{{ truncate(item.product.name, 40) }}</p>
                    <p class="text-sm font-light">{{ order.products.length }} Product(s)</p>
                  </div>

                  <div class="">
                    <p class="text-sm w-36">{{ order.vendor.name }}</p>
                    <p class="text-sm w-36">Order code: {{ order.code }}</p>
                    <p class="flex items-center justify-center w-16 h-4 p-1 text-xs bg-green-200 rounded-md md:hidden">
                      {{ order.status }}
                    </p>
                  </div>

                  <div>
                    <p class="items-center justify-center hidden h-6 p-1 text-xs bg-green-200 rounded-md md:flex">
                      {{ order.status }}
                    </p>
                    <p class="flex text-xs text-center md:text-sm">{{ currency }}{{ item.price }}</p>
                  </div>

                </router-link>
                <hr class="my-2">
              </div>

              <div class="" v-else-if="order.type == 'parcel'">
                <router-link :to="{ name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(order.code) } }"
                  v-if="order" class="flex justify-between space-x-5 text-sm text-gray-600">
                  <div class="">
                    <img :src="order.vendor.feature_image" class="w-16 md:w-28 rounded-xl" alt="">
                    <div class="flex flex-col md:hidden">
                      <p class="w-32 text-sm">{{ truncate(order.vendor.name, 40) }}</p>
                      <p class="w-32 text-sm" v-if="order.pickup_location == null">
                        No location
                      </p>
                      <p class="text-sm font-light">{{ order.products.length }} Product(s)</p>
                    </div>
                  </div>

                  <div class="flex-col hidden md:flex">
                    <p class="w-32 text-sm">{{ truncate(order.vendor.name, 40) }}</p>
                    <p class="text-sm font-light">{{ order.products.length }} Product(s)</p>
                  </div>

                  <div class="">
                    <!-- <p class="text-sm w-36">{{ order.vendor.name }}</p> -->
                    <p class="text-sm w-36">Order code: {{ order.code }}</p>
                    <p class="flex items-center justify-center w-16 h-4 p-1 text-xs bg-green-200 rounded-md md:hidden">
                      {{ order.status }}
                    </p>
                  </div>

                  <div>
                    <p class="items-center justify-center hidden h-6 p-1 text-xs bg-green-200 rounded-md md:flex">
                      {{ order.status }}
                    </p>
                    <p class="flex text-xs text-center md:text-sm">{{ currency }}{{ order.total.toFixed(2) }}</p>
                  </div>
                </router-link>
                <hr class="my-2">
              </div>
              <div class="" v-else-if="order.type == 'pharmacy'">
                <router-link :to="{ name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(order.code) } }"
                  v-if="order.vendor" class="flex justify-between space-x-5 text-sm text-gray-600">

                  <div class="">
                    <img :src="order.vendor.feature_image" class="w-16 md:w-28 rounded-xl" alt="">
                    <div class="flex flex-col md:hidden">
                      <p class="w-32 text-sm">{{ truncate(order.vendor.name, 40) }}</p>
                      <p class="text-sm font-light">{{ order.products.length }} Product(s)</p>
                    </div>
                  </div>

                  <div class="flex-col hidden md:flex">
                    <p class="text-sm ">{{ truncate(order.vendor.name, 40) }}</p>
                    <p class="text-sm font-light">{{ order.products.length }} Product(s)</p>
                  </div>

                  <div class="">
                    <!-- <p class="text-sm w-36">{{ order.vendor.name }}</p> -->
                    <p class="text-sm w-36">Order code: {{ order.code }}</p>
                    <p class="flex items-center justify-center w-16 h-4 p-1 text-xs bg-green-200 rounded-md md:hidden">
                      {{ order.status }}
                    </p>
                  </div>

                  <div>
                    <p class="items-center justify-center hidden h-6 p-1 text-xs bg-green-200 rounded-md md:flex">
                      {{ order.status }}
                    </p>
                    <p class="flex text-xs text-center md:text-sm">{{ currency }}{{ order.total.toFixed(2) }}</p>
                  </div>
                </router-link>
                <hr class="my-2">
              </div>
              <div class="" v-else-if="order.order_service != null">
                <router-link :to="{ name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(order.code) } }"
                  v-if="order.order_service != null" class="flex justify-between space-x-5 text-sm text-gray-600">

                  <div class="">
                    <img :src="order.order_service.service.photo" class="w-16 md:w-28 rounded-xl" alt="">
                    <div class="flex flex-col md:hidden">
                      <p class="w-32 text-sm">{{ truncate(order.order_service.service.name, 40) }}</p>
                      <p class="text-sm font-light">{{ order.order_service.service.duration }} </p>
                    </div>
                  </div>

                  <div class="flex-col hidden md:flex">
                    <p class="w-32 text-sm">{{ truncate(order.order_service.service.name, 40) }}</p>
                    <p class="text-sm font-light">{{ order.order_service.service.duration }}</p>
                  </div>

                  <div class="">
                    <p class="text-sm">{{ order.vendor.name }}</p>
                    <p class="text-sm w-36">Order code: {{ order.code }}</p>
                    <p class="flex items-center justify-center w-16 h-4 p-1 text-xs bg-green-200 rounded-md md:hidden">
                      {{ order.status }}
                    </p>
                  </div>

                  <div>
                    <p class="items-center justify-center hidden h-6 p-1 text-xs bg-green-200 rounded-md md:flex">
                      {{ order.status }}
                    </p>
                    <p class="flex text-xs text-center md:text-sm">{{ currency }}{{ order.total.toFixed(2) }}</p>
                  </div>
                </router-link>
                <hr class="my-2">
              </div>
              <div class="" v-else>
                <router-link :to="{ name: 'OrderDetails', params: { id: order.id, slug: sanitizeTitle(order.code) } }"
                  v-if="order.taxi_order" class="flex justify-between space-x-5 text-sm text-gray-600">

                  <div class="">
                    <img :src="order.taxi_order.vehicle_type.photo" class="w-16 md:w-28 rounded-xl" alt="">
                    <div class="flex flex-col md:hidden">
                      <p class="w-32 text-sm">{{ truncate(order.taxi_order.vehicle_type.name, 40) }}</p>
                      <p class="text-sm font-light">{{ order.taxi_order.pickup_address }} </p>
                    </div>
                  </div>

                  <div class="flex-col hidden md:flex">
                    <p class="w-32 text-sm">{{ truncate(order.taxi_order.vehicle_type.name, 40) }}</p>
                    <p class="text-sm font-light">{{ order.taxi_order.pickup_address }}</p>
                  </div>

                  <div class="">
                    <!-- <p class="text-sm w-36">{{ order.vendor.name }}</p> -->
                    <p class="text-sm w-36">Order code: {{ order.code }}</p>
                    <p class="flex items-center justify-center w-16 h-4 p-1 text-xs bg-green-200 rounded-md md:hidden">
                      {{ order.status }}
                    </p>
                  </div>

                  <div>
                    <p class="items-center justify-center hidden h-6 p-1 text-xs bg-green-200 rounded-md md:flex">
                      {{ order.status }}
                    </p>
                    <p class="flex text-xs text-center md:text-sm">{{ currency }}{{ order.total.toFixed(2) }}</p>
                  </div>
                </router-link>
                <hr class="my-2">
              </div>
            </div>

          </div>
          <p class="text-xs font-light text-gray-500" v-else>
            You haven't placed an order with us yet. When you do they will show up here.
          </p>
          <div v-if="pagination.current_page != pagination.last_page" class="flex items-center justify-center mt-5">
            <button @click="loadMore" class="w-40 p-2 text-sm text-center text-gray-700 bg-gray-300 rounded">Show
              more</button>
          </div> 
          <div v-if="pagination.current_page == pagination.last_page && pagination.last_page > 1" class="flex items-center justify-center mt-5">
            <button @click="loadLess" class="w-40 p-2 text-sm text-center text-gray-700 bg-gray-300 rounded">Show
              less</button>
          </div>
        </span>

        <!-- <p v-else class="text-center text-gray-500">No products</p> -->



      </div>
      <div v-if="sAccount">
        <Profile />
      </div>
      <div v-if="sAddress">
        <Address />
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Address from "@/components/Default/Address.vue";
import Profile from "@/components/Default/ProfileUpdate.vue";
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
export default {
  name: "DefaultProfile",
  components: {
    // ChevronLeftIcon,
    // ChevronRightIcon,
    // Download,
    Breadcrumb,
    Address,
    Profile
  },
  data() {
    return {
      orders: null,
      AuthStr: "Bearer " + localStorage.getItem("authToken"),
      currency: null,
      pageNo: 1,
      page: 1,
      perPage: 20,
      pagination: null,
      base_url: this.$store.state.baseUrl,
      settings: null,
      isLoggedIn: false,
      sOrders: true,
      sAccount: false,
      sAddress: false
    };
  },

  mounted() {
    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"))
    }

    this.$store.dispatch('fetchSettings').then(() => {
      this.settings = this.$store.state.settings;
      this.currency = this.settings.strings.currency
    })

    this.$store.commit("loading", true);
    axios
      .get(this.base_url + "api/orders?page=" + this.pageNo, {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.orders = response.data.data,
        console.log(this.orders)
        this.pagination = response.data
        this.$store.commit("loading", false)
      })
      .catch((error) => console.log(error));
  },

  methods: {

    showOrders() {
      this.sOrders = true;
      this.sAccount = false;
      this.sAddress = false;
    },

    showAccount() {
      this.sAccount = true;
      this.sOrders = false;
      this.sAddress = false;
    },

    showAddress() {
      this.sAccount = false;
      this.sOrders = false;
      this.sAddress = true;
    },

    completeOrder(order) {
      axios
        .post(this.base_url + "api/orders/" + order.id + "/complete", {}, {
          headers: { Authorization: this.AuthStr },
        })
        .then(() => {
          this.$store.commit("orders_updated", {
            order: this.orders.find(order => order.id == order.id),
          });
        })
        .catch((error) => console.log(error));
    },

    loadLess() {
      // this.$store.commit("loading", true)
      this.pageNo--
      axios.get(this.base_url + "api/products?page=" + this.pageNo + "&vendor_type_id=" + this.$route.params.id)
        .then((response) => {
          // this.$store.commit("loading", false);
          this.products = response.data.data.slice(0, 20);

        })

    },

    loadMore() {
      this.pageNo++
      axios.get(this.base_url + "api/orders?page=" + this.pageNo)
        .then((response) => {
          // this.$store.commit("loading", false); 
          this.orders = this.orders.concat(response.data.data);
          // this.products = response.data.data;
          // .slice(0, 20)
          // if(this.products.length === 0){
          //     console.log(response)
          // }

          // console.log(response)
          // this.resp = response.data
          // if(this.resp.to == null){
          //     this.loadShow = true
          //     // console.log(response)
          // }
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
};
</script>
