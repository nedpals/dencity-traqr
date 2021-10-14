<template>
    <main class="has-background-white-ter py-6" style="height: 100vh; width: 100%;">
        <div class="columns is-centered">
            <div class="column is-4">
                <div class="box p-0">
                    <div class="login-form-header pt-6 px-6 pb-5">
                        <img :src="logoImg" />
                    </div>
                    <div class="login-form-indicator"></div>
                    <div class="login-form-body pt-6 px-6 pb-6 is-flex is-flex-direction-column">
                        <div class="field">
                            <label for="" class="label">E-mail</label>
                            <div class="control">
                                <input type="text" class="input">
                            </div>
                        </div>
                        <div class="field mb-6">
                            <label for="" class="label">Password</label>
                            <div class="control">
                                <input type="password" class="input">
                            </div>
                        </div>
                        <button @click="$router.replace({ name: 'home' })" class="button mb-6 is-align-self-center is-uppercase has-text-weight-medium has-text-white px-6 is-medium is-rounded is-green-dark">Login</button>
                        <p class="has-text-centered">Don't have an account? <router-link :to="{ name: 'register' }">Register</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import logoImg from '../assets/DencityTraQR-black.svg';

export default {
    computed: {
        logoImg: () => logoImg
    }
}
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.login-form-indicator {
    background: linear-gradient(90deg, $medium-aquamarine, $mint-green);
    height: 0.5rem;
}
</style>