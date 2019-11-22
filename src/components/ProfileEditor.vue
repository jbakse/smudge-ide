<template>
  <ui-modal ref="modal" title="Edit Profile">
    <ValidationObserver ref="observer" v-slot="{ dirty, invalid }">
      <ValidationProvider
        name="display name"
        rules="required|max:30|min:4"
        v-slot="{ errors, classes }"
      >
        <ui-textbox label="Display Name" v-model="profileCopy.displayName" />
        <ValidationErrors :errors="errors" />
      </ValidationProvider>

      <div slot="footer">
        <button :class="{ invalid }" :disabled="!dirty || invalid" @click="save">Save Profile</button>
        <button @click="close">Cancel</button>
      </div>
    </ValidationObserver>
  </ui-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserProfile } from '../firebase/users';

export default Vue.extend({
  props: ['profile'],
  data: () => ({
    profileCopy: {} as UserProfile,
  }),
  methods: {
    save() {
      this.profile.displayName = this.profileCopy.displayName;
      this.close();
      this.$emit('save', this.profile);
    },
    close() {
      (this.$refs.modal as any).close();
    },
    open() {
      this.profileCopy = { ...this.profile };
      (this.$refs.modal as any).open();
    },
  },
});
</script>
