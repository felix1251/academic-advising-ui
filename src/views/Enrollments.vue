<template>
  <div class="d-flex flex-column">
    <a-modal v-model:visible="visible" title="Student" centered>
      <div class="d-flex flex-column fs-6">
        <span><b>Name: </b> {{ student_data.fullname }}</span>
        <span><b>College: </b> {{ student_data.college_code }}</span>
        <span><b>Course: </b> {{ student_data.curriculum_code }}</span>
        <span><b>Id number: </b> {{ student_data.id_number }}</span>
      </div>
      <template #footer>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="proceed"
          >proceed</a-button
        >
      </template>
    </a-modal>
    <div class="w-20 mb-2">
      <h6 class="p-0">Semester</h6>
      <select
        v-model="semester_id"
        @change.prevent="onChangeSelectSemester"
        class="form-select p-2 bg-white border"
        style="font-size: 17px"
      >
        <option
          style="font-size: 18px"
          v-for="option in semester"
          :value="option.id"
          v-bind:key="option.id"
        >
          {{ option.desc }}
        </option>
      </select>
    </div>
    <div class="w-20 mb-2">
      <h6 class="p-0">Student Id Number</h6>
      <div class="d-flex flex-row">
        <a-input v-model:value="id_number" type="number" />
        <a-button @click.prevent="searchStudent">Search</a-button>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div class="w-50">
        <h6 class="p-0">Recommended Subjects</h6>
        <a-table
          rowKey="id"
          :columns="recomColumns"
          :data-source="recomData"
          :scroll="{ y: 600 }"
          :pagination="{ pageSize: 200 }"
        >
          <template #actions="{ record }">
            <a-button
              type="primary"
              @click.prevent="enrollSubject(record.subject_id)"
            >
              Enroll
            </a-button>
          </template>
        </a-table>
      </div>
      <div class="w-50">
        <h6 class="p-0">Enrolled Subjects</h6>
        <a-table
          bordered
          rowKey="id"
          :columns="enrolledColumns"
          :data-source="enroledData"
          :scroll="{ y: 600 }"
          :pagination="{ pageSize: 30 }"
        >
        <template #actions="{ record }">
            <a-button
              type="danger"
              @click.prevent="unEnrollSubject(record.id)"
            >
              unenroll
            </a-button>
          </template>
        </a-table>
        <div class="d-flex flex-column bg-white p-2">
          <span>Allowed units: 24</span>
          <span>Enrolled units: 0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "recommendations",
  data() {
    return {
      recomData: [],
      enroledData: [],
      loading: false,
      visible: false,
      semester_id: 1,
      id_number: null,
      semester: [
        { id: 1, desc: "1st semester" },
        { id: 2, desc: "2nd semester" },
        { id: 3, desc: "summer" },
      ],
      student_data: [],
      recomColumns: [
        {
          title: "Subject",
          customRender: (s) => <div>{s.record.subject_code.toUpperCase()} ({s.record.subject_description}) </div>,
          width: 100,
        },
        {
          title: "Units",
          dataIndex: "units",
          width: 100,
        },
        {
          title: "Semester",
          dataIndex: "semester",
          width: 80,
        },
        {
          title: "Actions",
          key: "actions",
          slots: {
            customRender: "actions",
          },
          width: 60,
        },
      ],
      enrolledColumns: [
        {
          title: "Subject",
          customRender: (s) => <div>{s.record.subject_code.toUpperCase()} ({s.record.subject_description}) </div>,
          width: 100,
        },
        {
          title: "Units",
          dataIndex: "units",
          width: 100,
        },
        {
          title: "Actions",
          key: "actions",
          slots: {
            customRender: "actions",
          },
          width: 60,
        },
      ],
    };
  },

  computed: {
    ...mapState(["currentUser"]),
  },

  mounted: function () {},

  methods: {
    fectRecom() {
      this.$secured
        .get(
          "/api/v1/get_student_recommended_subjects?student_curriculum_id=" +
            this.student_data.curriculum_id + "&semester="+this.semester_id+"&student_id="+this.student_data.id
        )
        .then((response) => {
          this.recomData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    proceed() {
      this.loading = true;
      this.fectRecom();
      this.fetchStudentSubjectEnrolled();
      this.visible = false;
      this.loading = false;
    },
    fetchStudentSubjectEnrolled() {
      this.$secured
        .get("/api/v1/get_student_enrolled_subjects?student_id="+this.student_data.id)
        .then((response) => {
          this.enroledData = response.data;
        });
    },
    enrollSubject(subject_id) {
      this.$secured
        .post("/api/v1/enrollments", {
          enrollment: {
            student_id: this.student_data.id,
            enrolled_id: subject_id,
            sem: this.semester_id,
            datetime_enrolled: new Date(),
          },
        })
        .then((response) => {
          this.enroledData = response.data;
          this.fetchStudentSubjectEnrolled();
          this.fectRecom();
        });
    },
    unEnrollSubject(subject_id) {
      this.$secured
        .delete("/api/v1/enrollments/"+subject_id)
        .then(() => {
          this.fectRecom();
          this.fetchStudentSubjectEnrolled();
        });
    },
    onChangeSelectSemester(event) {
      this.semester_id = event.target.value;
      this.proceed()
    },
    searchStudent() {
      if (this.id_number) {
        this.$secured
          .get("/api/v1/search_student?id_number=" + this.id_number)
          .then((response) => {
            this.student_data = response.data;
            this.visible = true;
          })
          .catch(() => {
            this.$toast.open({
              message: "No result",
              type: "warning",
              position: "top-right",
              duration: 2500,
            });
          });
      } else {
        this.$toast.open({
          message: "Please input student id first",
          type: "warning",
          position: "top-right",
          duration: 2500,
        });
      }
    },
    ordinal_suffix_of(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    },
  },
};
</script>
