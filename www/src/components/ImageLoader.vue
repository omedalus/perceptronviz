<script setup lang="ts">
import { ref } from 'vue';

import type Perceptron from '@/model/Perceptron';

const prop = defineProps<{
  modelValue: boolean;
  perceptron: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: number[]): void;
}>();
</script>

<template>
  <div v-if="modelValue" class="image-loader-overlay" @click="$emit('update:modelValue', false)">
    <div class="image-loader-holder" @click.stop>haahahahaha</div>
  </div>
</template>

<style scoped lang="scss">
.image-loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  background-color: #000a;

  display: flex;
  align-items: center;
  justify-content: center;

  .image-loader-holder {
    background-color: #000;
    border: 2px solid #ccc;
    border-radius: 1em;
    padding: 1em;
  }
}
</style>
