<template>
  <div class="container max-w-2xl p-8 mx-auto">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-124">
        <p class="mb-5 font-semibold md:text-2xl">Verification</p>
        <div>
          <span v-if="showRecaptcha == true">
            <div id="recaptcha-container"></div><br>
          </span>
          <ul class="text-xs text-gray-400">
            <li></li>
            <li>Please reCAPTCHA to get code </li>
          </ul>
          <div>
            <input type="number" v-model="code" id="phone"
              class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
              placeholder="enter code" required />
          </div>

          <button  v-if="settings" @click="verifyOTP" type="button" :style="{ 'background-color': settings.colors.primaryColor }"
            class="flex items-center justify-center w-full p-2 mt-2 mb-2 font-light text-white rounded-full cursor-pointer h-14">
            Verify
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
  name: "FirebaseVerification",
  components: {
  },
  data() {
    return {
      token: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      code: null,
      appVerifier: null,
      showRecaptcha: true,
    };
  },

  mounted() {
    this.$store.dispatch('fetchSettings').then(() => {
      this.settings = this.$store.state.settings;
    })

    // this.signInWithPhoneNumber()
    // this.initReCaptcha()
    this.phoneSignIn()
  },

  methods: {
    verifyOTP() {
      // const code = getCodeFromUserInput();
      //show loading screen
      window.confirmationResult.confirm(this.code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // console.log(user)
        user.getIdToken()
          .then((result) => {
            let token = result;
            let phone = JSON.parse(localStorage.getItem("phone"))

            axios
              .post(this.base_url + "api/otp/firebase/verify", {
                phone: phone,
                firebase_id_token: token,
              })
              .then((response) => {
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.removeItem("phone");
                notify({
                  type: "success",
                  title: "Verification",
                  text: response.data.message,
                });
                window.location.href = "/";
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
          });

        // user.getIdToken().then((result) {

        //     token = result.token;
        // });
        // hide the loading screen now
        //redirect to home
        // ...
      }).catch((error) => {
        console.log(error)
        // hide the loading screen now
        // User couldn't sign in (bad verification code?)
        // ...
      });
    },
    verify() {
      let phone = JSON.parse(localStorage.getItem("phone"))
      // 245193
      this.$store.commit("loading", true);
      axios
        .post(this.base_url + "api/otp/firebase/verify", {
          phone: phone,
          firebase_id_token: this.token,
        })
        .then((response) => {
          console.log("otp", response)
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

    // signInWithPhoneNumber() {
    //   let phone = JSON.parse(localStorage.getItem("phone"))
    //   // 245193
    //   this.$store.commit("loading", true);
    //   let appVerifier = this.appVerifier
    //   firebase.auth().signInWithPhoneNumber(phone, appVerifier)
    //   .then(function(confirmationResult) {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //     vm.initReCaptcha()
    //     // ...
    //   }).catch(function(error) {
    //     // Error; SMS not sent
    //     // ...
    //   });
    // },

    //  initReCaptcha(){
    //   setTimeout(()=>{
    //     let vm = this
    //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    //       'size': 'invisible',
    //       'callback': function(response) {
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         // ...
    //       },
    //       'expired-callback': function() {
    //         // Response expired. Ask user to solve reCAPTCHA again.
    //         // ...
    //       }
    //     });
    //     //
    //     this.appVerifier =  window.recaptchaVerifier
    //   })
    // },

    phoneSignIn() {
      if (this.showRecaptcha == true) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        //user phone number
        let phone = JSON.parse(localStorage.getItem("phone"))
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phone, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            this.showRecaptcha = false
            //  this.$store.commit("loading", false);
            //   notify({
            //     type: "success",
            //     title: "Register",
            //     text: "You have successfully registered. Please check your phone for OTP",
            //   });
            // this.$router.push("/firebase/verify/" + this.randomString(300));
          }).catch(function (error) {
            // Error; SMS not sent
            // ...
            console.log(error)
            notify({
              type: "error",
              title: "OTP",
              text: error,
            });
            // alert('Error ! SMS not sent')
          });
      }
    },


  },

  // created() {
  //   this.initReCaptcha()
  // }

};
</script>

