<template>
    <div class="container max-w-2xl p-8 mx-auto" v-if="settings">
        <!-- <div class="flex flex-col items-center justify-center w-4/12"> -->
        <h1 class="mt-5 mb-8 text-3xl font-bold text-black">
            {{ $t('login.forgotPassword') }}
        </h1>
        <div class="flex flex-col">
            <div>
                <div class="block w-full border border-gray-200 rounded-xl h-14">
                    <vue-tel-input v-model="phone" mode="international" :enableCountryCode="true"
                        :defaultCountry="'gh'" :autoFormat="false"
                        :inputOptions="{ showDialCode: true, placeholder: '000000000' }"
                        v-on:country-changed="countryChanged">
                    </vue-tel-input>
                </div>
            </div>
            
            <div class="mt-5">
              
                <div class="text-sm font-medium text-gray-500">
                    {{ $t('login.alreadyHaveAnAccount') }}
                    
                    <a href="/login" class="text-blue-700 hover:underline">
                        {{ $t('nav.login') }}
                    </a>
                </div>
                <button @click="verifyPhone" type="submit" :style="{ 'background-color': settings.colors.primaryColor }"
                    class="flex items-center justify-center w-full p-2 mt-5 font-light text-white rounded-full cursor-pointer h-14">
                    {{ $t('profile.passwordChange') }}
                </button>
            </div>
        </div>

        <!-- verification -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div class="relative w-full h-full p-4 md:w-5/12 md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow">
                    <button type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        v-on:click="toggleModal()" data-modal-toggle="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900">
                            Verification
                        </h3>
                        <div class="space-y-6">
                            <span v-if="showRecaptcha == true">
                                <div id="recaptcha-container"></div><br>
                            </span>
                            <ul class="text-xs text-gray-400">
                                <li></li>
                                <li>Please reCAPTCHA to get code </li>
                            </ul>
                            <div>
                                <label for="code" class="text-sm font-light text-gray-500 x-5">Enter Code</label>
                                <input type="tel" v-model="details.code" id="code" placeholder="enter code"
                                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                                    required />
                                <p class="text-sm text-red-500">{{ message }}</p>
                            </div>
                            <div class="flex justify-between">
                            </div>
                            <button type="button" @click="login"
                                class="flex items-center justify-center w-full p-2 mt-5 font-light text-white bg-blue-800 rounded-full cursor-pointer h-14">
                                Verify
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
        <!-- </div> -->
    </div>
</template>
<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification"
import { VueTelInput } from "vue-tel-input";
export default {
    name: "DefaultForgotPassword",
    components: {
         VueTelInput,
    },
    data: function () {
        return {
            phone: null,
            countryCode: null,
            showModal: false,
            message: null,
            settings: null,
            base_url: this.$store.state.baseUrl,
            phoneNumber: null,
        };
    },
    mounted() {
        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
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


        verifyPhone() {
            this.$store.commit("loading", true);
            this.phoneNumber = '+' + this.code + parseInt(this.phone, 10);
            axios.get(this.base_url + "api/verify/phone", {
                params: {
                    phone: this.phoneNumber,
                }
            })
                .then((response) => {
                    // this.$store.commit("loading", false);
                    if (this.settings.strings.enble_otp == "1" && this.settings.strings.otpGateway == "Firebase") {
                        notify({
                            type: "success",
                            title: "Forgot Password",
                            text: "You'll be redirected automatically",
                        });
                        localStorage.setItem("phone", JSON.stringify(this.phoneNumber));
                        this.$router.push("/fp/firebase/verify/");
                    } else if (this.settings.strings.enble_otp == "1" && this.settings.strings.otpGateway != "None") {
                        notify({
                            type: "success",
                            title: "Forgot Password",
                            text: "Please check your phone for OTP",
                        });
                        localStorage.setItem("phone", JSON.stringify(this.phoneNumber));
                        this.$router.push("/fp/verify/");
                    } else {
                        notify({
                            type: "success",
                            title: "Forgot Password",
                            text: response.data.message,
                        });
                    }
                    this.$store.commit('loading', false)
                })
                .catch((error) => {
                    console.log(error);
                    notify({
                        type: "error",
                        title: "Forgot Password",
                        text: error.response.data.message,
                    });
                })
                .finally(() => this.$store.commit("loading", false));

        },

        // phoneChange() {
        //   let withoutLeading0 = this.details.phone.replace(/^0+/, "");
        //   this.details.phone = withoutLeading0;
        // },





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