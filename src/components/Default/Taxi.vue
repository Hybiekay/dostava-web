<template>
    <div class="container max-w-5xl px-2 mx-auto mt-5 md:flex md:flex-row md:space-x-10" v-show="isLoggedIn">
        <div class="p-4 shadow-md md:w-4/6 bg-gray-50">
            <h6 class="text-2xl font-medium">New Taxi Order</h6>
            <div class="md:w-full">
                <label for="" class="py-2 text-sm font-light text-gray-500">{{ $t('paymentMethods') }}</label>
                <select id="to" v-model="paymentMethod"
                    class="bg-gray-50 h-12 mb-3 border border-gray-300 text-gray-500 text-sm rounded-lg  block w-full p-2.5 ">
                    <option selected>Select payment methods</option>
                    <option v-for="(method, index) in methods" :value="method" :key="index">
                        {{ method.name }}
                    </option>
                </select>
            </div>
            <div class="md:w-full">
                <label for="" class="py-2 text-sm font-light text-gray-500">{{ $t('parcel.pickupLocation') }}</label>
                <GMapAutocomplete placeholder="search address, places" @place_changed="setPlace"
                    class="block w-full h-12 px-3 py-3 mt-1 mb-3 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm">
                </GMapAutocomplete>
            </div>
            <div class="md:w-full">
                <label for="" class="py-2 text-sm font-light text-gray-500">{{ $t('parcel.dropoffLocation') }}</label>
                <GMapAutocomplete placeholder="search address, places" @place_changed="setNewPlace"
                    class="block w-full h-12 px-3 py-3 mt-1 mb-3 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm">
                </GMapAutocomplete>
            </div>
            <div class="md:w-full">
                <label for="vehicle" class="py-2 text-sm font-light text-gray-500">{{ $t('vehicleType') }}</label>
                <select id="vehicle" v-model="vehicleType"
                    class="bg-gray-50 h-12 mb-3 border border-gray-300 text-gray-500 text-sm rounded-lg  block w-full p-2.5 ">
                    <option selected>Select vehicle type</option>
                    <option v-for="(vehicle, index) in vehicleTypes" :key="index" :value="vehicle">
                        {{ vehicle.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="p-4 shadow-md md:w-3/6 bg-gray-50">
            <h6 class="mb-1 text-2xl font-medium">Order Summary</h6>
            <hr>
            <div class="mb-2">
                <h6 class="text-sm font-light tracking-wide">Pickup Address</h6>
                <p class="font-medium tracking-wide" v-if="currentPlace">{{ currentPlace.formatted_address }}</p>
            </div>
            <div class="mb-2">
                <h6 class="text-sm font-light tracking-wide">Dropoff Address</h6>
                <p class="font-medium tracking-wide" v-if="currentNewPlace">{{ currentNewPlace.formatted_address }}</p>
            </div>
            <div class="mb-2">
                <h6 class="text-sm font-light tracking-wide">Vehicle Type</h6>
                <p class="font-medium tracking-wide" v-if="vehicleType">{{ vehicleType.name }}</p>
            </div>
            <hr>
            <div class="flex justify-between mt-1">
                <h6>Subtotal</h6>
                <h6 class="font-medium" v-if="vehicleType">{{ currency }}{{ vehicleType.total.toFixed(2) }}</h6>
                <h6 class="font-medium" v-else>{{ currency }}0.00</h6>
            </div>
            <div class="flex justify-between">
                <h6>Discount</h6>
                <h6 class="font-medium">{{ currency }}-0.00</h6>
            </div>
            <hr class="mt-1">
            <div class="flex justify-between my-2">
                <h6>Total</h6>
                <h6 class="font-medium" v-if="vehicleType">{{ currency }}{{ vehicleType.total.toFixed(2) }}</h6>
                <h6 class="font-medium" v-else>{{ currency }}0.00</h6>
            </div>
            <hr>
            <button @click="orderTaxi"
                class="flex items-center justify-center w-full h-12 p-2 mt-5 font-light text-white bg-blue-700 rounded-full cursor-pointer">
                {{ $t('OrderTaxi') }}
            </button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { notify } from "@kyvg/vue3-notification";
export default {
    name: "TaxiBooking",
    components: {

    },
    data() {
        return {
            taxi: [],
            taxiCnt: 0,
            taxiCntMax: 0,
            autocomplete: null,
            name: null,
            currentPlace: null,
            currentNewPlace: null,
            methods: null,
            base_url: this.$store.state.baseUrl,
            AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
            latitude: null,
            longitude: null,
            dlatitude: null,
            dlongitude: null,
            vehicleTypes: null,
            settings: null,
            currency: null,
            vehicleType: null,
            discount: 0,
            coupon_code: 0,
            paymentMethod: null,
            isLoggedIn: false,
        }
    },

    mounted() {
        axios
            .get(this.base_url + "api/payment/methods", {
                headers: { Authorization: this.AuthStr },
            })
            .then((response) => {
                this.methods = response.data.data
            })
            .catch((error) => console.log(error));

        this.$store.dispatch('fetchSettings', this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency
        })

        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"));
        }

        if (this.isLoggedIn == false) {
            this.$router.push("/login");
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
        }

    },

    methods: {
        setPlace(place) {
            this.currentPlace = place;
            // console.log(this.currentPlace)
            this.latitude = this.currentPlace.geometry.location.lat();
            this.longitude = this.currentPlace.geometry.location.lng();
        },

        setNewPlace(place) {
            this.currentNewPlace = place;
            this.dlatitude = this.currentNewPlace.geometry.location.lat();
            this.dlongitude = this.currentNewPlace.geometry.location.lng();
            if (this.latitude != null && this.longitude != null && this.dlatitude != null && this.dlongitude != null) {
                axios
                    .get(this.base_url + "api/vehicle/types/pricing", {
                        params: {
                            pickup: this.latitude + "," + this.longitude,
                            dropoff: this.dlatitude + "," + this.dlongitude
                        },
                        headers: {
                            Authorization: this.AuthStr
                        }
                    })
                    .then(response => {
                        this.vehicleTypes = response.data;
                        // console.log(this.vehicleTypes);
                    })
                    .catch(error => console.log(error));
            }
        },

        orderTaxi() {
            axios.post(this.base_url + 'api/taxi/book/order',
                {
                    vehicle_type_id: this.vehicleType.id,
                    payment_method_id: this.paymentMethod.id,
                    pickup: {
                        lat: this.latitude,
                        lng: this.longitude,
                        address: this.currentPlace.formatted_address,
                    },
                    dropoff: {
                        lat: this.dlatitude,
                        lng: this.dlongitude,
                        address: this.currentNewPlace.formatted_address,
                    },
                    sub_total: this.vehicleType.total,
                    discount: this.discount,
                    coupon_code: this.coupon_code,
                    total: this.vehicleType.total,
                }, {
                headers: { Authorization: this.AuthStr },
            })
                .then(response => {
                    response
                    // if (this.paymentMethod.is_cash == 1) {
                    Swal.fire({
                        title: "Order Successful",
                        text: "Order placed Successfully ",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Okay",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/profile";
                        }
                    });
                    // } 
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
    }
}
</script>