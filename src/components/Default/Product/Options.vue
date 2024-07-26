<template>
    <div class="mt-20 mb-10" v-if="product.option_groups">
        <p class="mb-3 text-4xl text-center text-gray-700" v-if="product.option_groups.length != '0'">Specials</p>
        <!-- <p class="mt-4 text-sm text-gray-600" v-if="product.option_groups.length != '0'">
                    Select options to add them to the product</p> -->

        <div v-for="option_group in product.option_groups" :key="option_group.id">
            <p class="mt-5 mb-3 text-xs font-medium text-gray-500 md:text-sm">{{ option_group.name }}</p>

            <div class="" v-if="option_group.multiple == 0">
                <RadioGroup v-model="selectedSpecial">
                    <!-- <RadioGroupLabel class="mt-5 mb-2">Payment Methods</RadioGroupLabel> -->
                    <!-- <p class="mt-5 mb-2 text-sm text-black">Payment Methods</p> -->
                    <div class="grid grid-cols-6 gap-2">
                        <RadioGroupOption as="template" v-for="option in option_group.options" :key="option"
                            :value="option" v-slot="{ active, checked }">
                            <div :class="[
                                active
                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-300'
                                    : '',
                                checked ? 'bg-blue-900 text-white ' : 'bg-white ',
                            ]"
                                class="relative flex w-40 px-2 py-2 rounded-lg shadow-md cursor-pointer focus:outline-none">
                                <!-- bg-opacity-75 -->
                                <div class="flex items-center justify-between w-full">
                                    <div class="flex items-center w-44">
                                        <div class="text-xs">
                                            <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-gray-900'"
                                                class="w-32 text-xs font-light">
                                                <div class="flex items-center flex-shrink-0">
                                                    <img class="object-contain w-14 h-14" v-if="option"
                                                        v-bind:src="option.photo" alt="">
                                                </div>
                                                <div class="flex justify-between">
                                                    <div>{{ truncate(option.name, 10) }}</div>
                                                    <div>{{ currency }}{{ option.price }}</div>
                                                </div>

                                            </RadioGroupLabel>
                                            <RadioGroupDescription as="span"
                                                :class="checked ? 'text-sky-100' : 'text-black'" class="inline text-xs">
                                                <span> {{ option.description }}</span>
                                                <!-- <span aria-hidden="true"> &middot; </span> -->

                                            </RadioGroupDescription>
                                        </div>
                                    </div>
                                    <div v-show="checked" class="text-white shrink-0">
                                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                                            <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </RadioGroupOption>
                        <!-- {{ selectedSpecial }} -->
                    </div>
                </RadioGroup>
            </div>
            <div class="grid gap-5 md:grid-cols-10" v-else-if="option_group.multiple == 1">
                <!-- .slice(0, 5) -->
             
                <div class="w-24 mt-2 rounded-lg shadow-md hover:text-white hover:bg-blue-900 bg-gray-50"
                    v-for="(option, index) in option_group.options" :key="index">
                    <div class="flex flex-col p-2">
                        <h5 class="text-xs text-center truncate">{{
                                truncate(option.name,
                                13)
                            }}</h5>
                        <div class="">
                            <img class="object-contain w-24 h-20" v-if="option" v-bind:src="option.photo" alt="">
                        </div>
                        <div class="flex flex-col p-2">
                            
                            <!-- <p class="my-1 text-xs text-gray-500">{{ option.description }}</p> -->
                            <div class="flex justify-between">
                                <p class="text-xs font-light">{{ currency }}{{ option.price.toFixed(2) }}
                                </p>

                                <input type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    v-model="selectedSpecials" :value="option">
                                    
                            </div>
                            <!-- {{ selectedSpecials }} -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
// import { ref } from 'vue'
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
} from '@headlessui/vue'

</script>
<script>
export default {
    name: 'OptionsDefault',
    props: {
        product: Object,
        currency: String,
    },

    data() {
        return {
            selectedSpecials: [],
            selectedSpecial: null
        }
    },
    mounted() {
        if(this.selectedSpecial || this.selectedSpecials){
            console.log(this.selectedSpecial)
            console.log(this.selectedSpecials)
        }
    },
    methods: {
        truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
        },
    }
}
</script>