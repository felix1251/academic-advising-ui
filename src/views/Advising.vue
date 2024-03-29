<template>
  <div class="container-fluid py-1">
    <div class="d-flex gap-2 justify-content-between align-items-center" v-if="currentUser.account_type.includes('S') && adviser" >
      <span class="mx-2"><b>Adviser: </b>{{`${adviser.first_name} ${adviser.middle_name} ${adviser.last_name}`}}</span>
      <a-button 
        class="mb-2" type="primary"
        @click.prevent="openDrawer()"
      >
        Advising
      </a-button>
    </div>
    <Subjects
      v-if="currentUser.account_type.includes('S')"
      :advising_list="advising_list"
      :columns="columns"
      :ordinal_suffix_of="ordinal_suffix_of"
    />
    <div v-if="currentUser.account_type.includes('F')" class="m-0 p-1">
      <h6 class="p-0">Students</h6>
      <a-table
        :scroll="{ x: 600 }"
        bordered
        :columns="studColumns"
        size="small"
        :data-source="students"
        rowKey="id"
        :pagination="{ pageSize: 10 }"
      >
        <template #actions="{ record }">
          <a-button
            size="small"
            shape="round"
            type="primary"
            @click.prevent="openDrawer(record.id)"
            >Advise</a-button
          >
        </template>
      </a-table>
    </div>
    <a-drawer
      v-model:visible="drawer"
      width="100%"
      title="Advising"
      :zIndex="9999"
      :destroyOnClose="true"
    >
      <comment/>
    </a-drawer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Subjects from "@/views/components/Advising/Subjects.vue";
import Comment from "@/views/components/Advising/Comment.vue";

export default {
  name: "subjects",
  data() {
    return {
      advising_list: {},
      selected_rows: [],
      students: [],
      drawer: false,
      adviser: null,
      columns: [
        {
          title: "Subjects",
          customRender: (s) => (
            <div>
              {s.record.subject_code.toUpperCase()} (
              {s.record.subject_description}){" "}
            </div>
          ),
          width: 530,
        },
        {
          title: "Grade",
          dataIndex: "grade",
          width: 60,
        },
        {
          title: "Units",
          dataIndex: "units",
          width: 50,
        },
      ],
      studColumns: [
        {
          title: "First Name",
          dataIndex: "first_name",
          width: 60,
        },
        {
          title: "Midddle Name",
          dataIndex: "middle_name",
          width: 50,
        },
        {
          title: "Last Name",
          dataIndex: "last_name",
          width: 50,
        },
        {
          title: "Year",
          dataIndex: "year",
          width: 50,
        },
        {
          title: "Actions",
          key: "actions",
          width: 30,
          slots: {
            customRender: "actions",
          },
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    if (this.currentUser.account_type.includes("S")){
      this.getStudAdviser()
      this.fetchAdvising(this.currentUser.details.id);
      
    }
    if (this.currentUser.account_type.includes("F")) this.fecthStud();
  },
  methods: {
    onSelectChange: function (value) {
      this.selected_rows = value;
    },
    ordinal_suffix_of(i, type) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st Semester";
      }
      if (j == 2 && k != 12) {
        return i + "nd Semester";
      }
      if (j == 3 && k != 13) {
        if (type == 1) {
          return "Summer";
        } else {
          return i + "rd";
        }
      }
      return i + "th";
    },
    fecthStud() {
      this.$secured
        .get(
          "/api/v1/adviser_students?adviser_id=" + this.currentUser.details.id
        )
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStudAdviser(){
      this.$secured.get("/api/v1/get_stud_adviser?adviser_id=" + this.currentUser.details.adviser_id)
        .then(response=>{
          this.adviser = response.data
        })
    },
    fetchAdvising(id) {
      this.$secured
        .get("/api/v1/recommendation_year_sem?student_id=" + id)
        .then((response) => {
          this.advising_list = response.data.rows;
          this.selected_rows = response.data.selected_rows;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openDrawer() {
      this.drawer = true;
      // this.fetchAdvising(id);
    },
  },
  components: {
    Subjects,
    Comment
  },
};
</script>
