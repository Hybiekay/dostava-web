<template>
  <NavBar />
  <notifications position="top right" />
  <!-- <div class="flex items-center justify-center h-screen spin-content" v-if="loading">
          <pulse-loader class="" :color="color" :loading="loading"></pulse-loader>
        </div> -->

  <router-view />

  <FooterView class="mt-10" />
</template>
<script>
import NavBar from '@/components/Default/NavBar.vue'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FooterView from '@/components/Default/Footer.vue'
export default {
  name: 'AppView',
  data() {
    return {
      home: 'Home',
      color: '#ffbf01'
    }
  },
  components: {
    NavBar,
    FooterView,
    // PulseLoader,
  },

  mounted() {
    document.title = "Dostava360 - Best online Market"
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },

}
</script>

  

