<template>
  <div class="pokemon" style="overflowX:hidden">
    <div class="electric" v-show="showNow">
      <img src="../assets/Images/1.png" alt="" class="thunder" />

      <img src="../assets/Images/2.png" alt="" class="thunder" />
    </div>

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
      <Evolutions :pokemon="pokemon" />
    </div>

    <button class="animation-skip" v-if="!showNow" @click="stopAnimation">
      Skip Animations
    </button>

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
  </div>
</template>

<script>
import gsap from "gsap";
import PokemonInfo from "../components/PokemonInfo.vue";
import Stats from "../components/Stats.vue";
import Effectiveness from "../components/Effectiveness.vue";
import Evolutions from "../components/Evolutions.vue";
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
      const promises2 = [];
      // this.loading = true;

      const url1 = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const url2 = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
      promises1.push(fetch(url1).then((res) => res.json()));
      promises2.push(fetch(url2).then((res) => res.json()));

      Promise.all(promises1).then((results) => {
        Promise.all(promises2)
          .then((res) => {
            results[0].speciesDetails = res[0];
            console.log(results[0]);

            this.pokemon = results[0];
          })
          .catch((err) => {
            this.pokemon = results[0];
            console.log(err);
          });
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
  .electric {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
