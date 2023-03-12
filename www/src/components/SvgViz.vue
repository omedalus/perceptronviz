<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

import type Perceptron from '@/model/Perceptron';
import heatcolor from '@/model/heatcolor';

const props = defineProps<{
  perceptron: Perceptron;
}>();
const emit = defineEmits<{
  (e: 'input-increment', i: number): void;
}>();

const inputX = (ixInput: number) => {
  const retval = 10 + ixInput * 20 + Math.floor(ixInput / props.perceptron.dim) * 20;
  return retval;
};

const inputColor = (activityLevel: number) => {
  const v = Math.floor(activityLevel * 255);
  const retval = `rgb(${v},${v},${v})`;
  return retval;
};

const svgWidth = computed(() => {
  const retval = (props.perceptron.size + props.perceptron.dim) * 20;
  return retval;
});

const centerX = computed(() => svgWidth.value / 2);

const outputX = (ixOutput: number) => {
  const numOutputs = props.perceptron.outputLabels.length;
  const ixCenter = (numOutputs - 1) / 2;
  const retval = centerX.value + (ixOutput - ixCenter) * 50;
  return retval;
};

const outputColor = (outputLabel: string, floor?: number) => {
  const assessment = props.perceptron.assess(outputLabel);
  const color = heatcolor(assessment, props.perceptron.dim, floor);
  return color;
};

const inputOutputWeights = computed(() => {
  const retval = [] as {
    inputIndex: number;
    outputIndex: number;
    weight: number;
    inputActivity: number;
  }[];
  props.perceptron.outputLabels.forEach((outputLabel, ixOutput) => {
    props.perceptron.input.forEach((inputActivity, ixInput) => {
      const outputVector = props.perceptron.outputs[outputLabel];
      const wio = outputVector[ixInput];
      const item = {
        inputActivity,
        inputIndex: ixInput,
        outputIndex: ixOutput,
        weight: wio
      };
      retval.push(item);
    });
  });
  return retval;
});

const inputIndexGettingIncremented = ref(-1);

const intervalActivityIncrementor = ref(0);
const MS_INCREMENTOR_INTERVAL = 50;
const fnActivityIncrementor = () => {
  if (inputIndexGettingIncremented.value < 0) {
    return;
  }
  emit('input-increment', inputIndexGettingIncremented.value);
};

onMounted(() => {
  intervalActivityIncrementor.value = window.setInterval(
    fnActivityIncrementor,
    MS_INCREMENTOR_INTERVAL
  );
});

onBeforeUnmount(() => {
  window.clearInterval(intervalActivityIncrementor.value);
});
</script>

<template>
  <svg :viewBox="`0 0 ${svgWidth} 320`" height="320" width="100%" class="perceptron-svg-viz">
    <line
      v-for="(weightRecord, ixWeightRecord) in inputOutputWeights"
      :key="ixWeightRecord"
      :x1="inputX(weightRecord.inputIndex)"
      y1="10"
      :x2="outputX(weightRecord.outputIndex)"
      y2="260"
      stroke-width="1"
      :stroke="heatcolor(weightRecord.weight, perceptron.dim)"
      :opacity="0.15 + 0.85 * weightRecord.inputActivity"
    />

    <circle
      v-for="(inputValue, ixInput) in perceptron.input"
      class="perceptron-svg-viz-inputnode"
      :key="ixInput"
      :cx="inputX(ixInput)"
      cy="10"
      r="8"
      stroke="#888"
      stroke-width="2"
      :fill="inputColor(inputValue)"
      @mousedown="inputIndexGettingIncremented = ixInput"
      @mouseup="inputIndexGettingIncremented = -1"
      @mouseout="inputIndexGettingIncremented = -1"
      @click.stop="$emit('input-increment', ixInput)"
    />

    <circle
      v-for="(outputLabel, ixOutput) in perceptron.outputLabels"
      :key="ixOutput"
      :cx="outputX(ixOutput)"
      cy="260"
      r="8"
      stroke="#666"
      stroke-width="2"
      :fill="outputColor(outputLabel)"
    />

    <text
      v-for="(outputLabel, ixOutput) in perceptron.outputLabels"
      :key="ixOutput"
      :x="outputX(ixOutput)"
      y="280"
      stroke-width=".5"
      text-anchor="middle"
      alignment-baseline="middle"
      stroke="#666"
      :fill="outputColor(outputLabel, 0.2)"
    >
      {{ outputLabel }}
    </text>

    <text
      v-for="(outputLabel, ixOutput) in perceptron.outputLabels"
      :key="ixOutput"
      :x="outputX(ixOutput)"
      y="300"
      text-anchor="middle"
      alignment-baseline="middle"
      font-size=".75rem"
      :fill="outputColor(outputLabel, 0.2)"
    >
      {{ perceptron.assess(outputLabel).toFixed(2) }}
    </text>
  </svg>
</template>

<style scoped lang="scss">
.perceptron-svg-viz {
  .perceptron-svg-viz-inputnode {
    cursor: url('@/assets/pen-cursor.svg'), pointer;
  }
}
</style>
