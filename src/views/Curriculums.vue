<template>
  <div class="container-fluid py-4">
    <a-button 
      class="mb-2" 
      type="primary" 
      danger 
      v-if="currentUser.account_type.includes('A')" 
      @click="showModal"
    >
    Create Curriculum
    </a-button>

    <a-table
      bordered
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 600 }"
      :pagination="{ pageSize: 10 }"
    />
    <a-modal 
      v-model:visible="visible" 
      title="Create Curriculum" 
      centered 
      @ok="createCurriculum"
    >
      <a-spin :spinning="loading" size="large">

        <div class="mb-2">
          <h6 class="p-0">Select College </h6>
            <select
              v-model="college_id"
              @change="onChangeSelectCollege"
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

        <div class="mb-2">
          <h6 class="p-0">Select Department </h6>
            <select
              v-model="department_id"
              @change="onChangeSelectDepartment"
              class="form-select p-2 bg-white border"
              style="font-size: 17px"
              >
              <option
                style="font-size: 18px"
                v-for="option in departmentList"
                :value="option.id"
                v-bind:key="option.id"
                >
                {{ option.code.toUpperCase() }} 
              </option>
            </select>
        </div>

        <div class="mb-2">
          <h6 class="p-0">Code</h6>
          <a-input
            size="large"
            placeholder="Enter Curriculum Code"
            v-model:value="code"
            />
        </div>

        <div class="mb-2">
          <h6 class="p-0">Description</h6>
          <a-input
            size="large"
            placeholder="Enter Curriculum Description"
            v-model:value="description"
            />
        </div>

      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "curriculums",
  data(){
    return{
    data: [],
    code: "",
    description: "",
    college_code: "",
    college_id: null,
    collegeList: [],
    department_id: null,
    departmentList:[],
    loading: false,
    visible: false,
    columns: [
        {
          title: 'Code',
          width: 100,
          customRender: (s) => s.record.code.toUpperCase() ,
        },
        {
          title: 'Description',
          customRender: (s) => <div>{s.record.description}</div> ,
          width: 450,
        },
        {
          title: 'Department',
          customRender: (s) => <div>{s.record.department_description} ({s.record.department_code.toUpperCase()})</div> ,
          width: 200,
        },
        {
          title: 'College',
          width: 100,
          customRender: (s) => s.record.college_code.toUpperCase() ,
        },
      ],
    }
  },
  //-----Computed-----
  computed: {
    ...mapState(["currentUser"]),
  },

  //-----Mounted------
  mounted: function (){
    this.fetchCurr()
  },

  //-----Methods-----
  methods: {
    showModal: function(){
      this.visible = true
      this.fetchCollege()
    },

    //-----fetch -----
    fetchCollege(){
       this.$secured.get('/api/v1/colleges')
        .then(response => { this.collegeList = response.data})
        .catch(error => { console.log(error) })
    },
    fetchDepartment(){
        this.$secured.get("/api/v1/get_department_by_college_id?college_id="+ this.college_id)
        .then(response => { this.departmentList = response.data})
        .catch(error => { console.log(error) })
    },
    fetchCurr(){
       this.$secured.get('/api/v1/curriculums')
        .then(response => { this.data = response.data})
        .catch(error => { console.log(error) })
    },

    //-----onChangeEvents Methods-----
    onChangeSelectCollege(event) {
      this.college_id = event.target.value;
      this.fetchDepartment()
    },
    onChangeSelectDepartment(event) {
      this.department_id = event.target.value;
    },

    //-----Create Method-----
    createCurriculum(){
      this.loading = true
      this.$secured.post("/api/v1/curriculums", {curriculum: {
        code: this.code.toLowerCase(),
        description: this.description,
        college_id: this.college_id,
        department_id: this.department_id
      }})
      .then(response=>{
        this.$toast.open({
            message: "Succesfully Created",
            type: "success",
            position: "top-right",
            duration: 2500,
          })
        console.log(response.data)
        this.visible = false
        this.fetchCurr()
      })
      .catch(error => {
        this.$toast.open({
            message: "Something is Wrong",
            type: "warning",
            position: "top-right",
            duration: 2500,
          });
          this.loading = false
          console.log(error.response.data.code)
      })
      this.college_code = ""
      this.department_id = null
      this.code = ""
      this.description = ""
      this.college_id = null
      this.visible= false
      this.loading = false
    }
  },
};
</script>
