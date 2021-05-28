export default {
    async contactCoach(context, payload){
        const newRequest = {
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };
        const response = await fetch(
            `https://coachfinder-77b3c-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
            {
                method: 'POST',
                body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send request')
            throw error;
        }

        newRequest.id = responseData.name
        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        await fetch(`https://coachfinder-77b3c-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
    }
}