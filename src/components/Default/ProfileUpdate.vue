<template>
    <div class="container mx-auto max-w-7xl" v-if="settings">
        <p class="mt-5 mb-5 text-sm font-medium md:mt-0">{{ $t('profile.personalInformation') }}</p>
        <div class="grid grid-cols-1 mt-5 md:gap-5 md:grid-cols-2">
            <div class="md:w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.name') }}</label>
                <input v-model="user.name" type="text" placeholder="Full name"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 md:w-96 rounded-xl bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.email') }}</label>
                <input v-model="user.email" type="email" placeholder="Email"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 md:w-96 rounded-xl bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('login.phone') }}</label>
                <input v-model="user.phone" type="tel" placeholder="00000000000"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 md:w-96 rounded-xl bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <div class="w-full mt-2">
                <button type="submit" :style="{ 'background-color': settings.colors.primaryColor }" @click="updateUser"
                class="flex items-center justify-center w-full h-12 p-2 mt-5 font-light text-white rounded-full cursor-pointer">
                {{ $t('profile.updateProfile') }}
            </button>
            </div>
        </div>
        <h1 class="mt-20">{{ $t('profile.passwordChange') }}</h1>
        <div class="grid grid-cols-1 mt-5 md:gap-5 md:grid-cols-2">
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('profile.oldPassword') }}</label>
                <input v-model="old_password" type="password" placeholder="*********"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 md:w-96 rounded-xl bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('profile.newPassword') }}</label>
                <input v-model="new_password" type="password" placeholder="*******"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 md:w-96 rounded-xl bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            <div class="w-full">
                <label for="" class="px-5 text-sm font-light text-gray-500">{{ $t('profile.confirmPassword') }}</label>
                <input v-model="password_confirmation" type="password" placeholder="*******"
                    class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 md:w-96 rounded-xl bg-gray-50 placeholder:font-light sm:text-sm">
            </div>
            
            <div class="w-full mt-2">
                <button :style="{ 'background-color': settings.colors.primaryColor }" type="submit" @click="updatePassword"
                class="flex items-center justify-center w-full h-12 p-2 mt-5 font-light text-white bg-blue-800 rounded-full cursor-pointer">
                {{ $t('profile.updatePassword') }}
            </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";

export default {
    components: {
     //
    },
    data () {
        return {
            isLoggedIn: false,
            user: {
              name: '',
              email: '',
              phone: '',
              photo: '',
              id: null
            },
            profile: null,
            AuthStr : 'Bearer ' + localStorage.getItem('authToken'),
            old_password: null,
            new_password: null,
            password_confirmation: null,
            base_url: this.$store.state.baseUrl,
            settings: null
        }
    },
    
    mounted() {

      this.$store.dispatch('fetchSettings', this.items).then(() => {
        this.settings = this.$store.state.settings;
      })



      if (localStorage.getItem("authToken")) {
        this.isLoggedIn = true;
        this.user = JSON.parse(localStorage.getItem("user"))
      
        this.profile = JSON.parse(localStorage.getItem("user"))
        
      }
      
      
      if(this.isLoggedIn == false) {
          this.$router.push("/login");
      }
      
    },
    methods: {

        updateUser() {
          axios.put(this.base_url+'api/profile/update/', 
            {
              name: this.user.name,
              phone: this.user.phone,
              email: this.user.email,
              // photo: '' 
            }, { 
            'headers': { 'Authorization': this.AuthStr } 
          })
          .then((response) => {
            console.log(response)
            const profile = JSON.parse(localStorage.getItem("user"));
            // const index = profile.findIndex(({ id }) => id === this.profile.id);
            if(profile.id == this.user.id) {
              profile.name = this.user.name;
              profile.phone = this.user.phone;
              profile.email = this.user.email;
              localStorage.setItem("user", JSON.stringify(profile));
            }
            notify({
              type: "success",
              title: "User",
              text: response.data.message,
            })
            window.location.href = "/profile"
          })
          .catch(error => console.log(error))
        },

        updatePassword() {
          axios.put(this.base_url+'api/profile/password/update/', 
            {
              password: this.old_password,
              new_password: this.new_password,
              new_password_confirmation: this.password_confirmation,
              // photo: '' 
            }, { 
            'headers': { 'Authorization': this.AuthStr } 
          })
          .then((response) => {
            notify({
              type: "success",
              title: "User",
              text: response.data.message,
            })
            window.location.href = "/profile"
          })
          .catch(error => console.log(error))
        },

      
    }
}
</script>