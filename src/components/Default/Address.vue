<template>
  <div class="container max-w-6xl mx-auto">
    <div class="relative">

      <GMapMap :center="center" :zoom="zoomset" map-type-id="roadmap" class="mt-5 dimensions ">
        <!-- <GMapCluster> -->
        <GMapMarker @drag="handleMarkerDrag" :position="markers.position" :clickable="true" :draggable="true" />
        <!-- </GMapCluster> -->

      </GMapMap>
      <div class="absolute left-5 top-16" v-if="settings">
        <span class="flex flex-col p-5 bg-white rounded-lg w-72">
          <h1 class="mb-2 font-medium " v-if="!currentPlace">Choose your location</h1>
          <h1 class="mb-2 font-medium " v-else>Name</h1>
          <p class="text-sm font-light" v-if="currentPlace">{{ currentPlace.name }}, {{ currentPlace.formatted_address }}
          </p>
          <GMapAutocomplete v-if="!currentPlace" placeholder="search your location" @place_changed="setPlace"
            class="w-full h-12 px-3 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm">
          </GMapAutocomplete>
          <span v-else>
            <input type="text" v-model="name"
              class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
              placeholder="eg:Home address" required />
            <textarea placeholder="description" v-model="description"
              class="block w-full h-12 px-3 py-3 mt-1 border border-gray-200 rounded-lg bg-gray-50 placeholder:font-light sm:text-sm"
              id="" cols="5" rows="3"></textarea>
          </span>

          <button v-if="is_not_clicked"
            class="flex items-center justify-center w-full h-12 p-2 mt-4 font-light text-white bg-blue-800 rounded-full cursor-pointer"
            @click="addMarker">Search</button>
          <button v-else @click="addressSave"
            class="flex items-center justify-center w-full h-12 p-2 mt-4 font-light text-white bg-green-500 rounded-full cursor-pointer"
            :style="{ 'background-color': settings.colors.primaryColor }" type="button">
            Save
          </button>
        </span>
      </div>
    </div>
    <div>
      <h1 class="mt-10 mb-2 text-2xl font-medium">Shipping Addresses</h1>
      <div class="grid grid-cols-4 gap-5">
        <div class="flex flex-col" v-for="address in addresses" :key="address.id">
          <p class="font-medium ">{{ address.name }},</p>
          <p class="text-sm font-light">{{ address.address }},</p>
          <p class="text-xs">{{ address.country }},</p>
          <p class="text-xs">{{ address.description }}.</p>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
// import { notify } from "@kyvg/vue3-notification";

export default {
  name: 'AddressDefault',
  components: {
    //
  },
  data() {
    return {
      addresses: null,
      AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
      is_default: '',
      markers: [],
      center: { lat: 8.7832, lng: 34.5085 },
      autocomplete: null,
      map: null,
      places: [],
      currentPlace: null,
      zoomset: 1,
      settings: null,
      base_url: this.$store.state.baseUrl,
      name: null,
      description: null,
      is_not_clicked: true,
    }
  },

  mounted() {
    this.$store.dispatch('fetchSettings', this.items).then(() => {
      this.settings = this.$store.state.settings;
    })

    axios.get(this.base_url + 'api/delivery/addresses', {
      'headers': { 'Authorization': this.AuthStr }
    })
      .then((response) => {
        this.addresses = response.data.data
      })
      .catch(error => console.log(error))

    navigator.geolocation.getCurrentPosition((position) => {
      this.markers.position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,

      }
    })
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place
    },

    addMarker() {
      if (this.currentPlace) {
        this.is_not_clicked = false
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),

        }

        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.markers.position = marker
        this.center = marker
        this.zoomset = 18
      }

    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.markers.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },


    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.markers.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },

    addressSave() {
      let location = this.currentPlace.geometry.location
      let long = location.lng()
      let lat = location.lat()
      let address = this.currentPlace.name
      axios.post(this.base_url + 'api/delivery/addresses',
        {
          name: this.name,
          description: this.description,
          longitude: long,
          latitude: lat,
          address: address
        },

        {
          'headers': { 'Authorization': this.AuthStr }
        }
      )
        .then(function (response) {
          response
          window.location.reload();
        })
        .catch(error => console.log(error))
    }

  }
}
</script>

<style>
.dimensions {
  width: 72rem;
  height: 50rem;
}

@media only screen and (max-width: 600px) {
  .dimensions {
    width: 20rem;
    height: 40rem;
  }
}</style>