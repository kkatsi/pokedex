<template>
  <div class="container">
    <div class="upper-side">
      <div class="big-left-circle"></div>
      <div class="small-left-circle"></div>
      <div class="big-right-circle"></div>
      <div class="small-right-circle"></div>
      <div class="bottom-stripe"></div>
      <div class="big-center-circle">
        <div class="tiny-circle"></div>
      </div>
      <div class="inner-circle"></div>
      <div class="black-bottom-line"></div>
      <div class="small-black"></div>
    </div>
    <div class="lower-side">
      <div class="big-left-circle"></div>
      <div class="small-left-circle"></div>
      <div class="big-right-circle"></div>
      <div class="small-right-circle"></div>
      <div class="top-stripe"></div>
      <div class="big-center-circle">
        <div class="tiny-circle"></div>
      </div>
      <div class="inner-circle"></div>
      <div class="black-bottom-line"></div>
      <div class="small-black"></div>
    </div>
    <div class="spinner-box" v-show="loading">
      <div class="circle-border">
        <div class="circle-core"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.spinner-box {
  width: 60vw;
  height: 60vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.circle-border {
  width: 30vw;
  height: 30vw;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: maroon 100%;
  background: linear-gradient(
    0deg,
    rgba(63, 249, 220, 0.1) 33%,
    rgba(128, 0, 0, 0.7) 100%
  );
  animation: spin 0.8s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 50%;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
.small-circle {
  position: absolute;
  height: 15vw;
  width: 15vw;
  border-radius: 100%;
  background-color: rgb(182, 19, 52);
  border: 6px solid black;
}
.big-circle {
  position: absolute;

  height: 40vw;
  width: 40vw;
  border-radius: 100%;
  background-color: rgb(182, 19, 52);
  border: 6px solid black;
}

.slide-up {
  animation: slideup 0.8s ease-in;
  animation-fill-mode: forwards;
}
.slide-down {
  animation: slidedown 0.8s ease-in;
  animation-fill-mode: forwards;
}
.container {
  z-index: 9999999999;
  background-color: transparent;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  .upper-side {
    width: 100%;
    height: 50vh;
    position: relative;
    overflow: hidden !important;
    background-color: rgb(182, 19, 52);
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    .bottom-stripe {
      position: absolute;
      height: 6px;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: rgb(114, 114, 114);
      border-top: 2px solid black;
    }
    .small-left-circle {
      @extend .small-circle;
      top: -7.5vw;
      left: -7.5vw;
    }
    .small-right-circle {
      @extend .small-circle;
      top: -7.5vw;
      right: -7.5vw;
    }
    .big-right-circle {
      @extend .big-circle;
      top: -20vw;
      right: -20vw;
    }
    .big-left-circle {
      @extend .big-circle;
      top: -20vw;
      left: -20vw;
    }
    .big-center-circle {
      position: absolute;
      bottom: -25vw;
      left: 50%;
      transform: translateX(-50%);
      width: 50vw;
      height: 50vw;
      background-color: black;
      border-radius: 100%;
      border: 6px solid rgb(114, 114, 114);
      .tiny-circle {
        height: 1vw;
        width: 1vw;
        border-radius: 100%;
        background: rgb(114, 114, 114);
        border: 6px solid black;
        left: 50%;
        margin-left: auto;
        margin-right: auto;
        transform: translateY(-26px);
      }
    }
    .inner-circle {
      position: absolute;
      width: 36vw;
      height: 36vw;
      background: white;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      bottom: -17vw;
    }
    .black-bottom-line {
      position: absolute;
      width: 50%;

      height: 3px;
      background: black;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }
    .small-black {
      position: absolute;
      width: 10vw;
      height: 10vw;
      background: black;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      bottom: -5vw;
    }
  }
  .lower-side {
    width: 100%;
    height: 50vh;
    position: relative;
    overflow: hidden !important;
    background-color: rgb(182, 19, 52);
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    .top-stripe {
      position: absolute;
      height: 6px;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgb(114, 114, 114);
      border-bottom: 2px solid black;
    }
    .small-left-circle {
      @extend .small-circle;
      bottom: -7.5vw;
      left: -7.5vw;
    }
    .small-right-circle {
      @extend .small-circle;
      bottom: -7.5vw;
      right: -7.5vw;
    }
    .big-right-circle {
      @extend .big-circle;
      bottom: -20vw;
      right: -20vw;
    }
    .big-left-circle {
      @extend .big-circle;
      bottom: -20vw;
      left: -20vw;
    }
    .big-center-circle {
      position: absolute;
      top: -25vw;
      left: 50%;
      transform: translateX(-50%);
      width: 50vw;
      height: 50vw;
      background-color: black;
      border-radius: 100%;
      border: 6px solid rgb(114, 114, 114);
      .tiny-circle {
        height: 1vw;
        width: 1vw;
        border-radius: 100%;
        background: rgb(114, 114, 114);
        border: 6px solid black;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        position: absolute;
        transform: translateY(26px);
      }
    }
    .inner-circle {
      position: absolute;
      width: 36vw;
      height: 36vw;
      background: white;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      top: -17vw;
    }
    .black-bottom-line {
      position: absolute;
      width: 50%;

      height: 3px;
      background: black;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
    }
    .small-black {
      position: absolute;
      width: 10vw;
      height: 10vw;
      background: black;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      top: -5vw;
    }
  }
}
</style>
