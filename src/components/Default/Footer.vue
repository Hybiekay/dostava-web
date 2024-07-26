<template>
  <div class="container w-full p-8 mx-auto" v-if="settings">
    <div class="grid md:gap-5 md:grid-cols-4">
      <!-- <div class="w-80">
        <h1 class="text-2xl font-bold tracking-wide text-gray-700">
          Have any questions?
        </h1>
        <p class="my-4 text-sm font-light text-gray-500">
          Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit suscipit voluptate facere.
        </p>
        <button
          class="h-12 px-4 py-2 font-light text-white bg-blue-800 rounded-md w-44"
        >
          Get in touch
        </button>
      </div> -->
      <div class="flex flex-col mt-3 md:items-center md:w-52 md:mt-0">
        <div class="flex flex-col">
          <h1 class="mb-3 text-sm font-medium text-gray-500 uppercase">{{ $t('footer.header1') }}</h1>
          <a
            class="mb-3 text-sm font-light text-gray-500"
            target="__blank"
            :href="`${this.$store.state.baseUrl}pages/contact`"
            >{{ $t('footer.sub1') }}</a
          >
          <a
            class="mb-3 text-sm font-light text-gray-500"
            target="__blank"
            :href="`${this.$store.state.baseUrl}privacy/policy`"
            >{{ $t('footer.sub2') }}</a
          >
          <a
            class="mb-3 text-sm font-light text-gray-500"
            target="__blank"
            :href="`${this.$store.state.baseUrl}pages/terms`"
            >{{ $t('footer.sub3') }}</a
          >
        </div>
      </div>
      <div class="flex flex-col mt-3 md:mt-0 md:items-center md:w-52">
        <div class="flex flex-col">
          <h1 class="mb-3 text-sm font-medium text-gray-500 uppercase">
            {{ $t('footer.header2') }}
          </h1>
          <a
            class="mb-3 text-sm font-light text-gray-500"
            target="__blank"
            :href="`${this.$store.state.baseUrl}register/driver`"
            >{{ $t('footer.sub4') }}</a
          >
          <a
            class="mb-6 text-sm font-light text-gray-500"
            target="__blank"
            :href="`${this.$store.state.baseUrl}register/vendor`"
            >{{ $t('footer.sub5') }} {{ settings.strings.app_name }}?</a
          >
        </div>
      </div>
      <div class="flex flex-col mt-3 md:mt-0 md:items-center md:w-52">
        <div class="flex flex-col">
          <h1 class="mb-3 text-sm font-medium text-gray-500 uppercase">{{ $t('footer.header3') }}</h1>
          <a href="" class="mb-3 text-sm font-light text-gray-500"
            >{{ $t('footer.sub6') }}</a
          >
          <a href="" class="mb-3 text-sm font-light text-gray-500">{{ $t('footer.sub7') }}</a>
        </div>
      </div>
      <div class="flex flex-col mt-3 md:mt-0 md:items-center md:w-52">
        <div class="flex flex-col">
          <h1 class="mb-3 text-sm font-medium text-gray-500 uppercase">{{ $t('footer.header5') }}</h1>
          <a
            class="mb-3 text-sm font-light text-gray-500"
            v-for="vendor in vendors"
            :key="vendor.id"
          >
            <a
              class="text-gray-500"
              :href="
                $router.resolve({
                  params: {
                    id: vendor.id,
                    slug: sanitizeTitle(`${vendor.slug}`),
                  },
                }).href
              "
              >{{ vendor.name }}</a
            >
          </a>
        </div>
      </div>
    </div>
    <p class="mt-10 text-sm font-light text-gray-500">
      {{ settings.strings.website.websiteFooterBrief }}
    </p>
    <div class="flex justify-end space-x-2">
      <a
        :href="
          settings.strings.website.social
            ? settings.strings.website.social.fbLink
            : '#'
        "
        ><img src="/img/icons/facebook.png" class="w-4 h-4" alt=""
      /></a>
      <a
        :href="
          settings.strings.website.social
            ? settings.strings.website.social.igLink
            : '#'
        "
        ><img src="/img/icons/instagram.png" class="w-4 h-4" alt=""
      /></a>
      <a
        :href="
          settings.strings.website.social
            ? settings.strings.website.social.twLink
            : '#'
        "
        ><img src="/img/icons/twitter.png" class="w-4 h-4" alt=""
      /></a>
    </div>
    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "FooterView",
  data() {
    return {
      settings: null,
      vendors: null,
      base_url: this.$store.state.baseUrl,
    };
  },

  mounted() {
    this.$store.dispatch("fetchSettings", this.items).then(() => {
      this.settings = this.$store.state.settings;
    });

    axios
      .get(this.base_url + "api/vendor/types")
      .then((response) => {
        let vendorTypes = response.data;
        this.vendors = vendorTypes.slice(0, 4);
      })
      .catch((error) => console.log(error));
  },

  methods: {
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
  },
};
</script>
