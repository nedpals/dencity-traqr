<template>
    <footer class="footer">
        <div class="container">
            <p>Copyright &copy; {{ getYear }} DencityTraQR</p>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
        getYear: () => new Date().getFullYear()
    },
}
</script>