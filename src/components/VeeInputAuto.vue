<template>
  <ValidationProvider
    ref="validationProvider"
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
    v-slot="{ errors, classes }"
  >
    <input
      class="inherit"
      :disabled="disabled"
      :class="classes"
      :type="$attrs.type"
      @blur="commit"
      @keydown="keydown"
      v-model="editValue"
    />
    <ValidationErrors :errors="errors" />
  </ValidationProvider>
</template>

<script lang="ts">
// v-on:input="$emit('input', $event.target.value)"
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
  data: () => ({
    resetValue: '',
    editValue: '',
  }),
  mounted() {
    this.editValue = this.value;
    this.resetValue = this.value;
  },
  methods: {
    // focus() {
    //   this.resetValue = this.value;
    // },
    // async blur() {},
    async commit() {
      const result = await (this.$refs.validationProvider as any).validate();
      if (!result.valid) {
        this.cancel();
        return;
      }

      this.resetValue = this.editValue;
      this.$emit('input', this.editValue);
    },
    cancel() {
      this.editValue = this.resetValue;
      (this.$refs.validationProvider as any).validate();
    },

    keydown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        this.commit();
        const t = e.target as HTMLInputElement;
        t.blur();
        e.preventDefault();
        return true;
      }
      if (e.key === 'Escape') {
        this.cancel();
        const t = e.target as HTMLInputElement;
        t.blur();
        e.preventDefault();
        return true;
      }
    },
  },
});
</script>


<style lang="scss" scoped>
</style>