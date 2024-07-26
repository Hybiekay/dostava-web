<template>
    <div class="container p-8 mx-auto max-w-7xl" v-if="product">
        <Breadcrumb :routeName="`DefaultVendor`" :routeId="product.vendor.id" :routeSlug="product.vendor.name"
            :secondCrumb="product.vendor.name" :thirdCrumb="product.name" />
        <!-- <section class="py-20" v-if="product">
            <div class="container px-4 mx-auto">
                <div class="max-w-xl mx-auto lg:max-w-6xl">
                    <div class="flex flex-wrap mb-12 -mx-4">
                        <div class="w-full px-4 mb-12 lg:w-1/2 lg:mb-0">
                            <div class="lg:w-112">
                                <a class="relative block w-full mb-6 rounded-md group h-112 bg-blueGray-900" href="#">
                                    <div
                                        class="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                                        <img class="object-cover w-full h-full border-2 border-black rounded-md img-fluid"
                                            :src="product.photo" alt="">
                                    </div>
                                </a>
                                <div class="flex flex-wrap justify-between -mx-3 -mb-3">
                                    <div class="w-1/2 px-3 mb-3 xs:w-1/4">
                                        <a class="relative block w-full h-24 rounded-md group bg-blueGray-900" href="#">
                                            <div
                                                class="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                                                <img class="object-cover w-full h-full border-2 border-black rounded-md img-fluid"
                                                    :src="product.photo"
                                                    alt="">
                                            </div>
                                        </a>
                                    </div>
                                    <div class="w-1/2 px-3 mb-3 xs:w-1/4">
                                        <a class="relative block w-full h-24 rounded-md group bg-blueGray-900" href="#">
                                            <div
                                                class="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                                                <img class="object-cover w-full h-full border-2 border-black rounded-md img-fluid"
                                                    :src="product.photo"
                                                    alt="">
                                            </div>
                                        </a>
                                    </div>
                                    <div class="w-1/2 px-3 mb-3 xs:w-1/4">
                                        <a class="relative block w-full h-24 rounded-md group bg-blueGray-900" href="#">
                                            <div
                                                class="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                                                <img class="object-cover w-full h-full border-2 border-black rounded-md img-fluid"
                                                    :src="product.photo"
                                                    alt="">
                                            </div>
                                        </a>
                                    </div>
                                    <div class="w-1/2 px-3 mb-3 xs:w-1/4">
                                        <a class="relative block w-full h-24 rounded-md group bg-blueGray-900" href="#">
                                            <div
                                                class="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                                                <img class="object-cover w-full h-full border-2 border-black rounded-md img-fluid"
                                                    :src="product.photo"
                                                    alt="">
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full px-4 lg:w-1/2">
                            <div class="max-w-lg">
                                <h2 class="mb-1 text-4xl font-black">{{ product.name }}</h2>
                                <span class="block mb-5 text-sm font-bold">{{ product.vendor.name }}</span>
                                <div class="flex items-center mb-4">
                                    <button class="inline-block mr-2">
                                        <svg width="20" height="20" viewbox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                                                fill="#474BC5"></path>
                                        </svg>
                                    </button>
                                    <button class="inline-block mr-2">
                                        <svg width="20" height="20" viewbox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                                                fill="#474BC5"></path>
                                        </svg>
                                    </button>
                                    <button class="inline-block mr-2">
                                        <svg width="20" height="20" viewbox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                                                fill="#474BC5"></path>
                                        </svg>
                                    </button>
                                    <button class="inline-block mr-2">
                                        <svg width="20" height="20" viewbox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57428 0.42926 9.19097 0.682715 9.02266 1.07518L6.74004 6.41696L0.96658 6.94112C0.542375 6.98033 0.184089 7.26705 0.0524023 7.67203C-0.0792845 8.07701 0.0423312 8.5212 0.363232 8.80121L4.72659 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85248 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.3419 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203V7.67203Z"
                                                fill="#474BC5"></path>
                                        </svg>
                                    </button>
                                    <button class="inline-block">
                                        <svg width="20" height="20" viewbox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.9479 7.67203C19.817 7.26705 19.4578 6.97942 19.0328 6.94112L13.2603 6.41696L10.9777 1.07427C10.8094 0.682715 10.4261 0.42926 10.0002 0.42926C9.57429 0.42926 9.19098 0.682715 9.02267 1.07518L6.74005 6.41696L0.966583 6.94112C0.542377 6.98033 0.184092 7.26705 0.0524051 7.67203C-0.0792816 8.07701 0.0423341 8.5212 0.363235 8.80121L4.7266 12.6279L3.43994 18.2956C3.34579 18.7124 3.50754 19.1431 3.85331 19.3931C4.03917 19.5273 4.25661 19.5957 4.47589 19.5957C4.66495 19.5957 4.85249 19.5447 5.02079 19.444L10.0002 16.468L14.9777 19.444C15.342 19.6632 15.8011 19.6432 16.1461 19.3931C16.492 19.1424 16.6536 18.7114 16.5595 18.2956L15.2728 12.6279L19.6362 8.80197C19.9571 8.5212 20.0796 8.07777 19.9479 7.67203Z"
                                                fill="#E8E8F8"></path>
                                            <defs>
                                                <rect width="20" height="20" fill="white"></rect>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                                <span v-if="product.discount_price > 0" class="flex mt-3 space-x-2">

                                    <p class="block mb-4 text-2xl font-black text-green-500">{{ currency }}{{
                                        product.discount_price.toFixed(2)
                                    }}</p>
                                    <p class="text-xs ">{{ currency }}<span class="line-through">{{
                                        product.price.toFixed(2)
                                    }}</span> </p>
                                </span>
                                <span v-else>
                                    <p class="text-2xl font-medium ">{{ currency }}{{ product.price.toFixed(2) }}</p>
                                </span>
                                <p class="mb-2 font-bold">
                                    {{ product.description }}
                                </p>
                                <ul class="mb-6 font-medium list-disc list-inside">
                                    <li>Pariatur ex aliqua elit ut enim consequat amet non do ut.</li>
                                    <li>Ad aute deserunt fugiat qui Lorem in quis velit labore voluptate.</li>
                                    <li>Lorem in quis velit labore</li>
                                </ul>
                                <div class="flex flex-wrap mb-4">
                                    <div class="w-full mb-4 sm:w-auto sm:mb-0 sm:mr-4">
                                        <span class="block mb-2 text-sm font-black">Amount</span>
                                        <div
                                            class="flex items-center justify-between w-24 h-12 px-2 border-2 border-black rounded-md">
                                            <button
                                                @click="decrement()"
                                                class="flex w-3.5 h-3.5 px-px items-center justify-center bg-black hover:bg-indigo-500 rounded transition duration-100">
                                                <div class="w-full h-px mx-px bg-white"></div>
                                            </button>
                                            <input
                                                class="w-10 text-sm font-bold text-center text-black placeholder-black outline-none"
                                                 v-model="quantity" placeholder="2">
                                            <button
                                                @click="increment(product)"
                                                class="relative flex w-3.5 h-3.5 px-px py-px items-center justify-center bg-black hover:bg-indigo-500 rounded transition duration-100">
                                                <div class="relative w-full h-full py-px">
                                                    <div class="absolute left-0 w-full h-px bg-white top-1/2"></div>
                                                    <div class="inline-block h-full mx-auto bg-white max-w-max">
                                                        <div class="inline-block px-px"></div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="w-full sm:w-auto">
                                        <span class="block mb-2 text-sm font-black">Size</span>
                                        <div
                                            class="relative w-32 h-12 overflow-hidden border-2 border-black rounded-md group">
                                            <select
                                                class="w-full h-full px-4 text-sm font-bold outline-none appearance-none"
                                                name="" id="">
                                                <option value="1">Small</option>
                                                <option value="1">Medium</option>
                                                <option value="1">Large</option>
                                            </select>
                                            <span
                                                class="absolute right-0 mr-3 text-black transform -translate-y-1/2 top-1/2 group-hover:text-indigo-500">
                                                <svg width="10" height="6" viewbox="0 0 10 6" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.94667 0.453308H4.79333H1.05333C0.413333 0.453308 0.0933335 1.22664 0.546667 1.67997L4 5.13331C4.55333 5.68664 5.45333 5.68664 6.00667 5.13331L7.32 3.81997L9.46 1.67997C9.90667 1.22664 9.58667 0.453308 8.94667 0.453308Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-wrap items-center mb-6 -mx-2 sm:flex-nowrap">
                                    <div class="w-full px-2 mb-4 flex-grow-1">
                                        <a class="relative inline-block w-full h-12 -mb-2 rounded-md group bg-blueGray-900"
                                            href="#">
                                            <div
                                                class="absolute top-0 left-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-0">
                                                <div
                                                    class="flex items-center justify-center w-full h-full bg-green-600 border-2 border-black rounded-md">
                                                    <span class="text-base font-black text-black">Add to Cart</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="w-auto px-2 mb-4">
                                        <a class="inline-flex items-center justify-center w-12 h-12 text-black transition duration-200 border-2 border-black rounded-md hover:text-indigo-500 hover:border-indigo-500"
                                            href="#">
                                            <svg width="20" height="18" viewbox="0 0 20 18" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14.44 0.0999756C12.63 0.0999756 11.01 0.979976 10 2.32998C8.99 0.979976 7.37 0.0999756 5.56 0.0999756C2.49 0.0999756 0 2.59998 0 5.68998C0 6.87998 0.19 7.97998 0.52 8.99998C2.1 14 6.97 16.99 9.38 17.81C9.72 17.93 10.28 17.93 10.62 17.81C13.03 16.99 17.9 14 19.48 8.99998C19.81 7.97998 20 6.87998 20 5.68998C20 2.59998 17.51 0.0999756 14.44 0.0999756Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="w-auto px-2 mb-4">
                                        <a class="inline-flex items-center justify-center w-12 h-12 text-black transition duration-200 border-2 border-black rounded-md hover:text-indigo-500 hover:border-indigo-500"
                                            href="#">
                                            <svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M20.36 12.7299C19.99 12.7299 19.68 12.45 19.64 12.08C19.4 9.87995 18.22 7.89995 16.4 6.63995C16.07 6.40995 15.99 5.95995 16.22 5.62995C16.45 5.29995 16.9 5.21995 17.23 5.44995C19.4 6.95995 20.8 9.31995 21.09 11.93C21.13 12.33 20.84 12.6899 20.44 12.7299C20.41 12.7299 20.39 12.7299 20.36 12.7299Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M3.74001 12.78C3.72001 12.78 3.69001 12.78 3.67001 12.78C3.27001 12.74 2.98001 12.38 3.02001 11.98C3.29001 9.36996 4.67001 7.00996 6.82001 5.48996C7.14001 5.25996 7.60001 5.33996 7.83001 5.65996C8.06001 5.98996 7.98001 6.43996 7.66001 6.66996C5.86001 7.94996 4.69001 9.92996 4.47001 12.12C4.43001 12.5 4.11001 12.78 3.74001 12.78Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M15.99 21.1C14.76 21.69 13.44 21.99 12.06 21.99C10.62 21.99 9.24998 21.67 7.96998 21.02C7.60998 20.85 7.46998 20.41 7.64998 20.05C7.81998 19.69 8.25998 19.55 8.61998 19.72C9.24998 20.04 9.91998 20.26 10.6 20.39C11.52 20.57 12.46 20.58 13.38 20.42C14.06 20.3 14.73 20.09 15.35 19.79C15.72 19.62 16.16 19.76 16.32 20.13C16.5 20.49 16.36 20.93 15.99 21.1Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M12.05 2.01001C10.5 2.01001 9.22998 3.27001 9.22998 4.83001C9.22998 6.39001 10.49 7.65001 12.05 7.65001C13.61 7.65001 14.87 6.39001 14.87 4.83001C14.87 3.27001 13.61 2.01001 12.05 2.01001Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M5.05001 13.87C3.50001 13.87 2.23001 15.13 2.23001 16.69C2.23001 18.25 3.49001 19.51 5.05001 19.51C6.61001 19.51 7.87001 18.25 7.87001 16.69C7.87001 15.13 6.60001 13.87 5.05001 13.87Z"
                                                    fill="currentColor"></path>
                                                <path
                                                    d="M18.95 13.87C17.4 13.87 16.13 15.13 16.13 16.69C16.13 18.25 17.39 19.51 18.95 19.51C20.51 19.51 21.77 18.25 21.77 16.69C21.77 15.13 20.51 13.87 18.95 13.87Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <span class="block mb-2 text-sm font-black">Share on Social Media</span>
                                <div>
                                    <a class="inline-block mr-6 text-green-500 hover:text-indigo-500" href="#">
                                        <svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M13.6349 20.7272V12.766H16.3583L16.7669 9.66243H13.6349V7.68126C13.6349 6.78299 13.8882 6.17083 15.203 6.17083L16.8771 6.17015V3.39421C16.5876 3.35731 15.5938 3.27271 14.4371 3.27271C12.0217 3.27271 10.3681 4.71878 10.3681 7.37389V9.66243H7.63647V12.766H10.3681V20.7272H13.6349Z"
                                                fill="currentColor"></path>
                                            <mask id="mask0_601_10113" style="mask-type:alpha"
                                                maskunits="userSpaceOnUse" x="7" y="3" width="10" height="18">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M13.6349 20.7272V12.766H16.3583L16.7669 9.66243H13.6349V7.68126C13.6349 6.78299 13.8882 6.17083 15.203 6.17083L16.8771 6.17015V3.39421C16.5876 3.35731 15.5938 3.27271 14.4371 3.27271C12.0217 3.27271 10.3681 4.71878 10.3681 7.37389V9.66243H7.63647V12.766H10.3681V20.7272H13.6349Z"
                                                    fill="white"></path>
                                            </mask>
                                        </svg>
                                    </a>
                                    <a class="inline-block mr-6 text-green-500 hover:text-indigo-500" href="#">
                                        <svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M21.8181 6.14598C21.1356 6.44844 20.4032 6.65356 19.6336 6.74513C20.4194 6.27462 21.0208 5.52831 21.3059 4.64177C20.5689 5.0775 19.7553 5.39389 18.8885 5.56541C18.1943 4.82489 17.2069 4.36365 16.1118 4.36365C14.0108 4.36365 12.3072 6.06719 12.3072 8.16707C12.3072 8.46489 12.3408 8.75577 12.4057 9.03392C9.24434 8.87513 6.44104 7.3605 4.56483 5.05895C4.23686 5.61986 4.05028 6.27344 4.05028 6.9711C4.05028 8.29107 4.72243 9.45574 5.74225 10.1371C5.11877 10.1163 4.53237 9.94477 4.01901 9.65968V9.70719C4.01901 11.5498 5.33086 13.0876 7.07031 13.4376C6.75161 13.5234 6.41555 13.5709 6.06789 13.5709C5.82222 13.5709 5.58464 13.5466 5.35171 13.5002C5.8361 15.0125 7.24067 16.1123 8.90483 16.1424C7.6034 17.1623 5.96243 17.7683 4.1801 17.7683C3.87301 17.7683 3.57052 17.7498 3.27271 17.7162C4.95655 18.7974 6.95561 19.4279 9.10416 19.4279C16.1026 19.4279 19.928 13.6312 19.928 8.60398L19.9153 8.11147C20.6627 7.57834 21.3094 6.90853 21.8181 6.14598Z"
                                                fill="currentColor"></path>
                                            <mask id="mask0_601_10114" style="mask-type:alpha"
                                                maskunits="userSpaceOnUse" x="3" y="4" width="19" height="16">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M21.8181 6.14598C21.1356 6.44844 20.4032 6.65356 19.6336 6.74513C20.4194 6.27462 21.0208 5.52831 21.3059 4.64177C20.5689 5.0775 19.7553 5.39389 18.8885 5.56541C18.1943 4.82489 17.2069 4.36365 16.1118 4.36365C14.0108 4.36365 12.3072 6.06719 12.3072 8.16707C12.3072 8.46489 12.3408 8.75577 12.4057 9.03392C9.24434 8.87513 6.44104 7.3605 4.56483 5.05895C4.23686 5.61986 4.05028 6.27344 4.05028 6.9711C4.05028 8.29107 4.72243 9.45574 5.74225 10.1371C5.11877 10.1163 4.53237 9.94477 4.01901 9.65968V9.70719C4.01901 11.5498 5.33086 13.0876 7.07031 13.4376C6.75161 13.5234 6.41555 13.5709 6.06789 13.5709C5.82222 13.5709 5.58464 13.5466 5.35171 13.5002C5.8361 15.0125 7.24067 16.1123 8.90483 16.1424C7.6034 17.1623 5.96243 17.7683 4.1801 17.7683C3.87301 17.7683 3.57052 17.7498 3.27271 17.7162C4.95655 18.7974 6.95561 19.4279 9.10416 19.4279C16.1026 19.4279 19.928 13.6312 19.928 8.60398L19.9153 8.11147C20.6627 7.57834 21.3094 6.90853 21.8181 6.14598Z"
                                                    fill="white"></path>
                                            </mask>
                                        </svg>
                                    </a>
                                    <a class="inline-block mr-6 text-green-500 hover:text-indigo-500" href="#">
                                        <svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.6007 2.18176H16.3992C19.3874 2.18176 21.8184 4.61276 21.8182 7.60069V16.3992C21.8182 19.3871 19.3874 21.8181 16.3992 21.8181H7.6007C4.61276 21.8181 2.18188 19.3872 2.18188 16.3992V7.60069C2.18188 4.61276 4.61276 2.18176 7.6007 2.18176ZM16.3993 20.0759C18.4267 20.0759 20.0761 18.4266 20.0761 16.3992H20.076V7.60069C20.076 5.57343 18.4266 3.924 16.3992 3.924H7.6007C5.57343 3.924 3.92412 5.57343 3.92412 7.60069V16.3992C3.92412 18.4266 5.57343 20.076 7.6007 20.0759H16.3993ZM6.85721 12.0001C6.85721 9.16418 9.16425 6.85709 12.0001 6.85709C14.8359 6.85709 17.1429 9.16418 17.1429 12.0001C17.1429 14.8358 14.8359 17.1428 12.0001 17.1428C9.16425 17.1428 6.85721 14.8358 6.85721 12.0001ZM8.62805 11.9999C8.62805 13.8592 10.1408 15.3718 12.0001 15.3718C13.8593 15.3718 15.3721 13.8592 15.3721 11.9999C15.3721 10.1405 13.8594 8.62784 12.0001 8.62784C10.1407 8.62784 8.62805 10.1405 8.62805 11.9999Z"
                                                fill="currentColor"></path>
                                            <mask id="mask0_601_10115" style="mask-type:alpha"
                                                maskunits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M7.6007 2.18176H16.3992C19.3874 2.18176 21.8184 4.61276 21.8182 7.60069V16.3992C21.8182 19.3871 19.3874 21.8181 16.3992 21.8181H7.6007C4.61276 21.8181 2.18188 19.3872 2.18188 16.3992V7.60069C2.18188 4.61276 4.61276 2.18176 7.6007 2.18176ZM16.3993 20.0759C18.4267 20.0759 20.0761 18.4266 20.0761 16.3992H20.076V7.60069C20.076 5.57343 18.4266 3.924 16.3992 3.924H7.6007C5.57343 3.924 3.92412 5.57343 3.92412 7.60069V16.3992C3.92412 18.4266 5.57343 20.076 7.6007 20.0759H16.3993ZM6.85721 12.0001C6.85721 9.16418 9.16425 6.85709 12.0001 6.85709C14.8359 6.85709 17.1429 9.16418 17.1429 12.0001C17.1429 14.8358 14.8359 17.1428 12.0001 17.1428C9.16425 17.1428 6.85721 14.8358 6.85721 12.0001ZM8.62805 11.9999C8.62805 13.8592 10.1408 15.3718 12.0001 15.3718C13.8593 15.3718 15.3721 13.8592 15.3721 11.9999C15.3721 10.1405 13.8594 8.62784 12.0001 8.62784C10.1407 8.62784 8.62805 10.1405 8.62805 11.9999Z"
                                                    fill="white"></path>
                                            </mask>
                                        </svg>
                                    </a>
                                    <a class="inline-block text-green-500 hover:text-indigo-500" href="#">
                                        <svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.2 3H4.8C3.81 3 3 3.81 3 4.8V19.2C3 20.19 3.81 21 4.8 21H19.2C20.19 21 21 20.19 21 19.2V4.8C21 3.81 20.19 3 19.2 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.67C6.15 8.67 5.43 7.95 5.43 7.05C5.43 6.15 6.15 5.43 7.05 5.43C7.95 5.43 8.67 6.15 8.67 7.05C8.67 7.95 7.95 8.67 7.05 8.67ZM18.3 18.3H15.6V13.53C15.6 12.81 14.97 12.18 14.25 12.18C13.53 12.18 12.9 12.81 12.9 13.53V18.3H10.2V10.2H12.9V11.28C13.35 10.56 14.34 10.02 15.15 10.02C16.86 10.02 18.3 11.46 18.3 13.17V18.3Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-8 border-b-2 border-black">
                        <div class="flex flex-col -mb-px md:flex-row"><a
                                class="inline-block px-2 pb-2 mb-3 text-lg font-black text-indigo-500 border-b-4 border-indigo-500 md:mb-0"
                                href="#">Description</a><a
                                class="inline-block px-2 pb-2 mb-3 text-lg font-bold text-black md:mb-0"
                                href="#">Customer Reviews</a><a
                                class="inline-block px-2 pb-2 mb-3 text-lg font-bold text-black md:mb-0"
                                href="#">Shipping &amp; Returns</a></div>
                    </div>
                    <div>
                        <h4 class="mb-3 text-xl font-black">Lorem ipsum dolor sit amet</h4>
                        <p class="text-lg font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
            </div>
        </section> -->
        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-10">
            <div>
                <img v-if="product.photo" :src="product.photo" class="h-80 w-96" />
                <vue-horizontal ref="horizontal" class="horizontal" responsive v-if="product">
                    <div v-for="photo in product.photos" :key="photo.id" class="flex flex-row px-2 mt-2 mb-10">
                        <a @click="selectedImage(photo)"
                            class="flex flex-col items-center justify-center w-24 h-24 p-2 border border-gray-200 rounded-xl hover:border-gray-600 hover:border-2">
                            <img v-if="product" :src="photo" class="w-20 h-20 rounded-xl" />
                        </a>
                    </div>
                </vue-horizontal>
            </div>
            <div class="md:w-11/12">
                <div class="mb-2 md:flex md:justify-between">
                    <div>
                        <p class="text-2xl text-gray-700 md:hidden">{{ truncate(product.name, 25) }}</p>
                        <p class="hidden text-2xl text-gray-700 md:flex">{{ product.name }}</p>
                        <span v-if="product.discount_price > 0">
                            <p class="mt-2 text-2xl tracking-wide">{{ currency }}{{
                                product.discount_price.toFixed(2)
                            }}</p>
                            <p class="mt-2 text-sm tracking-wide">{{ currency }}<span class="line-through">{{
                                product.price.toFixed(2)
                            }}</span> </p>
                        </span>
                        <span v-else>
                            <p class="mt-2 text-2xl tracking-wide">{{ currency }}{{ product.price.toFixed(2) }}</p>
                        </span>
                        <!-- <p class="mt-4 text-2xl font-bold text-gray-700">
                            {{ currency }}{{ product.price.toFixed(2) }}
                        </p> -->
                    </div>
                    <div class="flex flex-row w-40">
                        <img src="/img/icons/star.svg" class="w-4 h-4" alt="" />
                        <p class="text-xs font-light text-gray-500">
                            {{ product.rating }} ({{ product.reviews_count }})
                        </p>
                    </div>
                </div>
                <div class="flex items-center">
                    <button
                        class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                        @click="decrement()">
                        <img src="/img/icons/remove.svg" class="w-6 h6" alt="" />
                    </button>
                    <div class="w-10 h-10 overflow-hidden">
                        <div class="flex items-center justify-center w-full h-full text-xl font-light text-center">
                            <input class="w-full h-full text-xl font-light text-center" v-model="quantity" />
                        </div>
                    </div>
                    <button
                        class="flex items-center justify-center w-8 h-8 font-light transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-full cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                        @click="increment(product)">
                        <img src="/img/icons/plus.svg" class="w-6 h-6" alt="" />
                    </button>
                </div>
                <div class="flex mt-5" v-if="settings">
                    <button :style="{ 'background-color': settings.colors.primaryColor }" @click="addToCart(product)"
                        class="flex items-center justify-center w-full p-2 font-light text-white rounded-full cursor-pointer h-14">
                        {{ $t('product.addtocart') }} {{ currency }}{{ totalPrice.toFixed(2) }}
                    </button>
                    <span v-show="isLoggedIn">
                        <button @click="addToFavourite(product)"
                            class="flex items-center justify-center w-16 p-2 ml-2 border border-gray-700 rounded-full h-14">
                            <img src="/img/icons/favourite-border.svg" class="w-6 h-6" alt="">
                        </button>

                    </span>


                </div>
                <div class="flex mt-4" v-if="product.vendor.delivery_time">
                    <img src="/img/icons/track-shipping.svg" class="w-6 h-6" alt="" />
                    <p class="ml-2 text-gray-700">Delivery in {{ product.vendor.delivery_time }} mins </p>
                </div>
                <p class="mt-5 text-sm font-light text-gray-500" v-html=" product.description">
                </p>
            </div>
        </div>
        <div class="mt-20 mb-10" v-if="product.option_groups"> 
            <p class="mb-3 text-4xl text-center text-gray-700" v-if="product.option_groups.length != '0'">{{ $t('product.optionHeader') }}</p>
            <!-- <p class="mt-4 text-sm text-gray-600" v-if="product.option_groups.length != '0'">
                    Select options to add them to the product</p> -->

            <div v-for="option_group in product.option_groups" :key="option_group.id">
                <p class="mt-5 mb-3 text-xs font-medium text-gray-500 md:text-sm">{{ option_group.name }}</p>

                <div class="flex flex-row space-x-5" v-if="option_group.multiple == 0">
                    <div v-for="option in option_group.options" :key="option"
                        class="flex flex-row p-2 rounded-lg shadow w-36">
                        <img class="object-contain w-14 h-14" v-if="option" v-bind:src="option.photo" alt="">
                        <div class="flex flex-col">
                            <p class="text-sm">{{ truncate(option.name, 10) }}</p>
                            <div class="flex justify-between">
                                <p class="text-sm">{{ currency }}{{ option.price }}</p>

                                <input v-model="selectedOption" type="radio" :value="option"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </div>

                        </div>
                    </div>

                </div>
                <div class="mt-5" v-else-if="option_group.multiple == 1">
                    <!-- .slice(0, 5) -->
                    <vue-horizontal ref="horizontal" class="container flex items-center mx-auto horizontal ">
                        <section class="flex flex-row space-x-5">
                            <div class="w-24 mx-3 my-3 bg-white rounded-lg shadow-md hover:text-black hover:bg-blue-900"
                                v-for="(option, index) in option_group.options" :key="index">
                                <div class="flex flex-col p-2">
                                    <h5 class="text-xs text-center truncate">{{
                                        truncate(option.name,
                                            13)
                                    }}</h5>
                                    <div class="">
                                        <img class="object-contain w-24 h-20" v-if="option" v-bind:src="option.photo"
                                            alt="">
                                    </div>
                                    <div class="flex flex-col p-2">

                                        <!-- <p class="my-1 text-xs text-gray-500">{{ option.description }}</p> -->
                                        <div class="flex justify-between">
                                            <p class="text-xs font-light">{{ currency }}{{ option.price.toFixed(2) }}
                                            </p>

                                            <input type="checkbox"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                v-model="selectedOptions" :value="option">

                                        </div>
                                        <!-- {{ selected0ptions }} -->
                                    </div>
                                </div>
                            </div>
                        </section>

                    </vue-horizontal>
                </div>
            </div>

        </div>
        <!-- <Options :product="product" :currency="currency" /> -->
        <!-- :style="{ 'background-color': settings.colors.primaryColor }" -->
        <VendorProducts :products="products" />

        <Recommended :products="recommended" />
    </div>
</template>
<script>
import axios from 'axios'
import VueHorizontal from "vue-horizontal"
import { notify } from "@kyvg/vue3-notification"
import Swal from "sweetalert2/dist/sweetalert2.js"
import Breadcrumb from '@/components/Default/Breadcrumb.vue'
// import product from '@/components/Default/Product/product.vue'
import VendorProducts from '@/components/Default/Product/ProductsFromVendor.vue'
import Recommended from '@/components/Default/Product/Recommended.vue'
// import Options from '@/components/Default/Product/Options.vue'

export default {
    name: 'DefaultProduct',
    components: {
        VueHorizontal,
        Breadcrumb,
        VendorProducts,
        Recommended,
    },

    data() {
        return {
            products: null,
            quantity: 1,
            settings: null,
            product: null,
            base_url: this.$store.state.baseUrl,
            recommended: null,
            currency: null,
            selectedOption: null,
            selectedOptions: [],
            isLoggedIn: false,
            AuthStr: "Bearer " + localStorage.getItem("authToken"),
        }
    },

    mounted() {
        this.$store.commit("loading", true)
        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"));
        }

        axios.get(this.base_url + 'api/products/' + this.$route.params.id)
            .then((response) => {
                this.product = response.data
                // console.log(this.product)
                this.vendorProducts(this.product.vendor.id)
                this.Recommended(this.product.vendor.vendor_type.id)
                this.$store.commit("loading", false)
            })
            .catch(error => console.log(error))

        this.$store.dispatch("fetchSettings", this.items).then(() => {
            this.settings = this.$store.state.settings;
            this.currency = this.settings.strings.currency;
        });
    },

    computed: {
        totalPrice() {

            let total
            if (this.product.discount_price != 0) {
                total = Number(this.quantity) * Number(this.product.discount_price)
            }
            else {
                total = Number(this.quantity) * Number(this.product.price)
            }



            if (this.selectedOption) {
                total += this.selectedOption.price
                // console.log('total')
            }
            if (this.selectedOptions) {
                this.selectedOptions.forEach((item) => {
                    total += Number(item.price);
                    // console.log("hi",total)
                })
            }
            return total;
        },


    },

    methods: {

        addToFavourite(product) {

            axios.post(this.base_url + 'api/favourites/',
                {
                    product_id: product.id,
                    is_favourite: true
                }, {
                'headers': { 'Authorization': this.AuthStr }
            })
                .then((response) => {
                    notify({
                        type: "success",
                        title: "Favourited",
                        text: response.data.message,
                    })
                })
                .catch((error) => {
                    if (error.response) {
                        this.message = error.response.data.message;
                        notify({
                          type: 'error',
                          title: 'Favourited',
                          text: error.response.data.message,
                          duration: 3000
                        })
                    }
                })

        },

        vendorProducts(vendor_id) {
            axios.get(this.base_url + 'api/products?vendor_id=' + vendor_id)
                .then((response) => {
                    this.products = response.data.data.slice(0, 10)
                })
                .catch(error => console.log(error))
        },

        Recommended(vendor_type_id) {
            axios.get(this.base_url + 'api/products?type=popular&vendor_type_id=' + vendor_type_id)
                .then((response) => {
                    this.recommended = response.data.data.slice(0, 10)
                })
                .catch(error => console.log(error))
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

        selectedImage(image) {
            this.product.photo = image;
        },

        addToCart(product, quantity = this.quantity, selectedOption = this.selectedOption, selectedOptions = this.selectedOptions) {

            if (product.available_qty >= 1 || product.available_qty == null) {
                if (selectedOption) {
                    this.$store.commit('addToCart', { product, quantity, selectedOption, selectedOptions })

                } else if (this.selectedOptions) {

                    this.$store.commit('addToCart', { product, quantity, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions })

                } else {
                    this.$store.commit('addToCart', { product, quantity });
                }
            } else if (product.available_qty == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Product out of stock',
                })
            }
        },

        increment(product) {
            if (product.available_qty == 0) {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "product out of stock",
                });
            } else {
                this.quantity++;
                if (product.discount_price != 0) {
                    this.totalPrice = product.discount_price + this.quantity;
                } else {
                    this.totalPrice = product.price + this.quantity;
                }
            }
        },

        decrement() {
            if (this.quantity === 1) {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "You cannot add 0 product",
                });
            } else {
                this.quantity--;
            }
        },
    }

}
</script>

