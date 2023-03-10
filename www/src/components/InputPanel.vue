<script setup lang="ts">
import GridModel from '@/components/GridModel.vue';
import VectorReadout from '@/components/VectorReadout.vue';
import Tex from './Tex.vue';

import type Perceptron from '@/model/Perceptron';

defineProps<{
  modelValue: Perceptron;
}>();
defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
  (e: 'clear'): void;
  (e: 'save'): void;
  (e: 'load'): void;
}>();
</script>

<template>
  <div class="input-panel">
    <h2>Input</h2>

    <div class="explanation-text dimmed-text explanation-hideable" style="margin-top: 1em; margin-bottom: 1em">
      <p>
        Perceptrons are really bad at processing visual input. Humans, however, are great at it
        &mdash; and besides, the screen you're browsing on is a visual medium. So, for this
        demonstration, you'll:
        <ol>
          <li>Draw a simple picture (don't forget to save it for later!)</li>
          <li>Create a <em>label</em> (an output node) for this picture</li>
          <li>Train the perceptron to associate this image with this label</li>
        </ol>
        Do this for two or three pictures. (Don't forget to train the perceptron on which
        labels <em>don't</em> apply to which pictures, as well as those which do!) When
        your perceptron is fully trained, you'll be able to see that the connection weights
        for each output are most <span style="color: green">positive</span> for the specific
        pixels that most distinctly indicate that output, and most <span style="color: red">negative</span>
        for those that contraindicate it.
      </p>
    </div>

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
      <div class="explanation-hideable">
        <p style="color: #888; margin-bottom: 1em">
          The machine can't <em>see</em> the image like we do. It can't see contiguous lines,
          curves, and shapes. It can only "see" a set of values between 0 and 1, corresponding to
          brightness levels. In
          <a
            href="https://towardsdatascience.com/a-concise-history-of-neural-networks-2070655d3fec"
          >
            inventor Frank Rosenblatt's original Mark 1 Perceptron</a
          >, these values weren't even <em>numbers</em>; they were simply electrical voltages coming
          out of a grid of analog photocells.
        </p>
        <p>
          The machine's input is a vector we'll call
          <Tex inline formula="\vec{x}"></Tex>.
        </p>
        <p>Here's how your picture "looks" to the machine:</p>
      </div>

      <VectorReadout :vector="modelValue.input" name="x"> </VectorReadout>

      <p class="explanation-hideable explanatory-text dimmed-text" style="margin-top: 1em">
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
