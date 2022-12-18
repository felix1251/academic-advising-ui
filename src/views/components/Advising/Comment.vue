<template>
  <a-list
    class="comment-list"
    :header="`${data.length} replies`"
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
            <p>
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
</template>
<script>
export default {
  data(){
    return {
      data: [ 
        {
          last_name: "Abacajen",
          message: "Hi"
        },
        {
          last_name: "Wade",
          message: "Hello"
        }
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