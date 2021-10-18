<template>
  <div class="container">
    <div class="animatedLine"></div>
    <div class="animatedLine"></div>
    <div class="animatedLine"></div>
    <router-link to="/" tag="h1"><h1>Pokedex</h1></router-link>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "Pokemon";
  src: url("../assets/Fonts/pokemon/@font-face/f4d1593471d222ddebd973210265762a.woff")
    format("woff");
}
.container {
  position: relative;
  width: 100%;

  a {
    text-decoration: none;
  }
  h1 {
    text-align: center;
    font-size: 5rem;
    font-family: Pokemon !important;
    margin: 0;
    letter-spacing: 5px;
    //   text-shadow: -1px 0 black, 0 3px black, 3px 0 black, 0 -1px black;
    background: #960202;
    background: -webkit-radial-gradient(
      circle farthest-corner at left center,
      #960202 50%,
      #000000 100%
    );
    background: -moz-radial-gradient(
      circle farthest-corner at left center,
      #960202 50%,
      #000000 100%
    );
    background: radial-gradient(
      circle farthest-corner at left center,
      #960202 50%,
      #000000 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(3px 4px rgb(133, 133, 133));
  }

  .animatedLine {
    position: absolute;
    left: 0;
    height: 3px;
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    overflow: hidden;
  }
  .animatedLine:nth-child(1) {
    top: 25%;
  }
  .animatedLine:nth-child(1)::after {
    animation-delay: -1.5s;
  }
  .animatedLine:nth-child(2) {
    top: 50%;
  }
  .animatedLine:nth-child(2)::after {
    animation-delay: -1s;
  }
  .animatedLine:nth-child(3) {
    top: 75%;
  }
  .animatedLine:nth-child(3)::after {
    animation-delay: -0.5s;
  }

  .animatedLine::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 75px;
    height: 100%;
    background: -moz-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      #505050 75%,
      #9e0b0b 100%
    );
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      #505050 75%,
      #9e0b0b 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      #505050 75%,
      #9e0b0b 100%
    );
    animation: animatedLine 4s 0s infinite;
    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
    animation-fill-mode: forwards;
  }
}

@keyframes animatedLine {
  0% {
    left: -70px;
  }
  60% {
    left: calc(100% + 120px);
  }
  100% {
    left: calc(100% + 120px);
  }
}
</style>
