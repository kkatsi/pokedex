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
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
.container {
  background-color: paleturquoise;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
      background: paleturquoise;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      bottom: -17vw;
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
      background: paleturquoise;
      border-radius: 100%;
      left: 50%;
      transform: translateX(-50%);
      top: -17vw;
    }
  }
}
</style>
