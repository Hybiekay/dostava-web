import { createStore } from "vuex";
// import auth from "./auth";
import axios from "axios";
// import { notify } from "@kyvg/vue3-notification"
import Swal from "sweetalert2/dist/sweetalert2.js";

let cart = window.localStorage.getItem("cart");
let serviceCart = window.localStorage.getItem("serviceCart");

export default createStore({
  state: {
    errors: [],
    cart: cart ? JSON.parse(cart) : [],
    serviceCart: serviceCart ? JSON.parse(serviceCart) : [],
    loading: false,
    baseUrl: "https://admin.dostava360.ng/",
    settings: null,
  },

  mutations: {
    setSettings(state, settings) {
      state.settings = settings;
    },

    setCartItems(state, { products }) {
      state.cart = products;
    },

    loading(state, newLoading) {
      state.loading = newLoading;
    },

    addToCart(state, { product, quantity, selectedOption, selectedOptions }) {
      let item = state.cart.find((p) => p.id == product.id);
      if (item) {
        item.quantity += quantity++;
        item.selectedOption = selectedOption;
        item.selectedOptions = selectedOptions;
        // item.totalPrice = item.quantity * item.price;
        if (item.discount_price != 0) {
          item.totalPrice = item.quantity * item.discount_price;
        } else if (item.quantity) {
          item.totalPrice = item.quantity * item.price;
        } else {
          item.totalPrice = item.price;
        }

        if (item.vendor.vendor_type.slug != "service") {
          Swal.fire({
            title: "Cart",
            text:
              "Your product" + " " + item.name + " " + "has been added to cart",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#d33",
            cancelButtonText: "Keep shopping",
            confirmButtonText: "Go to cart",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/cart";
            }
          });
        } else {
          window.location.href = "/checkout";
        }
      } else {
        product.quantity = quantity;
        product.selectedOption = selectedOption;
        product.selectedOptions = selectedOptions;
        // product.totalPrice = product.quantity * product.price
        if (product.discount_price != 0) {
          product.totalPrice = product.quantity * product.discount_price;
        } else if (product.quantity) {
          product.totalPrice = product.quantity * product.price;
        } else {
          product.totalPrice = product.price;
        }

        // if(product.selectedOption) {
        //   product.selectedOption.forEach((item, i) => {
        //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
        //   })
        // }
        state.cart.push(product);
        
          Swal.fire({
            title: "Cart",
            text:
              "Your product" +
              " " +
              product.name +
              " " +
              "has been added to cart",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#d33",
            cancelButtonText: "Keep shopping",
            confirmButtonText: "Go to cart",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/cart";
            }
          });
        
      }
      this.commit("saveCart");
    },

    bookVendor(state, { vendor }) {
      if (vendor.discount_price != 0) {
        vendor.totalPrice = vendor.discount_price;
      } else {
        vendor.totalPrice = vendor.price;
      }
      state.serviceCart.push(vendor);
      this.commit("saveServiceCart");
      window.location.href = "/booking";
    },

    saveServiceCart(state) {
      window.localStorage.setItem("serviceCart", JSON.stringify(state.serviceCart));
    },

    saveCart(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },

  actions: {
    async fetchSettings({ commit, state }) {
      try {
        const response = await axios.get(state.baseUrl + "api/app/settings");
        commit("setSettings", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    // getSettings(state) { return state.settings },
    errors: (state) => state.errors,
    count: (state) => state.cart.length,
    isAuthenticated: (state) => !!state.user,
    subtotal: (state) => state.cart.price,

    loading(state) {
      return state.loading;
    },
  },
});

// else if(state.cart.length >= 1){
//   if(product.vendor.id != state.cart[0]['vendor']['id']){
//     Swal.fire({
//       title: 'Different Vendor',
//       text: "Are you sure you'd like to change vendors? Your Current items in cart will be lost.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Okay'
//       }).then((result) => {
//         if(result.isConfirmed) {
//           // localStorage.removeItem('cart')
//           state.cart = [];
//           product.quantity = quantity++
//           product.selectedOption = selectedOption
//           product.selectedOptions = selectedOptions
//           // product.totalPrice = product.quantity * product.price;
//           if(product.discount_price != 0)
//           {
//             product.totalPrice = product.quantity * product.discount_price;
//           }else if(product.quantity) {
//             product.totalPrice = product.quantity * product.price;
//           }else{
//             item.totalPrice = item.price;
//           }
//           // if(product.selectedOption != undefined) {
//           //   product.selectedOption.forEach((item, i) => {
//           //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
//           //   })
//           // }
//           state.cart.push(product)
//           Swal.fire(
//             'Cart',
//             "Your product" + " "+ product.name +" " + "has been added to cart",
//             'success'
//           )
//         }
//         this.commit('saveCart');
//       })
//   }else{
//     product.quantity = quantity++
//     // product.totalPrice = product.quantity * product.price;
//     product.selectedOption = selectedOption;
//     product.selectedOptions = selectedOptions;
//     if(product.discount_price != 0)
//     {
//       product.totalPrice = product.quantity * product.discount_price;
//     }else if( product.quantity) {
//       product.totalPrice = product.quantity * product.price;
//     }
//     else{
//       product.totalPrice = product.price;
//     }
//     // if(product.selectedOption != undefined) {
//     //   product.selectedOption.forEach((item, i) => {
//     //     product.totalPrice = product.quantity * product.price + product.selectedOption[i].price;
//     //   })
//     // }

//     if(product.vendor.vendor_type.slug != 'service'){
//     state.cart.push(product)
//     Swal.fire({
//       title: 'Cart',
//       text: "Your product" + " "+ product.name +" " + "has been added to cart",
//       icon: 'success',
//       showCancelButton: true,
//       confirmButtonColor: '#10b981',
//       cancelButtonColor: '#d33',
//       cancelButtonText: 'Keep shopping',
//       confirmButtonText: 'Go to cart',
//     }).then((result) => {
//       if(result.isConfirmed) {
//         window.location.href = "/cart"
//       }
//     });
//     }
//   else{
//     window.location.href = "/checkout"
//   }
//   }
//   this.commit('saveCart');

// }
