<template>
  <div class="container-fluid py-1">
    <div
      v-for="(item, index) in advising_list[1]"
      v-bind:key="index"
      class="m-0 p-1"
    >
      <div v-if="item.data.length != 0">
        <h6 class="p-0">Firts Year - {{ ordinal_suffix_of(item.sem, 1) }}</h6>
        <a-table
          :scroll="{ x: 600 }"
          sorter
          bordered
          :columns="columns"
          size="small"
          :data-source="item.data"
          :pagination="{ pageSize: 10 }"
          rowKey="id"
        >
        </a-table>
      </div>
    </div>
    <div
      v-for="(item, index) in advising_list[2]"
      v-bind:key="index"
      class="m-0 p-1"
    >
      <div v-if="item.data.length != 0">
        <h6 class="p-0">Firts Year - {{ ordinal_suffix_of(item.sem, 1) }}</h6>
        <a-table
          :scroll="{ x: 600 }"
          :columns="columns"
          size="small"
          bordered
          :data-source="item.data"
          :pagination="{ pageSize: 10 }"
          rowKey="id"
        >
        </a-table>
      </div>
    </div>
    <div
      v-for="(item, index) in advising_list[3]"
      v-bind:key="index"
      class="m-0 p-1"
    >
      <div v-if="item.data.length != 0">
        <h6 class="p-0">Firts Year - {{ ordinal_suffix_of(item.sem, 1) }}</h6>
        <a-table
          :scroll="{ x: 600 }"
          bordered
          :columns="columns"
          size="small"
          :data-source="item.data"
          :pagination="{ pageSize: 10 }"
          rowKey="id"
        >
        </a-table>
      </div>
    </div>
      <div
        v-for="(item, index) in advising_list[4]"
        v-bind:key="index"
        class="m-0 p-1"
      >
        <div v-if="item.data.length != 0">
          <h6 class="p-0">Firts Year - {{ ordinal_suffix_of(item.sem, 1) }}</h6>
          <a-table
            :scroll="{ y: 600 }"
            bordered
            :columns="columns"
            size="small"
            :data-source="item.data"
            :pagination="{ pageSize: 10 }"
            rowKey="id"
          >
          </a-table>
        </div>
      </div>
      <div v-if="currentUser.account_type.includes('F')" class="m-0 p-1">
        <h6 class="p-0">Students</h6>
        <a-table
            :scroll="{ y: 600 }"
            bordered
            :columns="studColumns"
            size="small"
            :data-source="students"
            rowKey="id"
            :pagination="{ pageSize: 10 }"
          >
            <template #actions>
              <a-button size="small" type="primary">Advise</a-button>
            </template>
          </a-table>
      </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "subjects",
  data() {
    return {
      advising_list: [],
      selected_rows: [],
      students: [],
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
            customRender: 'actions',
          },
        },
      ]
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    if(this.currentUser.account_type.includes('S')) this.fetchAdvising()
    if(this.currentUser.account_type.includes('F')) this.fecthStud()
  },
  methods: {
    onSelectChange: function(value) {
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
        if(type == 1) {
          return "Summer";
        }else{
          return i + "rd";
        }
      }
      return i + "th";
    },
    fecthStud(){
      this.$secured.get("/api/v1/adviser_students?adviser_id="+this.currentUser.details.id)
        .then(response=>{
          this.students=response.data
        })
        .catch(error=>{
          console.log(error)
        })
    },
    fetchAdvising() {
      this.$secured.get("/api/v1/recommendation_year_sem?student_id=" + this.currentUser.details.id )
        .then((response) => {
          this.advising_list = response.data.rows;
          this.selected_rows = response.data.selected_rows
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
