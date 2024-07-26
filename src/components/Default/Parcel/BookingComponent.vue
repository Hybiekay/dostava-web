<template>
  <div class="flex flex-col p-5 mt-4 bg-white rounded-lg md:w-96">
    <div v-for="(input, index) in deliveryStops" :key="index" class="mb-2">

      <!-- pickup location input -->
      <div class="" v-if="index == 0">
        <label for="from" class="space-x-2 text-xl font-medium text-gray-700">
          <div class="flex justify-between">
            <label class="block mb-2 text-sm font-light text-gray-500 dark:text-white">{{ $t('parcel.pickup') }}</label>
            <button v-on:click="toggleModl()" type="button" class="text-sm font-light text-green-500 hover:underline">{{ $t('addAddress') }}</button>
          </div>
        </label>
        <div class="flex items-center input wrapper">

          <select class="bg-gray-50 h-12 border border-gray-300 text-gray-500 text-sm rounded-lg  block w-full p-2.5 "
            id="from" v-model="deliveryStops[0]">
            <option selected>{{ $t('parcel.pickupLocation') }}</option>
            <option :value="address" v-for="address in addresses" :key="address.id">
              {{ address.name }}
            </option>
          </select>
        </div>
      </div>
      <!-- other stops -->
      <div v-if="index > 0">
        <label for="to" class="block mb-2 text-sm font-light text-gray-500 dark:text-white">{{ $t('parcel.dropoffs') }}</label>
        <div class="flex items-center input wrapper">
          <select id="to" v-model="deliveryStops[index]"
            class="bg-gray-50 h-12 border border-gray-300 text-gray-500 text-sm rounded-lg  block w-full p-2.5 ">
            <option selected>{{ $t('parcel.pickupLocation') }}</option>
            <option :value="address" v-for="address in addresses" :key="address.id">
              {{ address.name }}
            </option>
          </select>
          <button class="ml-1" v-if="deliveryStops.length > 2" @click="removeField(index, deliveryStops)">
            <img src="/img/icons/minus.png" class="w-4 h-4" alt="">
          </button>

        </div>
      </div>
    </div>
    <button class="mb-5 text-sm font-light text-right text-green-500 underline " @click="addField({}, deliveryStops)">
      + {{ $t('parcel.addStops') }}
    </button>
    <div>
      <label for="package" class="block mb-2 text-sm font-light text-gray-500 dark:text-white">{{ $t('parcel.packageTypes') }}</label>
      <select id="package"
        class="bg-gray-50 h-12 border border-gray-300 text-gray-500 text-sm rounded-lg  block w-full p-2.5 "
        @change="showCouriers(selectedPackage)" v-model="selectedPackage">
        <option selected>{{ $t('parcel.chooseTypes') }}</option>
        <option :value="packageType" v-for="packageType in packageTypes" :key="packageType.id">
          <img :src="packageType.photo" class="w-6 h-6" alt="">
          {{ packageType.name }}
        </option>
      </select>

    </div>
    <div>
      <label for="courier" class="block mb-2 text-sm font-light text-gray-500 dark:text-white">{{ $t('parcel.courierVendors') }}</label>
      <select id="courier"
        class="bg-gray-50 h-12 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 "
        v-model="deliveryCourier">
        <option selected>{{ $t('parcel.choosesCoourier') }}</option>
        <option :value="courier" v-for="courier in couriers" :key="courier.id">{{ courier.name }}</option>
      </select>
    </div>
    <!-- <p class="text-sm text-gray-400" v-else>No courier for this location</p> -->
    <div>
      <button
        class="w-full h-10 px-2 py-2 mt-6 mb-5 text-xs font-light text-white bg-blue-800 rounded-full md:text-sm md:h-12"
        v-on:click="toggleModal()">{{ $t('product.continue') }}</button>
    </div>

  </div>

  <!-- modal here  -->
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
        <div class="py-6 lg:px-4">
          <h3 class="font-medium text-gray-700 ">
            {{ $t('parcel.modalTitile') }}
          </h3>
          <hr>

          <div class="w-full pt-5">
            <div class="w-full mx-auto" v-show="showDetails">
              <Disclosure v-slot="{ open }">
                <DisclosureButton
                  class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                  <span> {{ $t('parcel.modalSubTitile') }}</span>
                  <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="w-5 h-5 text-blue-500" />
                </DisclosureButton>
                <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">

                  <!-- recipients -->
                  <!-- <Recipients :deliveryStops="deliveryStops"/> -->
                  <form class="" action="#" v-for="(stop, index) in deliveryStops" :key="index">
                    <h3 class="mt-1 mb-5 text-sm font-medium">Contact Info({{ stop.name }})</h3>
                    <!-- <hr> -->
                    <div class="grid grid-cols-2 gap-5">
                      <div>
                        <label for="name"
                          class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name"
                          class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                          placeholder="John Doe" v-model="recipients[index].name" />
                        <!-- v-model="contacts[index].name" -->
                      </div>
                      <div>
                        <label for="phone"
                          class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="tel" id="phone"
                          class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                          placeholder="0000000000" v-model="recipients[index].phone" />
                        <!-- v-model="contacts[index].phone" -->
                      </div>
                      <div>
                        <label for="message" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Your
                          message</label>
                        <textarea id="message" rows="2"
                          class="block placeholder:text-xs p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder:font-light dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="your notes here..." v-model="recipients[index].note"></textarea>
                        <!-- v-model="contacts[index].note" -->
                      </div>
                    </div>
                  </form>

                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" class="mt-2" v-slot="{ open }">
                <DisclosureButton
                  class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                  <span>{{ $t('parcel.modalSubTitile2') }}</span>
                  <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="w-5 h-5 text-blue-500" />
                </DisclosureButton>
                <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500" v-show="showDimensions">

                  <!-- dimensions -->
                  <!-- <Dimensions /> -->
                  <div class="grid grid-cols-2 gap-5">
                    <div>
                      <label for="name"
                        class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">{{ $t('parcel.weight') }}*</label>
                      <input type="number" v-model="weight" id="name"
                        class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                        placeholder="200" required />
                    </div>
                    <div>
                      <label for="phone"
                        class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">{{ $t('parcel.width') }}</label>
                      <input type="number" v-model="width" id="phone"
                        class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                        placeholder="200" />
                    </div>
                    <div>
                      <label for="phone"
                        class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">{{ $t('parcel.height') }}</label>
                      <input type="number" id="phone"
                        class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                        placeholder="200" v-model="height" />
                    </div>
                    <div>
                      <label for="phone"
                        class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">{{ $t('parcel.length') }}</label>
                      <input type="number" id="phone"
                        class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                        placeholder="200" v-model="plength" />
                    </div>

                  </div>
                  <div class="flex flex-col items-center justify-center mt-5" v-if="weight != null">
                    <button type="button" @click="toSummary"
                      class="flex items-center justify-center w-full h-10 p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer">
                      {{ $t('parcel.next') }}
                    </button>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
            <!-- <Summary /> -->
            <div class="p-2 mt-2" v-show="showSummary">
              <div class="flex justify-between">
                <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md" v-if="selectedPackage">
                  <img :src="selectedPackage.photo" class="w-8 h-8" alt="">
                  <div>
                    <p class="text-xs font-medium text-gray-500">{{ selectedPackage.name }}</p>
                    <p class="text-xs font-light text-gray-500">{{ selectedPackage.description }}</p>
                  </div>
                </div>
                <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md">
                  <img :src="deliveryCourier.logo" class="w-8 h-8" alt="">
                  <div>
                    <p class="text-xs font-medium text-gray-500">{{ deliveryCourier.name }}</p>
                    <p class="text-xs font-light text-gray-500">{{ deliveryCourier.description }}</p>
                  </div>
                </div>

              </div>


              <p class="pt-2 pb-1">{{ $t('profile.address') }}</p>
              <div class="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
                <div class="flex flex-row w-64 p-2 space-x-2 border border-gray-100 rounded-md"
                  v-for="drop in deliveryStops" :key="drop.id">
                  <div>
                    <p class="text-xs font-medium text-gray-500">{{ drop.name }}</p>
                    <p class="text-xs font-light text-gray-500">{{ drop.address }}</p>
                  </div>
                </div>
              </div>
              <p class="pt-2 pb-1"> {{ $t('parcel.contactInfo') }}</p>
              <div class="grid grid-cols-1 gap-2 mt-2 md:grid-cols-3" v-for="selectedRecipient in recipients"
                :key="selectedRecipient">
                <div class="flex flex-row p-2 space-x-2 border border-gray-100 rounded-md">
                  <div>
                    <p class="text-xs font-medium text-gray-500">{{ $t('login.name') }}</p>
                    <p class="text-xs font-light text-gray-500">{{ selectedRecipient.name }}</p>
                  </div>
                </div>
                <div class="flex flex-row p-2 space-x-2 border border-gray-100 rounded-md">
                  <div>
                    <p class="text-xs font-medium text-gray-500">{{ $t('login.phone') }}</p>
                    <p class="text-xs font-light text-gray-500">{{ selectedRecipient.phone }}</p>
                  </div>
                </div>
                <div class="flex flex-row p-2 space-x-2 border border-gray-100 rounded-md">
                  <div>
                    <p class="text-xs font-medium text-gray-500">{{ $t('parcel.notes') }}</p>
                    <p class="text-xs font-light text-gray-500">{{ selectedRecipient.note }}</p>
                  </div>
                </div>

              </div>
              <p class="pt-2 pb-1">{{ $t('parcel.modalSubTitile2') }}</p>
              <div class="flex flex-col">
                <div class="flex flex-row w-full space-x-2 ">
                  <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">{{ $t('parcel.weight') }}:</p>
                    <p class="text-xs font-light text-gray-500">{{ weight }}</p>
                  </div>
                  <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">{{ $t('parcel.length') }}:</p>
                    <p class="text-xs font-light text-gray-500">{{ plength }}</p>
                  </div>
                  <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">{{ $t('parcel.width') }}:</p>
                    <p class="text-xs font-light text-gray-500">{{ width }}</p>
                  </div>
                  <div class="flex p-1 space-x-2 border border-gray-100 rounded-md flow-row">
                    <p class="text-xs font-medium text-gray-500">{{ $t('parcel.height') }}:</p>
                    <p class="text-xs font-light text-gray-500">{{ height }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center mt-5">
                <button type="button" @click="toPayment"
                  class="flex items-center justify-center w-full h-10 p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer">
                  {{ $t('parcel.pay') }}
                </button>
              </div>
            </div>
            <div class="p-2 mt-2" v-show="showPayment">
              <Payment :summaryP="summary" :selectedPackge="selectedPackage" :deliveryZtops="deliveryStops" :length="plength" :width="width" :height="height" :weight="weight" :courier="deliveryCourier" :recipients="recipients" :methodsP="methods"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>

  <!-- address modal  -->

  <div v-if="showModl"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    <div class="relative h-full p-4 md:w-5/12 md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow ">
        <button type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          v-on:click="toggleModl()" data-modal-toggle="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">Add Address</h3>
          <form class="space-y-6" action="#">
            <div>
              <label for="name" class="text-sm font-light text-gray-500 x-5">Name your address</label>
              <input type="text" id="name"
                class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
                v-model="name" placeholder="Home" required>
            </div>
            <div>
              <label for="" class="text-sm font-light text-gray-500 x-5">Search your address</label>
              <GMapAutocomplete placeholder="search your location" @place_changed="setPlace"
                class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm">
              </GMapAutocomplete>

            </div>

            <button type="button" @click="addressSave"
              class="flex items-center justify-center w-full p-2 mt-5 font-light text-white bg-blue-800 rounded-full cursor-pointer h-14">
              Save
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModl" class="fixed inset-0 z-40 bg-black opacity-25"></div>
</template>
<script>
// import { notify } from "@kyvg/vue3-notification";
import axios from "axios";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
// import Dimensions from './DimensionsComponent.vue'
// import Recipients from './ContactsComponent.vue'
// import Summary from './SummaryComponent.vue'
import Payment from './PaymentComponent.vue'
export default {
  name: 'MainComponent',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    // Dimensions,
    // Recipients,
    // Summary,
    Payment,
  },
  data() {
    return {
      summary: null,
      showDimensions: true,
      showPayment: false,
      deliveryStops: [],
      deliveryCourier: null,
      selectedPackage: null,
      showDetails: true,
      height: null,
      width: null,
      plength: null,
      weight: null,
      showModal: false,
      showModl: false,
      isLoggedIn: false,
      user: null,
      note: null,
      methods: null,
      vendor_pickup: false,
      AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
      address: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      orders: null,
      currency: null,
      packageTypes: null,
      couriers: null,
      showSummary: false,
      addresses: null,
      autocomplete: null,
      name: null,
      // couriers: null,
      currentPlace: null,
      recipients: [
        {
          name: "",
          phone: "",
          note: ""
        }
      ],
    }
  },
  mounted() {

    this.getPackageTypes();

    axios
      .get(this.base_url + "api/delivery/addresses", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => (this.addresses = response.data.data))
      .catch((error) => console.log(error));

    // this.deliveryStops = JSON.parse(localStorage.getItem("deliveryStops"));
    if (this.deliveryStops == null || this.deliveryStops.length == 0) {
      this.deliveryStops = [];
      this.addField({}, this.deliveryStops);
      this.addField({}, this.deliveryStops);
    }
    

  },

  methods: {
    addressSave() {
      let location = this.currentPlace.geometry.location
      let long = location.lng()
      let lat = location.lat()
      let address = this.currentPlace.name
      axios.post(this.base_url + 'api/delivery/addresses',
        {
          name: this.name,
          is_default: this.is_default,
          longitude: long,
          latitude: lat,
          address: address
        },

        {
          'headers': { 'Authorization': this.AuthStr }
        }
      )
        .then(function (response) {
          this.message = response.data.message
          window.location.reload();
        })
        .catch(error => console.log(error))
    },

    toPayment() {
      this.showSummary = false;
      this.showPayment = true;
      let mDeliveryZtops = [];
      this.deliveryStops.forEach((deliveryZtop) => {
        mDeliveryZtops.push({ "id": deliveryZtop.id });
      });
      axios
        .get(this.base_url + "api/payment/methods", {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.methods = response.data.data
          // console.log(this.methods)
        })
        .catch((error) => console.log(error));

      // order summary method
      axios
        .get(this.base_url + "api/package/order/summary",
          {
            params: {
              ignore_check: true,
              vendor_id: this.deliveryCourier.id,
              package_type_id: this.selectedPackage.id,
              stops: JSON.stringify(mDeliveryZtops),
              weight: this.weight,
            },
            headers: { Authorization: this.AuthStr },
          }
        )
        .then((response) => {
          this.summary = response.data;
          // console.log(this.summary)
        })
        .catch((error) => console.log(error));
    },

    addField(value, fieldType) {

      var maxStops = 3;
      if (this.settings) {
        //
        maxStops = this.settings.strings.maxParcelStops;
      }
      if (maxStops >= this.deliveryStops.length) {
        fieldType.push(value);
      }

      // console.log(fieldType)
      //check if the fieldType lenght is equal to the max stop allowed
    },

    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },

    showCouriers(selectedPkge) {
      if (selectedPkge != null) {
        // this.$store.commit("loading", true);
        axios.get(this.base_url + "api/vendors?type=package", {
          params: {
            package_type_id: selectedPkge.id,
            vendor_type_id: this.$route.params.id,
          },
          headers: { Authorization: this.AuthStr }
        }).then(function (response) {

          const mCouriers = response.data.data;
          console.log('all couriers', mCouriers)
          var foundCouriers = [];
          //filter vendor that service selected locations
          mCouriers.forEach((courier) => {

            //
            var allowVendor = false;
            //check that vendor service all the stops
            // console.log(this.deliveryStops)
            for (const deliveryStop of this.deliveryStops) {
              allowVendor = this.vendorServiceAddres(courier, deliveryStop);
              if (!allowVendor) {
                // console.log('stops here')
                break;

              }
            }

            // console.log('here first')
            // console.log(allowVendor)

            //double check if vendor allowed
            //then add to the array
            if (allowVendor) {
              foundCouriers.push(courier);
            }


          });

          this.couriers = foundCouriers;
          this.recipients = []
          this.deliveryStops.forEach(() => {
            this.recipients.push({
              name: "",
              phone: "",
              note: ""
            })
          })
          // console.log(this.couriers)
          // this.$store.commit("loading", false);

        }.bind(this)).catch(function (error) {
          console.log(error);
        }.bind(this));
      }
    },

    vendorServiceAddres(courier, address) {
      const countryAllowed = this.vendorServiceCountry(courier.countries, address.country ?? "");
      const stateAllowed = this.vendorServiceState(courier.states, address.state ?? "");
      const cityAllowed = this.vendorServiceCity(courier.cities, address.city ?? "");
      return countryAllowed || stateAllowed || cityAllowed;
    },

    vendorServiceCountry(countryArray, countryName) {
      var allowed = false;
      countryArray.forEach((countryObject) => {

        if (countryObject["name"].toLowerCase() == countryName.toLowerCase()) {
          allowed = true;
        }
      });

      return allowed;
    },

    vendorServiceState(stateArray, stateName) {
      var allowed = false;
      stateArray.forEach((stateObject) => {

        if (stateObject["name"].toLowerCase() == stateName.toLowerCase()) {
          allowed = true;
        }
      });

      return allowed;
    },

    vendorServiceCity(cityArray, cityName) {
      var allowed = false;
      cityArray.forEach((cityObject) => {

        if (cityObject["name"].toLowerCase() == cityName.toLowerCase()) {
          allowed = true;
        }
      });

      return allowed;
    },

    toggleModal: function () {
      this.showModal = !this.showModal;
    },

    toggleModl: function () {
      this.showModl = !this.showModl;
    },

    setPlace(place) {
      this.currentPlace = place
    },

    getPackageTypes() {
      // this.$store.commit("loading", true);
      axios
        .get(this.base_url + "api/package/types", {
          headers: { Authorization: this.AuthStr },
        })
        .then(
          function (response) {
            // this.$store.commit("loading", false);
            this.packageTypes = response.data;
          }.bind(this)
        );
    },


    recipientsIsValid() {

      // let allowNextPage = false;
      // this.recipients.forEach((recipient) => {
      //   if (recipient != null && Object.keys(recipient).length === 3) {
      //     //check for each node is set
      //     const rName = recipient.name;
      //     const rPhone = recipient.phone;
      //     const rNote = recipient.note;
      //     if (rName == null || rName == "" || !rName) {
      //       //alert there is empty name
      //       notify({
      //         type: "error",
      //         title: this.$t('parcel.recipientTitle'),
      //         text: this.$t('parcel.recipientEmptyName'),
      //       })
      //     } else if (rPhone == null || rPhone == "" || !rPhone) {
      //       //alert there is empty phone number
      //       notify({
      //         type: "error",
      //         title: this.$t('parcel.recipientTitle'),
      //         text: this.$t('parcel.recipientEmptyPhone'),
      //       })
      //     } else {
      //       allowNextPage = true;
      //     }
      //   }
      // });


      // if (allowNextPage) {
      //   this.toParameters();
      // }

    },

    toSummary() {
      this.showDetails = false
      this.showSummary = true;
      // if (this.fname != null && this.sname != null && this.weight != null && this.fphone != null && this.sphone != null) {
      //   this.showDetails = false
      //   // this.showSummary = true;
      // }

    },




  }
}
</script>
