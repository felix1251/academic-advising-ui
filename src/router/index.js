import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";
import Colleges from "../views/Colleges.vue";
import Departments from "../views/Departments.vue";
import Curriculums from "../views/Curriculums.vue";
import Profile from "../views/Profile.vue";
import Subjects from "../views/Subjects.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Prerequisites from "../views/Prerequisites.vue";
import Enrollments from "../views/Enrollments.vue";
import Recommendations from "../views/Recommendations.vue";
import Advising from "../views/Advising.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
    meta: { auth: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { auth: true, userType: ['A'] }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { auth: true, userType: ['A'] }
  },
  {
    path: "/colleges",
    name: "Colleges",
    component: Colleges,
    meta: { auth: true , userType: ['A']}
  },
  {
    path: "/curriculums",
    name: "Curriculums",
    component: Curriculums,
    meta: { auth: true, userType: ['A']}
  },
  {
    path: "/advising",
    name: "Advising",
    component: Advising,
    meta: { auth: true, userType: ['F', 'S']}
  },
  {
    path: "/recommendations",
    name: "Recommendations",
    component: Recommendations,
    meta: { auth: true , userType: ['A']}
  },
  {
    path: "/subjects",
    name: "Subjects",
    component: Subjects,
    meta: { auth: true, userType: ['A'] }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { auth: true, userType: ['A', 'S', 'F'] }
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    meta: { auth: false }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
    meta: { auth: false }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/dashboard"
  },
  {
    path: "/departments",
    name: "Departments",
    component: Departments,
    meta: { auth: true, userType: ['A'] }
  },
  {
    path: "/prerequisites",
    name: "Prerequisites",
    component: Prerequisites,
    meta: { auth: true, userType: ['A'] }
  },
  {
    path: "/enrollments",
    name: "Enrollments",
    component: Enrollments,
    meta: { auth: true, userType: ['A', 'S', 'F']}
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const signedIn = store.getters.isUserSignedIn;
  const accountType = store.state.currentUser.account_type[0]
  if ( 'auth' in to.meta && to.meta.auth && !signedIn) {
      next('/sign-in');
  } else if ( 'auth' in to.meta && !to.meta.auth && signedIn) {
      next('/dashboard');
  } else if(signedIn && !to.meta.userType.includes(accountType)){
    next(from.path);
  } else {
      next();
  }
})


export default router;
