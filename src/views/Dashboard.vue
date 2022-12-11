<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('A')">
            <mini-statistics-card
              :title="{ text: 'College Count', value: count.college_count }"
              detail="Over all college"
              :icon="{
                name: 'school',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('A')">
            <mini-statistics-card
              :title="{ text: 'Department Count', value: count.department_count }"
              detail="Over all department"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'danger',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('A')">
            <mini-statistics-card
              :title="{ text: 'Curriculum Count', value: count.curriculum_count }"
              detail="Over all curriculum"
              :icon="{
                name: 'summarize',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('A')">
            <mini-statistics-card
              :title="{ text: 'User Count', value: count.user_count }"
              detail="Over all Users"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('F')">
            <mini-statistics-card
              :title="{ text: 'Advising', value: count.studs_count }"
              detail="Adviser"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('S')">
            <mini-statistics-card
              :title="{ text: 'Units Total', value: count.total_units }"
              detail="Student Total Units"
              :icon="{
                name: 'summarize',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" v-if="currentUser.account_type.includes('S')">
            <mini-statistics-card
              :title="{ text: 'Units Remaining', value: count.remaining_units }"
              detail="Student Remaining Units"
              :icon="{
                name: 'summarize',
                color: 'text-white',
                background: 'warning',
              }"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import logoXD from "@/assets/img/small-logos/logo-xd.svg";
import logoAtlassian from "@/assets/img/small-logos/logo-atlassian.svg";
import logoSlack from "@/assets/img/small-logos/logo-slack.svg";
import logoSpotify from "@/assets/img/small-logos/logo-spotify.svg";
import logoJira from "@/assets/img/small-logos/logo-jira.svg";
import logoInvision from "@/assets/img/small-logos/logo-invision.svg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import { mapState } from 'vuex'

export default {
  name: "dashboard-default",
  data() {
    return {
      logoXD,
      team1,
      team2,
      team3,
      team4,
      logoAtlassian,
      logoSlack,
      logoSpotify,
      logoJira,
      logoInvision,
      count: {},
    };
  },
  computed: mapState(['currentUser']),
  created(){
    if(this.currentUser.account_type.includes('A')) this.getCount()
    if(this.currentUser.account_type.includes('F')) this.getStudAdvising()
    if(this.currentUser.account_type.includes('S')) this.getStudRemainingUnits()
  },
  methods: {
    getCount(){
      this.$secured.get('/api/v1/count') 
        .then(response => { this.count = response.data })
        .catch(error => { console.log(error) })
    },
    getStudAdvising(){
      this.$secured.get('/api/v1/get_stud_advising') 
        .then(response => this.count = response.data)
        .catch(error => { console.log(error) })
    },
    getStudRemainingUnits(){
      this.$secured.get('/api/v1/get_student_remaining_units') 
        .then(response => this.count = response.data)
        .catch(error => { console.log(error) })
    },
    
  },
  components: {
    MiniStatisticsCard,
  },
};
</script>
