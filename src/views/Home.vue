<template>
  <div class="home">
    <SearchInput />
    <div class="cont-fluid">
      <div class="row">
        <div
          :key="pokemon.id"
          v-for="(pokemon, index) in pokemons"
          class="col-xs-12 col-md-6 col-xl-4 col-xxl-3 card"
        >
          <div
            class="card-container"
            v-if="index === pokemons.length - 1"
            ref="scrollTrigger"
            id="scroll-trigger"
          >
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
            />
            <div
              class="background"
              :style="{ background: findColor(pokemon.types[0].type.name) }"
            ></div>
            <div class="content">
              <span class="id">{{ pokemon.id }}</span>
              <span class="name">{{ pokemon.name }}</span>
              <span class="description" style="white-space: pre-wrap">{{
                pokemon.description
              }}</span>
              <div class="types">
                <span
                  :key="type.slot"
                  v-for="type in pokemon.types"
                  class="tag"
                  :style="{ background: findColor(type.type.name) }"
                >
                  {{ type.type.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-container" v-else>
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
            />
            <div
              class="background"
              :style="{ background: findColor(pokemon.types[0].type.name) }"
            ></div>
            <div class="content">
              <span class="id">{{ pokemon.id }}</span>
              <span class="name">{{ pokemon.name }}</span>
              <span class="description" style="white-space: pre-wrap">{{
                pokemon.description
              }}</span>
              <div class="types">
                <span
                  :key="type.slot"
                  v-for="type in pokemon.types"
                  class="tag"
                  :style="{ background: findColor(type.type.name) }"
                >
                  {{ type.type.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="spinner-box" v-show="loading">
        <div class="circle-border">
          <div class="circle-core"></div>
        </div>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SearchInput from "../components/SearchInput.vue";
import gsap from "gsap";

export default {
  name: "Home",
  components: {
    SearchInput,
  },
  data() {
    return {
      pokemons: [],
      templ: [],
      page: 1,
      perPage: 20,
      loading: false,
    };
  },
  methods: {
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
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.page += 1;
            this.getMorePokemons(this.page, this.perPage);
          }
        });
      });
      observer.observe(this.$refs.scrollTrigger);
    },
    async getMorePokemons(page, perPage) {
      const promises1 = [];
      const promises2 = [];
      const offset = perPage * page;
      const start = offset - perPage + 1;
      this.loading = true;
      for (let i = start; i <= offset; i++) {
        const url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        const url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        promises1.push(fetch(url1).then((res) => res.json()));
        promises2.push(fetch(url2).then((res) => res.json()));
      }

      Promise.all(promises1).then((results) => {
        Promise.all(promises2).then((res) => {
          results.map((r, index) => {
            return (r.description =
              res[index].flavor_text_entries[0].flavor_text);
          });
          this.pokemons = [...this.pokemons, ...results];
          this.loading = false;
        });
      });
    },
    styleAndAnimateCards() {
      document.querySelectorAll(".card-container").forEach((element) => {
        const image = element.querySelector("img");
        var tlPokemonBounce = gsap.timeline({ repeat: -1 });

        tlPokemonBounce
          .to(image, {
            y: "-=10",
            duration: 0.9,
            ease: "Sine.easeInOut",
          })
          .to(image, {
            duration: 0.9,
            y: "+=10",
            ease: "Sine.easeInOut",
          })
          .pause();
        element.removeEventListener("mouseenter", () => {});
        element.addEventListener("mouseenter", () => {
          tlPokemonBounce.play();
          const color = element.querySelector(".background").style.background;
          element.style.setProperty(
            "box-shadow",
            `0 10px 20px ${color},0 6px 6px ${color}`,
            "important"
          );
        });
        element.removeEventListener("mouseleave", () => {});
        element.addEventListener("mouseleave", () => {
          tlPokemonBounce.pause();
          tlPokemonBounce.progress(0);
          element.style.setProperty(
            "box-shadow",
            `0 10px 20px rgba(0, 0, 0, 0.19),0 6px 6px rgba(0, 0, 0, 0.23)`,
            "important"
          );
        });
      });
    },
  },

  async created() {
    await this.getMorePokemons(this.page, this.perPage);
  },
  destroyed() {
    this.observer.disconnect();
  },
  updated() {
    this.styleAndAnimateCards();
    this.scrollTrigger();
  },
  mounted() {
    window.addEventListener("load", () => {
      this.styleAndAnimateCards();
    });
  },
};
</script>

<style lang="scss" scoped>
.cont-fluid {
  margin-top: 3.5rem;
  .spinner-box {
    width: 10vw;
    height: 10vw;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-bottom: 5rem;
  }
  .circle-border {
    width: 5vw;
    height: 5vw;
    padding: 3px;
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
    background-color: white;
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
  .row {
    width: 100%;
    .card {
      flex-wrap: wrap;
      align-self: normal;
      margin-bottom: 5rem;
      .card-container {
        height: 100%;
        border-radius: 1rem;
        position: relative;
        background: whitesmoke;

        margin-left: 7%;
        margin-right: 7%;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          position: absolute;
          width: auto;
          height: 76%;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
        }
        .background {
          width: 100%;
          height: 200px;
          border-top-right-radius: 1rem;
          border-top-left-radius: 1rem;
        }
        .content {
          width: 100%;
          flex-grow: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          // justify-content: center;
          .name {
            margin-top: 0.3rem;
            font-weight: 700;
            font-size: 1.3rem;
            text-transform: capitalize;
            color: rgb(37, 37, 37);
          }
          .id {
            font-weight: 300;
            font-size: 1rem;
            color: rgb(97, 97, 97);
          }
          .description {
            margin-top: 0.5rem;
            font-style: italic;
            font-weight: 400;
            font-size: 0.8rem;
            color: rgb(78, 78, 78);
          }
          .types {
            display: flex;
            flex-wrap: wrap;
            padding-top: 1rem;
            align-items: center;
            justify-content: space-around;
            margin-top: auto;
            width: 100%;
            .tag {
              min-width: 45%;
              color: whitesmoke;
              font-size: 1rem;
              font-weight: 400;
              padding: 0.5rem;
              border-radius: 0.5rem;
              text-transform: capitalize;
            }
          }
        }
      }
    }
  }
}
</style>
