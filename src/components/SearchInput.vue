<template>
  <div class="container">
    <div class="black-line"></div>
    <input type="text" placeholder="Search for pokemon name or code..." />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 10vh;
  position: relative;
  //   background: red;
  //   .black-line {
  //     position: absolute;
  //     left: 0;
  //     top: 50%;
  //     width: 100%;
  //     height: 1px;
  //     background: grey;
  //     transform: translateY(-50%);
  //     box-shadow: 0px -5px 10px #888, 0px 5px 10px maroon;
  //   }
  input {
    border-radius: 100000px;
    position: absolute;
    background: whitesmoke;
    left: 50%;
    top: 50%;
    height: 4vh;
    width: 50%;
    max-width: 500px;
    transform: translate(-50%, -50%);
    border: 0;
    padding: 10px 30px;
    font-size: 1.3rem;
    font-weight: bold;
    box-shadow: -1px -5px 12px #888, -1px 5px 12px #800000;
    &::placeholder {
      font-style: italic;
    }
    &:focus-visible {
      outline: 0;
    }
  }
}
</style>
