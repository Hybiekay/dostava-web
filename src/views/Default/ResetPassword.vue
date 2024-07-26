<template>
  <div class="container max-w-2xl p-8 mx-auto" v-if="settings">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-124">
        <p class="mb-5 font-semibold md:text-2xl">Forgot Password</p>
        <div>
          <div class="block mb-4">
            <input type="password" v-model="password" placeholder="New Password"
            class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm">
          </div>
          <div class="block mb-4">
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password"
            class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm" />
          </div>
          <div class="w-full mt-8" v-if="settings">
            <button :style="{ 'background-color': settings.colors.primaryColor }" type="button" @click="resetPassword"
            class="flex items-center justify-center w-full p-2 mt-2 mb-2 font-light text-white rounded-full cursor-pointer h-14">
              Submit
            </button>
          </div>
          <div class="flex justify-center mt-8">
            <p class="text-sm text-gray-600">{{ $t('login.alreadyHaveAnAccount') }}</p>
            <router-link to="/login" class="ml-2 text-sm text-gray-600 cursor-pointer">{{ $t('nav.login') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
export default {
  name: "ResetPassword",
  components: {
  },
  data() {
    return {
      password: null,
      phoneNumber: null,
      phone: null,
      confirmPassword: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      countryCode: null,

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

    resetPassword() {
      if (this.password == this.confirmPassword) {
        let phone = JSON.parse(localStorage.getItem("phone"))

        let token = localStorage.getItem("fbtoken")
        let firebase_token
        if (token != null) {
          firebase_token = token
        }

        this.$store.commit("loading", true);
        axios.post(this.base_url + "api/password/reset/init", {
          phone: phone,
          password: this.password,
          firebase_id_token: firebase_token

        })
          .then((response) => {
            localStorage.removeItem('fbtoken')
            localStorage.removeItem('phone')
            this.$store.commit("loading", false);
            notify({
              type: "success",
              title: "Forgot Password",
              text: response.data.message,
            });
            this.$router.push("/login");
          })
          .catch((error) => {
            notify({
              type: "error",
              title: "Forgot Password",
              text: error.response.data.message,
            });
          })
          .finally(() => this.$store.commit("loading", false));
      } else {
        notify({
          type: "error",
          title: "Reset Password",
          text: "Password does not match",
        });
      }

    },


    // countryChanged(country) {
    //   this.countryCode = country.dialCode;
    //   console.log(this.countryCode);
    // },
  },
};
</script>

