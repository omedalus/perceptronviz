<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
const msTotalHoldTime = ref(0);

let intervalHold = 0;

const MS_INTERVAL_HOLD = 50;

const fnHold = () => {
  msTotalHoldTime.value += MS_INTERVAL_HOLD;
  msTotalHoldTime.value %= 2000;
};

const cleanup = () => {
  if (intervalHold) {
    window.clearInterval(intervalHold);
  }
  intervalHold = 0;
};

const onMouseDown = () => {
  if (intervalHold) {
    // Interval is already set.
    return;
  }
  intervalHold = window.setInterval(fnHold, MS_INTERVAL_HOLD);
};

const onMouseUp = () => {
  cleanup();
};

onBeforeUnmount(() => {
  cleanup();
});

const theValue = computed(() => {
  let v = msTotalHoldTime.value / 1000;
  if (v > 1) {
    v = (2000 - msTotalHoldTime.value) / 1000;
  }
  return v;
});
</script>

<template>
  <div class="gridsquare" @mousedown="onMouseDown()" @mouseup="onMouseUp()">
    <div class="gridsquare-brightener" :style="{ opacity: theValue }"></div>

    <div class="gridsquare-value-hover">
      {{ `${Math.round(theValue * 100)}%` }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.gridsquare {
  border: 1px solid #fff;
  background-color: #000;
  height: 2em;
  width: 2em;
  position: relative;
  display: inline-block;

  cursor: url('@/assets/pen-cursor.svg'), pointer;

  .gridsquare-brightener {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: #fff;
  }

  .gridsquare-value-hover {
    position: absolute;
    font-size: 0.75rem;
    top: -1.5em;
    left: 0.5ex;
    width: calc(100% - 1ex);
    background-color: black;
    text-align: center;
    color: white;
    border: 1px solid #888;
    border-radius: 1ex;

    display: none;
  }
  &:hover {
    .gridsquare-value-hover {
      display: block;
    }
  }
}
</style>
