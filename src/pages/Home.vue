<template>
    <section class="hero is-custom is-success is-medium">
        <div class="hero-head">
            <navbar />
        </div>

        <div class="hero-body">
            <div class="container is-max-desktop has-text-centered">
                <div class="columns is-centered">
                    <div class="column is-7-tablet">
                        <h1 class="title is-1 has-text-white">For a safe and better new normal travel.</h1>
                        <p class="subtitle has-text-white">DencityTraQR is a website that provides you the tools to make you be prepared on the go whether you go to your nearest store or go out of town.</p>
                        <a class="button is-primary is-medium is-rounded" href="#">Explore</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container is-max-widescreen py-3">
        <section class="section" id="features">
            <h2 class="title is-2 pb-6 has-text-centered">Features</h2>
    
            <div class="columns">
                <div class="column is-10 box p-6 has-background-primary big-feature is-left">
                    <!-- Icon goes here -->
                    <div class="columns">
                        <div class="column is-8 is-flex-direction-column is-align-items-start is-justify-content-center">
                            <h3 class="title has-text-green-dark pb-3">Density Map</h3>
                            <p class="subtitle is-6 pb-2 has-text-black">Provides real-time information of the population density of each establishment in the area by gathering data from various contact tracing providers and summarizes them into one easy-to-use interactive navigation interface.</p>
                            <router-link :to="{ name: 'map' }" class="button is-light is-success is-medium is-rounded">Explore</router-link>
                        </div>

                        <div class="column is-4">
                            <img :src="mapImg" />
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="columns mt-6">
                <div class="column is-10 box p-6 has-background-green-dark has-text-right has-text-white ml-auto big-feature is-right">
                    <!-- Icon goes here -->
                    <div class="columns">
                        <div class="column is-4">
                            <img :src="qrCodeImg" />
                        </div>

                        <div class="column is-8 is-flex is-flex-direction-column is-align-items-end is-justify-content-center">
                            <h3 class="title has-text-primary pb-3">My QR</h3>
                            <p class="subtitle is-6 pb-2 has-text-white">A QR code organizer for people on the go. It allows you to store multiple QR codes for different contact tracing systems and saves time in searching the appropriate QR code for a specific area.</p>
                            <router-link :to="{ name: 'my-qr' }" class="button is-light is-success is-medium is-rounded">Explore</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <section class="section other-features">
            <div class="columns">
                <div class="column has-text-centered other-feature">
                    <div class="box is-hoverable p-5">
                        <h3 class="title is-4 pb-3">100% Free</h3>
                        <p class="subtitle is-6">DencityTraQR is a free service and won't charge you for anything.</p>
                    </div>
                </div>
                <div class="column has-text-centered other-feature">
                    <div class="box is-hoverable p-5">
                        <h3 class="title is-4 pb-3">Privacy</h3>
                        <p class="subtitle is-6">No sensitive information is shared or recorded by the app and only records the number of incoming data.</p>
                    </div>
                </div>
                <div class="column has-text-centered other-feature">
                    <div class="box is-hoverable p-5">
                        <h3 class="title is-4 pb-3">Simple</h3>
                        <p class="subtitle is-6">No complicated instructions required. One click and information is given straight to the point.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <section class="hero has-text-centered is-green-dark is-medium end-hero" :style="{ 'background-image': `url(${heroImg2})` }">
        <div class="hero-body">
            <div class="container is-max-desktop">
                <div class="columns is-centered">
                    <div class="column is-10">
                        <h2 class="title has-text-white is-2 pb-5">Bring back the joy of pre-pandemic days in a safe way.</h2>
                        <p class="subtitle">
                            <a href="#" class="button is-medium is-light is-black is-rounded is-uppercase">
                                Register Now
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import heroImg2 from '../assets/bg-hero2.png'
import qrCodeImg from '../assets/ci_qr-code.svg'
import mapImg from '../assets/clarity_map-solid-alerted.svg'

export default {
    components: {
        Navbar,
        Footer
    },
    computed: {
        heroImg2: () => heroImg2,
        qrCodeImg: () => qrCodeImg,
        mapImg: () => mapImg
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.hero.is-custom {
    background: linear-gradient(125deg, #60D394, #8AEC71);
}

.hero.is-custom .title {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hero.is-custom .subtitle {
    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
}

.big-feature {
    border-radius: 50px;
}

.big-feature.is-left {
    border-top-left-radius: 0;
}

.big-feature.is-right {
    border-top-right-radius: 0px;
}

.box.is-hoverable {
    background-color: none;
    box-shadow: none;
    transition: box-shadow 250ms;

    &:hover {
        background-color: white;
        box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
    }
}

.end-hero {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>