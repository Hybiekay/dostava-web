<template>
    <div class="container max-w-6xl p-8 mx-auto">
        <Breadcrumb :thirdCrumb="`Login`" />
    </div>
    <div class="container max-w-2xl p-8 mx-auto" v-if="settings">

        <!-- <div class="flex flex-col items-center justify-center w-4/12"> -->
        <h1 class="mt-5 mb-8 text-3xl font-bold text-black">
            {{ $t('nav.login') }}
        </h1>
        <div class="flex flex-col">
            <div>
                <label for="email" class="text-sm font-light text-gray-500 x-5">{{ $t('login.email') }}</label>
                <input type="email" v-model="details.email" id="email"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="name@mail.com" required />
                <p class="text-sm text-red-500">{{ message }}</p>
            </div>
            <div>
                <label for="password" class="text-sm font-light text-gray-500 x-5">{{ $t('login.password') }}</label>
                <input type="password" v-model="details.password" id="password" placeholder="••••••••"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                    required />
                <p class="text-sm text-red-500">{{ message }}</p>
            </div>
            <div class="mt-5">
                <div class="text-sm font-medium text-gray-500">

                    <a href="/forgot-password" class="text-blue-700 hover:underline">
                        {{ $t('login.forgotPassword') }}</a>
                </div>
                <button :style="{ 'background-color': settings.colors.primaryColor }" @click="login" type="submit"
                    class="flex items-center justify-center w-full p-2 mt-2 mb-2 font-light text-white rounded-full cursor-pointer h-14">
                    {{ $t('nav.login') }}
                </button>
                <div class="text-sm font-medium text-gray-500">
                    {{ $t('login.dontHaveAnAccount') }}
                    <a href="/register" class="text-blue-700 hover:underline">
                        {{ $t('login.SignUp') }}
                    </a>
                </div>
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
                        v-on:click="login()" data-modal-toggle="authentication-modal">
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
                            <span v-if="settings.strings.otpGateway == 'Firebase'">
                                <span v-if="showRecaptcha == true">
                                    <div id="recaptcha-container"></div><br>
                                </span>
                                <ul class="text-xs text-gray-400">
                                    <li></li>
                                    <li>Please reCAPTCHA to get code </li>
                                </ul>
                            </span>

                            <div>
                                <label for="code" class="text-sm font-light text-gray-500 x-5">Enter Code</label>
                                <input type="tel" v-model="code" id="code" placeholder="enter code"
                                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                                    required />
                                <p class="text-sm text-red-500">{{ message }}</p>
                            </div>
                            <div class="flex justify-between">
                            </div>
                            <button type="button" @click="verifyOTP"
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
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
export default {
    name: "DefaultLogin",
    components: {
        Breadcrumb,
        // firebase
    },
    data: function () {
        return {
            phone: null,
            details: {
                email: null,
                password: null,
            },
            showModal: false,
            message: null,
            checked: false,
            settings: null,
            base_url: this.$store.state.baseUrl,
            appVerifier: null,
            showRecaptcha: true,
            code: null,
            token: null
        };
    },
    mounted() {
        this.$store.dispatch('fetchSettings').then(() => {
            this.settings = this.$store.state.settings;
        })
    },
    methods: {

        
        login() {
            this.$store.commit('loading', true)
            axios
                .post(this.base_url + "api/login", this.details)
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
                        this.message = error.response.data.message;
                        // notify({
                        //   type: 'error',
                        //   title: 'Account Error',
                        //   text: error.response.data.message,
                        //   duration: 3000
                        // })
                    }
                })
                .finally(() => this.$store.commit("loading", false));
        },

    },
};
</script>
