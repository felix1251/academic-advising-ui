<template>
  <div class="container-fluid py-4">
    <a-button
      v-if="currentUser.role == 'system_admin'"
      class="mb-2"
      type="primary"
      danger
      @click="showModal"
    >
      Create Department
    </a-button>

    <a-table
      bordered
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 10 }"
      :scroll="{ x: 600 }"
    />

    <a-modal
      v-model:visible="visible"
      title="Create Department"
      centered
      @ok="createDepartment"
    >
      <a-spin :spinning="loading" size="large">
        <div class="mb-2">
          <h6 class="p-0">Code</h6>

          <a-input
            size="large"
            placeholder="Enter College Code"
            v-model:value="code"
          />
        </div>

        <div class="mb-2">
          <h6 class="p-0">Description</h6>

          <a-input
            size="large"
            placeholder="Enter College Description"
            v-model:value="description"
            @keyup.enter="createCollege"
          />
        </div>
        <div class="mb-2">
          <h6 class="p-0">Select College</h6>
          <select
            v-model="college_id"
            @change="onChangeSelect"
            class="form-select p-2 bg-white border"
            style="font-size: 17px"
          >
            <option
              style="font-size: 18px"
              v-for="option in collegeList"
              :value="option.id"
              v-bind:key="option.id"
            >
              {{ option.code.toUpperCase() }}
            </option>
          </select>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "colleges",
  data() {
    return {
      data: [],
      visible: false,
      code: "",
      collegeList: [],
      college_id: null,
      description: "",
      loading: false,
      columns: [
        // {
        //   title: 'College ID',
        //   dataIndex: 'id',
        //   width: 100,
        // },
        {
          title: "Code",
          width: 100,
          customRender: (s) => s.record.code.toUpperCase(),
        },
        {
          title: "Description",
          dataIndex: "description",
        },
        {
          title: "College",
          width: 100,
          customRender: (s) => s.record.college_code.toUpperCase(),
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mounted: function () {
    this.fetchDepartments()
  },
  methods: {
    fetchDepartments() {
      this.$plain
        .get("/api/v1/departments")
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showModal: function () {
      this.visible = true;
      this.fetchCollege();
    },
    fetchCollege() {
      this.$secured
        .get("/api/v1/colleges")
        .then((response) => {
          this.collegeList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChangeSelect(event) {
      this.college_id = event.target.value;
    },
    createDepartment: function () {
      this.loading = true;
      this.$secured
        .post("/api/v1/departments", {
          department: {
            code: this.code.toLowerCase(),
            description: this.description,
            college_id: this.college_id,
          },
        })
        .then((response) => {
          this.$toast.open({
            message: "Succesfully Created",
            type: "success",
            position: "top-right",
            duration: 2500,
          });
          this.visible = false;
        //   this.data.push(response.data);
        this.fetchDepartments()
          console.log(response);
        })
        .catch((error) => {
          this.$toast.open({
            message: "Something is Wrong",
            type: "warning",
            position: "top-right",
            duration: 2500,
          });
          this.loading = false;
          console.log(error.response.data.code);
        });
      this.code = "";
      this.description = "";
      this.college_id = null;
      this.loading = false;
    },
  },
};
</script>
