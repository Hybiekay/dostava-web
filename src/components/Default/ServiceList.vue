<template>
    <div class="container mx-auto max-w-7xl">
        <div class="flex items-center justify-between">
            <h1 class="mb-5 text-xl font-medium ">Services</h1>
            <router-link :to="{ name: 'DefaultServices', params: { id: $route.params.id, slug: $route.params.slug }}" class="text-xs font-light">{{ $t('pages.seeall') }}</router-link>
        </div>
        
        <div class="grid grid-cols-2 gap-5 md:divide-x md:grid-cols-6">
            <router-link :to="{ name: 'DefaultService', params: { id: vendor.id, slug: sanitizeTitle(vendor.name) }}" class="flex flex-row p-1 md:w-52" v-for="vendor in vendors" :key="vendor.id">
                <img v-if="vendor" v-bind:src="vendor.photo" class="w-5 h-5 md:w-14 md:h-14" alt="">
                <div class="ml-2">
                    <h1 class="font-bold ">{{ truncate(vendor.name, 15) }}</h1>
                    <p class="mt-1 text-sm font-light text-gray-500" v-html="vendor.description"></p>
                </div>
            </router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'VendorHome',
    components: {
    },
    props: {
        vendors: Object
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
}
</script>
  