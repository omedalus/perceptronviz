<script setup lang="ts">
import { ref, watch } from 'vue';

const isPopped = ref(true);

const props = defineProps<{
  text: string;
  popkey: string;
}>();

watch(
  () => props.popkey,
  () => {
    isPopped.value = false;
    window.setTimeout(() => {
      isPopped.value = true;
    }, 1);
  }
);
</script>

<template>
  <div class="pop-on-change-holder">
    <div class="pop-on-change" v-if="isPopped">{{ text }}</div>
  </div>
</template>

<style lang="scss">
@keyframes growshrink {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.pop-on-change {
  animation: growshrink 500ms ease-in-out;
}
</style>

<style scoped lang="scss">
.pop-on-change-holder {
  height: 1.5em;
  font-family: 'Cambria Math';
}
</style>
