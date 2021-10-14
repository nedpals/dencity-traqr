<template>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "./assets/variables.scss";

$primary: $mint-green;
$link: #155431;
$success: $medium-aquamarine;
$warning: $orange-yellow-crayola;
$danger: $fire-opal;
$customColors: (
  "green-dark": ($green-dark, darken($green-dark, 10%))
);

$family-sans-serif: "Rubik", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;

@import "../node_modules/bulma/sass/utilities/derived-variables.sass";
$colors: map-merge($colors, $customColors);

@import "../node_modules/bulma/bulma.sass";
</style>