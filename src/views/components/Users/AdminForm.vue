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
    </a-row>
    <a-row>
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
        <a-button type="primary" @click="createAdmin">Create</a-button>
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
        password: null,
        password_confirmation: null,
      },
      rules: {
        first_name: [{ required: true, message: 'required' }],
        middle_name: [{required: true, message: 'required'}],
        last_name: [{ required: true, message: 'required' }],
        suffix: [{ required: true, message: 'required' }],
        gender: [{ required: true, message: 'required' }],
        password: [{ required: true, message: 'required' }],
        password_confirmation: [{ required: true, message: 'required' }],
        username: [{ required: true, message: 'required' }],
      }
    };
  },
  methods: {
    createAdmin(){
      this.$refs.formRef.validate()
        .then(()=>{
          this.$secured.post("/api/v1/admins", { admin: this.form })
            .then(() => {
              this.closeDrawer()
              this.getUsers()
              this.$toast.open({ message: "Successfully Created", type: "success", position: "top-right", duration: 2500});
            })
            .catch(()=>{
              this.$toast.open({ message: "Can't create admin something is wrong", type: "error", position: "top-right", duration: 2500});
              return
            })
        })
        .catch((error)=>{
          let numberOfError = error.errorFields.length;
          let msg = `Failed to create, has ${numberOfError} input error${ numberOfError > 1 ? "s" : ""}`
          this.$toast.open({ message: msg, type: "error", position: "top-right", duration: 2500});
        })
    
    }
  },
  props: {
    closeDrawer: {type: Function},
    getUsers: {type: Function}
  }
};
</script>
<style lang=""></style>
