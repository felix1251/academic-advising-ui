<template>
  <div class="container-fluid py-4">
    <a-button 
      v-if="currentUser.account_type.includes('A')" 
      danger
      class="mb-2" 
      type="primary"  
      @click="showModal"
      >Create Prerequisite
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
        <!-- <template
          v-if="currentUser.role == 'system_admin'"
          #operation="{ record }"
          >
          <a-button
            type="primary"
            style="background: greenyellow; color:black"
            @click.prevent="editUser(record.id)"
            shape="round"
            size="small"
            >Edit</a-button
          >
          {{ " " }}
          <a-button
            type="primary"
            danger
            @click.prevent="deleteSubject(record.id)"
            shape="round"
            size="small"
            >Delete</a-button
          >
        </template> -->
     </a-table>
    <a-modal v-model:visible="visible" title="Create Prequisites" centered @ok="createPrerequisite">
     <a-spin :spinning="loading" size="large">
      <div class="mb-2">
        <h6 class="p-0">Select Subject </h6>
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
              {{ option.code.toUpperCase() }} ({{option.description}})
            </option>
          </select>
      </div>
      <div class="mb-2">
        <h6 class="p-0">Select Subject Prerequisites </h6>
        <select
            v-model="prerequisite_id"
            @change="onChangeSelectPrerequisites"
            class="form-select p-2 bg-white border"
            style="font-size: 17px"
            required
          >
            <option
              style="font-size: 18px"
              v-for="option in prerequisitesList"
              :value="option.id"
              v-bind:key="option.id"
            >
              {{ option.code.toUpperCase() }} ({{option.description}})
            </option>
          </select>
      </div>
      <div class="mb-2">
        <h6 class="p-0">Create group</h6>
          <a-input
            size="large"
            type="number"
            placeholder="Enter Curriculum Code"
            v-model:value="group_id"
            required
          />
      </div>
    </a-spin>
    </a-modal>
  
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "subjects",
  data(){
    return{
    data: [],
    code: "",
    loading: false,
    visible: false,
    description: "",
    subject_id: null,
    prerequisite_id: null,
    group_id: 1,
    subjectsList: [],
    prerequisitesList: [],
    columns: [
        {
          title: 'Subject',
          width: 300,
          customRender: (s) => <div>{s.record.subject_code.toUpperCase()} ({s.record.subject_description}) </div>,
        },
        {
          title: 'Prerequisite',
          customRender: (s) => <div>{s.record.prerequisite_code.toUpperCase()} ({s.record.prerequisite_description}) </div>,
          width: 300,
        },
        // {
        //   title: 'Group id',
        //   dataIndex: 'group_id',
        //   width: 100,
        // },
        // {
        //   title: 'Year',
        //   width: 100,
        //   customRender: (s) => ordinal_suffix_of(s.record.year) + " year",
        // },
        //  {
        //   title: 'Semester',
        //   width: 100,
        //   customRender: (s) => ordinal_suffix_of(s.record.semester) + " semester",
        // },
        // {
        //   title: 'College',
        //   width: 100,
        //   customRender: (s) => s.record.college_code.toUpperCase() ,
        // },
        // {
        //   title: 'Curriculum',
        //   width: 100,
        //   customRender: (s) => s.record.curriculum_code.toUpperCase() ,
        // }
      ],
    }
  },

  computed: {
    ...mapState(["currentUser"]),
  },
  mounted: function (){
    this.fetchPrereq()
  },
  
  methods: {
    showModal: function(){
      this.visible = true
      this.fetchSubjects()
      // this.fetchCurr()
    },
    fetchPrereq(){
      this.loading = true;
      this.$secured.get('/api/v1/prerequisites')
        .then(response => { 
          this.data = response.data
          this.loading = false;
        })
        .catch(error => { 
          console.log(error)
          this.loading = false; 
        });
    },
    fetchSubjects(){
      this.$secured.get('/api/v1/subjects')
        .then(response => { 
          this.subjectsList = response.data
          this.prerequisitesList = response.data
        })
        .catch(error => { console.log(error) })
    },
    // fetchPrerequisite(){
    //    this.$secured.get('/api/v1/subjects')
    //     .then(response => { })
    //     .catch(error => { console.log(error) })
    // },
    onChangeSelectSubjects(event) {
      this.subject_id = event.target.value;
    },
    onChangeSelectPrerequisites(event) {
      this.prerequisite_id = event.target.value;
    },
    createPrerequisite(){
      this.loading = true
      this.$secured.post("/api/v1/prerequisites", {prerequisite: {
        subject_id: this.subject_id,
        group_id: this.group_id,
        subject_prerequisite_id: this.prerequisite_id
      }})
      .then(()=>{
        this.$toast.open({
            message: "Succesfully Created",
            type: "success",
            position: "top-right",
            duration: 2500,
          })
        this.visible = false
        this.fetchPrereq()
      })
      .catch(()=> {
        this.$toast.open({
            message: "Something is Wrong",
            type: "warning",
            position: "top-right",
            duration: 2500,
          });
          this.loading = false
      })
      this.loading = false
      this.subject_id = null
      this.prerequisite_id = null
      this.group_id = 1
      this.visible = false
    },

    deleteSubject(id) {
      console.log(id)
      this.loading = true
      this.$secured.delete(`/api/v1/subjects/${id}`)
      this.loading = false
    },
    editUser(id) {
      console.log(id);
    },
  }
};
</script>
