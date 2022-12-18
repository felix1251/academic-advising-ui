<template>
  <a-list
    class="comment-list"
    :header="`${data.length} messages`"
    item-layout="horizontal"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment :author="item.last_name">
          <!-- <template #actions>
            <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
          </template> -->
          <template #content>
            <p style="font-size: 14px">
              {{ item.message }}
            </p>
          </template>
          <template #datetime>
            <!-- <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
              <span>{{ item.datetime.fromNow() }}</span>
            </a-tooltip> -->
          </template>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
  <div class="mt-3">
    <a-form-item>
      <a-textarea placeholder="Write message here...." :rows="3" v-model:value="messageValue" />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
        Add Comment
      </a-button>
    </a-form-item>
  </div>
</template>
<script>
export default {
  data(){
    return {
      messageValue: "",
      data: [ 
        {
          last_name: "Abacajen",
          message: "Hi"
        },
        {
          last_name: "Wade",
          message: "Hello"
        },
      ]
    }
  }
    // props: {
    //   data: {type: Array},
    // }
}
</script>
<style lang="">
      
</style>