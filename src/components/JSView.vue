<template>
  <iframe id="sketch-frame">{{source}}</iframe>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';

export default Vue.extend({
  name: 'JSView',
  props: { source: { type: String, default: '' } },
  watch: {
    source: {
      immediate: true,
      handler(uid) {
        runJS(this.source);
      },
    },
  },
});

function readDirectives(text: string) {
  const requireRegex = /^\/\/ ?require (.*?)$/gm;
  const requires = [];
  let matchInfo = requireRegex.exec(text);
  while (matchInfo) {
    requires.push(matchInfo[1]);
    matchInfo = requireRegex.exec(text);
  }
  return { requires };
}

const runJS = _.debounce((source: string) => {
  // directives
  const { requires } = readDirectives(source);

  const libraries = requires
    .map((require) => `<script src="${require}"><\/script>`)
    .join('\n');

  const sketchSrcDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <base target="_parent">
    ${libraries}
</head>
<body>
    <script>${source}<\/script>
</body>
</html>`;

  const sketchFrame = document.getElementById('sketch-frame');

  (sketchFrame as HTMLIFrameElement).srcdoc = sketchSrcDoc;
}, 100);
</script>

<style scoped lang="scss">
iframe {
  border: 0;
}
</style>

