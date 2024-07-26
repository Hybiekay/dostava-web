<template>
    <div class="p-2 mt-2" v-show="summary">
        <div class="flex justify-between">
            <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md" v-if="selectedPackage">
                <img :src="selectedPackage.photo" class="w-8 h-8" alt="">
                <div>
                    <p class="text-xs font-medium text-gray-500">Food something is igo sadhewk she</p>
                    <p class="text-xs font-light text-gray-500">Description</p>
                </div>
            </div>
            <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md">
                <img src="/img/food.png" class="w-8 h-8" alt="">
                <div>
                    <p class="text-xs font-medium text-gray-500">Food</p>
                    <p class="text-xs font-light text-gray-500">Description</p>
                </div>
            </div>

        </div>
        <p class="pt-2 pb-1">Address</p>
        <div class="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
            <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Name</p>
                    <p class="text-xs font-light text-gray-500">Address</p>
                </div>
            </div>
            <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Name</p>
                    <p class="text-xs font-light text-gray-500">Address</p>
                </div>
            </div>
            <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Name</p>
                    <p class="text-xs font-light text-gray-500">Address</p>
                </div>
            </div>
            <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Name</p>
                    <p class="text-xs font-light text-gray-500">Address</p>
                </div>
            </div>
        </div>
        <p class="pt-2 pb-1">Contact Information</p>
        <div class="grid grid-cols-1 gap-2 mt-2 md:grid-cols-3">
            <div class="flex flex-row p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Name</p>
                    <p class="text-xs font-light text-gray-500">Isaac Nabil</p>
                </div>
            </div>
            <div class="flex flex-row p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Phone</p>
                    <p class="text-xs font-light text-gray-500">0000000000</p>
                </div>
            </div>
            <div class="flex flex-row p-2 space-x-2 border border-gray-100 rounded-md">
                <div>
                    <p class="text-xs font-medium text-gray-500">Note</p>
                    <p class="text-xs font-light text-gray-500">Something here plenty it s good</p>
                </div>
            </div>

        </div>
        <p class="pt-2 pb-1">Package Parameter</p>
        <div class="flex flex-col">
            <div class="flex flex-row w-full space-x-2 ">
                <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">Weight:</p>
                    <p class="text-xs font-light text-gray-500">200</p>
                </div>
                <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">Length:</p>
                    <p class="text-xs font-light text-gray-500">100</p>
                </div>
                <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">Width:</p>
                    <p class="text-xs font-light text-gray-500">100</p>
                </div>
                <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">Height:</p>
                    <p class="text-xs font-light text-gray-500">100</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center mt-5">
            <button type="button" @click="toPayment"
                class="flex items-center justify-center w-full h-10 p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer">
                Next
            </button>
        </div>
    </div>
    <div class="p-2 mt-2" v-show="showPayment">
        <Payment />
    </div>
</template>
<script>
import Payment from './PaymentComponent.vue'
export default {
    name: 'SummaryComponent',
    components: {
        Payment,
    },
    props: {
        showSummary: Boolean,
        deliveryStops: Object,
        selectedPackage: Object,
        deliveryCourier: Object,
        recipients: Object,
        height: String,
        width: String,
        plength: String,
        weight: String,
    },
    data(){
        return{
           summary: this.showSummary,
           showPayment: false,
           package: this.selectedPackage
        }
    },
    mounted(){
        this.summary = true
        console.log(this.package)
    },
    methods: {
        toPayment(){
            this.summary = false;
            this.showPayment = true

        }
    }
}
</script>