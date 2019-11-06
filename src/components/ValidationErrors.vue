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

  padding: 0;
  background: $light-gray;
  display: inline-block;
  padding: 10px;
  // position: absolute;

  // max-width: 30em;
  li {
    list-style: none;
  }
  li:before {
    content: '➤ ';
  }
}
</style>