<template>
  <a-form ref="formRef" :model="form" layout="vertical" :rules="rules">
    <a-row :gutter="13">
      <a-col>
        <a-form-item label="First Name" name="first_name">
          <a-input v-model:value="form.first_name" placeholder="Enter first name"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Middle Name" name="middle_name">
          <a-input v-model:value="form.middle_name" placeholder="Enter middle name"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Last Name" name="last_name">
          <a-input v-model:value="form.last_name" placeholder="Enter last name"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Suffix" name="suffix">
          <a-input v-model:value="form.suffix" placeholder="Enter suffix"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Gender" name="gender">
          <a-radio-group v-model:value="form.gender">
            <a-radio value="male">Male</a-radio>
            <a-radio value="female">Female</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="13">
      <a-col>
        <a-form-item label="College" name="college_id">
          <a-select
            v-model:value="form.college_id"
            style="width: 300px"
            placeholder="Select college"
            :options="collegeData.map(item => ({value: item.id, label: item.code}))"
            :getPopupContainer="trigger => trigger.parentNode"
            @focus="getCollegeData"
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Curriculum" name="curriculum_id">
          <a-select
            v-model:value="form.curriculum_id"
            style="width: 300px"
            :disabled="!form.college_id"
            placeholder="Select curriculum"
            :options="curriculumData.map(item => ({value: item.id, label: item.code}))"
            :getPopupContainer="trigger => trigger.parentNode"
            @focus="getCurriculumData"
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Adviser" name="adviser">
          <a-select
            v-model:value="form.adviser_id"
            style="width: 300px"
            :disabled="!form.college_id"
            placeholder="Select adviser"
            :options="adviserData.map(item => ({value: item.id, label: `${item.last_name}, ${item.first_name}`}))"
            :getPopupContainer="trigger => trigger.parentNode"
            @focus="getAdviserData"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="13">
      <a-col>
        <a-form-item label="ID No." name="id_number">
          <a-input-number style="width: 200px" placeholder="Enter id number" v-model:value="form.id_number"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Username" name="username">
          <a-input v-model:value="form.username" placeholder="Enter username"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Password" name="password">
          <a-input-password v-model:value="form.password" placeholder="Enter password" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Password Confirmation" name="password_confirmation">
          <a-input-password v-model:value="form.password_confirmation" placeholder="Password Confirmation" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-form-item>
        <a-button type="primary" @click="createStudent">Create</a-button>
        <a-button @click.prevent="closeDrawer" style="margin-left: 10px">Cancel</a-button>
      </a-form-item>
    </a-row>
  </a-form>
</template>
<script>

export default {
  data() {
    return {
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        gender: "male",
        username: null,
        id_number: null,
        curriculum_id: null,
        adviser_id: null,
        college_id: null,
        password: null,
        password_confirmation: null,
      },
      rules: {
        first_name: [{ required: true, message: 'required' }],
        middle_name: [{required: true, message: 'required'}],
        last_name: [{ required: true, message: 'required' }],
        gender: [{ required: true, message: 'required' }],
        password: [{ required: true, message: 'required' }],
        password_confirmation: [{ required: true, message: 'required' }],
        username: [{ required: true, message: 'required' }],
        curriculum_id: [{ required: true, message: 'required' }],
        college_id: [{ required: true, message: 'required' }],
        id_number: [{ required: true, message: 'required' }],
      },
      curriculumData: [],
      collegeData: [],
      adviserData: [],
    };
  },
  methods: {
    createStudent(){
      this.$refs.formRef.validate()
        .then(()=>{
          this.$secured.post("/api/v1/students", { student: this.form })
            .then(() => {
              this.closeDrawer()
              this.getUsers()
              this.$toast.open({ message: "Student successfully created", type: "success", position: "top-right", duration: 2500});
            })
            .catch(()=>{
              this.$toast.open({ message: "Can't create student something is wrong", type: "error", position: "top-right", duration: 2500});
              return
            })
        })
        .catch((error)=>{
          let numberOfError = error.errorFields.length;
          let msg = `Failed to create, has ${numberOfError} input error${ numberOfError > 1 ? "s" : ""}`
          this.$toast.open({ message: msg, type: "error", position: "top-right", duration: 2500});
        })
    
    },
    getCurriculumData(focus){
      if(!focus) return
      this.$secured.get("/api/v1/curriculums?college_id="+this.form.college_id)
        .then((response) => {
          this.curriculumData = response.data
        })
        .catch(()=>{})
    },
    getCollegeData(focus){
      if(!focus) return
      this.$secured.get("/api/v1/colleges")
        .then((response) => {
          this.collegeData = response.data
        })
        .catch(()=>{})
    },
    getAdviserData(focus){
      if(!focus) return
      this.$secured.get("/api/v1/staffs?college_id="+this.form.college_id)
        .then((response) => {
          this.adviserData = response.data
        })
        .catch(()=>{})
    }
  },
  props: {
    closeDrawer: {type: Function},
    getUsers: {type: Function}
  }
};
</script>
<style lang=""></style>
