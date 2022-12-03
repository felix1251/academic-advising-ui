<template>
  <div
    v-for="(item, index) in advising_list[1]"
    v-bind:key="index"
    class="m-0 p-1"
  >
    <div v-if="item.data.length != 0">
      <h6 class="p-0">Firts Year - {{ ordinal_suffix_of(item.sem, 1) }}</h6>
      <a-table
        :scroll="{ y: 600 }"
        sorter
        bordered
        :columns="columns"
        size="small"
        :data-source="item.data"
        :pagination="{ pageSize: 10 }"
        rowKey="id"
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
        :scroll="{ y: 600 }"
        :columns="columns"
        size="small"
        bordered
        :data-source="item.data"
        :pagination="{ pageSize: 10 }"
        rowKey="id"
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
        :scroll="{ y: 600 }"
        bordered
        :columns="columns"
        size="small"
        :data-source="item.data"
        :pagination="{ pageSize: 10 }"
        rowKey="id"
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
        rowKey="id"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    advising_list: { type: Object },
  },
};
</script>
