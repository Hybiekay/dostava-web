import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import axios from 'axios'
import VueGoogleMaps from "@fawmi/vue-google-maps"
import store from './store'
import './tailwind.css'
import 'flowbite'
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css'
import i18n from './i18n'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { VueSpinners } from '@saeris/vue-spinners'




let baseUrl = store.state.baseUrl
axios.get( baseUrl+'api/app/settings')
  .then(response => {
    const googleMapApi = response.data.strings.google_maps_key


createApp(App)
.use(i18n)
.use(store)
.use(router)
.use(VueSpinners)
.use(Notifications)
.use(VueSweetalert2)
.use(VueTelInput)
.use(VueGoogleMaps, {
  load: {
    key: googleMapApi,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },})
// app.use(axios)
.mount('#app')

const firebaseConfig = {

  apiKey: "AIzaSyB4uoyg268-CfrjCnllVtRzPSXp6dnSHZw",
  authDomain: "dostava360-c61cf.firebaseapp.com",
  databaseURL: "https://dostava360-c61cf-default-rtdb.firebaseio.com",
  projectId: "dostava360-c61cf",
  storageBucket: "dostava360-c61cf.appspot.com",
  messagingSenderId: "929526310137",
  appId: "1:929526310137:web:7f88a240c9ae0d0accee28",
  measurementId: "G-B0BL870KE2"
}


firebase.initializeApp(firebaseConfig)


// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {

  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }

  // set the current language for i18n.
  i18n.locale = language
  next()
})

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.showLoader) {
    // this.$store.commit('loading', true)
    }
    return config;
  }, function (error) {
    // Do something with request error
    if (error.config.showLoader) {
    // this.$store.commit('loading', false)
    }
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    
    if (response.config.showLoader) {
    // this.$store.commit('loading', true)
    }
    return response;
  }, function (error) {
  
    if (error.config.showLoader) {
    // this.$store.commit('loading', false)
    }
    // Do something with response error
    return Promise.reject(error);
  });
})
.catch(error => console.log(error));