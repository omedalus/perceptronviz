<script setup lang="ts">
import { ref } from 'vue';

import heatcolor from '@/model/heatcolor';

const props = defineProps<{
  vector: number[];
  dim: number;
  inputOverlay?: boolean;
  popIndex?: number;
  renderUpToIndex?: number;
  darkfloor?: number;
}>();
const arrayDim = ref(Array(props.dim));

const vectorIndex = (x: number, y: number) => {
  return y * props.dim + x;
};

const valueAtXY = (x: number, y: number) => {
  const vix = vectorIndex(x, y);
  let vRaw = props.vector[vix];
  return vRaw || 0;
};

const squareColorAtXY = (x: number, y: number) => {
  let vRaw = valueAtXY(x, y);

  if (props.inputOverlay) {
    // Raw value is between 0 and 1.
    const b = Math.floor(vRaw * 255);
    const retval = `rgb(${b}, ${b}, ${b})`;
    return retval;
  }

  // vRaw is -inf to +inf, but the juicy parts are
  // between -dim and +dim.
  // We treat the negative and positive cases differently.
  const retval = heatcolor(vRaw, props.dim, props.darkfloor);
  return retval;
};
</script>

<template>
  <div class="heatgrid" :style="{ height: `${dim + 1}em`, width: `${dim}em` }">
    <div class="heatgrid-y" v-for="(vy, y) in arrayDim">
      <div class="heatgrid-x" v-for="(vx, x) in arrayDim">
        <div
          class="heatgrid-square"
          v-if="!renderUpToIndex || vectorIndex(x, y) <= renderUpToIndex"
          :style="{ top: `${y}em`, left: `${x}em`, 'background-color': squareColorAtXY(x, y) }"
          :class="{ pop: vectorIndex(x, y) === popIndex }"
        >
          <div class="heatgrid-square-hoverdetector"></div>
          <div class="heatgrid-square-tooltip">
            {{ valueAtXY(x, y) > 0 ? '+' : '' }}{{ valueAtXY(x, y).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="heatgrid-square"
      v-if="!renderUpToIndex || vectorIndex(0, dim) <= renderUpToIndex"
      :style="{ top: `${dim}em`, left: `${0}em`, 'background-color': squareColorAtXY(0, dim) }"
      :class="{ pop: popIndex === dim * dim }"
    >
      <div class="heatgrid-square-hoverdetector"></div>
      <div class="heatgrid-square-tooltip">
        {{ valueAtXY(0, dim) > 0 ? '+' : '' }}{{ valueAtXY(0, dim).toFixed(2) }}
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
    background-color: #000;
    box-sizing: border-box;
    border: 1px solid #666;
    transition: transform 250ms;

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

    &.pop {
      z-index: 1;
      transform: scale(1.5);
    }
  }
}
</style>
