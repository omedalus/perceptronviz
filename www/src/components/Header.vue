<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const elemSpacer = ref();
const elemHeader = ref();

const adjustSpacerSizeToMatchHeader = () => {};
</script>

<template>
  <div class="header-magic-static-spacer" ref="elemSpacer"></div>
  <header ref="elemHeader">
    <div class="header-contents">
      <div class="header-title">Perceptron visualization</div>
      <div class="header-text">Learn the basics of how very simple neural networks work</div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-magic-static-spacer {
}

header {
  background-color: #444;
  text-align: center;
  height: 3em;

  .header-contents {
    max-width: 1024px;
    margin: auto;
  }
}
</style>
