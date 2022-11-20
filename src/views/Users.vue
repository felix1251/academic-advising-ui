<template>
  <div class="container-fluid py-1" ref="load">
    <div class="mb-2 d-flex justify-content-between">
      <div class="d-flex gap-2 align-items-center">
        <span class="p-0 m-0 text-bold">User type</span>
        <a-select
          v-model:value="filterData"
          style="width: 120px"
          :options="filter.map((item) => ({ value: item }))"
          @change="filterChange"
        />
      </div>
      <a-button @click.prevent="openDrawer" type="primary">Create new {{filterData}}</a-button>
    </div>
    <a-table
      bordered
      :columns="columns.filter(item => item.userType.includes(this.filterData))"
      :loading="loading"
      :data-source="data"
      rowKey="id"
      size="small"
      :pagination="{ pageSize: 10 }"
      :scroll="{ x: 600 }"
    >
      <template #status="{ text }">
        <a-tag v-if="text" color="#87d068">Active</a-tag>
        <a-tag v-else color="#FF0000">Inactive</a-tag>
      </template>
      <template #department>
        <a-button size="small" type="primary">Edit</a-button>
      </template>
      <template #actions>
        <a-button size="small" type="primary">Edit</a-button>
      </template>
    </a-table>
  </div>
  <a-drawer
    :title="'CREATE NEW ' + filterData.toUpperCase()"
    v-model:visible="drawer"
    width="100%"
    :zIndex="9999"
    :destroyOnClose="true"
    @close="closeDrawer"
  >
    <div class="d-flex justify-content-center">
      <admin-form v-if="filterData == 'admin'" :closeDrawer="closeDrawer" :getUsers="getUsers"/>
      <staff-form v-if="filterData == 'staff'" :closeDrawer="closeDrawer" :getUsers="getUsers"/>
      <student-form v-if="filterData == 'student'" :closeDrawer="closeDrawer" :getUsers="getUsers"/>
    </div>
  </a-drawer>
</template>
<script>

import { mapState } from "vuex";
import AdminForm from "@/views/components/Users/AdminForm.vue";
import StaffForm from "@/views/components/Users/StaffForm.vue";
import StudentForm from "@/views/components/Users/StudentForm.vue";

export default {
  name: "users",
  data() {
    return {
      data: [],
      drawer: false,
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
      filter: ["admin", "staff", "student"],
      filterData: "admin",
      id_number: null,
      columns: [
        {
          title: "ID No.",
          dataIndex: "id_number",
          width: 100,
          userType: ["student"]
        },
        {
          title: "First Name",
          dataIndex: "first_name",
          width: 150,
          ellipsis: true,
          userType: ["admin", "staff", "student"]
        },
        {
          title: "Middle Name",
          dataIndex: "middle_name",
          width: 150,
          ellipsis: true,
          userType: ["admin", "staff", "student"]
        },
        {
          title: "Last Name",
          dataIndex: "last_name",
          width: 150,
          ellipsis: true,
          userType: ["admin", "staff", "student"]
        },
        {
          title: "Suffix",
          dataIndex: "suffix",
          width: 80,
          userType: ["admin", "staff", "student"]
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: 80,
          userType: ["admin", "staff", "student"]
        },
        {
          title: "Status",
          dataIndex: "status",
          width: 80,
          slots: {
            customRender: 'status',
          },
          userType: ["admin", "staff", "student"]
        },
        {
          title: "College",
          dataIndex: "college_code",
          width: 100,
          userType: ["student", "staff"]
        },
        {
          title: "Department",
          dataIndex: "department_code",
          width: 100,
          userType: ["staff"]
        },
        {
          title: "Curriculum",
          dataIndex: "curriculum_code",
          width: 100,
          userType: ["student"]
        },
        {
          title: "Adviser",
          dataIndex: "adviser_name",
          width: 100,
          userType: ["student"]
        },
        {
          title: "Actions",
          width: 100,
          slots: {
            customRender: 'actions',
          },
          userType: ["admin", "staff", "student"]
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
    closeDrawer(){
      this.drawer = false
    },
    openDrawer(){
      this.drawer = true
    },
    filterChange(value){
      this.filterData = value
      this.getUsers()
    },
    getUsers() {
      this.loading = true;
      this.$secured.get("/api/v1/"+this.filterData+"s")
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
    deleteUser(id) {
      console.log(id);
    },
    editUser(id) {
      console.log(id);
    },
    onSelectChange(value) {
      this.rowSelection = value;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  components: {
    AdminForm,
    StaffForm,
    StudentForm,
  }
};
</script>
