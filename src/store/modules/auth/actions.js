export default {
    login() {},
    signup(context, payload) {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]`)
    }

}