<template>
    <div class="px-3 mx-auto" v-if="category">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-col items-center justify-center h-48 border border-b border-r border-gray-200 md:mr-5 md:w-80">
                <div class="flex items-center justify-center h-20 p-1 border border-gray-300 rounded-full md:w-20 ">
                    <img :src="category.photo" class="w-16 h-16 rounded-full" alt="">
                </div>
                <p class="text-sm font-medium text-center text-gray-700">{{ category.name }}</p>
                <!-- <p class="text-xs text-gray-600">Prices for everyone</p> -->
                <!-- <div class="flex items-center justify-center">
                    <img src="/img/quality.png" class="w " alt="">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg" size="16" class="css-1emnyvb"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.553 1.88a2 2 0 0 0-3.111 0l-.408.504a2 2 0 0 1-2.075.674l-.626-.168a2 2 0 0 0-2.517 1.828l-.033.648A2 2 0 0 1 3.501 7.13l-.606.232a2 2 0 0 0-.961 2.958l.353.544a2 2 0 0 1 0 2.181l-.353.544a2 2 0 0 0 .961 2.958l.606.232a2 2 0 0 1 1.282 1.765l.033.648a2 2 0 0 0 2.517 1.828l.626-.168a2 2 0 0 1 2.075.674l.408.504a2 2 0 0 0 3.11 0l.408-.504a2 2 0 0 1 2.075-.674l.626.168a2 2 0 0 0 2.517-1.828l.033-.648a2 2 0 0 1 1.283-1.765l.605-.232a2 2 0 0 0 .962-2.958l-.354-.544a2 2 0 0 1 0-2.181l.354-.544a2 2 0 0 0-.962-2.958l-.605-.232a2 2 0 0 1-1.283-1.765l-.033-.648A2 2 0 0 0 16.66 2.89l-.626.168a2 2 0 0 1-2.075-.674l-.408-.504Zm-7.367 9.266a1.5 1.5 0 0 1 2.121-.001l1.943 1.94 5.436-5.44a1.5 1.5 0 1 1 2.122 2.121l-6.497 6.5a1.5 1.5 0 0 1-2.12 0l-3.004-3a1.5 1.5 0 0 1 0-2.12Z"></path></svg>
                    <p class="mt-1 text-xs text-blue-700">100% satisfaction guarantee</p>
                </div> -->
                
            </div>
            <div class="w-full">
                <!-- <a :href="$router.resolve({ name: 'DefaultCategory', params: { id: subcategories.id, slug: sanitizeTitle(subcategories.name) } }).href" class="flex flex-row px-8 py-5">
                    <div class="flex flex-col">
                        <img :src="subcategories.photo" class="w-10 h-10 mx-auto rounded-full" alt="">
                        <p class="pt-1 text-xs text-gray-600">{{ subcategories.name }}</p>
                    </div>
                </a> -->
                
                <span v-if="products != 0">
                    <h5 class="mt-10 font-medium text-gray-700 md:text-2xl">Products</h5>
                    <ProductsList :products="products" :responce="resp" @load-more="loadMore" @load-less="loadLess"/>
                </span>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ProductsList from '@/components/Default/ProductsList.vue'
// import Breadcrumb from '@/components/Default/Breadcrumb.vue'
// import ProductInfo from '@/components/Default/Product/ProductInfo.vue'
// import VendorProducts from '@/components/Default/Product/ProductsFromVendor.vue'
// import Recommended from '@/components/Default/Product/Recommended.vue'
export default {
    name: 'DefaultCategory',
    components: {
        ProductsList,
        // VueHorizontal,
        // ProductInfo,
        // Breadcrumb,
        // VendorProducts,
        // Recommended,
    },
    data() {
        return {
            products: null,
            product: null,
            base_url: this.$store.state.baseUrl,
            recommended: null,
            categories: null,
            category: null,
            subcategories: null,
            resp: null,
            pageNo: 1
        }
    },

    mounted() {
        this.$store.commit("loading", true)
        axios.get(this.base_url + 'api/products?category_id=' + this.$route.params.id)
            .then((response) => {
                this.products = response.data.data
                // console.log(pro)
                this.resp = response.data
            })
            .catch(error => console.log(error))


        axios.get(this.base_url + 'api/categories?type=sub')
            .then((response) => {
                let scategories = response.data.data
                this.subcategories = scategories.find(cate => cate.id == this.$route.params.id)
                console.log(scategories)
            })
            .catch(error => console.log(error))


        axios.get(this.base_url + 'api/categories')
            .then((response) => {
                this.categories = response.data.data
                this.category = this.categories.find(cate => cate.id == this.$route.params.id)
                this.$store.commit("loading", false)
            })
            .catch(error => console.log(error))
    },

    methods: {
        loadLess() {
            this.$store.commit("loading", true)
            
            axios.get(this.base_url + "api/products?category_id=" + this.$route.params.id)
                .then((response) => {
                    this.resp = response.data
                    this.products = response.data.data;
                    this.$store.commit("loading", false);
                })

        },

        loadMore() {
              this.$store.commit("loading", true)
            this.pageNo++
            axios.get(this.base_url + "api/products?page=" + this.pageNo + "&category_id=" + this.$route.params.id)
                .then((response) => {
                    this.products = this.products.concat(response.data.data);
                    this.resp = response.data
                    this.$store.commit("loading", false)
                    
                   
                })
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

