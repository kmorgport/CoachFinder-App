export default {
    async registerCoach(context, payload){
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        };
        const response = await fetch(`https://coachfinder-77b3c-default-rtdb.firebaseio.com/${userId}.json`,{
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // const responseData = await response.json();

        if(!response.ok){
            //errror message
        }



        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context){
        const response = await fetch(
        `https://coachfinder-77b3c-default-rtdb.firebaseio.com/coaches.json`
        );
        const responseData = await response.json();

        if(!response.ok){
            //error handling
        }

        const coaches = [];
        
        for (const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches)
    }
};