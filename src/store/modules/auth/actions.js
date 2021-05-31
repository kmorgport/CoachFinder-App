let timer;

export default {
    async login(context, payload) {
        //must use return so that the promise returned by auth can be used by login and signup
        return context.dispatch('auth',{
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth',{
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload){
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        if(mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        }
        const apiKey = context.rootGetters.fireBaseKey
        const response = await fetch(url+apiKey, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if(!response.ok){
            console.log(responseData)
            const error = new Error(responseData.message || 'Failed to authenticate.');
                throw error
        }

        const expiresIn = +responseData.expires * 1000
        const expirationDate = new Date().getTime()+expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(()=>{
            context.dispatch('logout')
        },expiresIn)

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },
    autoLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 10000){
            return;
        }
        timer = setTimeout(()=>{
            context.dispatch('logout')
        },expiresIn);

        if(token && userId){
            context.commit('setUser',{
                token: token,
                userId: userId,
            })
        }
    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer)

       context.commit('setUser', {
           token: null,
           userId: null,
       })
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(
          `https://vue-http-demo-85e9e.firebaseio.com/requests/${coachId}.json?auth=` +
            token
        );
        const responseData = await response.json();
    
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Failed to fetch requests.'
          );
          throw error;
        }
    
        const requests = [];
    
        for (const key in responseData) {
          const request = {
            id: key,
            coachId: coachId,
            userEmail: responseData[key].userEmail,
            message: responseData[key].message
          };
          requests.push(request);
        }
    
        context.commit('setRequests', requests);
      }
    };
    
}