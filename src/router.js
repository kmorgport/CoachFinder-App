import {defineAsyncComponent} from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegister.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js'


const CoachDetail = defineAsyncComponent(()=>{
    import('./pages/coaches/CoachDetail.vue')
})
const CoachRegistration = defineAsyncComponent(()=>{
    import('./pages/coaches/CoachRegister.vue')
})
const ContactCoach = defineAsyncComponent(()=>{
    import('./pages/requests/ContactCoach.vue')
})
const RequestsReceived = defineAsyncComponent(()=>{
    import('./pages/requests/RequestsReceived.vue')
})
const UserAuth = defineAsyncComponent(()=>{
    import('./pages/auth/UserAuth.vue')
})
const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', redirect: '/coaches'},
        { path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id', 
            component: CoachDetail, 
            //remember to set props to true so components can read router paths as props
            props: true,
            children:[
            {
                //for children paths, DO NOT INCLUDE / BEFORE PATH 
                //they are automatically added when rendered
                path: 'contact', 
                component: ContactCoach,
                props: true,
            }
        ]
        },
        //meta keynames up to the user
        { path: '/register', component: CoachRegistration, meta:{ requiresAuth: true}},
        { path: '/requests', component: RequestsReceived,  meta:{ requiresAuth: true}},
        { path: '/auth', component: UserAuth,  meta:{ requiresunAuth: true}},
        { path: '/:notFound(.*)', component: NotFound}

    ]
})

router.beforeEach((to,_,next)=>{
    if( to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next();
    }
})

export default router