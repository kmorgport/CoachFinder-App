<template>
    <section>
        Filter
    </section>
    <section>
        <div class="controls">
            <button>Refresh</button>
            <router-link to="/register">Register a Coach</router-link>
        </div>
        <ul>
            <li>{{ filteredCoaches }}</li>
        </ul>
    </section>

</template>

<script>
export default {
    computed:{
        filteredCoaches(){
            return this.$store.coaches
        }
    },
}
</script>