<template>
  <div class="container-fluid">
    <div
      class="page-header min-height-300 border-radius-xl mt-4"
      style="
        background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="card card-body mx-3 mx-md-4 mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="@/assets/img/bruce-mars.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{this.$store.state.currentUser.details.last_name}}, {{this.$store.state.currentUser.details.first_name}} </h5>
            <p v-if="this.$store.state.currentUser.account_type[0] == 'A'" class="mb-0 font-weight-normal text-sm">Admin</p>
            <p v-if="this.$store.state.currentUser.account_type[0] == 'F'" class="mb-0 font-weight-normal text-sm">Staff</p>
            <p v-if="this.$store.state.currentUser.account_type[0] == 'S'" class="mb-0 font-weight-normal text-sm">Student</p>
            <p v-if="this.$store.state.currentUser.account_type[1] == 'D'" class="mb-0 font-weight-normal text-sm">Dean</p>
          </div>
        </div>
        <div
          class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
        >
        </div>
      </div>
      <div v-if="this.$store.state.currentUser.account_type[0] == 'F' || this.$store.state.currentUser.account_type[0] == 'S'" class="row">
        <div class="mt-3 row">
          <div class="mt-4 col-12 col-xl-4 mt-xl-0">
            <div class="card card-plain h-100">
              <div class="p-3 pb-0 card-header">
                <h6 class="mb-0">Advising Records</h6>
              </div>
              <div class="p-3 card-body">
                <ul class="list-group">
                  <li
                    class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
                  >
                    <vmd-avatar
                      class="me-3"
                      :img="sophie"
                      alt="kal"
                      border-radius="lg"
                      shadow="regular"
                    />
                    <div
                      class="d-flex align-items-start flex-column justify-content-center"
                    >
                      <h6 class="mb-0 text-sm">Sophie B.</h6>
                      <p class="mb-0 text-xs">Hi! I need more information..</p>
                    </div>
                    <a
                      class="mb-0 btn btn-link pe-3 ps-0 ms-auto"
                      href="javascript:;"
                      >Reply</a
                    >
                  </li>
                  <li
                    class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
                  >
                    <vmd-avatar
                      class="me-3"
                      :img="marie"
                      alt="kal"
                      border-radius="lg"
                      shadow="regular"
                    />
                    <div
                      class="d-flex align-items-start flex-column justify-content-center"
                    >
                      <h6 class="mb-0 text-sm">Anne Marie</h6>
                      <p class="mb-0 text-xs">Awesome work, can you..</p>
                    </div>
                    <a
                      class="mb-0 btn btn-link pe-3 ps-0 ms-auto"
                      href="javascript:;"
                      >Reply</a
                    >
                  </li>
                  <li
                    class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
                  >
                    <vmd-avatar
                      class="me-3"
                      :img="ivana"
                      alt="kal"
                      border-radius="lg"
                      shadow="regular"
                    />
                    <div
                      class="d-flex align-items-start flex-column justify-content-center"
                    >
                      <h6 class="mb-0 text-sm">Ivanna</h6>
                      <p class="mb-0 text-xs">About files I can..</p>
                    </div>
                    <a
                      class="mb-0 btn btn-link pe-3 ps-0 ms-auto"
                      href="javascript:;"
                      >Reply</a
                    >
                  </li>
                  <li
                    class="px-0 mb-2 border-0 list-group-item d-flex align-items-center"
                  >
                    <vmd-avatar
                      class="me-3"
                      :img="peterson"
                      alt="kal"
                      border-radius="lg"
                      shadow="regular"
                    />
                    <div
                      class="d-flex align-items-start flex-column justify-content-center"
                    >
                      <h6 class="mb-0 text-sm">Peterson</h6>
                      <p class="mb-0 text-xs">Have a great afternoon..</p>
                    </div>
                    <a
                      class="mb-0 btn btn-link pe-3 ps-0 ms-auto"
                      href="javascript:;"
                      >Reply</a
                    >
                  </li>
                  <li
                    class="px-0 border-0 list-group-item d-flex align-items-center"
                  >
                    <vmd-avatar
                      class="me-3"
                      :img="nick"
                      alt="kal"
                      border-radius="lg"
                      shadow="regular"
                    />
                    <div
                      class="d-flex align-items-start flex-column justify-content-center"
                    >
                      <h6 class="mb-0 text-sm">Nick Daniel</h6>
                      <p class="mb-0 text-xs">Hi! I need more information..</p>
                    </div>
                    <a
                      class="mb-0 btn btn-link pe-3 ps-0 ms-auto"
                      href="javascript:;"
                      >Reply</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VmdAvatar from "@/components/VmdAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";

import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "profile-overview",
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      email: "",
      role: ""
    };
  },
  components: {
    VmdAvatar,
  },
  mounted() {
    this.role = this.$store.state.currentUser.account_type[0]
    this.email = this.$store.state.currentUser.details.email
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
