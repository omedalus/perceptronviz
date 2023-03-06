<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  vector: number[];
  dim: number;
}>();
const arrayDim = ref(Array(props.dim));

const vectorIndex = (x: number, y: number) => {
  return y * props.dim + x;
};
</script>

<template>
  <div class="heatgrid" :style="{ height: `${dim + 1}em`, width: `${dim}em` }">
    <div class="heatgrid-y" v-for="(vy, y) in arrayDim">
      <div class="heatgrid-x" v-for="(vx, x) in arrayDim">
        <div class="heatgrid-square" :style="{ top: `${y}em`, left: `${x}em` }">
          <div class="heatgrid-square-hoverdetector"></div>
          <div class="heatgrid-square-tooltip">
            {{ vector[vectorIndex(x, y)] > 0 ? '+' : '' }}{{ vector[vectorIndex(x, y)].toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
    <div class="heatgrid-square" :style="{ top: `${dim}em`, left: `${0}em` }">
      <div class="heatgrid-square-hoverdetector"></div>
      <div class="heatgrid-square-tooltip">
        {{ vector[dim * dim] > 0 ? '+' : '' }}{{ vector[dim * dim].toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.heatgrid {
  position: relative;
  display: inline-block;

  .heatgrid-square {
    display: inline-block;
    position: absolute;
    height: 1em;
    width: 1em;
    background-color: blue;
    box-sizing: border-box;
    border: 1px solid #666;

    .heatgrid-square-tooltip {
      z-index: 1;
      position: absolute;
      font-size: 0.75rem;
      top: -1.5em;
      left: -50%;
      border: 1px solid #666;
      border-radius: 1ex;
      background-color: black;
      color: #ccc;
      display: none;
    }

    .heatgrid-square-hoverdetector {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &:hover + .heatgrid-square-tooltip {
        display: block;
      }
    }
  }
}
</style>
