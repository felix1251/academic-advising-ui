<template>
  <div class="container-fluid py-4">
    <a-button
      v-if="currentUser.account_type.includes('A')" 
      danger
      class="mb-2"
      type="primary"
      @click="showModal"
      >Create Recommendation
    </a-button>
    <a-table
      bordered
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 600 }"
      :pagination="{ pageSize: 10 }"
      size="small"
    >
      <template #prerequisites="{ record }">
        <a-button @click.prevent="showPrereqModal(record.subject_id)">
          View prerequisites
        </a-button>
      </template>
      <template #semester="{ record }">
        <span>{{ordinal_suffix_of(record.semester, 1)}}</span>
      </template>
      <template #year="{ record }">
        <span>{{ordinal_suffix_of(record.year, 2)}}</span>
      </template>
    </a-table>
    <a-modal
      v-model:visible="visible"
      title="Create Recommendation"
      centered
      @ok="createCurr"
    >
      <a-spin :spinning="loading" size="large">
        <div class="mb-2">
          <h6 class="p-0">Select Curriculum</h6>
          <select
            v-model="curriculum_id"
            @change="onChangeCurr"
            class="form-select p-2 bg-white border"
            style="font-size: 17px"
            required
          >
            <option
              style="font-size: 18px"
              v-for="option in currList"
              :value="option.id"
              v-bind:key="option.id"
            >
              {{ option.code.toUpperCase() }} ({{ option.description }})
            </option>
          </select>
        </div>
        <div class="mb-2">
          <h6 class="p-0">Select Subject</h6>
          <select
            v-model="subject_id"
            @change="onChangeSelectSubjects"
            class="form-select p-2 bg-white border"
            style="font-size: 17px"
            required
          >
            <option
              style="font-size: 18px"
              v-for="option in subjectsList"
              :value="option.id"
              v-bind:key="option.id"
            >
              {{ option.code.toUpperCase() }} ({{ option.description }})
            </option>
          </select>
        </div>
        <div class="mb-2">
          <h6 class="p-0">Semester</h6>
          <a-input
            size="large"
            type="numbers"
            placeholder="Enter Curriculum Code"
            v-model:value="semester"
            required
          />
        </div>
        <div class="mb-2">
          <h6 class="p-0">Year</h6>
          <a-input
            size="large"
            type="numbers"
            placeholder="Enter Curriculum Code"
            v-model:value="year"
            required
          />
        </div>
      </a-spin>
    </a-modal>
    <a-modal
      v-model:visible="prereqModal"
      title="Prerequisites"
      centered
      @ok="exitPrereqModal"
    >
      <a-spin :spinning="loading" size="large">
        <a-table :columns="prereqColumns" :data-source="subjectPrequsiteList" />
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "recommendations",
  data() {
    return {
      data: [],
      code: "",
      loading: false,
      visible: false,
      prereqModal: false,
      description: "",
      subject_id: null,
      curriculum_id: null,
      group_id: null,
      year: null,
      semester: null,
      subjectsList: [],
      currList: [],
      subjectPrequsiteList: [],
      columns: [
        {
          title: "curriculum",
          customRender: (s) => (
            <div>
              {s.record.curriculum_code.toUpperCase()} (
              {s.record.curriculum_description}){" "}
            </div>
          ),
          width: 150,
        },
        {
          title: "subject",
          customRender: (s) => (
            <div>
              {s.record.subject_code.toUpperCase()} (
              {s.record.subject_description}){" "}
            </div>
          ),
          width: 150,
        },
        {
          title: "Year",
          key: "year",
          width: 100,
          slots: {
            customRender: "year",
          },
        },
        {
          title: "Semester",
          key: "semester",
          width: 100,
          slots: {
            customRender: "semester",
          },
        },
        {
          title: "Prerequisites",
          key: "prerequisites",
          width: 100,
          slots: {
            customRender: "prerequisites",
          },
        },
      ],
      prereqColumns: [
        {
          title: "subject",
          customRender: (s) => (
            <div>
              {s.record.prerequisite_code.toUpperCase()} (
              {s.record.prerequisite_description}){" "}
            </div>
          ),
          width: 150,
        },
      ],
    };
  },

  computed: {
    ...mapState(["currentUser"]),
  },

  mounted: function () {
    this.loading = true;
    this.fetchRecom();
    this.loading = false;
  },

  methods: {
    showModal: function () {
      this.visible = true;
      this.fetchSubjects();
      this.fetchCurr();
    },
    showPrereqModal: function (id) {
      this.loading = true;
      this.prereqModal = true;
      this.fetchPrereq(id);
      this.loading = false;
    },
    fetchSubjects() {
      this.$secured
        .get("/api/v1/subjects")
        .then((response) => {
          this.subjectsList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchRecom() {
      this.$secured
        .get("/api/v1/recommendations")
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchCurr() {
      this.$secured
        .get("/api/v1/curriculums")
        .then((response) => {
          this.currList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchPrereq(params_id) {
      this.$secured
        .get("/api/v1/find_prerequisites_by_subject_id?subject_id=" + params_id)
        .then((response) => {
          this.subjectPrequsiteList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChangeSelectSubjects(event) {
      this.subject_id = event.target.value;
    },
    onChangeCurr(event) {
      this.curriculum_id = event.target.value;
    },
    exitPrereqModal() {
      this.prereqModal = false;
      this.subjectPrequsiteList = [];
    },
    ordinal_suffix_of(i, type) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        if(type == 1) {
          return "Summer";
        }else{
          return i + "rd";
        }
      }
      return i + "th";
    },
    createCurr() {
      this.loading = true;
      this.$secured
        .post("/api/v1/recommendations", {
          recommendation: {
            subject_id: this.subject_id,
            curriculum_id: this.curriculum_id,
            semester: this.semester,
            year: this.year,
          },
        })
        .then((response) => {
          this.$toast.open({
            message: "Succesfully Created",
            type: "success",
            position: "top-right",
            duration: 2500,
          });
          console.log(response.data);
          this.visible = false;
          this.fetchRecom();
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
      this.loading = false;
      this.visible = false;
    },

    // deleteSubject(id) {
    //   console.log(id)
    //   this.loading = true
    //   this.$secured.delete(`/api/v1/subjects/${id}`)
    //   this.loading = false
    // },
    // editUser(id) {
    //   console.log(id);
    // },
  },
};
</script>
