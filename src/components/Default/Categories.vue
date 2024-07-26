<template>
    <div class=" md:px-0 px-7 bg-slate-50">
        <vue-horizontal class="container flex items-center h-12 mx-auto ">
            <router-link :to="{ name: 'DefaultCategory', params: { id: category.id, slug: sanitizeTitle(category.name) }}" class="px-4 py-2" v-for="category in categories" :key="category.id">
                <p class="w-16 text-xs text-gray-500 capitalize truncate">{{ category.name }}</p>
            </router-link>
        </vue-horizontal>
    </div>
</template>
  
<script>
import VueHorizontal from 'vue-horizontal';

export default {
    name: 'CategoryHome',
    components: {
        VueHorizontal
    },
    props: {
        categories: Object
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
  