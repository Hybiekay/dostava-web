<template>
    <div class="w-full p-2" v-show="payment">
        <div class="w-full ">
            <!-- payment summary -->
            <div class="flex flex-col" v-if="summaryP">
                <div class="flex justify-between text-xs font-light text-black">
                    <p> {{ $t('parcel.distance') }}</p>
                    <p>{{ summaryP.distance ?? summaryP.distance.toFixed(2) }}km</p>
                </div>
                <div class="flex justify-between text-xs font-light text-black">
                    <p>{{ $t('parcel.deliveryCharges') }}</p>
                    <p>{{ currency }}{{ summaryP.delivery_fee ?? summaryP.delivery_fee.toFixed(2) }}</p>
                </div>
                <div class="flex justify-between text-xs font-light text-black">
                    <p>{{ $t('parcel.packageSizeCharges') }}</p>
                    <p>{{ currency }}{{ summaryP.package_type_fee ?? summaryP.package_type_fee.toFixed(2) }}</p>
                </div>
                <div class="py-2 font-bold divide-y-2 divide-gray-500 divide-dashed">
                    <div></div>
                    <div></div>
                </div>
                <div class="flex justify-between text-xs font-light text-black">
                    <p>{{ $t('cart.subtotal') }}</p>
                    <p>{{ currency }}{{ summaryP.sub_total ?? summaryP.sub_total.toFixed(2) }}</p>
                </div>
                <div class="flex justify-between text-xs font-light text-black">
                    <p>{{ $t('checkout.tax') }}</p>
                    <p>{{ currency }}{{ summaryP.tax_rate ?? summaryP.tax_rate.toFixed(2) }}</p>
                </div>
                <div class="py-2 font-bold divide-y-2 divide-gray-500 divide-dashed">
                    <div></div>
                    <div></div>
                </div>
                <div class="flex justify-between text-xs font-light text-black">
                    <p>{{ $t('cart.total') }}</p>
                    <p>{{ currency }}{{ summaryP.total ?? summaryP.total.toFixed(2) }}</p>
                </div>
            </div>
            <div class="mt-5">
                <p class="text-xl">{{ $t('parcel.toPay') }}</p>
                <div class="grid gap-2 md:grid-cols-2">
                    <div class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-60 rounded-xl">
                        <div class="flex justify-between">

                            <div class="self-center px-2">
                                <div class="self-center text-xs text-gray-600 md:text-sm">
                                    {{ $t('parcel.sender') }}
                                </div>
                            </div>
                            <label class="self-center md:items-start md:justify-start md:flex">
                                <div
                                    class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                    <input v-model="payer" type="radio" value="1"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="self-center p-3 mt-5 bg-white border shadow-md hover:border-green-500 md:w-60 rounded-xl">
                        <div class="flex justify-between">

                            <div class="self-center px-2">
                                <div class="self-center text-xs text-gray-600 md:text-sm">
                                    {{ $t('parcel.receiver') }}
                                </div>
                            </div>
                            <label class="self-center md:items-start md:justify-start md:flex">
                                <div
                                    class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500">
                                    <input v-model="payer" type="radio" value="0"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- payment method -->
            <div class="grid grid-cols-2 gap-3 mt-5">
                <ul class="" v-for="(method, index) in methodsP" :key="index">
                    <li>
                        <input type="radio" :id="method[0] + '-' + index" v-model="paymentMethod" :value="method"
                            class="hidden peer" />
                        <label :for="method[0] + '-' + index"
                            class="inline-flex items-center justify-between w-full p-2 text-black bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div class="block">
                                <div class="w-full font-medium">{{ method.name }}</div>
                                <div class="w-full text-xs font-light">
                                    {{ method.name }} {{ $t('paymentMethods') }}
                                </div>
                            </div>
                            <img class="self-center object-cover w-8 h-8" v-if="method" :src="method.photo"
                                alt="Payment method" />
                        </label>
                    </li>
                </ul>

            </div>
            <div class="flex flex-col items-center justify-center mt-5">
                <button type="button" @click="makePayment(summaryP)"
                    class="flex items-center justify-center w-full h-10 p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer">
                    {{ $t('parcel.pay') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
export default {
    name: 'PaymentComponent',

    props: {
        showPayment: Boolean,
        summaryP: Object,
        methodsP: Object,
        recipients: Array,
        courier: Object,
        selectedPackge: Object,
        length: Number,
        weight: Number,
        width: Number,
        height: Number,
        deliveryZtops: Object
    },
    data() {
        return {
            payment: this.showPayment,
            paymentMethod: null,
            currency: null,
            settings: null,
            recipient: this.recipients,
            selectedCourier: this.courier,
            // summary: summaryP,
            selectedPackage: this.selectedPackge,
            slength: this.length,
            sweight: this.weight,
            swidth: this.width,
            sheight: this.height,
            payer: null,
            deliveryStops: this.deliveryZtops,
            AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
            base_url: this.$store.state.baseUrl,
        }
    },
    mounted() {
        this.payment = true
        this.$store.dispatch("fetchSettings", this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency;
        });
    },

    methods: {
        makePayment(summary) {
            // console.log("Hewre",summary)
            let mDeliveryZtops = [];
            this.deliveryStops.forEach((deliveryZtop, index) => {
                mDeliveryZtops.push({
                    "id": deliveryZtop.id,
                    "name": this.recipient[index].name,
                    "phone": this.recipient[index].phone,
                    "note": this.recipient[index].note,
                });
            });
            // let vendor = JSON.parse(localStorage.getItem("courier"))
            if (this.paymentMethod == null) {
                notify({
                    type: "error",
                    title: "Order Checkout",
                    text: 'select a payment method',
                })
            } else {
                // if (this.user)
                this.$store.commit("loading", true);
                // let total_price = summary.total
                axios.post(this.base_url + 'api/orders',
                    {
                        total: summary.total,
                        sub_total: summary.sub_total,
                        tax: summary.tax,
                        note: this.note,
                        discount: summary.discount ? summary.discount : 0,
                        vendor_id: this.selectedCourier.id,
                        payment_method_id: this.paymentMethod.id,
                        delivery_fee: summary.delivery_fee,
                        type: "package",
                        package_type_id: this.selectedPackage.id,
                        weight: this.sweight,
                        width: this.swidth,
                        length: this.slength,
                        height: this.sheight,
                        payer: this.payer,
                        stops: mDeliveryZtops,
                    },
                    { 'headers': { 'Authorization': this.AuthStr } })
                    .then((response) => {
                        this.$store.commit("loading", false);
                        if (this.paymentMethod.is_cash == 1) {
                            Swal.fire({
                                title: 'Order Successful',
                                text: "Please pay rider" + " " + this.currency + summary.total.toFixed(2) + " " + " on delivery",
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
                    .catch((error) => {
                        notify({
                            type: "error",
                            title: "Order Checkout",
                            text: error.response.data.message,
                        });
                    })

            }
        }
    }
}
</script>
