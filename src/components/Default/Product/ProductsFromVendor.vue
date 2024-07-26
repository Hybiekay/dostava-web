<template>
    <div class="mt-5">
        <h5 class="mb-5 text-2xl font-medium text-gray-700">{{ $t('product.sameVendor') }}</h5>
        <vue-horizontal class="container flex items-center mx-auto ">
            <section class="flex flex-row space-x-5" v-if="products">
                <div class=" md:w-64 w-44" v-for="product in products" :key="product.id">
                    <a :href="$router.resolve({ name: 'DefaultProduct', params: { id: product.id, slug: sanitizeTitle(product.name ? product.name : product.vendor.name) }}).href">
                        <img :src="product.photo" class="h-40 md:h-52 w-44 md:w-64" alt="">
                        <div class="flex justify-between mt-2">
                            <p class="text-xs font-light">{{ product.name }}</p>
                            <img src="/img/icons/favourite-border.svg" class="w-6 h-6" alt="">
                        </div>
                        <p class="font-medium">{{ currency }}{{ product.price }}</p>

                    </a>
                    <a :href="$router.resolve({ name: 'DefaultVendor', params: { id: product.vendor.id, slug: sanitizeTitle(product.vendor.name) }})" class="mt-2 text-xs text-gray-500 underline">{{ product.vendor.name }}</a>
                </div>

            </section>

        </vue-horizontal>
        <hr class="mt-2">
    </div>
</template>
  
<script>
import VueHorizontal from 'vue-horizontal';

export default {
    name: 'RecommendedHome',
    props: {
     products: Object   
    },
    components: { VueHorizontal },
    data() {
        return {
            currency: null
        }
    },
    mounted() {
    this.$store.dispatch("fetchSettings", this.items).then(() => {
      this.settings = this.$store.state.settings;
      this.currency = this.settings.strings.currency;
    });
  },

  methods: {
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
    //...
}
</script>
  