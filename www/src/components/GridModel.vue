<script setup lang="ts">
import { ref } from 'vue';

import GridSquare from './GridSquare.vue';

const prop = defineProps<{
  modelValue: number[];
  dim: number;
}>();
defineEmits<{
  (e: 'update:modelValue', v: number[]): void;
}>();

const arrayDim = ref(Array(prop.dim));
</script>

<template>
  <div class="gridmodel">
    <div class="gridmodel-y" v-for="(vy, y) in arrayDim" :key="y">
      <div class="gridmodel-x" v-for="(vx, x) in arrayDim" :key="x">
        <div class="gridsquare-holder">
          <GridSquare
            v-model="modelValue[y * dim + x]"
            @update:model-value="$emit('update:modelValue', modelValue)"
          ></GridSquare>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gridmodel {
  .gridmodel-x,
  .gridsquare-holder {
    display: inline-block;
  }

  .gridmodel-x {
    margin-left: 0.25ex;
    margin-right: 0.25ex;
  }
}
</style>
