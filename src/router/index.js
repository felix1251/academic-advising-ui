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
    meta: { auth: true }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { auth: true }
  },
  {
    path: "/colleges",
    name: "Colleges",
    component: Colleges,
    meta: { auth: true }
  },
  {
    path: "/curriculums",
    name: "Curriculums",
    component: Curriculums,
    meta: { auth: true }
  },
  {
    path: "/advising",
    name: "Advising",
    component: Advising,
    meta: { auth: true }
  },
  {
    path: "/recommendations",
    name: "Recommendations",
    component: Recommendations,
    meta: { auth: true }
  },
  {
    path: "/subjects",
    name: "Subjects",
    component: Subjects,
    meta: { auth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { auth: true }
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
    meta: { auth: true }
  },
  {
    path: "/prerequisites",
    name: "Prerequisites",
    component: Prerequisites,
    meta: { auth: true }
  },
  {
    path: "/enrollments",
    name: "Enrollments",
    component: Enrollments,
    meta: { auth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const signedIn = store.getters.isUserSignedIn;
  if ( 'auth' in to.meta && to.meta.auth && !signedIn) {
      next('/sign-in');
  } else if ( 'auth' in to.meta && !to.meta.auth && signedIn) {
      next('/dashboard');
  } else {
      next();
  }
})


export default router;
