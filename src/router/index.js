import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import DefaultHomeView from '../views/Default/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DefaultHomeView
  },
  {
    path: '/:id/:slug',
    name: 'VendorHome',
    component:  () => import( '../views/Default/DefaultHome.vue')
  },
  // {
  //   path: '/default',
  //   name: 'DefaultHome',
  //   component: () => import( '../views/Default/DefaultHome.vue')
  // },
  {
    path: '/product/:id/:slug',
    name: 'DefaultProduct',
    component: () => import( '../views/Default/Product.vue')
  },
  {
    path: '/cart',
    name: 'DefaultCart',
    component: () => import( '../views/Default/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'DefaultCheckout',
    component: () => import( '../views/Default/Checkout.vue')
  },
  {
    path: '/booking',
    name: 'DefaultSve',
    component: () => import( '../views/Default/PlaceOrder.vue')
  },
  {
    path: '/register',
    name: 'DefaultRegister',
    component: () => import( '../views/Default/Register.vue')
  },
  {
    path: '/forgot-password',
    name: 'DefaultForgotPassword',
    component: () => import( '../views/Default/ForgotPassword.vue')
  },
  {
    path: '/profile',
    name: 'DefaultProfile',
    component: () => import( '../views/Default/Profile.vue')
  },
  {
    path: '/favourites',
    name: 'DefaultFavourite',
    component: () => import( '../views/Default/Favourites.vue')
  },

  {
    path: '/verify/',
    name: "Verification",
    component: () =>
      import("../views/Default/Verification.vue")
  },
  {
    path: '/fp/verify/',
    name: "FPVerification",
    component: () =>
      import("../views/Default/FPVerification.vue")
  },

  {
    path: '/firebase/verify/',
    name: "FirebaseVerification",
    component: () =>
      import("../views/Default/FirebaseVerification.vue")
  },
  {
    path: '/fp/firebase/verify/',
    name: "FPFirebaseVerification",
    component: () =>
      import("../views/Default/FPFirebaseVerification.vue")
  },
  {
    path: '/reset/password/',
    name: "ResetPassword",
    component: () =>
      import("../views/Default/ResetPassword.vue")
  },
  {
    path: '/login',
    name: 'DefaultLogin',
    component: () => import( '../views/Default/Login.vue')
  },
  {
    path: '/vendor/:id/:slug',
    name: 'DefaultVendor',
    component: () => import( '../views/Default/Vendor.vue')
  },
  {
    path: '/vendors/:id/:slug',
    name: 'DefaultVendors',
    component: () => import( '../views/Default/Vendors.vue')
  },
  {
    path: '/services/:id/:slug',
    name: 'DefaultServices',
    component: () => import( '../views/Default/Services.vue')
  },
  {
    path: '/service/:id/:slug',
    name: 'DefaultService',
    component: () => import( '../views/Default/Service.vue')
  },
  {
    path: '/categories/:id/:slug',
    name: 'DefaultCategories',
    component: () => import( '../views/Default/Categories.vue')
  },
  {
    path: '/search/:slug',
    name: 'DefaultSearch',
    component: () => import( '../views/Default/Search.vue')
  },
  {
    path: '/order-details/:id/:slug',
    name: 'OrderDetails',
    component: () => import( '../views/Default/OrderDetails.vue')
  },
  {
    path: '/category/:id/:slug',
    name: 'DefaultCategory',
    component: () => import( '../views/Default/Category.vue')
  },
  {
    path: '/upload-prescription/:id/:slug',
    name: 'UploadPrescription',
    component: () => import(/* webpackChunkName: "home" */ "../components/Default/pharmacy/UploadPrescription.vue"),
    meta: { guest: false },
  },
  // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
