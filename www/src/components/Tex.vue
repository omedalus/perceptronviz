<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
  formula: string;
  inline?: boolean;
}>();

const thisElem = ref();
const hasRendered = ref(false);

const observer = new MutationObserver((mutations, observer) => {
  observer.disconnect();
  window.setTimeout(() => {
    hasRendered.value = true;
  }, 100);
});

onMounted(() => {
  observer.observe(thisElem.value, {
    subtree: true,
    childList: true
  });
});
</script>

<template>
  <div
    class="tex-mathjax-wrapper"
    :style="{ display: !hasRendered ? 'none' : inline ? 'inline-block' : 'block' }"
    ref="thisElem"
  >
    <VueMathjax :formula="'$$' + formula + '$$'"></VueMathjax>
  </div>
</template>

<style scoped lang="scss">
.tex-mathjax-wrapper {
  & .Mathjax-Display {
    display: inline-block;
  }
}
</style>
