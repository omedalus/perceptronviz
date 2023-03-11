<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import HeatGrid from '@/components/HeatGrid.vue';

import type Perceptron from '@/model/Perceptron';
import Tex from './Tex.vue';

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

    <div class="training-instructions explanation-hideable">
      <p>
        The vector of connection weights
        <span v-if="modelValue.currentOutputLabel">
          for the <strong>{{ modelValue.currentOutputLabel }}</strong> output
        </span>

        (which we're calling <Tex inline formula="\vec{w}"></Tex>) is initially set to
        <strong>random values</strong>.
      </p>
      <p>
        You <strong>train</strong> a perceptron through a process that, in psychology, is referred
        to as
        <a href="https://www.verywellmind.com/what-is-negative-reinforcement-2795410"
          >negative reinforcement</a
        >. When the perceptron emits a correct output, you do nothing; but if it emits a wrong
        answer, you give it an "error signal". By applying

        <a href="https://www.techtarget.com/searchenterpriseai/definition/reinforcement-learning"
          >reinforcement learning</a
        >
        to the perceptron, you strengthen active connections that lead to the correct output, and
        weaken active connections that lead to incorrect ones. As a result, the perceptron "learns"
        to assign the correct label to the image.
      </p>
      <p style="color: #888">
        Repeated training will eventually make the connection weights of the pixels that are part of
        <strong>{{ modelValue.currentOutputLabel }}</strong> to get
        <span style="color: green">greener</span>, and those that <em>aren't</em> part of
        <strong>{{ modelValue.currentOutputLabel }}</strong> will get
        <span style="color: red">redder</span>. Pixels that are irrelevant to
        <strong>{{ modelValue.currentOutputLabel }}</strong> will have connection weights near 0, so
        they'll remain <span style="color: #666">black</span>.
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
            <div v-if="modelValue.assess() > 0">
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

      <div style="margin-top: 0.5em; margin-bottom: 0.5em; text-align: left">
        <div v-if="modelValue.assess() > 0">
          <p>
            Training <em>subtracts</em> the current input
            <Tex inline formula="\vec{x}"></Tex>
            from the connection weights
            <Tex inline formula="\vec{w}"></Tex>. This <em>reduces</em> the current active pixels'
            stimulation of the <strong>{{ modelValue.currentOutputLabel }}</strong> output.
          </p>
          <Tex formula="\vec{w} \gets  \vec{w}-\vec{x}"></Tex>
        </div>
        <div v-else>
          <p>
            Training <em>adds</em> the current input
            <Tex inline formula="\vec{x}"></Tex>
            to the connection weights
            <Tex inline formula="\vec{w}"></Tex>. This <em>increases</em> the current active pixels'
            stimulation of the <strong>{{ modelValue.currentOutputLabel }}</strong> output.
          </p>
          <Tex formula="\vec{w} \gets \vec{w}+\vec{x}"></Tex>
        </div>
      </div>

      <div class="explanation-hideable explanation-text dimmed-text">
        <p>
          You, the human operator of the perceptron, need to tell it when it's wrong or right in
          order for it to learn. For this reason, the perceptron is called a
          <a href="https://www.ibm.com/topics/supervised-learning">supervised learning</a>
          algorithm.
        </p>
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
      text-align: center;

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
