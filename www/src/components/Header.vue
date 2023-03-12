<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';

import samplePerceptrons from '@/assets/sample-perceptrons.json';

const elemSpacer = ref();
const elemHeader = ref();

const isShowingExplanation = ref(false);

function adjustSpacerSizeToMatchHeader(this: Window, event: Event) {
  if (!elemHeader.value || !elemSpacer.value) {
    return;
  }
  elemSpacer.value.style.height = `${elemHeader.value.offsetHeight}px`;
}

onMounted(() => {
  window.addEventListener('scroll', adjustSpacerSizeToMatchHeader);
  window.addEventListener('resize', adjustSpacerSizeToMatchHeader);
  adjustSpacerSizeToMatchHeader.bind(window)(new Event('scroll'));
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', adjustSpacerSizeToMatchHeader);
  window.removeEventListener('resize', adjustSpacerSizeToMatchHeader);
});

const emit = defineEmits<{
  (e: 'showExplanations', show: boolean): void;
  (e: 'save'): void;
  (e: 'load', serialized: string): void;
}>();

watch(isShowingExplanation, (newval) => {
  emit('showExplanations', newval);
});

const isSaveMessageShowing = ref(false);
const isLoadMessageShowing = ref(false);

const onSaveClicked = () => {
  emit('save');
  isSaveMessageShowing.value = true;
  window.setTimeout(() => {
    isSaveMessageShowing.value = false;
  }, 10000);
};
</script>

<template>
  <div class="header-magic-static-spacer" ref="elemSpacer"></div>
  <header ref="elemHeader">
    <div class="header-contents">
      <div class="header-title">Perceptron visualizer</div>
      <div class="header-text">
        <div style="font-style: italic">Learn how very simple neural networks work</div>
        <div style="font-size: 0.75rem; display: flex">
          <a href="mailto:perceptronviz@gmail.com">Contact the developer</a>
          <div style="width: 100%"></div>
          <a href="https://github.com/omedalus/perceptronviz">See the source code</a>
        </div>
      </div>

      <div class="header-controls">
        <div v-if="isShowingExplanation">
          <div class="funny-explanation-controls-caption">Holy wall of text, Batman!</div>
          Showing text explanations. <a @click="isShowingExplanation = false">Hide</a>
        </div>
        <div v-else>
          <div class="funny-explanation-controls-caption">
            I'm confused! What's happening<span class="animated-punctuation">?</span
            ><span style="animation-delay: 0.33s" class="animated-punctuation">!</span
            ><span style="animation-delay: 1.4s" class="animated-punctuation">?</span>
          </div>
          Hiding text explanations. <a @click="isShowingExplanation = true">Show</a>
        </div>
      </div>
    </div>

    <div class="saveload-controls">
      <div>
        <a @click="onSaveClicked()">Save this perceptron</a>
        <div
          class="savemessage"
          :class="{
            'savemessage-showing': isSaveMessageShowing,
            'savemessage-not-showing': !isSaveMessageShowing
          }"
        >
          The URL of this perceptron (in its current state) has been copied to your clipboard. You
          can paste it into another browser window, link it on your website, or share it to social
          media.
        </div>
      </div>
      <div>
        <a @click="isLoadMessageShowing = !isLoadMessageShowing">
          Load a pre-trained sample perceptron
        </a>
        <div
          class="loadmessage"
          :class="{
            'loadmessage-showing': isLoadMessageShowing,
            'loadmessage-not-showing': !isLoadMessageShowing
          }"
        >
          <div
            v-for="(sample, iSample) in samplePerceptrons"
            :key="sample.name"
            class="sample-perceptron"
          >
            <a
              @click="
                isLoadMessageShowing = false;
                $emit('load', sample.value);
              "
            >
              {{ sample.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-magic-static-spacer {
  display: block;
}

header {
  background-color: #333;
  text-align: center;
  position: relative;
  padding: 0;
  border-bottom: 1px solid #666;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .header-contents {
    max-width: 1024px;
    margin: auto;
    min-height: 3em;
    padding: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 1024px) {
      display: block;
      padding: 0 1ex 0.5ex;
    }
  }
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: auto;
  color: white;
  white-space: nowrap;
}
.header-text {
  a {
    white-space: nowrap;
  }
}

.header-controls {
  margin-left: auto;
  font-size: 0.875rem;
  text-align: left;

  @media screen and (max-width: 1024px) {
    text-align: center;
  }

  .funny-explanation-controls-caption {
    font-weight: bold;
    color: white;
    font-style: italic;
  }
}

@keyframes animated-punctuation {
  0% {
    transform: rotate(-30deg);
    left: 0;
    top: 0;
  }
  25% {
    transform: rotate(30deg);
    top: -0.25ex;
  }
  50% {
    transform: rotate(-30deg);
    left: 1ex;
    top: 0;
  }
  75% {
    transform: rotate(30deg);
    top: 0.25ex;
  }
  100% {
    transform: rotate(-30deg);
    left: 0;
    top: 0;
  }
}

.animated-punctuation {
  display: inline-block;
  position: relative;
  animation: animated-punctuation 2s infinite;
}

.saveload-controls {
  font-size: 0.75rem;
  position: absolute;
  left: 0;
  top: calc(100% - 0.75ex);
  background-color: #333;
  padding: 0.5ex 1ex;
  padding-top: 0;
  border: 1.5px solid #666;
  border-top: none;
  border-left: none;
  border-radius: 0 0 1em 0;
  text-align: left;
  max-width: 40ex;

  .savemessage,
  .loadmessage {
    display: none;
    &.savemessage-showing,
    &.loadmessage-showing {
      display: block;
    }
  }

  .loadmessage {
    .sample-perceptron {
      margin-left: 2em;
    }
  }
}
</style>
