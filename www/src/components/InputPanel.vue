<script setup lang="ts">
import { ref } from 'vue';

import GridModel from '@/components/GridModel.vue';
import type Perceptron from '@/model/Perceptron';

const prop = defineProps<{
  modelValue: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
  (e: 'clear'): void;
}>();

const formula = ref('');
</script>

<template>
  <div class="input-panel">
    <h2>Input</h2>
    <div class="gridmodel-holder">
      <GridModel v-model="modelValue.input" :dim="modelValue.dim"></GridModel>
      <div class="gridmodel-clear-input">
        <a @click="$emit('clear')">Clear</a>
      </div>
    </div>

    <div>
      <p>
        <span style="font-weight: bold">Draw a 5x5-pixel picture.</span><br />
        <span>Hold down on a pixel (square) to change its brightness value.</span>
      </p>
    </div>

    <div style="text-align: left; font-size: 0.875rem; margin-top: 1em">
      <p style="color: #888; margin-bottom: 1em">
        The machine can't <em>see</em> the image like we do. It can't see contiguous lines, curves,
        and shapes. It can only "see" a set of values between 0 and 1, corresponding to brightness
        levels. In
        <a href="https://towardsdatascience.com/a-concise-history-of-neural-networks-2070655d3fec">
          inventor Frank Rosenblatt's original Mark 1 Perceptron</a
        >, these values weren't even <em>numbers</em>; they were simply the electrical voltage
        coming out of a grid of analog photocells.
      </p>
      <p>
        The machine's input is a vector we'll call
        <VueMathjax style="display: inline-block" formula="$$\vec{x}$$"></VueMathjax>.
      </p>
      <p>Here's how your picture "looks" to the machine:</p>

      <div class="vector-readout-holder">
        <div class="vector-label" style="font-size: 1.5rem">
          <VueMathjax formula="$$\vec{x}=$$"></VueMathjax>
        </div>
        <div class="vector-readout">
          <span
            class="vector-readout-value"
            v-for="(v, i) in modelValue.input"
            :style="{ opacity: v / 2 + 0.5 }"
            >{{ v.toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-panel {
  .gridmodel-holder {
    margin: auto;
  }

  .gridmodel-clear-input {
    width: 15em;
    margin: auto;
    text-align: right;
    font-size: 0.75rem;
    margin-bottom: 1em;
  }
}

.vector-readout-holder {
  display: flex;
  flex-direction: row;
}
</style>
