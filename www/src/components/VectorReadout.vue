<script setup lang="ts">
import heatcolor from '@/model/heatcolor';
import Tex from './Tex.vue';

const props = defineProps<{
  vector: number[];
  name: string;
  heatrange?: number;
}>();

const getStyle = (v: number) => {
  if (!props.heatrange) {
    return {
      opacity: v * 0.75 + 0.25
    };
  }

  return {
    color: heatcolor(v, props.heatrange)
  };
};
</script>

<template>
  <div class="vector-readout-holder">
    <div class="vector-label">
      <Tex :formula="`\\vec{${name}}=`"></Tex>
    </div>
    <div class="vector-readout">
      <span class="vector-readout-value" v-for="(v, i) in vector" :key="i" :style="getStyle(v)">{{
        v.toFixed(2)
      }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vector-readout-holder {
  display: flex;
  flex-direction: row;

  .vector-label {
    font-size: 1.5rem;
  }

  .vector-readout {
    white-space: normal;
    color: #fff;

    .vector-readout-value {
      display: inline-block;
      margin-left: 0.5em;
    }
  }
}
</style>
