<script setup lang="ts">
import { ref } from 'vue';

import HeatGrid from '@/components/HeatGrid.vue';

import type Perceptron from '@/model/Perceptron';

const props = defineProps<{
  modelValue: boolean;
  perceptron: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'imageJSON', imageJSON: string): void;
}>();

const selectImage = (imageJSON: string) => {
  emit('imageJSON', imageJSON);
  emit('update:modelValue', false);
};
const deleteImage = (ixImage: number) => {
  props.perceptron.savedInputs.splice(ixImage, 1);
};
</script>

<template>
  <div v-if="modelValue" class="image-loader-overlay" @click="$emit('update:modelValue', false)">
    <div class="image-loader-holder" @click.stop>
      <div class="image-loader-content">
        <div
          class="image-loader-item"
          v-for="(imageJSON, i) in perceptron.savedInputs"
          @click="selectImage(imageJSON)"
        >
          <HeatGrid
            :vector="JSON.parse(imageJSON)"
            :dim="perceptron.dim"
            input-overlay
            skip-bias
          ></HeatGrid>

          <div class="image-loader-item-delete" @click.stop="deleteImage(i)">❌</div>
        </div>
      </div>
    </div>
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

    width: 30em;
    max-width: 90vw;
  }

  .image-loader-content {
    text-align: center;
  }

  .image-loader-item {
    display: inline-block;
    padding: 1ex;
    padding-right: 2ex;
    cursor: pointer;
    position: relative;

    .image-loader-item-delete {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      color: red;
      display: none;
    }

    &:hover {
      .image-loader-item-delete {
        display: block;
      }
    }
  }
}
</style>
