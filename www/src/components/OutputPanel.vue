<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import HeatGrid from '@/components/HeatGrid.vue';
import VectorReadout from '@/components/VectorReadout.vue';

import heatcolor from '@/model/heatcolor';

import Perceptron from '@/model/Perceptron';
import Tex from './Tex.vue';

const props = defineProps<{
  modelValue: Perceptron;
}>();
defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
}>();

const imagelabel = ref();
const showLesson = ref(false);
const weightInitializationMethod = ref('zero');

const onNameSelectorChange = () => {
  const elemInput = imagelabel.value as HTMLInputElement;
  const name = elemInput.value || '';
  if (!name) {
    return;
  }

  const isNewOutput = !props.modelValue.outputLabels.includes(name);

  props.modelValue.currentOutputLabel = name;

  if (isNewOutput && weightInitializationMethod.value === 'zero') {
    props.modelValue.zeroizeCurrentOutput();
  }

  showLesson.value = false;
};

const ixPopTallyDotProduct = ref(0);
const intervalPopTallyDotProduct = ref(0);
const poptallyRunningTotal = ref(0);
const vecPopTally = ref([] as number[]);
const MS_INTERVAL_POP_TALLY_DOT_PRODUCT = 300;
const IX_POP_TALLY_DOT_PRODUCT_OVERDRIVE = 15;
const fnPopTallyDotProduct = () => {
  const elementWithFocus = document.activeElement;
  if (elementWithFocus === imagelabel.value) {
    // Don't incremenet the counter when we're in the process of changing outputs.
    // It messes up the value of the input label.
    return;
  }

  ixPopTallyDotProduct.value++;
  ixPopTallyDotProduct.value %= props.modelValue.size + 1 + IX_POP_TALLY_DOT_PRODUCT_OVERDRIVE;

  if (ixPopTallyDotProduct.value === 0) {
    poptallyRunningTotal.value = 0;
    vecPopTally.value = Perceptron.createZeroArray(props.modelValue.size);
  }

  if (!isPopTallyInOverdrive.value) {
    poptallyRunningTotal.value += poptallyCurrentTermProduct.value;
    vecPopTally.value[ixPopTallyDotProduct.value] = poptallyCurrentTermProduct.value;
  }
};

const isPopTallyInOverdrive = computed(() => {
  const retval = ixPopTallyDotProduct.value >= props.modelValue.input.length;
  return retval;
});

const poptallyCurrentTermProduct = computed(() => {
  if (isPopTallyInOverdrive.value) {
    return 0;
  }

  if (!props.modelValue || !props.modelValue.currentOutputVector || !props.modelValue.input) {
    return 0;
  }

  const wi = props.modelValue.currentOutputVector[ixPopTallyDotProduct.value];
  const xi = props.modelValue.input[ixPopTallyDotProduct.value];
  const retval = wi * xi;
  return retval;
});

const shouldShowLesson = computed(() => {
  return showLesson.value || !props.modelValue.currentOutputLabel;
});

onMounted(() => {
  intervalPopTallyDotProduct.value = window.setInterval(
    fnPopTallyDotProduct,
    MS_INTERVAL_POP_TALLY_DOT_PRODUCT
  );
});

onBeforeUnmount(() => {
  window.clearInterval(intervalPopTallyDotProduct.value);
});

// How to use an HTML5 datalist:
// https://stackoverflow.com/questions/264640/how-can-i-create-an-editable-dropdownlist-in-html
</script>

<template>
  <div class="output-panel">
    <h2>Output</h2>
    <div class="output-fields">
      <div class="output-field-image-name">
        <div style="text-align: right">
          <label for="imagelabel"
            ><strong>Give your image an output label</strong>

            <span v-if="modelValue.outputLabels.length > 0">
              (or choose an existing label)<br />
            </span>
          </label>
        </div>

        <div style="text-align: right">
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
            style="width: 15em; margin-top: 0.5ex"
          />
          <datalist id="imagelabels">
            <option v-for="olabel in modelValue.outputLabels" :value="olabel" :key="olabel">
              {{ olabel }}
            </option>
          </datalist>
          <div class="output-delete-name" v-if="modelValue.currentOutputLabel">
            <a v-if="!showLesson" @click="showLesson = true">Show lesson</a>
            <a v-else @click="showLesson = false">Return to interactive</a>
            <div style="width: 100%"></div>
            <a @click="modelValue.deleteCurrentOutput()">Delete this label</a>
          </div>
        </div>

        <div class="weight-initialization-controls">
          <div>When creating new outputs, connections get initialized to...</div>

          <div class="weight-initialization-choices">
            <div
              class="weight-initialization-choice"
              :class="{ 'weight-initialization-selected': weightInitializationMethod === 'random' }"
              @click="weightInitializationMethod = 'random'"
            >
              <strong>Random</strong> (more "realistic")
            </div>
            <div
              class="weight-initialization-choice"
              :class="{ 'weight-initialization-selected': weightInitializationMethod === 'zero' }"
              @click="weightInitializationMethod = 'zero'"
            >
              <strong>Zero</strong> (easier to visualize)
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="shouldShowLesson" class="output-lesson">
      <div class="output-no-labels-explanation">
        <p>
          A perceptron "learns" to associate images with named outputs called called
          <em>labels</em> or <em>classes</em> (i.e. it can be used as a
          <em><a href="https://monkeylearn.com/blog/what-is-a-classifier/">classifier</a></em
          >). These labels describe the results that the human trainer wants to "teach" the
          perceptron.
        </p>
        <p>
          For example, if you want it to recognize shapes, then you might define three output labels
          which you call <em>Square</em>, <em>Circle</em>, and <em>Triangle</em>. If you want it to
          recognize handwritten digits, then you'd define ten output labels, and call them
          <em>0</em>, <em>1</em>, <em>2</em>, and so on.
        </p>
        <p>
          The perceptron identifies certain pixels as having a positive or negative contribution, or
          <em>connection weight</em>, towards each output label. When shown an image, the perceptron
          multiplies each pixel's brightness level with that pixel's connection weight &mdash; which
          can be positive or negative. Essentially, each pixel gets to "vote" on whether this image
          does or doesn't correspond to the output label, and the pixel's "vote" is scaled both by
          its connection weight and the pixel's activity level. If the total votes summed across all
          pixels is positive, then the perceptron declares that this image does in fact depict the
          desired output object.
        </p>
        <p>
          If you think about it, you might realize that this means that the perceptron is incapable
          of "understanding" shifts or rotations of an image. It only recognizes an image by
          specific pixels in specific positions. Any rotated, translated, or scaled versions of the
          image will have active pixels in different positions, and need to be trained as if they
          were separate images. In modern practice, the recognition of images in spite of rotations,
          translations, and other transformations is handled by
          <a
            href="https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53"
            ><em>convolutional neural networks</em></a
          >
          &mdash; which are, of course, still evolutionary descendants of the perceptron.
        </p>

        <p>
          For a detailed and easy-to-grasp discussion of the perceptron's operating principles,
          please read
          <a
            href="https://towardsdatascience.com/rosenblatts-perceptron-the-very-first-neural-network-37a3ec09038a"
          >
            this article by Jean-Christophe B. Loiseau</a
          >. For a longer and more technical dive that's still geared for beginners and laymen,
          check out
          <a href="https://www.simplilearn.com/tutorials/deep-learning-tutorial/perceptron">
            this course on Simplilearn</a
          >.
        </p>
      </div>
    </div>

    <div v-else>
      <div class="explanation-text explanation-hideable" style="margin-top: 1ex">
        <p>
          The perceptron adds up every input node's signal. The signal from each input node is the
          brightness level of its pixel, multiplied by its connection weight.
        </p>
      </div>

      <div class="output-forward-heatgrid-section">
        <div class="output-forward-heatgrid-input heatgrid-with-poptally">
          <div class="poptally-value">
            <div class="mathsymbols">
              <Tex formula="x"></Tex>
              <div class="mathjax-subscript-hack">
                {{ isPopTallyInOverdrive ? 'i' : ixPopTallyDotProduct }}
              </div>
            </div>
            {{ isPopTallyInOverdrive ? '' : modelValue.input[ixPopTallyDotProduct].toFixed(2) }}
          </div>
          <HeatGrid
            :vector="modelValue.input"
            :dim="modelValue.dim"
            :input-overlay="true"
            :pop-index="ixPopTallyDotProduct"
          ></HeatGrid>
        </div>
        <div class="heatgrid-with-poptally" style="margin: 0; width: 0">
          <div class="poptally-value">
            <div class="mathsymbols">
              <Tex formula="*"></Tex>
            </div>
          </div>
        </div>
        <div class="output-forward-heatgrid-weights heatgrid-with-poptally">
          <div class="poptally-value">
            <div class="mathsymbols">
              <Tex formula="w"></Tex>
              <div class="mathjax-subscript-hack">
                {{ isPopTallyInOverdrive ? 'i' : ixPopTallyDotProduct }}
              </div>
            </div>

            <span
              :style="{
                color: heatcolor(
                  modelValue.currentOutputVector[ixPopTallyDotProduct],
                  modelValue.dim
                )
              }"
            >
              {{ modelValue.currentOutputVector[ixPopTallyDotProduct] > 0 ? '+' : ''
              }}{{
                isPopTallyInOverdrive
                  ? ''
                  : modelValue.currentOutputVector[ixPopTallyDotProduct].toFixed(2)
              }}
            </span>
          </div>
          <HeatGrid
            :vector="modelValue.currentOutputVector"
            :dim="modelValue.dim"
            :pop-index="ixPopTallyDotProduct"
            :darkfloor="0"
          ></HeatGrid>
        </div>
        <div class="heatgrid-with-poptally">
          <div class="poptally-value">
            <div
              class="mathsymbols"
              style="white-space: nowrap; font-size: 1.25rem; margin-top: 0.75em"
            >
              <span
                v-if="!isPopTallyInOverdrive"
                :style="{ color: heatcolor(poptallyCurrentTermProduct, modelValue.dim) }"
              >
                = {{ poptallyCurrentTermProduct >= 0 ? '+' : ''
                }}{{ poptallyCurrentTermProduct.toFixed(2) }}
              </span>
            </div>
          </div>
          <HeatGrid
            :vector="vecPopTally"
            :dim="modelValue.dim"
            :pop-index="ixPopTallyDotProduct"
            :render-up-to-index="ixPopTallyDotProduct"
            :darkfloor="0"
          ></HeatGrid>
        </div>
      </div>

      <div class="runningtotal-holder">
        <Tex formula="\vec{x}\cdot\vec{w}=\sum_{i=1}^{n}x_i w_i="></Tex>

        <div style="margin-top: 0.5ex; min-width: 7em">
          <div
            v-if="isPopTallyInOverdrive"
            style="font-size: 0.75rem; color: #fff; font-style: italic; font-weight: bold"
          >
            Final sum:
          </div>
          <div v-else style="font-size: 0.75rem; color: #888; font-style: italic">
            Running total:
          </div>
          <div
            class="runningtotal"
            :style="{
              color: heatcolor(poptallyRunningTotal, modelValue.dim),
              borderColor: isPopTallyInOverdrive ? 'currentColor' : 'transparent'
            }"
          >
            {{ poptallyRunningTotal.toFixed(2) }}
            <span
              v-if="isPopTallyInOverdrive"
              style="color: #ddd; position: absolute; right: 1ex; top: 0.25ex"
            >
              <span v-if="poptallyRunningTotal > 0"> &gt; 0</span>
              <span v-else> &leq; 0</span>
            </span>
          </div>
        </div>
      </div>

      <div style="margin-top: 1em; height: 3.5em">
        <div v-if="isPopTallyInOverdrive">
          <div style="color: green" v-if="poptallyRunningTotal > 0">
            Verdict: This perceptron "thinks"<br />
            this image <strong>is </strong>
            {{ modelValue.currentOutputLabel }}
          </div>
          <div style="color: red" v-else>
            Verdict: This perceptron "thinks"<br />
            this image <strong>is not</strong>
            {{ modelValue.currentOutputLabel }}
          </div>
        </div>
        <div v-else>
          <div style="font-style: italic">The perceptron is still computing...</div>
          <div style="font-size: 0.75rem; color: #888">
            (Not really. It's just an animation cycle that's <br />
            intentionally slowed down so you can see what's happening.)<br />
          </div>
        </div>
      </div>

      <br />
      <div class="explanation-text">
        <p class="explanation-hideable">
          The connection weights from the input to the
          <strong>{{ modelValue.currentOutputLabel }} </strong>
          output are a vector we'll call
          <Tex formula="\vec{w}" inline></Tex>. It has the same number of elements as the input
          vector (counting the bias neuron). It looks like this:
        </p>

        <VectorReadout
          :vector="modelValue.currentOutputVector"
          name="w"
          :heatrange="modelValue.dim"
        >
        </VectorReadout>
      </div>

      <br />
      <div class="explanation-hideable output-vector-explanation explanation-text dimmed-text">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.output-panel {
  .output-fields {
    label {
      font-size: 0.875rem;
    }

    input[type='text'] {
      width: 12ex;
      height: 1.5em;
      align-self: flex-end;
    }
    select {
      width: 13ex;
    }

    .output-delete-name {
      font-size: 0.75rem;
      margin-top: 0.25ex;
      display: flex;
      flex-direction: row;
      white-space: nowrap;
    }

    .output-field-image-name {
      display: block;
    }
  }

  .output-instructions {
    margin-top: 0.5em;
    font-size: 0.875rem;
    text-align: left;
  }
  .output-controls {
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-top: 0.5em;
    position: relative;

    &.output-animation-is-running {
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

    .output-button {
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

      &.output-button--associate {
        color: #8f8;
        background-color: #8f86;
      }

      &.output-button--dissociate {
        color: #f88;
        background-color: #f886;
      }
    }
  }

  .output-no-labels-explanation {
    text-align: left;
    margin-top: 1em;
    font-size: 0.925rem;

    p + p {
      margin-top: 0.75em;
    }
  }

  .output-forward-heatgrid-section {
    margin-top: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .heatgrid-with-poptally {
      display: flex;
      flex-direction: column;
      margin-left: 2ex;
      margin-right: 2ex;

      &:first-child {
        margin-left: none;
      }
      &:last-child {
        margin-right: none;
      }
    }
  }
}
.poptally-value {
  font-family: 'Cambria Math';
  height: 3.5em;
  position: relative;

  .mathsymbols {
    font-size: 1.5rem;
    position: relative;
    height: 1.4em;

    .mathjax-subscript-hack {
      font-size: 0.875rem;
      position: absolute;
      top: 1em;
      left: calc(50% + 1ex);
    }
  }
}

.runningtotal {
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 0.25ex;
  position: relative;
}
.runningtotal-holder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1em;
  height: 2.5em;
}

.weight-initialization-controls {
  text-align: right;
  font-size: 0.75rem;
  margin-top: 0.5ex;

  .weight-initialization-choices {
    display: flex;
    flex-direction: row;
    gap: 1em;

    .weight-initialization-choice {
      text-align: center;
      flex: 1;
      border-radius: 1ex;
      background-color: #222;
      padding: 0.5ex 1ex;

      opacity: 0.7;
      box-sizing: border-box;
      border: 1px solid transparent;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      &.weight-initialization-selected {
        color: #fff;
        background-color: #444;
        border-color: currentColor;
      }
    }
  }
}
</style>
