<script setup lang="ts">
import { ref } from 'vue';

import type Perceptron from '@/model/Perceptron';

const prop = defineProps<{
  modelValue: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
  (e: 'clear'): void;
}>();

// How to use an HTML5 datalist:
// https://stackoverflow.com/questions/264640/how-can-i-create-an-editable-dropdownlist-in-html
</script>

<template>
  <div class="training-panel">
    <h2>Training</h2>
    <div class="training-fields">
      <div></div>

      <div class="training-field-image-name">
        <label for="imagename"
          >Give your image a name (or choose a name you've already created)</label
        >

        <input type="text" id="imagename" name="imagename" list="imageNames" />
        <datalist id="imageNames">
          <option value="Pen">Pen</option>
          <option value="Pencil">Pencil</option>
          <option value="Paper">Paper</option>
        </datalist>
      </div>
      <div class="training-delete-name">
        <a @click="">Delete this name</a>
      </div>
    </div>
    <div class="training-instructions">
      By <strong>training</strong> the perceptron, you "teach" it to associate this image with this
      name (or to dissociate them).
    </div>
    <div class="training-controls">
      <div class="training-button training-button--associate">
        <img src="@/assets/img/green-check.png" />
        <strong>Yes</strong>, this image is ______.
      </div>
      <div class="training-button training-button--dissociate">
        <img src="@/assets/img/red-x.png" />
        <strong>No</strong>, this image is not ______.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.training-panel {
  .training-fields {
    text-align: right;

    label {
      font-size: 0.875rem;
    }

    input {
      width: 12ex;
      height: 1.5em;
      align-self: flex-end;
    }
    select {
      width: 13ex;
    }

    .training-delete-name {
      font-size: 0.75rem;
      margin-top: 0.25ex;
    }

    .training-field-image-name {
      display: flex;
      flex-direction: row;
      gap: 1ex;

      & > * {
        flex: 1;
      }
    }
  }

  .training-instructions {
    margin-top: 0.5em;
  }
  .training-controls {
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-top: 1em;

    .training-button {
      flex: 1;
      opacity: 0.8;
      cursor: pointer;
      border-radius: 1ex;
      padding: 0.5em;
      font-size: 0.875em;

      img {
        width: 1.5em;
        float: left;
        margin-right: 0.25em;
      }

      &:hover {
        opacity: 1;
      }

      &:active {
        filter: saturate(0.5) brightness(1.25);
      }

      &.training-button--associate {
        color: #8f8;
        background-color: #8f86;
      }

      &.training-button--dissociate {
        color: #f88;
        background-color: #f886;
      }
    }
  }
}
</style>
