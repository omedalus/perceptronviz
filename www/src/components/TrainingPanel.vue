<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import HeatGrid from '@/components/HeatGrid.vue';
import VectorReadout from '@/components/VectorReadout.vue';

import heatcolor from '@/model/heatcolor';

import type Perceptron from '@/model/Perceptron';

const props = defineProps<{
  modelValue: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
}>();

const imagelabel = ref();

const onNameSelectorChange = () => {
  const elemInput = imagelabel.value as HTMLInputElement;
  const name = elemInput.value || '';
  if (!name) {
    return;
  }
  props.modelValue.currentOutputLabel = name;
};

const ixPopTallyDotProduct = ref(0);
const intervalPopTallyDotProduct = ref(0);
const MS_INTERVAL_POP_TALLY_DOT_PRODUCT = 500;
const IX_POP_TALLY_DOT_PRODUCT_OVERDRIVE = 10;
const fnPopTallyDotProduct = () => {
  ixPopTallyDotProduct.value++;
  ixPopTallyDotProduct.value %= props.modelValue.size + 1 + IX_POP_TALLY_DOT_PRODUCT_OVERDRIVE;
};

const timerTrainingAnimation = ref(0);
const MS_TRAINING_ANIMATION_DURATION = 1000;
const isTrainingAnimationRunning = computed(() => {
  return !!timerTrainingAnimation.value;
});

const train = (reinforcementFactor: number) => {
  if (timerTrainingAnimation.value) {
    // Training animation is still running.
    return;
  }

  timerTrainingAnimation.value = window.setTimeout(() => {
    timerTrainingAnimation.value = 0;
    props.modelValue.trainCurrentOutput(reinforcementFactor);
  }, MS_TRAINING_ANIMATION_DURATION);
};

onMounted(() => {
  intervalPopTallyDotProduct.value = window.setInterval(
    fnPopTallyDotProduct,
    MS_INTERVAL_POP_TALLY_DOT_PRODUCT
  );
});

onBeforeUnmount(() => {
  window.clearInterval(intervalPopTallyDotProduct.value);
  window.clearTimeout(timerTrainingAnimation.value);
});

// How to use an HTML5 datalist:
// https://stackoverflow.com/questions/264640/how-can-i-create-an-editable-dropdownlist-in-html
</script>

<template>
  <div class="training-panel">
    <h2>Training</h2>
    <div class="training-fields">
      <div class="training-field-image-name">
        <label for="imagelabel"
          ><strong>Give your image an output label:</strong>

          <span v-if="modelValue.outputLabels.length > 0">
            <br />(or choose an existing label)
          </span>
        </label>

        <input
          type="text"
          id="imagelabel"
          name="imagelabel"
          ref="imagelabel"
          list="imagelabels"
          placeholder="Name this image"
          :value="modelValue.currentOutputLabel"
          @focus="imagelabel.value = ''"
          @blur="
            if (!imagelabel.value) {
              imagelabel.value = modelValue.currentOutputLabel;
            }
          "
          @change="
            imagelabel.blur();
            onNameSelectorChange();
          "
        />
        <datalist id="imagelabels">
          <option v-for="olabel in modelValue.outputLabels" :value="olabel">{{ olabel }}</option>
        </datalist>
      </div>
      <div class="training-delete-name" v-if="modelValue.currentOutputLabel">
        <a @click="modelValue.deleteCurrentOutput()">Delete this label</a>
      </div>
    </div>

    <div v-if="!modelValue.currentOutputLabel">
      <div class="training-no-labels-explanation">
        <p>
          The perceptron needs to be built with a set of named outputs, called
          <em>labels</em> or <em>classes</em> (which is why it's a type of AI called a
          <em><a href="https://monkeylearn.com/blog/what-is-a-classifier/">classifer</a></em
          >). These labels describe the results that the human trainer wants to "teach" the
          perceptron.
        </p>
        <p>
          For example, if you're training it to recognize shapes, then you might define three output
          labels which you call <em>Square</em>, <em>Circle</em>, and <em>Triangle</em>. If you want
          it to recognize handwritten digits, then you'd define ten output labels, and call them
          <em>0</em>, <em>1</em>, <em>2</em>, and so on.
        </p>
        <p>
          The perceptron, of course, doesn't magically know what a square is or what the written
          number 2 looks like. Through training, the perceptron identifies certain pixels as having
          a positive or negative contribution, or <em>connection weight</em>, towards each output
          label. When shown an image, the perceptron multiplies each pixel's brightness level with
          that pixel's connection weight &mdash; which can be positive or negative. Essentially,
          each pixel gets to "vote" on whether this image does or doesn't correspond to the output
          label, and the pixel's "vote" is scaled both by its connection weight and its activity
          level. If the total votes summed across all pixels is positive, then the perceptron
          declares that this image does in fact depict the desired output object.
        </p>
        <p>
          For a detailed and easy-to-grasp discussion of the perceptron's operating principles,
          please read
          <a
            href="https://towardsdatascience.com/rosenblatts-perceptron-the-very-first-neural-network-37a3ec09038a"
          >
            this article by Jean-Christophe B. Loiseau</a
          >. For a longer and more technical dive that's still nonetheless geared for beginners and
          laymen, check out
          <a href="https://www.simplilearn.com/tutorials/deep-learning-tutorial/perceptron">
            this course on Simplilearn</a
          >.
        </p>
      </div>
    </div>

    <div v-else>
      <div class="training-forward-heatgrid-section">
        <div class="training-forward-heatgrid-input heatgrid-with-poptally">
          <div class="poptally-value">
            {{
              ixPopTallyDotProduct < modelValue.input.length
                ? modelValue.input[ixPopTallyDotProduct].toFixed(2)
                : ''
            }}
          </div>
          <HeatGrid
            :vector="modelValue.input"
            :dim="modelValue.dim"
            :input-overlay="true"
            :pop-index="ixPopTallyDotProduct"
          ></HeatGrid>
        </div>
        <div class="training-forward-heatgrid-weights heatgrid-with-poptally">
          <div
            class="poptally-value"
            :style="{
              color: heatcolor(modelValue.currentOutputVector[ixPopTallyDotProduct], modelValue.dim)
            }"
          >
            {{ modelValue.currentOutputVector[ixPopTallyDotProduct] > 0 ? '+' : ''
            }}{{
              ixPopTallyDotProduct < modelValue.currentOutputVector.length
                ? modelValue.currentOutputVector[ixPopTallyDotProduct].toFixed(2)
                : ''
            }}
          </div>
          <HeatGrid
            :vector="modelValue.currentOutputVector"
            :dim="modelValue.dim"
            :pop-index="ixPopTallyDotProduct"
          ></HeatGrid>
        </div>
      </div>

      <div class="training-vector-explanation explanation-text dimmed-text">
        <p>
          When you create an output, the perceptron connects every input node (or "neuron") to the
          new output "neuron". Each "neuronal" connection is initially created with a
          <strong>random <em>weight</em></strong
          >, which can be positive or negative. A strong
          <span style="color: green">positive</span> connection is <em>excitatory</em> &mdash; it
          means that, when the corresponding pixel is bright, the image probably matches the label.
          A strong <span style="color: red">negative</span> connection is
          <em>inhibitory</em> &mdash; it means that, when the pixel is bright, the image probably
          <em>doesn't</em> match. (A
          <span style="color: #666">weak</span>
          connection means that the pixel is irrelevant to classifying the image.)
        </p>
      </div>
      <div class="explanation-text">
        <p>
          The connection weights from the input to the
          <strong>{{ modelValue.currentOutputLabel }} </strong>
          output are a vector we'll call
          <VueMathjax style="display: inline-block" formula="$$\vec{w}$$"></VueMathjax>. It has the
          same number of elements as the input vector (counting the bias neuron). It looks like
          this:
        </p>

        <VectorReadout
          :vector="modelValue.currentOutputVector"
          name="w"
          :heatrange="modelValue.dim"
        >
        </VectorReadout>
      </div>

      <div class="training-instructions">
        By <strong>training</strong> the perceptron, it "learns" to associate this image with this
        label (or to dissociate them).
        <strong>Click one of the two buttons below to train your perceptron. </strong>
      </div>

      <div
        class="training-controls"
        :class="{
          'training-animation-is-running': isTrainingAnimationRunning,
          'training-animation-is-not-running': !isTrainingAnimationRunning
        }"
      >
        <div class="training-button training-button--associate" @click="train(1)">
          <img src="@/assets/img/green-check.png" />
          <strong>Yes</strong>, this image is
          <span class="outputlabel">{{ modelValue.currentOutputLabel }}</span
          >.
        </div>
        <div class="training-button training-button--dissociate" @click="train(-1)">
          <img src="@/assets/img/red-x.png" />
          <strong>No</strong>, this image is not
          <span class="outputlabel">{{ modelValue.currentOutputLabel }}</span
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
    position: relative;

    &.training-animation-is-running {
      filter: saturate(0.25);

      &::after {
        // Create an overlay so the buttons can't receive click events.
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .training-button {
      flex: 1;
      opacity: 0.8;
      cursor: pointer;
      border-radius: 1ex;
      padding: 0.5em;
      font-size: 0.875em;
      user-select: none;

      transition: opacity 0.25s, filter 0.25s;

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

  .training-forward-heatgrid-section {
    margin-top: 0.5em;
    display: flex;
    flex-direction: row;

    .heatgrid-with-poptally {
      display: flex;
      flex-direction: column;
      margin-left: 1ex;
      margin-right: 1ex;
    }
  }
}
.poptally-value {
  font-family: 'Cambria Math';
  height: 1.5em;
}
</style>
