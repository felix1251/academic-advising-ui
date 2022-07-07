<template>
  <div
    class="d-flex flex-column w-100 justify-content-center align-items-center table table-success"
  >
    <div class="d-flex flex-row">
      <div
        v-for="(item, index) in advising_list[1]"
        v-bind:key="index"
        class="w-50 m-0 p-1"
        style="min-height: 300"
      >
        <div v-if="item.data.length != 0">
          <h6 class="p-0">Firts Year/{{ item.sem }} sem</h6>
          <a-table
            :row-selection="{
              selectedRowKeys: selected_rows,
              onChange: onSelectChange,
            }"
            sorter
            rowKey="subject_id"
            :columns="columns"
            size="small"
            :data-source="item.data"
            :pagination="{ pageSize: 10 }"
          >
          </a-table>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div
        v-for="(item, index) in advising_list[2]"
        v-bind:key="index"
        class="w-50 m-0 p-1"
        style="min-height: 300"
      >
        <div v-if="item.data.length != 0">
          <h6 class="p-0">Second Year/{{ item.sem }} sem</h6>
          <a-table
            :row-selection="{
              selectedRowKeys: selected_rows,
              onChange: onSelectChange,
            }"
            rowKey="subject_id"
            :columns="columns"
            size="small"
            :data-source="item.data"
            :pagination="{ pageSize: 10 }"
          >
          </a-table>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div
        v-for="(item, index) in advising_list[3]"
        v-bind:key="index"
        class="w-50 m-0 p-1"
        style="min-height: 300"
      >
        <div v-if="item.data.length != 0">
          <h6 class="p-0">Third Year/{{ item.sem }} sem</h6>
          <a-table
            :row-selection="{
              selectedRowKeys: selected_rows,
              onChange: onSelectChange,
            }"
            rowKey="subject_id"
            :columns="columns"
            size="small"
            :data-source="item.data"
            :pagination="{ pageSize: 10 }"
          >
          </a-table>
        </div>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div
        v-for="(item, index) in advising_list[4]"
        v-bind:key="index"
        class="w-50 m-0 p-1"
        style="min-height: 300"
      >
        <div v-if="item.data.length != 0">
          <h6 class="p-0">Fourth Year/{{ item.sem }} sem</h6>
          <a-table
            :row-selection="{
              selectedRowKeys: selected_rows,
              onChange: onSelectChange,
            }"
            rowKey="subject_id"
            :columns="columns"
            size="small"
            :data-source="item.data"
            :pagination="{ pageSize: 10 }"
          >
          </a-table>
        </div>
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
          title: "subject",
          customRender: (s) => (
            <div>
              {s.record.subject_code.toUpperCase()} (
              {s.record.subject_description}){" "}
            </div>
          ),
          width: 530,
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
        this.$secured.get("/api/v1/check_if_prereq_exist?selected_rows=" + this.selected_rows + "&subject_id=" + value[0])
        .then(() => {
          this.selected_rows = value;
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(value)
    },
    fetchAdvising() {
      this.$secured.get("/api/v1/recommendation_year_sem?student_id=" + 2 )
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
