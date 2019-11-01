<template>
  <div class="view about row">
    <div class="column">
      <h1>About SmudgeJS</h1>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >P</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button class="menubar__button" @click="commands.undo">Undo</button>

          <button class="menubar__button" @click="commands.redo">Redo</button>
        </div>
      </editor-menu-bar>
      <editor-content class="editor" :editor="editor" />
    </div>
    <div class="column">about</div>
  </div>
</template>


<script lang="js">
// Import the basic building blocks
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Heading, History } from 'tiptap-extensions';

import Vue from 'vue';

export default Vue.extend({
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      // Create an `Editor` instance with some default content. The editor is
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
        content: '<p>This is just a boring paragraph</p>',
        extensions: [new Heading({ levels: [1] }), new History()],
      }),
    };
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
});
</script>

<style lang="scss" scoped>
.editor {
  border: none;
  border-left: 1px solid red;
  padding: 10px;
  background: #eee;
  min-height: 300px;
}

.menubar .is-active {
  border: 1px solid red;
}
</style>

<style lang="scss">
.ProseMirror {
  outline: none;
}
</style>