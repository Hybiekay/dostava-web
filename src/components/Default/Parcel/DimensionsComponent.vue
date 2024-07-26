<template>
    <div v-show="dimension">
        <div class="grid grid-cols-2 gap-5">
            <div>
                <label for="name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Weight*</label>
                <input type="number" v-model="weight" id="name"
                    class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="200" required />
            </div>
            <div>
                <label for="phone" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Width</label>
                <input type="number" v-model="width" id="phone"
                    class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="200" />
            </div>
            <div>
                <label for="phone" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Height</label>
                <input type="number" id="phone"
                    class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="200" v-model="height" />
            </div>
            <div>
                <label for="phone" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Length</label>
                <input type="number" id="phone"
                    class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="200" v-model="plength" />
            </div>

        </div>
        <div class="flex flex-col items-center justify-center mt-5">
            <button type="button" @click="toSummary"
                class="flex items-center justify-center w-full h-10 p-2 font-light text-white bg-blue-800 rounded-full cursor-pointer">
                Next
            </button>
        </div>
    </div>

    <div class="w-full mx-auto" v-show="showSummary">
        <!-- summary -->
        <Summary />
    </div>
</template>

<script>
import Summary from './SummaryComponent.vue'
export default {
    name: 'DimensionComponent',
    components: {
        Summary,
    },
    // props: {
    //     showDimensions: Boolean,
    // },
    data() {
        return {
            dimension: true,
            showSummary: false,
            height: null,
            width: null,
            plength: null,
            weight: null,
        }
    },
    mounted() {
        this.summary = true
    },
    methods: {
        toSummary() {
            this.dimension = false;
            this.showSummary = true

        }
    }
}

</script>