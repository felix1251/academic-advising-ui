<template>
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-danger shadow-success border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  MSU - Academic Advising
                </h4>
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3" @submit.prevent = "signin">
                <div class="mb-3">
                  <vmd-input
                    id="username"
                    type="text"
                    label="Username"
                    name="username"
                    :value="username"
                    :required="true"
                    @input="username = $event.target.value"
                  />
                </div>
                <div class="mb-3">
                  <vmd-input
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    :value="password"
                    :required="true"
                    @input="password = $event.target.value"
                  />
                </div>
                <!--<vmd-switch id="rememberMe" name="rememberMe"
                  >Remember me</vmd-switch
                >-->
                <vmd-alert v-if="error" class="my-0 font-weight-light" color="warning">
                  <span class="text-sm">
                   {{error}}
                  </span>
                </vmd-alert>
                <div class="text-center">
                  <vmd-button
                    class="my-3 mb-2"
                    variant="gradient"
                    color="danger"
                    fullWidth
                    >Sign in</vmd-button
                  >
                </div>
                <p class="mt-4 text-sm text-center">
                  Forget Password?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-danger text-gradient font-weight-bold"
                    >Retrieve Account</router-link
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VmdInput from "@/components/VmdInput.vue";
// import VmdSwitch from "@/components/VmdSwitch.vue";
import VmdButton from "@/components/VmdButton.vue";
import VmdAlert from "@/components/VmdAlert.vue";
import { mapMutations } from "vuex";

export default {
  name: "sign-in",
  data() {
    return{
      password: "",
      username:"",
      error: ""
    }
  },
  components: {
    VmdInput,
    // VmdSwitch,
    VmdButton,
    VmdAlert
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  created(){
    // console.log("current user:", this.$store.state.currentUser)
    // console.log("csrf:", this.$store.state.csrf)
    // console.log("signed-in:", this.$store.state.signedIn)
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    click() {
      // console.log(this.password, this.email)
    },
    signin () {
      this.$plain.post('/admin_signin', { username: this.username, password: this.password })
        .then(response => {
          this.signinSuccessful(response)
          this.$toast.open({
            message: 'Successfully Signed In',
            type: 'success',
            position: 'top-right',
            duration: 2500,
          });
        })
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      this.$plain.get('/me')
        .then(meResponse => {
          this.$store.commit('setCurrentUser', { currentUser: meResponse.data, csrf: response.data.csrf })
          this.error = ''
          this.$router.replace('/dashboard')
        })
        .catch(error => this.signinFailed(error))
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      this.$store.commit('unsetCurrentUser')
    },
  },
};
</script>
