<template>
    <section>
        Filter
    </section>
    <section>
        <base-card>
        <div class="controls">
            <button>Refresh</button>
            <router-link to="/register">Register a Coach</router-link>
        </div>
        <!-- <ul v-if="hasCoaches"> -->
        <ul>
            <coach-item v-for="coach in filteredCoaches" :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            ></coach-item>
         </ul>
         <!-- <h3 v-else>No coaches Found.</h3> -->
        </base-card>
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
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>