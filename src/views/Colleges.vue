<template>

  <div class="container-fluid py-4">
    
    <a-button 
      v-if="currentUser.account_type.includes('A')" 
      class="mb-2" 
      type="primary" 
      danger 
      @click="showModal"
      >
      Create Colleges
    </a-button>

    <a-table
      size= "small"
      bordered
      rowKey="id"
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 10 }"
      :scroll="{ x: 600 }"
    />

    <a-modal 
      v-model:visible="visible"
      title="Create Colleges" 
      centered 
      @ok="createCollege"
      
      >

      <a-spin :spinning="loading" size="large">

        <div class="mb-2">

          <h6 class="p-0">Code</h6>

          <a-input
            size="large"
            placeholder="Enter College Code"
            v-model:value="code"
          />

        </div>

        <div class="mb-2">

          <h6 class="p-0">Description</h6>

          <a-input
            size="large"
            placeholder="Enter College Description"
            v-model:value="description"
            @keyup.enter="createCollege"
          />

        </div>

     </a-spin>

    </a-modal>

  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  name: "colleges",
  data(){
    return{
    data: [],
    code: "",
    description: "",
    loading: false,
    visible: false,
    columns: [
        // {
        //   title: 'College ID',
        //   dataIndex: 'id',
        //   width: 100,
        // },
        {
          title: 'Code',
          width: 100,
          customRender: (s) => s.record.code.toUpperCase() ,
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
      ],
    }
  },

  //------------------------------------------
  computed: {
    ...mapState(["currentUser"]),
  },

  //------------------------------------------
  mounted: function (){
    this.$plain.get('/api/v1/colleges')
        .then(response => { this.data = response.data})
        .catch(error => { console.log(error) })
  },
  
  //------------------------------------------
  methods: {
    showModal: function(){
      this.visible = true
    },
    
    //---------------------------------------
    createCollege: function(){
      this.loading = true
      this.$secured.post("/api/v1/colleges", {college: {
        code: this.code.toLowerCase(),
        description: this.description
      }})
      .then(response=>{
         this.$toast.open({
            message: "Succesfully Created",
            type: "success",
            position: "top-right",
            duration: 2500,
          });
        this.visible = false
        this.data.push(response.data)
        console.log(response)
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
      this.code = ""
      this.description = ""
      this.loading = false
    }
  }
};
</script>
