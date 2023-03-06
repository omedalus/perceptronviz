<script setup lang="ts">
import { ref } from 'vue';

import HeatGrid from './HeatGrid.vue';

import type Perceptron from '@/model/Perceptron';

const props = defineProps<{
  modelValue: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
  (e: 'clear'): void;
}>();

const imagelabel = ref();

const onNameSelectorChange = () => {
  const elemInput = imagelabel.value as HTMLInputElement;
  const name = elemInput.value || '';
  if (!name) {
    return;
  }
  props.modelValue.currentOutput = name;
};

// How to use an HTML5 datalist:
// https://stackoverflow.com/questions/264640/how-can-i-create-an-editable-dropdownlist-in-html
</script>

<template>
  <div class="training-panel">
    <h2>Training</h2>
    <div class="training-fields">
      <div></div>

      <div class="training-field-image-name">
        <label for="imagelabel"
          ><strong>Give your image an output label:</strong>

          <span v-if="modelValue.outputNames.length > 0">
            <br />(or choose a label you've already created)
          </span>
        </label>

        <input
          type="text"
          id="imagelabel"
          name="imagelabel"
          ref="imagelabel"
          list="imagelabels"
          placeholder="Name this image"
          :value="modelValue.currentOutputName"
          @focus="imagelabel.value = ''"
          @blur="
            if (!imagelabel.value) {
              imagelabel.value = modelValue.currentOutputName;
            }
          "
          @change="
            imagelabel.blur();
            onNameSelectorChange();
          "
        />
        <datalist id="imagelabels">
          <option v-for="oname in modelValue.outputNames" :value="oname">{{ oname }}</option>
        </datalist>
      </div>
      <div class="training-delete-name" v-if="modelValue.currentOutputName">
        <a @click="modelValue.deleteCurrentOutput()">Delete this name</a>
      </div>
    </div>

    <div v-if="!modelValue.currentOutputName">
      <div class="training-no-labels-explanation">
        <p>
          The perceptron needs to be built with a set of named outputs, called
          <em>labels</em> or <em>classes</em>. These labels describe the problem that the human
          trainer wants to "teach" the perceptron.
        </p>
        <p>
          For example, if you're training it to distinguish shapes, then you might define three
          output labels which you call <em>Square</em>, <em>Circle</em>, and <em>Triangle</em>. If
          you want it to distinguish handwritten digits, then you'd define ten output labels, and
          call them <em>0</em>, <em>1</em>, <em>2</em>, and so on.
        </p>
        <p>
          The perceptron, of course, doesn't magically know what a square is or what the written
          number 2 looks like. Through training, the perceptron identifies certain pixels as having
          a positive or negative contribution towards each output label. When shown an image, the
          perceptron multiplies each pixel's activation level with that pixel's contribution, or
          <em>connection strength</em> or <em>weight</em>, to each output. The output label with the
          highest total score is declared as the perceptron's answer to the question, "What is this
          image?"
        </p>
      </div>
    </div>

    <div v-else>
      <div class="training-heatgrid">
        <HeatGrid :vector="modelValue.currentOutputVector" :dim="modelValue.dim"></HeatGrid>
      </div>

      <div class="training-instructions">
        By <strong>training</strong> the perceptron, it "learns" to associate this image with this
        name (or to dissociate them).
        <strong>Click one of the two buttons below to train your perceptron. </strong>
      </div>

      <div class="training-controls">
        <div class="training-button training-button--associate">
          <img src="@/assets/img/green-check.png" />
          <strong>Yes</strong>, this image is
          <span class="outputlabel">{{ modelValue.currentOutputName }}</span
          >.
        </div>
        <div class="training-button training-button--dissociate">
          <img src="@/assets/img/red-x.png" />
          <strong>No</strong>, this image is not
          <span class="outputlabel">{{ modelValue.currentOutputName }}</span
          >.
        </div>
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
    font-size: 0.875rem;
    text-align: left;
  }
  .training-controls {
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-top: 0.5em;

    .training-button {
      flex: 1;
      opacity: 0.8;
      cursor: pointer;
      border-radius: 1ex;
      padding: 0.5em;
      font-size: 0.875em;
      user-select: none;

      img {
        width: 1.5em;
        float: left;
        margin-right: 0.25em;
      }

      .outputlabel {
        text-decoration: underline;
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

  .training-no-labels-explanation {
    text-align: left;
    margin-top: 1em;
    font-size: 0.925rem;

    p + p {
      margin-top: 0.75em;
    }
  }
}
</style>
