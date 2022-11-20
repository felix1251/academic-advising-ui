<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
    :class="`${
      isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'
    } ${sidebarType}`"
  >
    <div class="sidenav-header">
      <a class="m-0 navbar-brand" href="/">
        <h6 class="font-weight-bold text-white"> MSU - Academic Advising </h6>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <sidenav-list/>
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import { mapState } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode", "signedIn"]),
  },
};
</script>
