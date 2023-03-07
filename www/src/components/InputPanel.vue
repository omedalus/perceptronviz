<script setup lang="ts">
import { ref } from 'vue';

import GridModel from '@/components/GridModel.vue';
import VectorReadout from '@/components/VectorReadout.vue';

import type Perceptron from '@/model/Perceptron';

const prop = defineProps<{
  modelValue: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
  (e: 'clear'): void;
  (e: 'save'): void;
  (e: 'load'): void;
}>();

const formula = ref('');
</script>

<template>
  <div class="input-panel">
    <h2>Input</h2>
    <div class="gridmodel-holder">
      <GridModel v-model="modelValue.input" :dim="modelValue.dim"></GridModel>
      <div class="gridmodel-controls">
        <div style="text-align: left">
          <a @click="$emit('save')">Save image</a>

          <span :style="{ filter: !modelValue.numSavedInputs ? 'saturate(0)' : 'none' }">
            <br />
            <a
              @click="
                if (modelValue.numSavedInputs) {
                  $emit('load');
                }
              "
              >Load image ({{ modelValue.numSavedInputs }} saved)</a
            >
          </span>
        </div>
        <div style="margin-left: auto">
          <a @click="$emit('clear')">Clear</a>
        </div>
      </div>
    </div>

    <div style="margin-top: 1em">
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
        >, these values weren't even <em>numbers</em>; they were simply the electrical voltages
        coming out of a grid of analog photocells.
      </p>
      <p>
        The machine's input is a vector we'll call
        <VueMathjax style="display: inline-block" formula="$$\vec{x}$$"></VueMathjax>.
      </p>
      <p>Here's how your picture "looks" to the machine:</p>

      <VectorReadout :vector="modelValue.input" name="x"> </VectorReadout>

      <p class="explanatory-text dimmed-text" style="margin-top: 1em">
        You might notice that there's an extra "1.00" tacked onto the end of that input vector. It
        doesn't correspond to a pixel on the grid, and you can't change it. That's called the "bias
        neuron". Its job is to give the output something to multiply by in order to set the output's
        baseline activation level. Conceptually, you can think of the "bias neuron" as picking up
        the slack for all other neurons when their total activity level is low. This permits the
        perceptron to learn patterns that are defined by some pixels being <em>off</em>.)
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-panel {
  .gridmodel-holder {
    margin: auto;
  }

  .gridmodel-controls {
    width: 15em;
    margin: auto;
    font-size: 0.75rem;

    display: flex;
    flex-direction: row;
  }
}
</style>
