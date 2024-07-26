<template>
  <div class="container max-w-2xl p-8 mx-auto">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-124">
        <p class="mb-5 font-semibold md:text-2xl">Verification</p>
        <div>
          <input type="number" v-model="code" id="phone"
            class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
            placeholder="enter code" required />

          <div class="w-full mt-8" v-if="settings">
            <button type="button" :style="{ 'background-color': settings.colors.primaryColor }" @click="verify"
              class="w-full px-10 py-2 text-center text-white rounded">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import { VueTelInput } from 'vue-tel-input'
import { notify } from "@kyvg/vue3-notification";
export default {
  name: "DefaultVerification",
  components: {
    // VueTelInput,
  },
  data() {
    return {
      code: null,
      settings: null,
      isLoggedIn: false,
      user: null,
      phone: JSON.parse(localStorage.getItem("phone")),
      base_url: this.$store.state.baseUrl,
      countryCode: null,
    };
  },

  mounted() {
    this.$store.dispatch('fetchSettings').then(() => {
      this.settings = this.$store.state.settings;
    })

    axios
      .post(this.base_url + "api/otp/send/",
        {
          phone: this.phone,
        })
      .then((response) => {
        notify({
          type: "success",
          title: "Verification",
          text: response.data.message,
        });
      })
      .catch((error) => console.log(error));

    //   if (localStorage.getItem("authToken")) {
    //   this.isLoggedIn = true;
    //   this.user = JSON.parse(localStorage.getItem("user"));
    // }

    // if (this.isLoggedIn == false) {
    //   this.$router.push("/login");
    //   localStorage.removeItem("user");
    // //   localStorage.removeItem("authToken");
    // }
  },

  methods: {
    verify() {
      this.$store.commit("loading", true);
      axios
        .post(this.base_url + "api/otp/verify", {
          phone: this.phone,
          code: this.code,
          is_login: true
        })
        .then((response) => {
          console.log(response)
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.removeItem("phone");
          window.location.href = "/";
          // console.log(this.settings)
          notify({
            type: "success",
            title: "Verification",
            text: response.data.message,
          });
        })
        .catch((error) => {
          console.log(error);
          notify({
            type: "error",
            title: "Verification",
            text: error.response.data.message,
          });
        })
        .finally(() => this.$store.commit("loading", false));
    },

    countryChanged(country) {
      this.countryCode = country.dialCode;
      console.log(this.countryCode);
    },
  },
};
</script>

