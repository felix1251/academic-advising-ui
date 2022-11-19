<template>
  <div class="container-fluid py-1" ref="load">
    <div v-if="currentUser.role == 'system_admin'">
      <button
        v-if="!show && currentUser.role == 'system_admin'"
        type="button"
        class="btn btn-success"
        @click.prevent="toggleOpen"
      >
        create user
      </button>
      <button
        v-else
        type="button"
        class="btn btn-warning d-flex justify-content-center align-items-center"
        @click.prevent="toggleClose"
      >
        <i class="fas fa-angle-double-left" style="font-size: 20px"></i> &nbsp;
        Back to user view
      </button>
    </div>
    <div v-if="!show" class="mb-2">
      <h6 class="p-0">Filter by</h6>
      <a-select
        v-model:value="filterData"
        style="width: 120px"
        :options="filter.map((item) => ({ value: item }))"
        @change="filterChange"
      />
    </div>
    <a-table
      v-if="!show"
      bordered
      :columns="columns.filter(item => item.userType.includes(this.filterData))"
      :loading="loading"
      :data-source="data"
      :pagination="{ pageSize: 10 }"
      :scroll="{ x: 600 }"
    >
      <template #actions>
        <a-button type="primary">Edit</a-button>
      </template>
      <template #status="{ text }">
        <a-tag v-if="text" color="#87d068">Active</a-tag>
        <a-tag v-else color="#FF0000">Inactive</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import stringToColour from "../components/stringToColor";

export default {
  name: "users",
  data() {
    return {
      data: [],
      loading: false,
      email: "",
      password: "",
      rowSelection: null,
      roleSelection: [],
      curriculumList: [],
      collegeList: [],
      role: "",
      password_confirmation: "",
      fullname: "",
      college_id: 0,
      curriculum_id: 0,
      show: false,
      filter: ["admins", "staffs", "students"],
      filterData: "admins",
      id_number: null,
      columns: [
        {
          title: "First Name",
          dataIndex: "first_name",
          width: 150,
          ellipsis: true,
          userType: ["admins", "staffs", "students"]
        },
        {
          title: "Middle Name",
          dataIndex: "middle_name",
          width: 150,
          ellipsis: true,
          userType: ["admins", "staffs", "students"]
        },
        {
          title: "Last Name",
          dataIndex: "last_name",
          width: 150,
          ellipsis: true,
          userType: ["admins", "staffs", "students"]
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: 60,
          userType: ["admins", "staffs", "students"]
        },
        {
          title: "Suffix",
          dataIndex: "suffix",
          width: 50,
          userType: ["admins", "staffs", "students"]
        },
        {
          title: "Status",
          dataIndex: "status",
          width: 60,
          slots: {
            customRender: 'status',
          },
          userType: ["admins", "staffs", "students"]
        },
        {
          title: "Curriculum",
          dataIndex: "curriculum",
          width: 100,
          userType: ["students", "staffs"]
        },
        {
          title: "College",
          dataIndex: "college",
          width: 100,
          userType: ["students", "staffs"]
        },
        {
          title: "Actions",
          width: 80,
          slots: {
            customRender: 'actions',
          },
          userType: ["admins", "staffs", "students"]
        },
      ],
    };
  },
  mounted: function () {
    this.getUsers()
  },
  methods: {
    createUser() {
      var dataToSend = {};
      this.$secured
        .post("/api/v1/users", dataToSend)
        .then((response) => {
          this.data.push(response.data);
          this.show = false
          this.$toast.open({
            message: "Successfully Created",
            type: "success",
            position: "top-right",
            duration: 2500,
          });
        })
        .catch((error) => {
          var errorMessage = "";
          if (error.response.data.password_confirmation) {
            errorMessage = error.response.data.password_confirmation[0];
          } else {
            errorMessage = error.response.data.email[0];
          }
          this.$toast.open({ message: errorMessage,
            type: "warning",
            position: "top-right",
            duration: 2500,
          });
          console.log(error);
        });
    },
    filterChange(value){
      this.filterData = value
      this.getUsers()
    },
    getUsers() {
      this.loading = true;
      this.$secured.get("/api/v1/"+this.filterData)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    onChangeCurriculum(event) {
      this.curriculum_id = event.target.value;
    },
    fetchCollege(){
      this.$secured.get('/api/v1/colleges')
        .then(response => { this.collegeList = response.data})
        .catch(error => { console.log(error) })
    },
      fetchCurriculum(){
        this.$secured.get("/api/v1/get_curriculum_by_college_id?college_id="+ this.college_id)
        .then(response => { this.curriculumList = response.data})
        .catch(error => { console.log(error) })
    },
    onChangeCollege(event) {
      this.college_id = event.target.value;
      this.fetchCurriculum()
    },
    toggleOpen() {
      this.show = true;
      this.fetchCollege()
      // if (this.curriculumList.length == 0 && this.collegeList.length == 0) {
      //   this.$secured
      //     .get("/api/v1/curriculums")
      //     .then((response) => {
      //       this.curriculumList = response.data;
      //       this.curriculum_id = response.data[0].id;
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   this.$secured
      //     .get("/api/v1/colleges")
      //     .then((response) => {
      //       this.collegeList = response.data;
      //       this.college_id = response.data[0].id;
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    },
    toggleClose() {
      this.show = false;
    },
    deleteUser(id) {
      console.log(id);
    },
    editUser(id) {
      console.log(id);
    },
    onSelectChange(value) {
      this.rowSelection = value;
    },
    strToColour(str) {
      return stringToColour(str)
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
