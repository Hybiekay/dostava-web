<template>
    <nav class="flex justify-between w-full mb-2 font-light">
        <ol class="flex text-xs lg:max-w-7xl">
            <!-- <span v-if="firstCrumb != null"> -->
            <li><button @click="back" to="/" class="text-gray-900 hover:underline">Home</button></li>
            <!-- </span> -->
            <!-- <span v-if="secondCrumb != null"> -->
            <li v-if="secondCrumb != null"><span class="mx-2">></span></li>
            <li v-if="secondCrumb != null" class="">
                <a class="text-gray-500 hover:text-gray-600 hover:underline" v-if="routeName"
                    :href="$router.resolve({ name: routeName, params: { id: routeId, slug: sanitizeTitle(routeSlug) } }).href">{{
                        truncate(secondCrumb, 18) }}</a>
            </li>
            <!-- </span> -->
            <!-- <span v-if="thirdCrumb!= null">> -->
            <li v-if="thirdCrumb != null"><span class="mx-2">></span></li>
            <li v-if="thirdCrumb != null" class="">
                <a class="text-gray-500 hover:text-gray-600 md:hidden hover:underline" href="#">{{ truncate(thirdCrumb, 20)
                }}</a>
                <a class="hidden text-gray-500 md:flex hover:text-gray-600 hover:underline" href="#">{{ thirdCrumb }}</a>
            </li>
            <!-- </span> -->

        </ol>
        <select v-model="$i18n.locale" class="w-20 text-black bg-transparent rounded-md h-9">
            <option v-for="(lang, i) in $i18n.availableLocales" class="" :key="`Lang${i}`" :value="lang">
                <span>{{ lang }}</span>
            </option>
        </select>
    </nav>
</template>
<script>
export default {
    name: 'BreadCrumb',
    props: {
        // firstCrumb: String,
        secondCrumb: String,
        thirdCrumb: String,
        routeName: String,
        routeId: Number,
        routeSlug: String,
        // firstCrumbName: String,
        // fourthCrumb: String,
        // product: {
        //     type: Object,
        //     default: function () {}
        // }
    },
    data() {
        return {
            langs: ['en', 'es'],
        }
    },
    methods: {

        back() {
            this.$router.back()
        },

        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
        },

        sanitizeTitle(title) {
            var slug = "";
            // Change to lower case
            var titleLower = title.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
            // Letter "d"
            slug = slug.replace(/đ/gi, 'd');
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');

            return slug;
        },
    }
};
</script>
