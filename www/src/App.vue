<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Header from '@/components/Header.vue';
import InputPanel from '@/components/InputPanel.vue';
import OutputPanel from '@/components/OutputPanel.vue';
import TrainingPanel from '@/components/TrainingPanel.vue';
import ImageLoader from '@/components/ImageLoader.vue';
import Essay from '@/components/Essay.vue';

import Perceptron from '@/model/Perceptron';

const thePerceptron = ref(new Perceptron(5));

// Using a disgusting hack to update deep visualizations.
// The Perceptron object doesn't have deep bindings. So when
// the input array is changed from the outside (such as with
// load or clear), the visualizations don't know that they
// need to refresh. This tricks them into doing so.
const vizUpdateHack = ref(1);
const updateViz = () => {
  vizUpdateHack.value = Math.random();
};
updateViz();

const isImageLoaderShowing = ref(false);

const areExplanationsShowing = ref(null as boolean | null);
</script>

<template>
  <Header @showExplanations="areExplanationsShowing = $event"></Header>

  <main
    :class="{
      'explanations-are-showing': areExplanationsShowing === true,
      'explanations-are-not-showing': areExplanationsShowing === false
    }"
  >
    <div class="interactive-model mainblock">
      <div class="interactive-panel interactive-panel--grid">
        <InputPanel
          v-model="thePerceptron"
          :key="vizUpdateHack"
          @clear="
            thePerceptron.clearInput();
            updateViz();
          "
          @save="thePerceptron.saveInput()"
          @load="isImageLoaderShowing = true"
        ></InputPanel>
      </div>
      <div class="interactive-panel interactive-panel--output">
        <OutputPanel v-model="thePerceptron" :key="vizUpdateHack"></OutputPanel>
      </div>
      <div class="interactive-panel interactive-panel--training">
        <TrainingPanel v-model="thePerceptron" :key="vizUpdateHack"></TrainingPanel>
      </div>
    </div>
  </main>

  <div>
    <hr />
    {{ thePerceptron }}
  </div>

  <div class="explando-essay mainblock">
    <Essay></Essay>
  </div>

  <ImageLoader
    v-model="isImageLoaderShowing"
    :perceptron="thePerceptron"
    @imageJSON="
      thePerceptron.loadInput($event);
      updateViz();
    "
  ></ImageLoader>
</template>

<style scoped lang="scss">
.mainblock {
  margin: auto;
}

.explando-essay {
  padding-top: 1em;
  padding-bottom: 2em;
  max-width: 640px;
  padding-left: 1em;
  padding-right: 1em;
}

.interactive-model {
  display: flex;
  flex-direction: row;

  margin: 1em;

  @media screen and (max-width: 960px) {
    display: block;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .interactive-panel {
    flex: 1;
    margin: 1em;
    text-align: center;
    min-width: 16em;
  }
}
</style>
