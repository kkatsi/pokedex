<template>
  <div class="background electric" v-show="showNow" v-if="type === 'electric'">
    <img src="../assets/Images/1.png" alt="" class="thunder" />

    <img src="../assets/Images/2.png" alt="" class="thunder" />
  </div>
  <div class="background grass" v-show="showNow" v-else-if="type === 'grass'">
    <img src="../assets/Images/grass.png" alt="" class="grass" />
  </div>
  <div class="background fire" v-show="showNow" v-else-if="type === 'fire'">
    <img src="../assets/Images/fire.png" alt="" class="fire" />
  </div>
  <div class="background fighting" v-show="showNow" v-if="type === 'fighting'">
    <img src="../assets/Images/belt.png" alt="" class="belt" />
  </div>
  <div class="background water" v-show="showNow" v-if="type === 'water'">
    <img src="../assets/Images/water.png" alt="" class="water" />
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    showNow: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .thunder,
  .fighting {
    width: 33%;
    height: auto;
    position: absolute;
    top: 0;
    z-index: -1;
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
  .grass {
    width: 100%;
    position: absolute;
    top: 200px;
    left: 0;
    z-index: -1;
  }
  .fire {
    width: 100%;
    position: absolute;
    top: -200px;
    left: 0;
    z-index: -1;
  }
  .belt {
    width: 50%;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 450px;
    z-index: -1;
  }
  .water {
    width: 100%;
    position: absolute;
    top: 110px;
    left: 0;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.35);
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
