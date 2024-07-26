
<template>
  <!-- max-w-7xl -->
  <!-- :style="{ 'background-color': settings.colors.primaryColor }" -->
  <Disclosure v-if="settings" as="nav"
    class="sticky inset-x-0 top-0 left-0 z-50 w-full py-2 bg-white border-b border-gray-200 md:py-0">
    <div class="container mx-auto max-w-7xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center flex-shrink-0 ">
          <a href="/" class="flex items-center">
            <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" /> -->
            <span class="self-center text-xl font-semibold whitespace-nowrap">{{
              settings.strings.app_name
            }}</span>
          </a>
        </div>
        <div class="flex items-center justify-center ">

          <div class="content-center hidden px-5 py-3 rounded-md sm:block sm:ml-6">
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <div class="flex flex-row p-2 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
                v-for="vendor in vendors" :key="vendor.id">
                <a :href="$router.resolve({ name: 'VendorHome', params: { id: vendor.id, slug: sanitizeTitle(vendor.name) } }).href"
                  class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-gray-300 md:bg-transparent md:p-0"
                  aria-current="page">
                  {{ vendor.name }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="hidden md:mx-2 md:block">
            <a href="/search" class="p-2 text-black">
              <span class="sr-only">Search</span>
              <!-- <SearchIcon class="flex justify-center w-5 h-5 text-black" aria-hidden="true" /> -->
            </a>
          </div>
          <!-- <span class=""> -->
          <!-- <img :src="`/img/en.png`" class="w-8 h-8"> -->
        <!-- <select v-model="$i18n.locale" class="px-3 py-2 -m-2 text-black bg-gray-100 rounded-full md:mx-2">
                  <option v-for="(lang, i) in $i18n.availableLocales" class="bg-transparent " :key="`Lang${i}`" :value="lang">
                    
                    <span>{{ lang }}</span>
                  </option>
                </select>
                </span> -->

          <button class="p-2 bg-white rounded-full" v-on:click="toggleModal()" type="button" v-show="isLoggedIn == false">
            <img src="/img/icons/account.svg" class="w-6 h-6" alt="" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative p-2" v-show="isLoggedIn">
            <div class="flex space-x-2">
              <MenuButton
                class="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-black">
                <span class="sr-only">Open user menu</span>
                <img class="w-6 h-6 rounded-full" v-if="user" v-bind:src="user.photo" alt="user photo" />

              </MenuButton>
            </div>
            <transition enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
              <MenuItems
                class="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <a href="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">My
                  Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="/favourites" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">My
                  Favourites</a>
                </MenuItem>
              <!-- <MenuItem v-slot="{ active }">
                <a href="/orders"
                  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Orders</a>
                  </MenuItem> -->
              <!-- <MenuItem v-slot="{ active }">
                      <a href="/wallet" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Wallet</a>
                      </MenuItem> -->
                <MenuItem v-slot="{ active }">
                <a href="#" @click="logout"
                  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <a href="/cart" class="flex mx-2 bg-white rounded-full ">
            <span class="hidden md:flex">
              <CartPopover />
            </span>
            <span class="flex md:hidden">
              <img src="/img/icons/cart.svg" class="w-6 h-6" alt="" />
              <span class="text-xs text-gray-500">{{ cartItemCount }}</span>
            </span>
          </a>


          <!-- </span> -->
        </div>
      </div>
      <DisclosurePanel class="sm:hidden">
        <div class="px-1 pt-2 pb-3 space-y-1">
          <a v-for="item in navigation" :key="item.name" :href="item.href"
            :class="[item.current ? 'text-sm text-green-500' : 'text-primary hover:text-black', 'block px-3 text-sm py-2 rounded-md font-medium']"
            :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
        </div>
      </DisclosurePanel>
    </div>
  </Disclosure>
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
            {{ $t('login.welcome') }}
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label for="email" class="text-sm font-light text-gray-500 x-5">{{ $t('login.email') }}</label>
              <input type="email" v-model="details.email" id="email"
                class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                placeholder="name@company.com" required />
              <p class="text-sm text-red-500">{{ message }}</p>
            </div>
            <div>
              <label for="password" class="text-sm font-light text-gray-500 x-5">{{ $t('login.password') }}</label>
              <input type="password" v-model="details.password" id="password" placeholder="••••••••"
                class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                required />
              <p class="text-sm text-red-500">{{ message }}</p>
            </div>
            <div class="flex justify-between">
            <!-- <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                          </div> -->
              <!-- <a href="#" class="text-sm text-gray-500 hover:underline">Lost Password?</a> -->
            </div>
            <button type="button" @click="login"
              class="flex items-center justify-center w-full p-2 mt-5 font-light text-white bg-blue-800 rounded-full cursor-pointer h-14">
              {{ $t('nav.login') }}
            </button>
            <div class="text-sm font-medium text-gray-500">
              {{ $t('login.dontHaveAnAccount') }}
              <a href="/register" class="text-blue-700 hover:underline">
                {{ $t('login.SignUp') }}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
</template>

<script>
import axios from 'axios'
// import { ref } from 'vue'
import { Disclosure, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { notify } from "@kyvg/vue3-notification";
import CartPopover from './CartPopover.vue'
// const navigation = [
//   { name: 'Home', href: '/', current: false },
//   { name: 'Vendors', href: '/vendors', current: false },
//   // { name: 'Pharmacy', href: '/pharmacies', current: false }
// ]

export default {
  data() {
    return {
      isLoggedIn: false,
      vendors: null,
      user: null,
      settings: null,
      showModal: false,
      search: null,
      products: null,
      currency: null,
      base_url: this.$store.state.baseUrl,
      details: {
        email: null,
        password: null,
      },
      message: null,
    }
  },
  components: {
    Disclosure,
    CartPopover,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    // ShoppingCartIcon,
    // SearchIcon,
  },
  // setup() {
  //   const open = ref(false)

  //   return {
  //     navigation,
  //     open,
  //   }
  // },

  mounted() {

    this.$store.dispatch('fetchSettings').then(() => {
      this.settings = this.$store.state.settings;
      // let mapKey = this.settings.strings.google_maps_key
      // console.log(mapKey)
    })



    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"))
    }
    axios
      .get(this.base_url + "api/vendor/types")
      .then((response) => {
        this.vendors = response.data;
        // console.log(this.vendors)
      })
      .catch((error) => console.log(error))
  },

  computed: {
    cartItemCount() {
      return this.$store.getters.count;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("phone");
      localStorage.removeItem("user");
      this.$router.push("/");
      window.location.href = "/login";
    },

    randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~$^*()";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    toggleModal: function () {
      this.showModal = !this.showModal;
    },

    sanitizeTitle(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      // Letter "d"
      slug = slug.replace(/đ/gi, "d");
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, "");
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, "-");

      return slug;
    },

    login() {
      // this.$store.commit('loading', true)
      // if (this.terms == false) {

      // }
      axios
        .post(this.base_url + "api/login", this.details)
        .then((response) => {
          this.showModal = !this.showModal;
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