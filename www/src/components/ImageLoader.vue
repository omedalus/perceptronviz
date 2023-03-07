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
  <div v-if="modelValue" class="image-loader-component">HI KIDS</div>
</template>

<style scoped lang="scss">
.image-loader-component {
}
</style>
