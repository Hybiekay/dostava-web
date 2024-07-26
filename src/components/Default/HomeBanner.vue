<template>
    <div class="bg-blue-50">
        <!-- <img :src="(`/img/${lang}.png`)"> -->

        <div class="container mx-auto max-w-7xl">
            <select v-model="$i18n.locale" class="w-16 px-3 m-2 text-black bg-transparent rounded-md">
                <option v-for="(lang, i) in $i18n.availableLocales" class="" :key="`Lang${i}`" :value="lang">
                    <span>{{ lang }}</span>
                </option>
            </select>
            <div class="flex flex-col items-center justify-center p-8">


                <h1 class="mt-5 text-3xl font-bold text-center text-black " v-text="$t('landingpageHeader')"></h1>
                <p class="mt-4 text-sm font-light text-center text-gray-500 md:w-96"> {{ $t('landingpageSubHeader') }}</p>
                <div class="flex items-center justify-between p-1 mt-4 bg-white rounded-full md:w-5/12" v-if="settings">
                    <input class="w-full p-2 border-none rounded-full placeholder:font-light placeholder:text-sm"
                        v-model="search" type="text" placeholder="search a product or vendor" />
                    <div @click="getSearchResult" class="flex items-center p-2 rounded-full cursor-pointer"
                        :style="{ 'background-color': settings.colors.primaryColor }">
                        <img src="/img/icons/search.svg" class="w-6" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
export default {
    name: 'HomeBanner',
    components: {

    },
    data() {
        return {
            search: null,
            base_url: this.$store.state.baseUrl,
            langs: ['en', 'es'],
            settings: null
        }
    },

    mounted() {
        axios
            .get(this.base_url + 'api/app/settings')
            .then((response) => {
                this.settings = response.data
            })
            .catch((error) => console.log(error));
    },

    methods: {
        getSearchResult() {
            router.push({ name: 'DefaultSearch', params: { slug: this.search } })
        }
    }
}
</script>