<template>
  <ul v-if="errors.length" class="error-messages">
    <li v-for="error in errors" :key="error">{{ error }}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ValidationErrors',
  props: ['errors'],
});
</script>

<style scoped lang="scss">
@import '@/scss/_shared.scss';

.error-messages {
  font-size: 1rem;
  color: red;
  font-weight: normal;

  background: $light-gray;
  display: inline-block;
  padding: 10px;
  margin: 0;

  li {
    list-style: none;
    &:before {
      content: '➤ ';
    }
  }
}
</style>