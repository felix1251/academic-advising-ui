<template>
  <div class="container-fluid py-4">
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
          >
          </a-table>
        </div>
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
    };
  },

  computed: {
    ...mapState(["currentUser"]),
  },
  mounted: function () {
    this.loading = true;
    this.fetchAdvising();
    this.loading = false;
  },

  methods: {
    onSelectChange: function(value) {
      this.selected_rows = value;
        // this.$secured.get("/api/v1/check_if_prereq_exist?selected_rows=" + this.selected_rows + "&subject_id=" + value[0])
        // .then(() => {
        //   this.selected_rows = value;
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
        // console.log(value)
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
    fetchAdvising() {
      this.$secured.get("/api/v1/recommendation_year_sem?student_id=" + 1 )
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
