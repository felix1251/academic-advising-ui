<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
    :class="isAbsolute ? 'mt-4' : 'mt-0'"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :color="color" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <vmd-input id="search" label="Search here" />
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center dropdown" >
          <a
              href="#"
              class="p-0 nav-link lh-1"
              :class="[color ? color : 'text-body', showMenu ? 'show' : '']"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="material-icons cursor-pointer">
                account_circle
              </i>
            </a>
            <ul class="px-1 py-2 dropdown-menu dropdown-menu-dark dropdown-menu-end me-sm-n4"
                :class="showMenu ? 'show' : ''"
                aria-labelledby="dropdownMenuButton2" >
              <li><a class="dropdown-item font-weight-bold" href="javascript:;">Profile ({{role}})</a></li>
              <li><a class="dropdown-item font-weight-bold" href="javascript:;">Configuration</a></li>
              <li><hr class="dropdown-divider font-weight-bold"></li>
              <li><a class="dropdown-item font-weight-bold" href="javascript:;" @click.prevent="signOut">Sign out</a></li>
            </ul>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a
              class="p-0 nav-link lh-1"
              @click="toggleConfigurator"
              :class="color ? color : 'text-body'"
            >
              <i class="material-icons fixed-plugin-button-nav cursor-pointer">
                settings
              </i>
            </a>
          </li>
          <li class="nav-item d-xl-none p-2 d-flex align-items-center">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-body lh-1"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import VmdInput from "@/components/VmdInput.vue";
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      role: ""
    };
  },
  props: ["minNav", "color"],
  created() {
    this.minNav;
    if(this.$store.state.signedIn){
      this.role = this.$store.state.currentUser.role
      this.role = this.role[0].toUpperCase() + this.role.slice(1) 
    }
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),

    toggleSidebar() {
      this.navbarMinimize();
    },
    signOut () {
      this.$secured.delete('/signin')
        .then(response => {
          this.$store.commit('unsetCurrentUser')
          this.$router.replace('/sign-in')
          console.log(response)
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    },
  },
  components: {
    Breadcrumbs,
    VmdInput,
  },
  computed: {
    ...mapState(["isRTL", "isAbsolute"]),

    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
