<script setup lang="ts">
import { ref } from 'vue';

const prop = defineProps<{
  vector: number[];
  dim: number;
}>();
const arrayDim = ref(Array(prop.dim));
</script>

<template>
  <div class="heatgrid" :style="{ height: `${dim}em`, width: `${dim}em` }">
    <div class="heatgrid-y" v-for="(vy, y) in arrayDim">
      <div class="heatgrid-x" v-for="(vx, x) in arrayDim">
        <div class="heatgrid-square" :style="{ top: `${y}em`, left: `${x}em` }">
          <div class="heatgrid-square-hoverdetector"></div>
          <div class="heatgrid-square-tooltip"></div>
        </div>
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
  }
}
</style>
