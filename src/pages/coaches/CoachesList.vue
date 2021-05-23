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
            <coach-item v-for="coach in filteredCoaches" :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            ></coach-item>
         </ul>
    </section>

</template>

<script>
import CoachItem from "../../components/layout/coaches/CoachItem.vue"

export default {
    components: { 
        CoachItem 
        },
    computed:{
        filteredCoaches(){
            return this.$store.getters['coaches/coaches']
        }
    },
}
</script>