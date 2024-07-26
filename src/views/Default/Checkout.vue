<template>
  <div class="container max-w-6xl p-8 mx-auto" v-show="isLoggedIn">
    <Breadcrumb :thirdCrumb="`Checkout`" />

    <div class="mt-8 md:flex md:justify-between" v-if="settings">
      <div class="md:w-6/12" v-if="products">
      
        <div class="mt-10">
          <h1 class="mt-4 font-medium">{{ $t('deliveryAddress') }}</h1>
          <div class="flex justify-between space-x-5">
            <p class="text-xs font-light text-gray-500">
              {{ $t('selectAddress') }}
            </p>
            <button class="text-xs text-green-500 md:text-sm hover:underline" v-on:click="toggleModal()" type="button">
              {{ $t('addAddress') }}
            </button>
            <!-- <a href="/profile" class="text-xs text-green-500 md:text-sm hover:underline">Add address</a> -->
          </div>
          <div class="flex justify-between mt-2">
            <button :style="{ 'background-color': settings.colors.primaryColorDark }"
              class="flex items-center justify-center w-32 h-12 p-1 text-xs text-white rounded shadow-sm"
              @click="vendorPickup">
              {{ $t('pickupOrder') }}
              <img src="/img/icons/check.svg" v-show="showIcon == false" class="w-4 h-4" alt="">

            </button>
            <select v-show="showAddress" id="address" name="address" @change="GetDeliveryFee" v-model="address"
              class="block w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option :value="null"> {{ $t('selectAddress') }}</option>
              <option v-for="address in addresses" :value="address" v-bind:key="address.id">
                {{ address.name }} [{{ address.address }}]
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col mt-10">
          <span  v-for="product in products" :key="product.id">
            <div class="p-3 bg-green-100 rounded-t-md">
            <p class="mb-2 text-sm text-gray-700 ">
            {{ product.vendor.name }}
          </p>
          <div class="flex ">
           
           <img src="/img/icons/address.png" class="w-4 h-4 mr-2" alt="" />
           <p class="text-sm font-light text-gray-700">
             {{ product.vendor.address }}
           </p>
         </div>
          </div>
          
          <hr />
          <div class="flex p-3 bg-green-100 rounded-b-md" v-if="product.vendor.delivery_time">
            <img src="/img/icons/clock2.png" class="w-4 h-4 mr-2" alt="" />
            <p class="text-sm font-light text-gray-700">
              {{ $t('orderReady') }}
              <span class="font-medium">{{ product.vendor.delivery_time }}min</span>
            </p>
            <hr class="underline" />
          </div>
          </span>
         
          <p class="mt-5 mb-2 font-medium">{{ $t('paymentMethods') }}</p>
          <div class="grid grid-cols-2 gap-3">
            <!-- <div class="self-center p-1" v-for="(method, index) in methods" :key="index"> -->
            <ul class="" v-for="(method, index) in methods" :key="index">
              <li>
                <input type="radio" :id="method[0] + '-' + index" v-model="paymentMethod" :value="method"
                  class="hidden peer" />
                <label :for="method[0] + '-' + index"
                  class="inline-flex items-center justify-between w-full p-2 text-black bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="block">
                    <div class="w-full text-xs font-medium md:text-base">{{ method.name }}</div>
                    <div class="w-full text-xs font-light">
                      {{ method.name }} {{ $t('paymentMethods') }}
                    </div>
                  </div>
                  <img class="self-center object-cover w-8 h-8" v-if="method" :src="method.photo" alt="Payment method" />
                </label>
              </li>
            </ul>

          </div>
        </div>
      </div>
      <div class="mt-5 md:w-4/12 md:mt-0">
        <!-- <div class="p-3 bg-gray-800 rounded-lg">
          <div class="flex justify-between">
            <p class="text-sm font-light text-white">{{ $t('cart.discount') }}</p>
          </div>
          <div class="flex items-center justify-between w-full p-1 mt-4 bg-white rounded-lg ">
            <input class="w-full p-2 border-none rounded-lg placeholder:font-light placeholder:text-sm" v-model="discount"
              type="text" placeholder="Enter discount code" />
            <div class="flex items-center p-2 bg-gray-200 rounded-lg cursor-pointer ">
              <img src="/img/icons/chevron_right.svg" class="w-6" alt="" />
            </div>
          </div>
        </div> -->
        <div class="flex flex-col justify-start mb-5 tems-start">
          <input type="number" placeholder="Tip driver" v-model="tip"
            class="block w-full h-12 px-2 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <textarea id="note" name="note" placeholder="Note" v-model="note" rows="3"
            class="block w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="flex flex-col" v-for="product in products" :key="product.id">
          <div class="flex justify-between" v-if="product.selectedOption">
            <p class="text-xs font-light text-gray-500">
              {{ product.selectedOption ? truncate(product.selectedOption.name, 70) : '' }}
            </p>
            <p class="text-xs font-light text-gray-500">
              {{ currency }}{{ product.selectedOption ? product.selectedOption.price.toFixed(2) : '' }}
            </p>
          </div>
          <div class="flex justify-between" v-for="option in product.selectedOptions" :key="option.id">
            <p class="text-xs font-light text-gray-500">
              {{ option ? truncate(option.name, 70) : '' }}
            </p>
            <p class="text-xs font-light text-gray-500" v-if="option">
              {{ currency }}{{ option ? option.price.toFixed(2) : '' }}
            </p>
          </div>
          <div class="flex justify-between mt-2">
            <p class="text-xs font-light text-gray-500">
              {{ truncate(product.name, 70) }}
            </p>
            <p class="text-xs font-light text-gray-500">
              {{ currency }}{{ product.totalPrice.toFixed(2) }}
            </p>
          </div>
        </div>
        <div class="flex justify-between mt-1">
          <p class="font-light text-gray-500">{{ $t('checkout.deliveryFee') }}</p>
          <p class="font-bold text-gray-500">
            {{ currency
            }}{{ delivery_amount ? delivery_amount.toFixed(2) : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1">
          <p class="font-light text-gray-500">{{ $t('cart.coupon') }}</p>
          <p class="font-bold text-gray-500">
            {{ currency }}{{ tax ? tax : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1">
          <p class="font-light text-gray-500">{{ $t('checkout.tax') }}</p>
          <p class="font-bold text-gray-500">
            {{ currency }}{{ tax ? tax : "0.00" }}
          </p>
        </div>
        <div class="flex justify-between mt-1" v-if="tip != null">
          <p class="font-light text-gray-500">{{ $t('checkout.driverTip') }}</p>
          <p class="font-bold text-gray-500">{{ currency }}{{ tip }}</p>
        </div>
        <div class="flex justify-between my-1">
          <p class="font-light text-gray-500">{{ $t('cart.total') }}:</p>
          <p class="font-bold text-gray-500">
            {{ currency }}{{ newTotal ? newTotal.toFixed(2) : "0.00" }}
          </p>
        </div>
        <router-link :style="{ 'background-color': settings.colors.primaryColor }" @click="checkoutOrder" to="/checkout"
          class="flex items-center justify-center w-full p-2 font-light text-white rounded-full cursor-pointer h-14">
          {{ $t('checkout.proceedToChceckout') }}
        </router-link>
        <p class="mt-5 text-xs text-center text-gray-500">
          {{ $t('checkout.acceptedPayment') }}
        </p>
        <div class="flex flex-row justify-center space-x-2">
          <div class="p-1 border border-gray-100 rounded-lg" v-for="method in methods" :key="method.id">
            <img :src="method.photo" class="w-4 h-4" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- <Recommended class="mt-10" /> -->
  </div>
  <div v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    <div class="relative h-full p-2 md:p-4 md:w-5/12 md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <button type="button" class="
                          absolute
                          top-3
                          right-2.5
                          text-gray-400
                          bg-transparent
                          hover:bg-gray-200 hover:text-gray-900
                          rounded-lg
                          text-sm
                          p-1.5
                          ml-auto
                          inline-flex
                          items-center
                        " v-on:click="toggleModal()" data-modal-toggle="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">Add Address</h3>
          <form class="space-y-6" action="#">
            <div>
              <label for="name" class="text-sm font-light text-gray-500 x-5">Name your address</label>
              <input type="text" id="name"
                class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                v-model="name" placeholder="Home" required />
            </div>
            <div>
              <label for="" class="text-sm font-light text-gray-500 x-5">Search your address</label>
              <GMapAutocomplete placeholder="search your location" @place_changed="setPlace"
                class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm">
              </GMapAutocomplete>
            </div>

            <button :style="{ 'background-color': settings.colors.primaryColor }" type="button" @click="addressSave"
              class="flex items-center justify-center w-full p-2 mt-5 font-light text-white rounded-full cursor-pointer h-14">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
</template>
<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
// import "sweetalert2/src/sweetalert2.scss";
// import Recommended from '@/components/Default/Product/ProductsFromVendor.vue'
export default {
  name: "DefaultCart",
  components: {
    Breadcrumb
  },
  data() {
    return {
      showIcon: true,
      showPay: false,
      autocomplete: null,
      name: null,
      currentPlace: null,
      showModal: false,
      isLoggedIn: false,
      user: null,
      tip: null,
      note: null,
      products: null,
      addresses: null,
      currency: null,
      methods: null,
      tax: 0,
      taxAmt: 0,
      discount: null,
      vendor_pickup: null,
      delivery_amount: 0,
      showAddress: true,
      delivery_fee: 0,
      AuthStr: "Bearer " + localStorage.getItem("authToken"),
      paymentMethod: null,
      address: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      subtotal: 0,
      vat: 0,
      service_fee: 0,
      newTotal: 0,
    };
  },
  mounted() {
    this.$store.commit('loading', true)
    axios
      .get(this.base_url + "api/payment/methods", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.methods = response.data.data.slice(0, 10);
        this.$store.commit('loading', false)
        // console.log(this.methods)
      })
      .catch((error) => console.log(error));

    axios
      .get(this.base_url + "api/delivery/addresses", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => (this.addresses = response.data.data))
      .catch((error) => console.log(error));

    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    }

    if (this.isLoggedIn == false) {
      this.$router.push("/login");
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }

    this.$store.dispatch("fetchSettings", this.items).then(() => {
      this.settings = this.$store.state.settings;
      this.currency = this.settings.strings.currency;
    });

    if (localStorage.getItem("cart")) {
      this.products = JSON.parse(localStorage.getItem("cart"));
    }

    for (let product of this.products) {
      this.newTotal += Number(product.totalPrice)
      // if(this.product.vat != null || this.service_fee != null){
      //   this.vat = this.product.vat
      //   this.service_fee = this.product.service_fee
      //   this.newTotal += Number(product.totalPrice) + Number(this.product.vat) + Number(this.service_fee);
      // }

      let taxAmt = (Number(this.newTotal) * Number(product.vendor.tax)) / 100;
      this.tax = parseFloat(taxAmt).toFixed(2);
      if (product.selectedOptions) {
        product.selectedOptions.forEach((item) => {
          this.newTotal += Number(item.price);
        });
      }
      if (product.selectedOption) {
        this.newTotal += Number(product.selectedOption.price);
      }
    }

    // console.log(this.getTotal)
  },

  watch: {
    delivery_amount(newAmount) {
      // newAmount = this.delivery_amount
      // Update the total whenever the amount changes
      this.newTotal = this.newTotal + newAmount;
      // console.log(totalt)
      // this.total = newAmount * 1.05;
    }

  },

  methods: {

    getnewTotal() {
      if (this.product) {
        for (let product of this.products) {
          let vat = this.product.vat
          let service_fee = this.product.service_fee
          this.newTotal += Number(product.totalPrice) + Number(vat) + Number(service_fee);
          let taxAmt = (Number(this.newTotal) * Number(product.vendor.tax)) / 100;
          this.tax = parseFloat(taxAmt).toFixed(2);
          if (product.selectedOptions) {
            product.selectedOptions.forEach((item) => {
              this.newTotal += Number(item.price);
            });
          }
          if (product.selectedOption) {
            this.newTotal += Number(product.selectedOption.price);
          }
          return this.newTotal
        }
      }

    },

    vendorPickup() {
      this.vendor_pickup = 0
      
      this.delivery_amount = 0.0;
      if (this.showAddress == true) {
        this.showAddress = false
        this.showIcon = false
      } else {
        this.showAddress = true
        this.showIcon = true
      }
    },

    addressSave() {
      let location = this.currentPlace.geometry.location;
      let long = location.lng();
      let lat = location.lat();
      let address = this.currentPlace.name;
      axios
        .post(
          this.base_url + "api/delivery/addresses",
          {
            name: this.name,
            is_default: this.is_default,
            longitude: long,
            latitude: lat,
            address: address,
          },

          {
            headers: { Authorization: this.AuthStr },
          }
        )
        .then(function (response) {
          this.message = response.data.message;
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    setPlace(place) {
      this.currentPlace = place;
    },

    toggleModal: function () {
      this.showModal = !this.showModal;
    },
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },

    calcCrow() {
      let cart = this.$store.state.cart[0];
      let vendor = cart.vendor;
      let lat1 = this.toRad(vendor.latitude);
      let lon1 = this.toRad(vendor.longitude);
      let lat2;
      let lon2;
      if (this.address != null) {
        lat2 = this.toRad(this.address.latitude);
        lon2 = this.toRad(this.address.longitude);
      }

      var R = 6371; // km
      var dLat = this.toRad(lat2 - lat1);
      var dLon = this.toRad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      // console.log(d.toFixed(2))
      return d.toFixed(2);
    },

    toRad(Value) {
      return (Value * Math.PI) / 180;
    },

    GetDeliveryFee() {
      let cart = this.$store.state.cart[0];
      let vendor = cart.vendor;
      let address_id;
      if (this.address != null) {
        address_id = this.address.id;
      }

      this.$store.commit("loading", true);
      axios
        .get(this.base_url + "api/general/order/summary", {
          params: {
            delivery_address_id: address_id,
            vendor_id: vendor.id,
          },
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.$store.commit("loading", false);
          let fee = response.data;
          this.delivery_fee = fee.delivery_fee;

          if (vendor.delivery_range < this.calcCrow()) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Delivery address out of reach for vendor!",
            });
          } else {
            this.delivery_amount = this.delivery_fee;
          }
        });
    },

  
    checkoutOrder() {
      if (this.vendor_pickup == null && this.address == null) {
        notify({
          type: "error",
          title: "Order Checkout",
          text: "address field is empty",
        });
      } else if (this.paymentMethod == null) {
        notify({
          type: "error",
          title: "Order Checkout",
          text: "select a payment method",
        });
      } else {

        let totalAmount = this.newTotal + this.delivery_amount;
        let mProduct = []
        let vVendor_id, vFees, vTax, vDiscount;
        this.products.forEach((product) => {
          vVendor_id = product.vendor.id,
            vTax = product.vendor.tax,
            vDiscount = product.discount_price,
            vFees = [
              {
                id: product.vendor.fee ? product.vendor.fee.id : '',
                name: product.vendor.fee ? product.vendor.fee.name : '',
                amount: product.vendor.fee ? product.vendor.fee.amount : ''
              }
            ];
          mProduct.push({
            selected_qty: product.quantity,
            price: product.price,
            product: {
              id: product.id,
              name: product.name,
            },
            options: [
              {
                id:   product.selectedOption ? product.selectedOption.id : "",
                name:  product.selectedOption ? product.selectedOption.name : "",
                price:  product.selectedOption ? product.selectedOption.price : "",
              },
              {
                id:  product.selectedOptions ? product.selectedOptions.id : "",
                name:  product.selectedOptions ? product.selectedOptions.name : "",
                price:  product.selectedOptions ? product.selectedOptions.price : "",
              },
            ],
            options_ids:[
              product.selectedOption ? product.selectedOption.id : "",
              product.selectedOptions ? product.selectedOptions.id : ""
            ],
            options_flatten: "",
            id: product.id,
          });
        });
        // console.log(mProduct)
        axios
          .post(
            this.base_url + "api/orders",
            {
              vendor_id: vVendor_id,
              fees: vFees,
              sub_total: this.newTotal,
              tax: vTax,
              discount: vDiscount ?? 0,
              delivery_address_id: this.address ? this.address.id : "",
              payment_method_id: this.paymentMethod.id,
              delivery_fee: this.delivery_fee,
              total: totalAmount,
              note: this.note,
              tip: this.tip,
              products: mProduct,
            },
            {
              headers: { Authorization: this.AuthStr },
            }
          )
          .then((response) => {
            localStorage.removeItem("cart");
            if (this.paymentMethod.is_cash == 1) {
              Swal.fire({
                title: "Order Successful",
                text:
                  "Please pay rider" +
                  " " +
                  this.currency +
                  totalAmount +
                  " " +
                  " on delivery",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/profile";
                }
              });
            } else {
              notify({
                type: "success",
                title: "Order Checkout",
                text: response.data.message,
              });
              window.location.href = response.data.link;
            }
          })
          .catch((error) => {
            if (error.response) {
              notify({
                type: 'error',
                title: 'Checkout',
                text: error.response.data.message,
                duration: 3000
              })
            }
          });
      }
    },
  },
};
</script>
