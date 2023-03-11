<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

import type Perceptron from '@/model/Perceptron';
import heatcolor from '@/model/heatcolor';

const props = defineProps<{
  modelValue: Perceptron;
}>();
defineEmits<{
  (e: 'update:modelValue', v: Perceptron): void;
}>();

const inputX = (ixInput: number) => {
  const retval = 10 + ixInput * 20 + Math.floor(ixInput / props.modelValue.dim) * 20;
  return retval;
};

const inputColor = (activityLevel: number) => {
  const v = Math.floor(activityLevel * 255);
  const retval = `rgb(${v},${v},${v})`;
  return retval;
};

const svgWidth = computed(() => {
  const retval = (props.modelValue.size + props.modelValue.dim) * 20;
  return retval;
});

const centerX = computed(() => svgWidth.value / 2);

const outputX = (ixOutput: number) => {
  const numOutputs = props.modelValue.outputLabels.length;
  const ixCenter = (numOutputs - 1) / 2;
  const retval = centerX.value + (ixOutput - ixCenter) * 50;
  return retval;
};

const outputColor = (outputLabel: string, floor?: number) => {
  const assessment = props.modelValue.assess(outputLabel);
  const color = heatcolor(assessment, props.modelValue.dim, floor);
  return color;
};

const inputOutputWeights = computed(() => {
  const retval = [] as {
    inputIndex: number;
    outputIndex: number;
    weight: number;
    inputActivity: number;
  }[];
  props.modelValue.outputLabels.forEach((outputLabel, ixOutput) => {
    props.modelValue.input.forEach((inputActivity, ixInput) => {
      const outputVector = props.modelValue.outputs[outputLabel];
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
</script>

<template>
  <svg :viewBox="`0 0 ${svgWidth} 320`" height="320" width="100%">
    <line
      v-for="(weightRecord, ixWeightRecord) in inputOutputWeights"
      :key="ixWeightRecord"
      :x1="inputX(weightRecord.inputIndex)"
      y1="10"
      :x2="outputX(weightRecord.outputIndex)"
      y2="260"
      stroke-width="1"
      :stroke="heatcolor(weightRecord.weight, modelValue.dim)"
      :opacity="0.15 + 0.85 * weightRecord.inputActivity"
    />

    <circle
      v-for="(inputValue, ixInput) in modelValue.input"
      :key="ixInput"
      :cx="inputX(ixInput)"
      cy="10"
      r="8"
      stroke="#888"
      stroke-width="2"
      :fill="inputColor(inputValue)"
    />

    <circle
      v-for="(outputLabel, ixOutput) in modelValue.outputLabels"
      :key="ixOutput"
      :cx="outputX(ixOutput)"
      cy="260"
      r="8"
      stroke="#666"
      stroke-width="2"
      :fill="outputColor(outputLabel)"
    />

    <text
      v-for="(outputLabel, ixOutput) in modelValue.outputLabels"
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
      v-for="(outputLabel, ixOutput) in modelValue.outputLabels"
      :key="ixOutput"
      :x="outputX(ixOutput)"
      y="300"
      text-anchor="middle"
      alignment-baseline="middle"
      font-size=".75rem"
      :fill="outputColor(outputLabel, 0.2)"
    >
      {{ modelValue.assess(outputLabel).toFixed(2) }}
    </text>
  </svg>
</template>

<style scoped lang="scss"></style>
