<template>
  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-10">
    <div>
      <img v-if="productinfos.photo" :src="productinfos.photo" class="w-full" />
      <vue-horizontal
        ref="horizontal"
        class="horizontal"
        responsive
        v-if="productinfos"
      >
        <div
          v-for="photo in productinfos.photos"
          :key="photo.id"
          class="flex flex-row px-2 mt-2 mb-10"
        >
          <a
            @click="selectedImage(photo)"
            class="flex flex-col items-center justify-center w-24 h-24 p-2 border border-gray-200 rounded-xl hover:border-gray-600 hover:border-2"
          >
            <img
              v-if="productinfos"
              :src="photo"
              class="w-20 h-20 rounded-xl"
            />
          </a>
        </div>
      </vue-horizontal>
    </div>
    <div class="md:w-11/12">
      <div class="md:flex md:justify-between">
        <div>
          <p class="text-2xl text-gray-700">{{ productinfos.name }}</p>
          <p class="mt-4 text-2xl font-bold text-gray-700">
            {{ currency }}{{ productinfos.price.toFixed(2) }}
          </p>
        </div>
        <div class="flex flex-row w-40">
          <img src="/img/icons/star.svg" class="w-4 h-4" alt="" />
          <p class="text-xs font-light text-gray-500">
            {{ productinfos.rating }} ({{ productinfos.reviews_count }})
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <button
          class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
          @click="decrement()"
        >
          <img src="/img/icons/remove.svg" class="w-6 h6" alt="" />
        </button>
        <div class="w-10 h-10 overflow-hidden">
          <div
            class="flex items-center justify-center w-full h-full text-xl font-light text-center"
          >
          <input class="w-full h-full text-xl font-light text-center" v-model="quantity" />
          </div>
        </div>
        <button
          class="flex items-center justify-center w-8 h-8 m-2 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
          @click="increment(productinfos)"
        >
          <img src="/img/icons/plus.svg" class="w-6 h-6" alt="" />
        </button>
      </div>
      <div class="flex mt-5" v-if="settings">
        <!-- :style="{ 'background-color': settings.colors.primaryColor }" -->
        <button
          @click="addToCart(productinfos)"
          class="flex items-center justify-center w-full p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer h-14"
        >
          Add to cart
        </button>
        <button
          class="flex items-center justify-center w-16 p-2 ml-2 border border-gray-700 rounded-full h-14"
        >
          <img src="/img/icons/favourite-border.svg" class="w-8 h-8" alt="" />
        </button>
      </div>
      <div class="flex mt-4">
        <img src="/img/icons/track-shipping.svg" class="w-6 h-6" alt="" />
        <p class="ml-2 text-gray-700">Delivery in 45 - 55 mins ($2.65)</p>
      </div>
      <p class="mt-5 text-sm font-light text-gray-500">
        {{ productinfos.description }}
      </p>
    </div>
  </div>
  <!-- <Recommended :products="productinfos.recommended" @close="closeRecommend"></Recommended> /> -->
</template>

<script>
import VueHorizontal from "vue-horizontal";
import { notify } from "@kyvg/vue3-notification";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import Recommended from '@/components/Default/Product/Recommended.vue'
export default {
  name: "productInfo",
  components: {
    VueHorizontal,
    // Recommended,
  },
  props: {
    productinfos: Object,
  },

  data() {
    return {
      currency: null,
      quantity: 1,
      settings: null,
    };
  },

  mounted() {
    this.$store.dispatch("fetchSettings", this.items).then(() => {
      this.settings = this.$store.state.settings;
      this.currency = this.settings.strings.currency;
    });
  },

  methods: {
    selectedImage(image) {
      this.productinfo.photo = image;
    },

    addToCart(
      productinfo,
      quantity = this.quantity,
      selectedOption = this.selectedOption,
      selectedOptions = this.selectedOptions
    ) {
      if (productinfo.available_qty >= 1 || productinfo.available_qty == null) {
        if (selectedOption) {
          this.$store.commit("addToCart", {
            productinfo,
            quantity,
            selectedOption,
            selectedOptions,
          });
        } else if (this.selectedOptions) {
          this.$store.commit("addToCart", {
            productinfo,
            quantity,
            selectedOption: this.selectedOption,
            selectedOptions: this.selectedOptions,
          });
        } else {
          this.$store.commit("addToCart", { productinfo, quantity });
        }
      } else if (productinfo.available_qty == 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "productinfo out of stock",
        });
      }
    },

    increment(productinfo) {
      if (productinfo.available_qty == 0) {
        notify({
          type: "error",
          title: "Cart",
          text: "productinfo out of stock",
        });
      } else {
        this.quantity++;
        if (productinfo.discount_price != 0) {
          this.totalPrice = productinfo.discount_price + this.quantity;
        } else {
          this.totalPrice = productinfo.price + this.quantity;
        }
      }
    },

    decrement() {
      if (this.quantity === 1) {
        notify({
          type: "error",
          title: "Cart",
          text: "You cannot add 0 productinfo",
        });
      } else {
        this.quantity--;
      }
    },
  },
};
</script>
