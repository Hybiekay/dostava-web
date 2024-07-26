<template>
    <div class="container mx-auto mt-5 font-sans antialiased max-w-7xl">
        <h4 class="mt-10 text-2xl font-medium text-center">Vendors</h4>
        <div class="grid grid-cols-4 gap-5 mt-5">
            <div v-for="vendor in vendors" :key="vendor.id">
                <router-link :to="{ name: 'DefaultVendor', params: { id: vendor.id, slug: sanitizeTitle(vendor.name) }}" class="flex flex-col items-center justify-center w-64 h-56 p-3 space-y-2 border border-gray-200 rounded-md">
                    <h5 class="mt-2 font-semibold text-gray-700">{{ vendor.name }}</h5>
                    <img :src="vendor.feature_image" class=" h-28" alt="">
                   
                    <p class="mt-2 text-xs">{{ vendor.description }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "DefaultCategories",
    data() {
        return {
            vendors: null,
            settings: null,
            base_url: this.$store.state.baseUrl,
            pageNo: 1,
            pagination: null,
        }
    },
    mounted() {
        axios
            .get(this.base_url + "api/vendors?page=" + this.pageNo)
            .then((response) => {
                this.vendors = response.data.data;
                this.pagination = response.data
                console.log(response);
            })
            .catch((error) => console.log(error));
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