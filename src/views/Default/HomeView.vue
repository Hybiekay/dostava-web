<template>
    <div v-if="vendors">


        <HomeBanner />
        <div class="container p-8 mx-auto mt-10 max-w-7xl" v-if="settings">
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <router-link :to="{ name: 'VendorHome', params: { id: vendor.id, slug: sanitizeTitle(vendor.name) } }"
                    class="flex flex-row" v-for="vendor in vendors" :key="vendor.id">
                    <div class="flex items-center justify-center w-8 p-2 rounded-full h-7 md:w-8 md:h-8"
                        :style="{ 'background-color': vendor.color }">
                        <img v-if="vendor" :src="vendor.logo" class="w-5 h-5" alt="">
                    </div>
                    <div class="ml-2">
                        <h1 class="text-sm font-bold">{{ vendor.name }}</h1>
                        <p class="mt-1 text-xs font-light text-gray-500">{{ truncate(vendor.description, 40) }}</p>
                    </div>
                </router-link>
            </div>
            <div class="container mx-auto mt-20 bg-blue-50 rounded-2xl md:max-w-7xl">
                <div class="flex flex-row ">
                    <div class="p-5 mr-10 md:w-6/12 md:p-9">
                        <h1 class="text-base font-extrabold text-black md:text-3xl">{{ $t('landingpageJoin') }}</h1>
                        <p class="mt-1 mb-2 text-xs font-light text-gray-500 md:text-sm md:w-96">
                            {{ $t('landingpageJoinSubHeader') }}
                        </p>
                        <a :style="{ 'background-color': settings.colors.primaryColor }"
                            :href="`${this.$store.state.baseUrl}register/vendor`" target="__blank"
                            class="flex items-center justify-center h-10 px-2 py-2 mt-5 mb-5 text-xs font-light text-center text-white rounded-full w-30 md:w-44 md:text-base md:h-14">
                            {{ $t('landingpageSellerHeader') }}</a>
                        <hr class="mt-2">
                        <div class="flex justify-between mt-3">
                            <div class="flex">
                                <img src="/img/icons/money.svg" class="w-5 h-5" alt="">
                                <div class="ml-2">
                                    <h1 class="text-xs font-medium md:text-sm">{{ $t('landingpageSellerFeat1') }}</h1>
                                    <p class="text-xs font-light text-gray-500">{{ $t('landingpageSellerFeat3') }}</p>
                                </div>
                            </div>
                            <div class="flex">
                                <img src="/img/icons/list.svg" class="w-5 h-5 font-light rotate-180" alt="">
                                <div class="ml-2">
                                    <h1 class="text-xs font-medium md:text-sm">{{ $t('landingpageSellerFeat2') }}</h1>
                                    <p class="text-xs font-light text-gray-500">{{ $t('landingpageSellerFeat4') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="/img/woman.JPG" class="hidden w-6/12 rounded-r-2xl md:h-80 md:flex" alt="">
                </div>
            </div>
            <div class="container flex flex-col items-center justify-center mx-auto my-20 md:max-w-7xl">
                <h1 class="text-base font-bold tracking-wide text-center md:text-3xl"> {{
                    $t('landingpageRide.landingpageRiderHeader') }}</h1>
                <p class="mt-2 text-xs font-light tracking-wide text-center text-gray-500 md:text-sm md:w-96">
                    {{ $t('landingpageRide.landingpageRiderSubHeader') }}
                </p>
                <a :style="{ 'background-color': settings.colors.primaryColor }"
                    :href="`${this.$store.state.baseUrl}register/driver`" target="__blank"
                    class="flex items-center justify-center h-10 px-2 py-2 mt-5 mb-5 text-xs font-light text-center text-white rounded-full w-30 md:w-40 md:text-base md:h-14">{{
                        $t('landingpageRide.landingpageRiderButton') }}</a>

            </div>

        </div>
        <div class="bg-blue-50">
            <div class="container max-w-full mx-auto">
                <div class="grid grid-cols-1 md:gap-5 py-14 md:grid-cols-2">
                    <div>
                        <img src="/img/phone.png" class="mx-auto md:w-72 md:h-72 h-52 w-52" alt="">
                    </div>
                    <div class="p-5 md:w-9/12">
                        <h1 class="text-xl font-bold tracking-wide md:text-3xl"> {{ $t('downloadPage.header') }}</h1>
                        <p class="my-3 text-sm font-light tracking-wide text-gray-500">
                            {{ $t('downloadPage.subHeader') }}
                        </p>
                        <!-- <div
                        class="flex items-center justify-between w-full p-1 mt-4 bg-white border border-blue-100 rounded-full">
                        <input class="w-full p-2 border-none rounded-full placeholder:font-light placeholder:text-sm"
                            v-model="search" type="text" placeholder="(+233) 12345 4563" />
                        <div class="w-56 p-2 bg-blue-800 rounded-full cursor-pointer ">
                            <p class="text-sm font-light text-white md:text-base">Text me the app</p>
                        </div>
                    </div> -->
                        <!-- <p class="my-3 text-xs font-light text-gray-500">We will send a text message to your phone with a
                        download link.</p> -->
                        <hr>
                        <div class="flex flex-row mt-6" v-if="settings">
                            <a :href="settings.strings.androidDownloadLink" target="__blank"><img src="/img/play-store.png"
                                    class=" h-9 md:h-20" /></a>
                            <a :href="settings.strings.iosDownloadLink" target="__blank"><img src="/img/app-store.png"
                                    class="h-9 md:h-20" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import HomeBanner from '@/components/Default/HomeBanner.vue'
export default {
    name: 'HomeView',

    components: {
        HomeBanner,
    },
    data() {
        return {
            vendors: null,
            settings: null,
            // base_url: this.$store.state.baseUrl,
            base_url: this.$store.state.baseUrl,
            search: null,
            types: null,
        };
    },
    mounted() {
        this.$store.commit('loading', true)
        axios
            .get(this.base_url + "api/vendor/types")
            .then((response) => {
                this.vendors = response.data;
                this.$store.commit('loading', false)
                // console.log(this.vendors)
            })
            .catch((error) => console.log(error));

        this.$store.dispatch("fetchSettings", this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency;
            // console.log(this.settings)
        });
    },

    methods: {
        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
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
    }

}
</script>

  

