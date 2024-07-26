<template>
  <div class="bg-blue-50" v-show="isLoggedIn">
    <div class="container mx-auto max-w-7xl">
      <select v-model="$i18n.locale" class="w-16 px-3 m-2 text-black bg-transparent rounded-md">
        <option v-for="(lang, i) in $i18n.availableLocales" class="" :key="`Lang${i}`" :value="lang">
          <span>{{ lang }}</span>
        </option>
      </select>
    </div>

    <div class="container p-8 mx-auto md:flex md:justify-between max-w-7xl">

      <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold text-black"  v-text="$t('landingpageHeader')"></h1>
        <p class="mt-4 text-sm font-light text-gray-500 md:w-96">{{ $t('landingpageSubHeader') }}</p>
        <!-- component here  -->
      </div>
      <div class="">
        <Booking />
      </div>
    </div>

  </div>
</template>

<script>
// import { notify } from "@kyvg/vue3-notification";
// import axios from "axios";
import Booking from './BookingComponent.vue'

export default {
  name: 'MainComponent',
  components: {
    Booking,
  },
  data() {
    return {
      isLoggedIn: false,
      user: null,
      AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
      base_url: this.$store.state.baseUrl,
      currency: null,
      settings: null,
      langs: ['en', 'es'],
    }
  },
  mounted() {

    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"))
    }

    this.$store.dispatch('fetchSettings').then(() => {
      this.settings = this.$store.state.settings;
      // console.log(this.settings)
    })


    if (this.isLoggedIn == false) {
      this.$router.push("/login");
      localStorage.removeItem("user")
      localStorage.removeItem("authToken")
    }

  },

  methods: {
    //

  }
}
</script>