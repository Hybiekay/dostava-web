<template>
    <div class="container max-w-6xl p-8 mx-auto">
        <Breadcrumb :thirdCrumb="`Account creation`" />
    </div>
    <div class="container max-w-2xl p-8 mx-auto" v-if="settings">
        <!-- <div class="flex flex-col items-center justify-center w-4/12"> -->
        <h1 class="mt-5 mb-8 text-3xl font-bold text-black">
            {{ $t('login.SignUpLabel') }}
        </h1>
        <div class="grid grid-cols-2 gap-5">
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.name') }}</label>
                <input type="text" v-model="details.name" placeholder="Full name"
                    class="block w-full px-3 py-3 mt-1 border border-gray-200 rounded-xl h-14 bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.email') }}</label>
                <input type="email" v-model="details.email" placeholder="Email"
                    class="block w-full px-3 py-3 mt-1 border border-gray-200 rounded-xl h-14 bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
        </div>
        <div class="mt-5">


            <div class="w-full mt-5">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.phone') }}</label>
                <div class="block w-full border border-gray-200 rounded-xl h-14">
                    <vue-tel-input v-model="details.phone" mode="international" :enableCountryCode="true"
                        :defaultCountry="'gh'" :autoFormat="false"
                        :inputOptions="{ showDialCode: true, placeholder: '000000000' }"
                        v-on:country-changed="countryChanged"></vue-tel-input>
                </div>
            </div>
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.password') }}</label>
                <input type="password" v-model="details.password" placeholder="Password"
                    class="block w-full px-3 py-3 mt-1 border border-gray-200 rounded-xl h-14 bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <p class="px-5 mt-2 text-xs font-light text-gray-400">{{ $t('login.passwordDesc') }}</p>
            <div class="flex px-5 mt-2">
                <div class="flex items-center mb-4">
                    <input id="default-checkbox" v-model="checked" type="checkbox" value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-checkbox" class="px-2 text-xs font-light text-gray-400">
                        <a target="__blank" :href="`${this.$store.state.baseUrl}pages/terms`" class="text-sm font-light">{{
                            $t('login.checkLabel') }}</a></label>
                </div>
            </div>
            <button :style="{ 'background-color': settings.colors.primaryColor }" type="submit" @click="register"
                class="flex items-center justify-center w-full p-2 mt-5 font-light text-white rounded-full cursor-pointer h-14">
                {{ $t('login.SignUp') }}
            </button>
        </div>

    </div>
</template>
<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { VueTelInput } from "vue-tel-input";
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
export default {
    name: "DefaultRegister",
    components: {
        VueTelInput,
        Breadcrumb
    },
    data: function () {
        return {
            phone: "",
            showModal: false,
            countryCode: "",
            details: {
                name: null,
                email: null,
                password: null,
                phone: null,
                country_code: null,
            },
            checked: false,
            settings: null,
            base_url: this.$store.state.baseUrl,
            phoneNumber: '',
            appVerifier: null,
            showRecaptcha: true,
            code: null,
            token: null
        };
    },
    mounted() {
        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
            console.log(this.settings)
        })
    },

    methods: {
        countryChanged(country) {
            this.country = country.iso2;
            this.code = country.dialCode;
        },


        toggleModal: function () {
            this.showModal = !this.showModal;
        },


        async register() {
            if (this.checked) {

                this.phoneNumber = '+' + this.code + parseInt(this.details.phone, 10);

                this.details.country_code = this.country;
                this.details.phone = this.phoneNumber;
                await axios
                    .post(this.base_url + "api/register", this.details)
                    .then((response) => {
                        if (this.settings.strings.otpGateway == "Firebase" && this.settings.strings.enableOTPLogin == '1') {
                            localStorage.setItem("phone", JSON.stringify(response.data.user.phone));
                            this.$router.push('/firebase/verify/')
                        } else if (this.settings.strings.otpGateway != "None" && this.settings.strings.enableOTPLogin == '1') {
                            localStorage.setItem("phone", JSON.stringify(response.data.user.phone));
                            this.$router.push('/verify/')
                        } else {
                            localStorage.setItem("authToken", response.data.token);
                            localStorage.setItem("user", JSON.stringify(response.data.user));
                            notify({
                                type: "success",
                                title: "Login",
                                text: response.data.message,
                            });
                            window.location.href = "/"
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            notify({
                                type: "error",
                                title: "Account Error",
                                text: error.response.data.message,
                                duration: 3000,
                            });
                        }
                    });
            } else {
                notify({
                    type: "error",
                    title: "Error",
                    text: "Please agree to the terms and conditions",
                    duration: 3000,
                });
            }
        },




    },
};
</script>

<style>
.vue-tel-input {
    border-radius: 7px !important;
    border: none !important;
    margin: auto;
    width: 100% !important;
    padding: 10px;
}
</style>