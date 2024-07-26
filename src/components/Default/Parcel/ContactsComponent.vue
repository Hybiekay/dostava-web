<template>
    <form class="" action="#" v-for="(stop, index) in deliveryStops" :key="index">
        <h3 class="mt-1 mb-5 text-sm font-medium">Contact Info({{ stop.name }})</h3>
        <!-- <hr> -->
        <div class="grid grid-cols-2 gap-5">
            <div>
                <label for="name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" id="name"
                    class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="John Doe" v-model="recipients[index].name" />
                <!-- v-model="contacts[index].name" -->
            </div>
            <div>
                <label for="phone" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Phone</label>
                <input type="tel" id="phone"
                    class="block w-full h-8 px-3 py-3 mt-1 border border-gray-200 rounded-lg placeholder:text-xs bg-gray-50 placeholder:font-light sm:text-sm"
                    placeholder="0000000000" v-model="recipients[index].phone" />
                <!-- v-model="contacts[index].phone" -->
            </div>
            <div>
                <label for="message" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Your
                    message</label>
                <textarea id="message" rows="2"
                    class="block placeholder:text-xs p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder:font-light dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="your notes here..." v-model="recipients[index].note"></textarea>
                <!-- v-model="contacts[index].note" -->
            </div>
        </div>
    </form>
</template>
<script>
export default {
    name: 'ContactComponent',
    props: {
        deliveryStops: Object
    },
    data() {
        return {
            recipients: [
                {
                    name: "",
                    phone: "",
                    note: ""
                }
            ],
        }
    }
}
</script>