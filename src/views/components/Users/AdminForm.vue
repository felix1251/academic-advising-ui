<template>
  <a-form :model="form" layout="vertical">
    <a-row :gutter="13">
      <a-col>
        <a-form-item label="First Name">
          <a-input v-model:value="form.first_name" placeholder="Enter first name"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Middle Name">
          <a-input v-model:value="form.middle_name" placeholder="Enter middle name"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Last Name">
          <a-input v-model:value="form.last_name" placeholder="Enter last name"/>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Suffix">
          <a-input v-model:value="form.suffix" placeholder="Enter suffix"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-form-item label="Gender">
          <a-radio-group v-model:value="form.gender">
            <a-radio value="male">Male</a-radio>
            <a-radio value="female">Female</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="13">
      <a-col>
        <a-form-item label="Password">
          <a-input-password v-model:value="form.password" placeholder="Enter password" />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="Password Confirmation">
          <a-input-password v-model:value="form.password_confirmation" placeholder="Password Confirmation" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-form-item>
        <a-button type="primary" @click="createAdmin">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
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
    };
  },
  methods: {
    createAdmin(){

    }
  },
  props: {
    closeDrawer: {type: Function}
  }
};
</script>
<style lang=""></style>
