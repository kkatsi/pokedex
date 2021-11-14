<template>
  <div class="pokemon" style="overflowX:hidden">
    <Background
      v-if="pokemon"
      v-show="showNow"
      :showNow="showNow"
      :type="pokemon.types[0].type.name"
    />

    <img
      :src="pokemon.sprites.other['official-artwork'].front_default"
      :alt="pokemon.name"
      class="pokemon-image"
      v-if="pokemon"
    />

    <div v-if="pokemon" v-show="showNow">
      <PokemonInfo
        :pokemon="pokemon"
        :findColor="findColor"
        class="cont-lg"
        style="padding:0 .3rem"
      />
      <Stats :findColor="findColor" :pokemon="pokemon" />
      <Effectiveness :pokemon="pokemon" :findColor="findColor" />
      <Evolutions :pokemon="pokemon" :findColor="findColor" />
    </div>

    <button
      class="animation-skip"
      v-if="!showNow && pokemon"
      @click="stopAnimation"
    >
      Skip Animations
    </button>

    <starting-screen v-if="!pokemon" :loading="!pokemon"></starting-screen>

    <div class="pokeball-container">
      <picture>
        <img
          src="../assets/Images/pokeball.png"
          class="pokeball"
          alt="pokeball"
        />
      </picture>
    </div>
    <img src="../assets/Images/flash.png" alt="flash" class="flash-image" />

    <router-link
      :to="`/${pokemon.id - 1}`"
      v-if="pokemon?.id > 1"
      class="arrow left"
    >
      <svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
        <polyline
          fill="none"
          stroke="#2c3e50"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="
  45.63,75.8 0.375,38.087 45.63,0.375 "
        />
      </svg>
      <span class="prev">Previous</span>
    </router-link>
    <router-link
      :to="`/${pokemon.id + 1}`"
      v-if="pokemon?.id <= 1118"
      class="arrow right"
    >
      <span class="next">Next</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="60px"
        height="80px"
        viewBox="0 0 50 80"
        xml:space="preserve"
      >
        <polyline
          fill="none"
          stroke="#2c3e50"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="
  0.375,0.375 45.63,38.087 0.375,75.8 "
        />
      </svg>
    </router-link>
  </div>
</template>

<script>
import gsap from "gsap";
import PokemonInfo from "../components/PokemonInfo.vue";
import Stats from "../components/Stats.vue";
import Effectiveness from "../components/Effectiveness.vue";
import Evolutions from "../components/Evolutions.vue";
import Background from "../components/Background.vue";
import StartingScreen from "../components/StartingScreen.vue";
var tlBasicAnimation;
var timeout;

export default {
  data() {
    return {
      showNow: false,
      pokemon: null,
    };
  },
  components: {
    PokemonInfo,
    Stats,
    Effectiveness,
    Evolutions,
    Background,
    StartingScreen,
  },
  methods: {
    animateELements() {
      if (!this.showNow) return;
      const info = document.querySelector(".pokemon-basic-info");
      var tlTest = gsap.timeline({ repeat: 0 }).to(info, {
        duration: 1,
        // y: "+=380",
        opacity: 1,
        ease: "Expo.easeOut",
      });
    },
    pokeballAndPokemonAnimation() {
      if (!this.pokemon) return;
      if (this.showNow) return;
      // timeout = setTimeout(() => {
      // }, 3900);
      const pokeball = document.querySelector(".pokeball-container img");
      const pokemon = document.querySelector(".pokemon-image");
      const info = document.querySelector(".pokemon-basic-info");
      console.log(info);

      tlBasicAnimation = gsap.timeline();
      tlBasicAnimation.delay(0.5);
      tlBasicAnimation.endTime() === 1;
      tlBasicAnimation
        .to(pokeball, {
          y: "+=50",
          duration: 1,
          ease: "Bounce.easeOut",
        })
        .to(document.querySelector("picture"), {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            if (!this.showNow)
              document.querySelector(".flash-image")?.classList.add("flash");
          },
        })
        .to(
          pokemon,
          {
            opacity: 1,
            scale: 0.9,
            duration: 1.2,
            ease: "Sine.easeInOut",
            // onCompleteParams: [this.showNow],
            onComplete: () => {
              this.showNow = true;
              document.querySelector(".flash-image").style.display = "none";
              document
                .querySelectorAll(".electric img")[0]
                ?.classList.add("flashThunder");
              setTimeout(() => {
                document
                  .querySelectorAll(".electric img")[1]
                  ?.classList.add("flashThunder");
              }, 500);
            },
          },
          "<+=1.2"
        )
        .from(info, {
          marginTop: 0,
          duration: 1,
          opacity: 0,
          ease: "Expo.easeOut",
        });
    },
    stopAnimation() {
      this.showNow = true;
      tlBasicAnimation.progress(1).pause();
      clearTimeout(timeout);
    },

    findColor(type) {
      let result;
      switch (type) {
        case "grass":
          result = "#78c850";
          break;
        case "normal":
          result = "#a8a878";
          break;
        case "fire":
          result = "#f08030";
          break;
        case "fighting":
          result = "#c03028";
          break;
        case "water":
          result = "#6890f0";
          break;
        case "flying":
          result = "#a890f0";
          break;
        case "poison":
          result = "#a040a0";
          break;
        case "electric":
          result = "#f8d030";
          break;
        case "ground":
          result = "#e0c068";
          break;
        case "psychic":
          result = "#f85888";
          break;
        case "rock":
          result = "#b8a038";
          break;
        case "ice":
          result = "#98d8d8";
          break;
        case "bug":
          result = "#a8b820";
          break;
        case "dragon":
          result = "#7038f8";
          break;
        case "ghost":
          result = "#705898";
          break;
        case "dark":
          result = "#705848";
          break;
        case "steel":
          result = "#b8b8d0";
          break;
        case "fairy":
          result = "#ee99ac";
          break;
        default:
          break;
      }
      return result;
    },
    // async getPokemon(name) {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    //   const data = await res.json();
    //   console.log(data);
    //   this.pokemon = data;
    // },
    async getPokemon(name) {
      const promises1 = [];
      // const promises2 = [];
      // this.loading = true;

      const url1 = `https://pokeapi.co/api/v2/pokemon/${name}`;

      promises1.push(fetch(url1).then((res) => res.json()));

      Promise.all(promises1)
        .then((results) => {
          const url2 = results[0].species.url;
          Promise.all([fetch(url2).then((res) => res.json())])
            .then((res) => {
              console.log(res);
              results[0].speciesDetails = res[0];
              console.log(results[0]);

              this.pokemon = results[0];
            })
            .catch((err) => {
              this.pokemon = results[0];
              this.$router.push("/error/404");

              console.log(err);
            });
        })
        .catch((err) => {
          this.$router.push("/error/404");
        });
    },
  },
  updated() {
    this.pokeballAndPokemonAnimation();
  },
  async created() {
    await this.getPokemon(this.$route.params.pokeName);
  },
  mounted() {
    this.$nextTick(() => {
      // Okay, now that everything is destroyed, lets build it up again
    });
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@300;400;500;600;700&display=swap");

.pokemon {
  svg {
    width: 50px;
    height: 70px;
  }

  .arrow {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none !important;
    color: #2c3e50;
    .prev,
    .next {
    }
  }

  .left {
    left: 20px;
  }

  .right {
    right: 20px;
  }
  @media (max-width: 700px) {
    svg {
      width: 20px;
      height: 40px;
    }
    .left {
      left: 5px;
    }
    .right {
      right: 5px;
    }
  }

  .left:hover polyline,
  .left:focus polyline {
    stroke-width: 3;
  }

  .left:active polyline {
    stroke-width: 6;
    transition: all 100ms ease-in-out;
  }

  .right:hover polyline,
  .right:focus polyline {
    stroke-width: 3;
  }

  .right:active polyline {
    stroke-width: 6;
    transition: all 100ms ease-in-out;
  }

  polyline {
    transition: all 250ms ease-in-out;
  }

  img.pokemon-image {
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform: scale(0);
    top: 150px;
  }
  @media (max-width: 550px) {
    img.pokemon-image {
      max-width: 300px;
    }
  }

  .animation-skip {
    --clr-neon: hsl(317 100% 54%);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10%;
    background-color: transparent;
    color: var(--clr-neon);
    font-size: 1.2rem;
    font-weight: 700;
    border: 4px solid var(--clr-neon);
    border-radius: 99999px;
    padding: 0.5rem 2rem;
    text-shadow: 0 0 0.5em var(--clr-neon);
    box-shadow: 0 0 1em var(--clr-neon);
    cursor: pointer;
  }

  .pokeball-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 40%;
    width: 40%;
    display: block;
    max-width: 100%;
    picture {
      width: 25%;
      height: auto;
      position: relative;
      img.pokeball {
        width: 25%;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-45%);
        height: 5px;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 100%;
      }
    }
  }
  .flash-image {
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 25%;
    max-width: 100%;
  }
  .flash {
    -webkit-animation: flash ease-out 1.2s forwards;
    -moz-animation: flash ease-out 1.2s forwards;
    animation: flash ease-out 1.2s forwards;
  }

  @-webkit-keyframes flash {
    from {
      opacity: 0;
      transform: scale(0);
    }
    20% {
      opacity: 0.2;
    }
    40% {
      opacity: 0.6;
    }
    60% {
      opacity: 0.8;
    }
    80% {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale(1);
      display: none;
    }
  }

  @keyframes flash {
    from {
      opacity: 0;
      transform: scale(0);
    }
    20% {
      opacity: 0.2;
    }
    40% {
      opacity: 0.6;
    }
    60% {
      opacity: 0.6;
    }
    80% {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale(1);
      display: none;
    }
  }

  .flashThunder {
    -webkit-animation: flashThunder ease-out 7s infinite;
    -moz-animation: flashThunder ease-out 7s infinite;
    animation: flashThunder ease-out 7s infinite;
    // animation-delay: 1s;
  }

  @-webkit-keyframes flashThunder {
    from {
      opacity: 1;
    }
    92% {
      opacity: 1;
    }
    93% {
      opacity: 0.8;
    }
    94% {
      opacity: 0.4;
    }
    96% {
      opacity: 1;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes flashThunder {
    from {
      opacity: 1;
    }
    92% {
      opacity: 1;
    }
    93% {
      opacity: 0.6;
    }
    94% {
      opacity: 0.2;
    }
    96% {
      opacity: 1;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
