export default {
    registerCoach(context, payload){
        const coachData = {
            id: "c3",
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        };
        context.commit('registerCoach', coachData)
    }
};