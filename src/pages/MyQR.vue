<template>
    <default-layout>
        <div class="container is-max-desktop">
            <div class="section px-2">
                <h1 class="title">Hello, username123!</h1>
                <p class="subtitle">Here are your QR codes</p>
            </div>
            <div class="columns is-multiline">
                <div class="column is-half" :key="i" v-for="(c, i) in codes" >
                    <div 
                        @click="selectedIndex = i" 
                        :style="{ 'cursor': 'pointer' }"
                        :class="{ 'has-background-primary': selectedIndex == i }" 
                        class="box media">
                        <figure class="media-left">
                            <p class="image is-128x128">
                                <img :src="qrPic">
                            </p>
                        </figure>
                        <div class="media-content">
                            <h2 class="title is-4">{{ c }}</h2>
                            <a href="#/my-qr">Save to PDF</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Footer from '../components/Footer.vue';
import qrPic from '../assets/frame.png';

export default {
    components: {
        DefaultLayout,
        Footer
    },
    computed: {
        qrPic: () => qrPic
    },
    data() {
        return {
            selectedIndex: 0,
            codes: ['SafeDavaoQR', 'Samal QR', 'DavSur QR', 'StaySafe.ph']
        }
    }
}
</script>

<style>

</style>