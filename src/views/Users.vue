<template>
  <div class="container-fluid py-4" ref="load">
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
      />
    </div>
    <a-table
      v-if="!show"
      bordered
      rowKey="id"
      :columns="columns"
      :loading="loading"
      :data-source="data"
      sorter
      :row-selection="{
        selectedRowKeys: rowSelection,
        onChange: onSelectChange,
      }"
      :pagination="{ pageSize: 10 }"
      :scroll="{ x: 800 }">
      <template
        v-if="currentUser.role == 'system_admin'"
        #operation="{ record }"
        >
        <a-button
          type="primary"
          @click.prevent="editUser(record.id)"
          shape="round"
          size="small"
          >Edit</a-button
        >
        {{ " " }}
        <a-button
          type="primary"
          danger
          @click.prevent="deleteUser(record.id)"
          shape="round"
          size="small"
          >Delete</a-button
        >
      </template>
      <template #tags="{ record }">
        <span>
          <a-tag
            class="cursor-pointer"
            v-if="record.college_code"
            :color="strToColour(record.college_code)"
          >
            {{ record.college_code.toUpperCase() }}
          </a-tag>
          <a-tag
            class="cursor-pointer"
            v-if="record.curriculum_code"
            :color="strToColour(record.curriculum_code)"
          >
            {{record.curriculum_code.toUpperCase()}}
          </a-tag>
          <a-tag
            class="cursor-pointer"
            v-if="record.college_code == null && record.curriculum_code == null"
             :color="strToColour(record.role)"
            >
            All Access
          </a-tag>
        </span>
      </template>
      <template #role="{ record }">
        <a-tag :color="strToColour(record.role)">
          {{ record.role.toUpperCase().replace("_", " ") }}
        </a-tag>
      </template>
    </a-table>
    <div v-else class="m-2" style="width: 350px">
      <form @submit.prevent="createUser">
        <div class="row mb-1">
          <h6 class="p-0">Email</h6>
          <a-input
            type="email"
            size="large"
            placeholder="Enter email"
            v-model:value="email"
          />
        </div>
        <div class="row mb-1">
          <h6 class="p-0">Fullname</h6>
          <a-input
            size="large"
            placeholder="Enter fullname"
            v-model:value="fullname"
          />
        </div>
        <div class="row mb-1">
          <h6 class="p-0">Password</h6>
          <a-input-password
            size="large"
            placeholder="Enter password"
            v-model:value="password"
          />
        </div>
        <div class="row mb-1">
          <h6 class="p-0">Password Confirmation</h6>
          <a-input-password
            size="large"
            placeholder="Confirm password"
            v-model:value="password_confirmation"
          />
        </div>
        <div class="row mb-1">
          <h6 class="p-0">Select Account type</h6>
          <select
            v-model="role"
            @change="onChangeRole"
            class="form-select p-2 bg-white"
            style="font-size: 17px"
          >
            <option
              style="font-size: 18px"
              v-for="option in roleSelection"
              :value="option"
              v-bind:key="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
         <div class="row mb-1" v-show="role == 'student'">
          <h6 class="p-0">Id number</h6>
          <a-input
            type="number"
            size="large"
            placeholder="Enter Id Number"
            v-model:value="id_number"
          />
        </div>
        <div
          v-show="role == 'student' || role == 'dean' || role == 'adviser'"
          class="row mb-1"
        >
          <h6 class="p-0">Select College</h6>
          <select
            v-model="college_id"
            @change="onChangeCollege"
            class="form-select p-2 bg-white"
            style="font-size: 17px"
          >
            <option
              style="font-size: 18px"
              v-for="option in collegeList"
              :value="option.id"
              v-bind:key="option.id"
            >
              {{ option.code }}
            </option>
          </select>
        </div>
        <div v-show="role == 'student' || role == 'adviser'" class="row mb-1">
          <h6 class="p-0">Select Curriculum</h6>
          <select
            v-model="curriculum_id"
            @change="onChangeCurriculum"
            class="form-select p-2 bg-white"
            style="font-size: 17px"
          >
            <option
              style="font-size: 18px"
              v-for="option in curriculumList"
              :value="option.id"
              v-bind:key="option.id"
            >
              {{ option.code }}
            </option>
          </select>
        </div>
        <button class="btn btn-success w-100 mt-4">create</button>
      </form>
    </div>
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
      filter: ["All"],
      filterData: "All",
      id_number: null,
      columns: [
        {
          title: "User ID",
          dataIndex: "id",
          width: 100,
        },
        {
          title: "Email",
          dataIndex: "email",
          width: 200,
        },
        {
          title: "Name",
          dataIndex: "fullname",
          width: 200,
        },
        {
          title: "Acoount Type",
          width: 150,
          slots: {
            customRender: "role",
          },
        },
        {
          title: "Relation",
          width: 250,
          slots: {
            customRender: "tags",
          },
        },
      ],
    };
  },
  watch: {
    filterData(value) {
      if (value != "All") {
        var param = "?role=" + value;
        this.fetch(param);
      } else {
        this.fetch("");
      }
    },
  },
  mounted: function () {
    this.loading = true;
    this.$secured
      .get("/api/v1/users")
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    if (this.currentUser.role == "system_admin") {
      const additionCol = {
        title: "Operation",
        dataIndex: "operation",
        width: 155,
        fixed: "right",
        slots: {
          customRender: "operation",
        },
      };
      this.columns.push(additionCol);
      this.$secured
        .get("/api/v1/roles")
        .then((response) => {
          this.roleSelection = response.data.data;
          this.role = response.data.data[0];
          this.filter = [...this.filter, ...this.roleSelection];
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTimeout(() => {
      this.loading = false;
    }, 700)  
  },
  methods: {
    createUser() {
      const role = this.role;
      var dataToSend = {};
      if (role == "student") {
        dataToSend = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
          role: this.role,
          curriculum_id: this.curriculum_id,
          college_id: this.college_id,
          id_number: this.id_number
        };
      } else if (role == "adviser") {
        dataToSend = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
          role: this.role,
          curriculum_id: this.curriculum_id,
          college_id: this.college_id,
        };
      }
       else if (role == "dean") {
        dataToSend = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
          role: this.role,
          college_id: this.college_id,
        };
      } else {
        dataToSend = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          fullname: this.fullname,
          role: this.role,
        };
      }
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
          this.$toast.open({
            message: errorMessage,
            type: "warning",
            position: "top-right",
            duration: 2500,
          });
          console.log(error);
        });
    },
    fetch(param) {
      this.loading = true;
      this.$secured
        .get("/api/v1/users" + param)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        this.loading = false;
      }, 500)  
    },
    onChangeRole(event) {
      this.role = event.target.value;
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
