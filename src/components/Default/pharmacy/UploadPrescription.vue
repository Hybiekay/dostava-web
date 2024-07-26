<template>
    <div class="checkout" v-show="isLoggedIn">
        <section class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="methods">
            <div class="flex flex-col">
                <div class="grid gap-4 md:grid-cols-2" v-if="settings">
                    <div>

                        <div class="p-2 overflow-hidden overflow-y-scroll border-4 border-dashed border-light-gray-300 md:w-124 h-80"
                            id="journal-scroll">
                            <div class="flex items-center justify-center">
                                <input type="file" accept="image/*" multiple="multiple" @change="previewMultiImage"
                                    id="my-file" hidden />
                                <label class="p-2 text-sm text-white rounded-full cursor-pointer"
                                    :style="{ 'background-color': settings.colors.primaryColor }" for="my-file">Choose
                                    file</label>
                            </div>
                            <template v-if="preview_list.length">
                                <div class="grid gap-4 md:grid-cols-2">
                                    <div v-for="item, index in preview_list" :key="index">
                                        <img :src="item" class="h-52 md:w-52" />
                                    </div>
                                </div>

                            </template>
                        </div>
                        <textarea id="note" name="note" placeholder="note" v-model="note" rows="3"
                            class="block w-full p-3 mt-5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="">
                        <div class="">
                            <h1 class="mt-5 font-medium md:mt-0">Delivery address</h1>
                            <div class="flex justify-between space-x-5">
                                <p class="text-xs font-light text-gray-500">
                                    Select you delivery option
                                </p>
                                <button class="text-xs text-green-500 md:text-sm hover:underline" v-on:click="toggleModal()"
                                    type="button">
                                    Add address
                                </button>
                                <!-- <a href="/profile" class="text-xs text-green-500 md:text-sm hover:underline">Add address</a> -->
                            </div>
                            <div class="flex justify-between mt-2">
                                <button
                                    class="flex items-center justify-center w-32 h-12 p-1 text-xs text-white rounded shadow-sm"
                                    :style="{ 'background-color': settings.colors.primaryColor }" @click="vendorPickup">
                                    Pickup order
                                    <img src="/img/icons/check.svg" v-show="showIcon == false" class="w-4 h-4" alt="">

                                </button>
                                <select v-show="showAddress" id="address" name="address" @change="GetDeliveryFee"
                                    v-model="address"
                                    class="block w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option :value="null">Select a delivery address</option>
                                    <option v-for="address in addresses" :value="address" v-bind:key="address.id">
                                        {{ address.name }} [{{ address.address }}]
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-col mt-10">
                            <p class="mt-5 mb-2 font-medium">Payment methods</p>
                            <div class="grid grid-cols-2 gap-3">
                                <!-- <div class="self-center p-1" v-for="(method, index) in methods" :key="index"> -->
                                <ul class="" v-for="(method, index) in methods" :key="index">
                                    <li>
                                        <input type="radio" :id="method[0] + '-' + index" v-model="paymentMethod"
                                            :value="method" class="hidden peer" />
                                        <label :for="method[0] + '-' + index"
                                            class="inline-flex items-center justify-between w-full p-2 text-black bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <div class="block">
                                                <div class="w-full text-xs font-medium md:text-base">{{ method.name }}</div>
                                                <div class="w-full text-xs font-light">
                                                    {{ method.name }} payment method
                                                </div>
                                            </div>
                                            <img class="self-center object-cover w-8 h-8" v-if="method" :src="method.photo"
                                                alt="Payment method" />
                                        </label>
                                    </li>
                                </ul>

                            </div>
                        </div>
                        <div v-if="settings" @click="checkoutOrder"
                            class="flex items-center justify-center w-full h-12 p-2 mt-3 font-light text-white bg-blue-800 rounded-full cursor-pointer"
                            :style="{ 'background-color': settings.colors.primaryColor }">
                            <!-- <CreditCardIcon class="w-6 h-6 text-white" aria-hidden="true" /> -->
                            <span>Order</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
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

                        <button type="button" @click="addressSave"
                            class="flex items-center justify-center w-full p-2 mt-5 font-light text-white bg-blue-800 rounded-full cursor-pointer h-14">
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
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    name: "UploadPrescription",
    data() {
        return {
            showIcon: true,
            showPay: false,
            isLoggedIn: false,
            user: null,
            note: null,
            showModal: false,
            showAddress: true,
            addresses: null,
            methods: null,
            vendor_pickup: false,
            AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
            paymentMethod: null,
            address: null,
            settings: null,
            base_url: this.$store.state.baseUrl,
            preview: null,
            image: null,
            preview_list: [],
            image_list: [],
            vendor: null,
            delivery_fee: 0,
            discount: 0,
            delivery_amount: 0,
            stax: 0,
            taxAmt: 0,
        }
    },

    mounted() {

        this.$store.dispatch("fetchSettings", this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency;
        });

        axios.get(this.base_url + 'api/payment/methods', {
            'headers': { 'Authorization': this.AuthStr }
        })
            .then(response => (this.methods = response.data.data))
            .catch(error => console.log(error))

        axios.get(this.base_url + 'api/delivery/addresses',
            { 'headers': { 'Authorization': this.AuthStr } }
        )
            .then(response => (this.addresses = response.data.data))
            .catch(error => console.log(error))


        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }

        if (this.isLoggedIn == false) {
            this.$router.push("/login");
            localStorage.removeItem("user")
            localStorage.removeItem("authToken")
        }
        
        axios.get(this.base_url + 'api/vendors/' + this.$route.params.id)
            .then((response) => {
                this.vendor = response.data
            })
            .catch(error => console.log(error))
    },
    methods: {

        toggleModal: function () {
            this.showModal = !this.showModal;
        },

        vendorPickup() {
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

        calcCrow() {
            let vendor = this.vendor
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
            let vendor = this.vendor
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
                    text: 'address field is empty',
                })
            } else if (this.paymentMethod == null) {
                notify({
                    type: "error",
                    title: "Order Checkout",
                    text: 'select a payment method',
                })
            } else {
                let address_id = this.address ? this.address.id : '';
                let payment = this.paymentMethod;
                let total = this.delivery_fee + Number(this.vendor.tax);
                let sub_total = this.delivery_fee
                axios.post(this.base_url + 'api/orders',
                    {
                        sub_total: sub_total,
                        tax: this.vendor.tax,
                        total: total,
                        note: this.note,
                        products: [],
                        discount: 0,
                        vendor_id: this.vendor.id,
                        delivery_address_id: address_id,
                        payment_method_id: payment.id,
                        delivery_fee: this.delivery_fee,
                        // note: this.note,
                        photo: this.image_list
                    },
                    { 'headers': { 'Authorization': this.AuthStr } }
                )
                    .then(function (response) {
                        localStorage.removeItem('cart');
                        if (payment.is_cash == 1) {
                            Swal.fire({
                                title: 'Order Successful',
                                text: "Please pay rider" + " " + total + " " + " on delivery",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Okay'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = '/'
                                }
                            })
                        } else {
                            notify({
                                type: "success",
                                title: "Order Checkout",
                                text: response.data.message,
                            });
                            window.location.href = response.data.link
                        }
                    })
                    .catch(error => console.log(error))

            }
        },

        previewImage: function (event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image = input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },

        previewMultiImage: function (event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while (count--) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.preview_list.push(e.target.result);
                    }
                    this.image_list.push(input.files[index]);
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
        },
        reset: function () {
            this.image = null;
            this.preview = null;
            this.image_list = [];
            this.preview_list = [];
        }
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