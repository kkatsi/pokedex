<template>
  <div class="home">
    <SearchInput @search="searchPokemons" />
    <div class="cont-fluid">
      <div class="row">
        <div
          :key="pokemon.id"
          v-for="(pokemon, index) in pokemons"
          class="col-xs-12 col-md-6 col-xl-4 col-xxl-3 card"
        >
          <router-link
            :to="`/${pokemon.name}`"
            v-if="index === pokemons.length - 1"
          >
            <div class="card-container" ref="scrollTrigger" id="scroll-trigger">
              <img
                :src="pokemon.sprites.other['official-artwork'].front_default"
                :alt="pokemon.name"
              />
              <div
                class="background"
                :style="[
                  pokemon.types.length > 1
                    ? {
                        background: findColor(pokemon.types[0].type.name),
                        background: `linear-gradient(100deg, ${findColor(
                          pokemon.types[0].type.name
                        )} 0%, ${findColor(pokemon.types[1].type.name)} 100%)`,
                      }
                    : { background: findColor(pokemon.types[0].type.name) },
                ]"
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
          </router-link>
          <router-link :to="`/${pokemon.name}`" v-else>
            <div class="card-container">
              <img
                :src="pokemon.sprites.other['official-artwork'].front_default"
                :alt="pokemon.name"
              />
              <div
                class="background"
                :style="[
                  pokemon.types.length > 1
                    ? {
                        background: findColor(pokemon.types[0].type.name),
                        background: `linear-gradient(100deg, ${findColor(
                          pokemon.types[0].type.name
                        )} 0%, ${findColor(pokemon.types[1].type.name)} 100%)`,
                      }
                    : { background: findColor(pokemon.types[0].type.name) },
                ]"
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
          </router-link>
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
      tempPoke: [],
      templ: [],
      page: 1,
      perPage: 20,
      loading: false,
      limit: 1118,
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
      if (this.loading) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio > 0 &&
            this.limit > this.page * this.perPage
          ) {
            console.log("triggerd");
            this.page += 1;
            this.tempPoke.length === 0
              ? this.getMorePokemons(this.page, this.perPage)
              : this.paginatePokemons(this.page, this.perPage);
          }
        });
      });
      const trigger = this.$refs.scrollTrigger;
      trigger && observer.observe(trigger);
    },
    async getMorePokemons(page, perPage) {
      const promises1 = [];
      const promises2 = [];
      const temp = [];
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
          res.forEach((pok) => {
            const english = pok.flavor_text_entries.find((lang) => {
              return lang.language.name == "en";
            });
            // console.log(english);
            const singleLang = english.flavor_text;
            temp.push(singleLang);
          });
          results.map((r, index) => {
            return (r.description = temp[index]);
          });
          this.pokemons = [...this.pokemons, ...results];
          this.loading = false;
        });
      });
    },
    async searchPokemons(searchText) {
      // console.log(searchText);
      const offset = 20;
      const start = 0;
      this.loading = true;
      this.pokemons = [];
      this.page = 1;

      //fetch all pokemons
      const allUrl = "https://pokeapi.co/api/v2/pokemon?limit=1118";
      const res = await fetch(allUrl);
      let data = await res.json();
      data = data.results;
      console.log(data);
      searchText = searchText.toLowerCase();
      data = data.filter((pokemon) => pokemon.name.startsWith(searchText));
      this.tempPoke = data;
      this.limit = data.length;
      console.log(data);
      this.loading = false;
      this.paginatePokemons(this.page, this.perPage);
    },
    paginatePokemons(page, perPage) {
      const promises1 = [];
      const promises2 = [];
      const offset = page * perPage;
      const start = offset - perPage;
      const data = [...this.tempPoke];
      const temp = [];
      this.loading = true;
      if (offset < data.length) {
        for (let i = start; i < offset; i++) {
          const url1 = `https://pokeapi.co/api/v2/pokemon/${data[i].name}/`;
          const url2 = `https://pokeapi.co/api/v2/pokemon-species/${data[i].name}/`;
          promises1.push(fetch(url1).then((res) => res.json()));
          promises2.push(fetch(url2).then((res) => res.json()));
        }
        Promise.all(promises1).then((results) => {
          Promise.allSettled(promises2)
            .then((res) => {
              res.forEach((pok) => {
                if (pok.status === "fulfilled") {
                  const english = pok.value.flavor_text_entries.find((lang) => {
                    return lang.language.name == "en";
                  });
                  const singleLang = english.flavor_text;
                  temp.push(singleLang);
                } else {
                  temp.push("");
                }
              });
              results.map((r, index) => {
                return (r.description = temp[index]);
              });
              console.log(results);
              this.pokemons = [...this.pokemons, ...results];
              this.loading = false;
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        for (let i = start; i < data.length; i++) {
          const url1 = `https://pokeapi.co/api/v2/pokemon/${data[i].name}/`;
          const url2 = `https://pokeapi.co/api/v2/pokemon-species/${data[i].name}/`;
          promises1.push(fetch(url1).then((res) => res.json()));
          promises2.push(fetch(url2).then((res) => res.json()));
        }
        Promise.all(promises1).then((results) => {
          Promise.allSettled(promises2)
            .then((res) => {
              res.forEach((pok) => {
                if (pok.status === "fulfilled") {
                  const english = pok.value.flavor_text_entries.find((lang) => {
                    return lang.language.name == "en";
                  });
                  const singleLang = english.flavor_text;
                  temp.push(singleLang);
                } else {
                  temp.push("");
                }
              });
              results.map((r, index) => {
                return (r.description = temp[index]);
              });
              this.pokemons = [...this.pokemons, ...results];
              this.loading = false;
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
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
          const color = element.querySelector(".tag").style.background;
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
      padding-left: 2.2%;
      padding-right: 2.2%;
      a {
        text-decoration: none;
        cursor: initial;
        .card-container {
          height: 100%;
          cursor: pointer;
          border-radius: 1rem;
          position: relative;
          min-height: 410px;
          background: whitesmoke;

          // margin-left: 7%;
          // margin-right: 7%;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);
          display: flex;
          flex-direction: column;
          align-items: center;
          &::after {
            content: "Click card for more information";
            background: rgb(34, 34, 34);
            position: absolute;
            width: 25px;
            text-align: center;
            padding-right: 5px;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            color: white;
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
            height: 90%;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            z-index: -1;
            transition: all 0.5s ease-in-out;
          }
          &:hover::after {
            transform: translate(100%, -50%);
          }
          img {
            position: absolute;
            width: auto;
            height: 70%;
            top: -75px;
            left: 0;
            right: 0;
            margin: auto;
            // left: 50%;
            // transform: translateX(-50%);
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
              margin-top: 0.5rem;
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
  @media (max-width: 1400px) {
    img {
      height: 76%;
      top: -85px;
    }
  }
}
@media (max-width: 550px) {
  .home {
    padding-top: 1.5rem;
  }
}
</style>
