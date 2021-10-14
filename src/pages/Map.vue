<template>
    <default-layout>
        <div class="section has-text-centered is-hidden-desktop">
            <h2 class="title">Oops!</h2>
            <p class="subtitle">Density is best viewed in desktop for now. Please view the page again on your PC.</p>
        </div>
        <div class="is-hidden-touch">
            <div class="columns m-0">
                <!-- Map -->
                <div class="column p-0">
                    <mapbox-map
                        :mapbox-gl="mapbox"
                        v-model:center="coords"
                        :access-token="accessToken"
                        :map-style="mapStyle"
                        v-model:zoom="zoom"
                        @loaded="handleMapboxLoad">
                        <mapbox-geolocate-control
                            :show-user-location="true" />
                        <mapbox-navigation-control position="top-left" />
                        <mapbox-marker :key="i" v-for="(coord, i) in markers" :lngLat="coord" />
                    </mapbox-map>
                </div>
                <!-- Sidebar -->
                <aside class="has-background-white-ter p-4 column is-3">
                    <mapbox-geocoder-control
                        class="search-box"
                        auto-resize
                        :access-token="accessToken"
                        :bbox="boundingBox"
                        :countries="countries"
                        @results="handleResults"
                        @result="handleResult" />
            
                    <section class="content">
                        <div class="pt-5 block">
                            <h2 class="title is-6">On high level</h2>
                            <router-link :to="{ name: 'map', query: { long: place.coords[0], lat: place.coords[1] } }" class="mb-3 box p-3" :id="place.place_name" v-for="place in highLevelPlaces">
                                <h3 class="title is-6 pb-2">{{ place.place_name }}</h3>
                                <p class="subtitle is-size-7">
                                    {{ place.perc }}% of the allowed capacity
                                </p>
                            </router-link>
                        </div>
                        <div class="pt-5 block">
                            <h2 class="title is-6">Safe to Enter</h2>
                            <router-link :to="{ name: 'map', query: { long: place.coords[0], lat: place.coords[1] } }" class="mb-3 box p-3" :id="place.place_name" v-for="place in safePlaces">
                                <h3 class="title is-6 pb-2">{{ place.place_name }}</h3>
                                <p class="subtitle is-size-7">
                                    {{ place.perc }}% of the allowed capacity
                                </p>
                            </router-link>
                        </div>
                    </section>
                </aside>
            </div>
            <transition name="place-card">
                <aside v-if="showPlaceCard" class="has-background-white place-card">
                    <section class="cover-photo has-background-green-dark">
                        <button @click="showPlaceCard = false" class="delete is-medium"></button>
                    </section>
                    <section class="place-info p-5">
                        <div class="has-text-centered pb-6">
                            <h2 class="title is-4">{{ selectedPlace.place_name }}</h2>
                            <p class="subtitle is-6 ">{{ selectedPlace.category }}</p>
                        </div>
                        <div class="block">
                            <p class="subtitle is-6">Status</p>
                            <p class="title is-5">{{ selectedPlace.status }}</p>
                        </div>
                        <div class="block">
                            <p class="subtitle is-6">Safe Capacity</p>
                            <p class="title is-5">{{ selectedPlace.capacity }}</p>
                        </div>
                        <div class="block">
                            <p class="subtitle is-6">Current Visitors</p>
                            <p class="title is-5">{{ selectedPlace.visitor_nr }}</p>
                        </div>
                    </section>
                </aside>
            </transition>
        </div>
    </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Mapbox from 'mapbox-gl';
import { 
    MapboxMap, 
    MapboxNavigationControl, 
    MapboxGeolocateControl, 
    MapboxGeocoderControl,
    MapboxMarker
} from 'vue-mapbox-ts';
import { fetchData } from '../data/data';

export default {
    components: {
        DefaultLayout,
        MapboxMap,
        MapboxNavigationControl,
        MapboxGeolocateControl,
        MapboxGeocoderControl,
        MapboxMarker
    },
    created() {
        this.mapbox = Mapbox;
        if (this.$route.query.long && this.$route.query.lat) {
            const toLong = parseFloat(this.$route.query.long);
            const toLat = parseFloat(this.$route.query.lat);

            this.coords[0] = toLong;
            this.coords[1] = toLat;

            this.handlePlace(toLong, toLat);
            this.markers.push(this.coords);
        }
    },
    computed: {
        accessToken: () => import.meta.env.VITE_MAPBOX_API_TOKEN,
        boundingBox: () => [125.503530, 7.022738, 125.654936, 7.147094],
        centerPoint: () => [125.61358078066172,7.0774516733885235],
        countries: () => 'ph',
        defaultZoomLevel: () => 17,
        mapStyle: () => 'mapbox://styles/mapbox/streets-v11',
        places: () => fetchData(),
        highLevelPlaces() {
            return this.places.filter(p => p.perc > 60);
        },
        safePlaces() {
            return this.places.filter(p => p.perc < 60).sort((a, b) => a.perc > b.perc ? 1 : -1);
        },
    },
    data() {
        return {
            zoom: 17,
            coords: [125.61358078066172,7.0774516733885235],
            markers: [],
            showPlaceCard: false,
            selectedPlace: {
                place_name: '',
                category: '',
                status: '',
                capacity: 0,
                visitor_nr: 0
            }
        }
    },
    watch: {
        $route(to, from) {
            if (isNaN(to.query.lat) || isNaN(to.query.long)) {
                return;
            }

            const toLat = parseFloat(to.query.lat);
            const toLong = parseFloat(to.query.long);
            const fromLat = parseFloat(from.query.lat);
            const fromLong = parseFloat(from.query.long);

            const isCoordSameWithPrev = toLat == fromLat && toLong == fromLong;
            const isCoordSameWithCurr = this.coords[0] == toLong && this.coords[1] == toLat;
            if (isCoordSameWithPrev || isCoordSameWithCurr) {
                return;
            }

            if (this.markers.length != 0) {
                this.markers.splice(0, this.markers.length);
            }

            this.coords[0] = toLong;
            this.coords[1] = toLat;
            this.handlePlace(toLong, toLat);
            this.markers.push(this.coords);
        }
    },
    methods: {
        /**
         * @param {Mapbox.Map} map
         */
        handleMapboxLoad(map) {
            const features = this.places.map(p => ({
                type: 'Feature',
                properties: {
                    id: 'ak' + Math.floor(Math.random()*90000) + 10000,
                    occRate: p.perc 
                },
                geometry: {
                    type: 'Point',
                    coordinates: [...p.coords, 0.0]
                }
            }));

            map.addSource('place-densities', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features
                }
            });
            
            map.addLayer({
                id: 'densities-heat',
                type: 'heatmap',
                source: 'place-densities',
                paint: {
                    'heatmap-weight': {
                        property: 'occRate',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [100, 1]
                        ]
                    },
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                        stops: [
                            [11, 1],
                            [15, 3]
                        ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(96, 211, 148, 0)',
                        0.2,
                        'rgba(170, 246, 131, 1)',
                        0.4,
                        'rgba(255, 217, 125, 1)',
                        0.6,
                        'rgba(255, 155, 133, 1)',
                        0.8,
                        'rgba(238, 96, 85, 1)'
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                        stops: [
                            [11, 15],
                            [15, 150]
                        ]
                    },
                }
            }, 'waterway-label');

            map.addLayer({
                id: 'densities-point',
                type: 'circle',
                source: 'place-densities',
                minzoom: 13,
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        7,
                        ['interpolate', ['linear'], ['get', 'occRate'], 1, 1, 6, 4],
                        16,
                        ['interpolate', ['linear'], ['get', 'occRate'], 1, 5, 6, 12]
                    ],
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'occRate'],
                        0,
                        'rgba(33,102,172,0)',
                        25,
                        'rgb(209,229,240)',
                        50,
                        'rgb(239,138,98)',
                        75,
                        'rgb(178,24,43)'
                    ],
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        7,
                        0,
                        8,
                        1
                    ]
                }
            }, 'waterway-label');
        },
        handlePlace(long, lat, placeName, category) {
            if (typeof placeName == 'undefined') {
                const gotPlace = this.places.find(p => p.coords[0] == long && p.coords[1] == lat);
                if (typeof gotPlace == 'undefined') {
                    return;
                }

                this.selectedPlace = {
                    place_name: gotPlace.place_name,
                    category: 'Place',
                    status: this.getStatus(gotPlace.perc),
                    capacity: gotPlace.capacity,
                    visitor_nr: gotPlace.visitor_nr
                }

                this.showPlaceCard = true;
            } else {
                this.selectedPlace = {
                    place_name: placeName,
                    category,
                    status: 'Unknown',
                    capacity: 0,
                    visitor_nr: 0
                }

                this.showPlaceCard = true;
            }
        },
        getStatus(perc) {
            if (perc >= 60) {
                return 'Relatively safe';
            } else if (perc >= 80) {
                return 'Unsafe to Enter';
            } else {
                return 'Safe';
            }
        },
        handleResults(data) {
            this.markers = [];
            console.log(data);
        },
        handleResult(data) {
            const coords = data.geometry.coordinates;
            this.$router.push({ name: 'map', query: { long: coords[0], lat: coords[1] } });
            this.handlePlace(coords[0], coords[1], data.text, data.properties.category);
            console.log('received', data);
        }
    }
}
</script>

<style>
aside .search-box .mapboxgl-ctrl-geocoder.mapboxgl-ctrl {
    width: 100%;
}
</style>

<style lang="postcss" scoped>
.place-card {
    width: calc(100vw - 76.1%);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 50;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
}

.place-card .cover-photo {
    position: relative;
    width: 100%;
    padding-top: 60.77%;
}

.place-card .delete {
    position: absolute;
    top: 10px;
    right: 10px;
}

.place-card .place-info {
    width: 100%;
}

.columns .column, .place-card {
    height: calc(100vh - 56px);
}

aside {
    overflow-y: auto;
}

aside .search-box {
    position: sticky;
    top: 0;
    z-index: 50;
}

aside .content {
    position: relative;
}

.place-card-enter-active,
.place-card-leave-active {
    transition: opacity 0.8s ease, transform 0.5s ease;
}

.place-card-enter-from,
.place-card-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>