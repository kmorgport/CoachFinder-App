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

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);

        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    autoLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if(token && userId){
            context.commit('setUser',{
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        }
    },
    logout(context){
       context.commit('setUser', {
           token: null,
           userId: null,
           tokenExpiration: null
       })
    }

}