<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import HeatGrid from '@/components/HeatGrid.vue';

import type Perceptron from '@/model/Perceptron';

const props = defineProps<{
  modelValue: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
}>();

const timerTrainingAnimation = ref(0);
const MS_TRAINING_ANIMATION_DURATION = 2500;
const isTrainingAnimationRunning = computed(() => {
  return !!timerTrainingAnimation.value;
});

const train = (reinforcementFactor: number) => {
  if (timerTrainingAnimation.value) {
    // Output animation is still running.
    return;
  }

  if (reinforcementFactor > 0) {
    trainingHeatgridOverlayDirection.value = 'up';
  } else {
    trainingHeatgridOverlayDirection.value = 'down';
  }

  timerTrainingAnimation.value = window.setTimeout(() => {
    timerTrainingAnimation.value = 0;
    props.modelValue.trainCurrentOutput(reinforcementFactor);
    trainingHeatgridOverlayDirection.value = 'none';
  }, MS_TRAINING_ANIMATION_DURATION);
};

const trainingHeatgridOverlayDirection = ref('none');

onBeforeUnmount(() => {
  window.clearTimeout(timerTrainingAnimation.value);
});
</script>

<template>
  <div class="training-panel">
    <h2>Training</h2>

    <div class="training-instructions">
      <p>
        The vector of connection weights
        <span v-if="modelValue.currentOutputLabel">
          for the <strong>{{ modelValue.currentOutputLabel }}</strong> output
        </span>

        (which we're calling
        <VueMathjax style="display: inline-block" formula="$$\vec{w}$$"></VueMathjax>) is initially
        set to random values.
      </p>
      <p>
        By <strong>training</strong> the perceptron, you strengthen active connections that lead to
        the correct output, and weaken active connections that lead to incorrect ones. As a result,
        the perceptron "learns" to assign the correct label to the image.
      </p>
    </div>

    <div v-if="modelValue && modelValue.currentOutputLabel">
      <div class="training-heatgrid">
        <div class="training-heatgrid-positioner">
          <HeatGrid
            :vector="modelValue.currentOutputVector"
            :dim="modelValue.dim"
            :darkfloor="0"
          ></HeatGrid>
          <div
            class="training-heatgrid-overlay"
            :class="{ 'overlay-showing': trainingHeatgridOverlayDirection !== 'none' }"
          >
            <HeatGrid
              :vector="modelValue.input"
              :dim="modelValue.dim"
              input-overlay
              :input-overlay-channel="trainingHeatgridOverlayDirection === 'up' ? 'g' : 'r'"
            ></HeatGrid>
            <div class="training-heatgrid-overlay-actual training-heatgrid-overlay-add"></div>
          </div>
        </div>
      </div>

      <div class="training-current-assessment">
        <div
          class="training-controls"
          :class="{
            'training-animation-is-running': isTrainingAnimationRunning,
            'training-animation-is-not-running': !isTrainingAnimationRunning
          }"
        >
          <div style="flex-grow: 0; margin-right: 1em">
            <HeatGrid
              :vector="modelValue.input"
              :dim="modelValue.dim"
              input-overlay
              skip-bias
            ></HeatGrid>
          </div>
          <div style="text-align: left">
            <div v-if="modelValue.assess()">
              <div style="color: green">
                The perceptron currently "thinks" that this image depicts
                <strong>{{ modelValue.currentOutputLabel }}</strong>
              </div>

              <div class="explanation-text">
                If it's right, leave it alone. If it's wrong, <strong>apply training</strong>&nbsp;
                <span style="color: #888"
                  >(it may take several trainings for the perceptron to change its "mind")</span
                >:
              </div>

              <div class="training-button training-button--dissociate" @click="train(-1)">
                <img src="@/assets/img/red-x.png" />
                <strong>No</strong>, this image is not
                <span class="outputlabel">{{ modelValue.currentOutputLabel }}</span
                >.
              </div>
            </div>
            <div v-else>
              <div style="color: red">
                The perceptron currently "thinks" that this image <em>does not</em> depict
                <strong>{{ modelValue.currentOutputLabel }}</strong>
              </div>

              <div class="explanation-text">
                If it's right, leave it alone. If it's wrong, <strong>apply training</strong>&nbsp;
                <span style="color: #888"
                  >(it may take several trainings for the perceptron to change its "mind")</span
                >:
              </div>

              <div class="training-button training-button--associate" @click="train(1)">
                <img src="@/assets/img/green-check.png" />
                <strong>Yes</strong>, this image is
                <span class="outputlabel">{{ modelValue.currentOutputLabel }}</span
                >.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes heatgrid-overlay {
  0% {
    opacity: 0;
    transform: scale(1.25);
  }
  20% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.training-panel {
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
      margin-top: 1ex;

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

  .training-heatgrid {
    margin-top: 1em;
    margin-bottom: 0.5em;

    .training-heatgrid-positioner {
      display: inline-block;
      position: relative;

      .training-heatgrid-overlay {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        z-index: 10;
        display: none;

        &.overlay-showing {
          display: block;
          animation: heatgrid-overlay 2500ms;
        }
      }
    }
  }
}
</style>
