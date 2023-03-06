<script setup lang="ts"></script>

<template>
  <div class="training-panel">
    <h2>Training</h2>
    <div class="training-fields">
      <div class="training-field-enter-name">
        <label for="currentimagelabel">Give your image a name: </label>
        <input id="currentimagelabel" type="text" />
      </div>
      <div class="training-field-choose-name">
        <label for="currentimagedropdown">Or choose a name you've already created: </label>
        <select id="currentimagedropdown" />
      </div>
      <div class="training-delete-name">
        <a @click="">Delete this name</a>
      </div>
    </div>
    <div class="training-instructions">
      By <strong>training</strong> the perceptron, you "teach" it to associate this image with this
      name (or to dissociate them).
    </div>
    <div class="training-controls">
      <div class="training-button training-button--associate">
        <img src="@/assets/img/green-check.png" />
        <strong>Yes</strong>, this image is ______.
      </div>
      <div class="training-button training-button--dissociate">
        <img src="@/assets/img/red-x.png" />
        <strong>No</strong>, this image is not ______.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.training-panel {
  .training-fields {
    text-align: right;

    label {
      font-size: 0.875rem;
    }

    input {
      width: 12ex;
    }
    select {
      width: 13ex;
    }

    .training-delete-name {
      font-size: 0.75rem;
      margin-top: 0.25ex;
    }
  }
  .training-instructions {
    margin-top: 0.5em;
  }
  .training-controls {
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin-top: 1em;

    .training-button {
      flex: 1;
      opacity: 0.8;
      cursor: pointer;
      border-radius: 1ex;
      padding: 0.5em;
      font-size: 0.875em;

      img {
        width: 1.5em;
        float: left;
        margin-right: 0.25em;
      }

      &:hover {
        opacity: 1;
      }

      &:active {
        filter: saturate(0.5) brightness(1.25);
      }

      &.training-button--associate {
        color: #8f8;
        background-color: #8f86;
      }

      &.training-button--dissociate {
        color: #f88;
        background-color: #f886;
      }
    }
  }
}
</style>
