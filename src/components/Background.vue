<template>
  <div class="cont">
    <div class="inner-cont">
      <div
        class="background electric"
        v-show="showNow"
        v-if="type === 'electric'"
      >
        <img src="../assets/Images/1.png" alt="" class="thunder" />

        <img src="../assets/Images/2.png" alt="" class="thunder" />
      </div>
      <div
        class="background grass"
        v-show="showNow"
        v-else-if="type === 'grass'"
      >
        <img src="../assets/Images/grass.png" alt="" class="grass" />
      </div>
      <div class="background fire" v-show="showNow" v-else-if="type === 'fire'">
        <img src="../assets/Images/fire.png" alt="" class="fire" />
      </div>
      <div class="background ring" v-show="showNow" v-if="type === 'fighting'">
        <img src="../assets/Images/ring.png" alt="" class="ring" />
      </div>
      <div class="background water" v-show="showNow" v-if="type === 'water'">
        <img src="../assets/Images/water.png" alt="" class="water" />
      </div>
      <div class="background birds" v-show="showNow" v-if="type === 'flying'">
        <img src="../assets/Images/birds.png" alt="" class="birds" />
      </div>
      <div class="background slime" v-show="showNow" v-if="type === 'poison'">
        <img src="../assets/Images/slime.png" alt="" class="slime" />
      </div>
      <div class="background sand" v-show="showNow" v-if="type === 'ground'">
        <img src="../assets/Images/sand.png" alt="" class="sand" />
      </div>
      <div
        class="background psychic"
        v-show="showNow"
        v-if="type === 'psychic'"
      >
        <img src="../assets/Images/psychic.png" alt="" class="psychic" />
      </div>
      <div class="background rock" v-show="showNow" v-if="type === 'rock'">
        <img src="../assets/Images/rock.png" alt="" class="rock" />
      </div>
      <div class="background snow" v-show="showNow" v-if="type === 'ice'">
        <img src="../assets/Images/snow.png" alt="" class="snow" />
      </div>
      <div class="background bug" v-show="showNow" v-if="type === 'bug'">
        <img src="../assets/Images/bug.png" alt="" class="bug" />
      </div>
      <div class="background sky" v-show="showNow" v-if="type === 'dragon'">
        <img src="../assets/Images/sky.png" alt="" class="sky" />
      </div>
      <div
        class="background graveyard"
        v-show="showNow"
        v-if="type === 'ghost'"
      >
        <img src="../assets/Images/graveyard.png" alt="" class="graveyard" />
      </div>
      <div class="background dark" v-show="showNow" v-if="type === 'dark'">
        <img src="../assets/Images/dark.png" alt="" class="dark" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    showNow: Boolean,
  },

  // mounted() {
  //   this.$nextTick(() => {
  //     //     var rect = element.getBoundingClientRect();
  //     // console.log(rect.top, rect.right, rect.bottom, 0left);
  //                   const infoElement = document.querySelector(".pokemon-basic-info");
  //             console.log(infoElement);
  //             const rect = infoElement.getBoundingClientRect();

  //             const backgroundElement = document.querySelector(".cont");

  //             backgroundElement.style.top =
  //               document.querySelector(".header").offsetHeight + "px";

  //             console.log(rect.top);
  //             console.log(document.querySelector(".header").offsetHeight);

  //             backgroundElement.style.height =
  //               rect.top -
  //               document.querySelector(".header").offsetHeight +
  //               "px";
  //   });
  // },
};
</script>

<style lang="scss" scoped>
.cont {
  position: absolute;
  left: 0;
  top: 199px;
  height: 380px;
  min-width: 100%;
  padding: 0;

  .inner-cont {
    min-width: 100%;
    height: 100%;
    position: relative;
  }
}
.background {
  width: 100%;
  img {
    width: 100%;
  }
  &.fire {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .thunder {
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
  &.grass {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  &.ring {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.water {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.birds {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.sand {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.psychic {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.rock {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.snow {
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.bug {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.graveyard {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.slime {
    width: 100%;
    max-width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &.sky {
    width: 100%;
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &.dark {
    width: 100%;
    max-width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.25);
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}

@media (max-width: 550px) {
  .cont {
    height: 180px;
  }
  .background.fire {
    bottom: 0 !important;
  }
  .background.water {
    bottom: 0 !important;
  }
  .background.grass {
    bottom: 0 !important;
  }
  .background.psychic {
    bottom: 0 !important;
  }
  .background.sand {
    bottom: 0 !important;
  }
  .background.rock {
    bottom: 0 !important;
  }
  .background.snow {
    bottom: 0 !important;
  }
  .background.bug {
    bottom: 0 !important;
  }
  .background.sky {
    bottom: 0al;
    top: 0;
  }
  .background.dark {
    bottom: 0al;
    top: 0;
  }
  .background.graveyard {
    bottom: 0 !important;
  }
}
</style>
