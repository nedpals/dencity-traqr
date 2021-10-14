<template>
  <nav class="navbar is-uppercase has-text-white" :class="type">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }">
          <div 
            :style="{'padding-top': '1.2rem', 'border-bottom-left-radius': '10px', 'border-bottom-right-radius': '10px'}" 
            class="ml-2 px-3 has-background-green-dark">
            <img :src="logoImg" alt="DencityTraQR">
          </div>
        </router-link>
      
        <a @click="showMenu = !showMenu" role="button" :class="{ 'is-active': showMenu }" class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div :class="{ 'is-active': showMenu }" class="navbar-menu">
        <div class="navbar-start">
          <router-link :class="textClass" class="navbar-item" :to="{ name: 'map' }">Density Map</router-link>
          <router-link :class="textClass" class="navbar-item" :to="{ name: 'my-qr' }">My QR</router-link>
        </div>
        <div class="navbar-end">
          <router-link :class="textClass" class="navbar-item" :to="{ name: 'login' }">Login</router-link>
          <div class="navbar-item">
            <router-link class="button is-light is-success is-uppercase has-text-weight-bold is-rounded" :to="{ name: 'login' }">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import logoImg from '../assets/DencityTraQR.svg'

export default {
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    textClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    logoImg: () => logoImg
  }
}
</script>