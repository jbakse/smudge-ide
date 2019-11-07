<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors, classes }">
    <input
      class="inherit title"
      :disabled="disabled"
      :class="classes"
      :type="$attrs.type"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <ValidationErrors :errors="errors" />
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: String,
    disabled: Boolean,
    vid: {
      type: String,
    },
    rules: {
      type: [Object, String],
      default: '',
    },
  },
  data: () => ({}),
});
</script>
