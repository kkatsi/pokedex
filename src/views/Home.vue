<template>
  <div class="home">
    <SearchInput />
    <div class="cont-fluid">
      <div class="row">
        <div
          :key="pokemon.id"
          v-for="pokemon in pokemons"
          class="col-xs-12 col-sm-6 col-md-4 col-xxl-3 card"
        >
          <div class="card-container">
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
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SearchInput from "../components/SearchInput.vue";

export default {
  name: "Home",
  components: {
    SearchInput,
  },
  data() {
    return {
      pokemons: [],
      templ: [],
      ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
          result = "";
          break;
        case "psychic":
          result = "";
          break;
        case "rock":
          result = "#e0c068";
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
  },
  async created() {
    const promises1 = [];
    const promises2 = [];
    this.ids.forEach((id) => {
      const url1 = `https://pokeapi.co/api/v2/pokemon/${id}/`;
      const url2 = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
      promises1.push(fetch(url1).then((res) => res.json()));
      promises2.push(fetch(url2).then((res) => res.json()));
    });

    Promise.all(promises1).then((results) => {
      Promise.all(promises2).then((res) => {
        console.log(res);
        results.map((r, index) => {
          return (r.description =
            res[index].flavor_text_entries[0].flavor_text);
        });
        console.log(results);
        this.pokemons = results;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.cont-fluid {
  margin-top: 3.5rem;
  .row {
    width: 100%;
    .card {
      margin-bottom: 5rem;
      .card-container {
        border-radius: 1rem;
        position: relative;
        background: whitesmoke;

        margin-left: 3rem;
        margin-right: 3rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          position: absolute;
          width: 127%;
          height: auto;
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
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
            align-items: center;
            justify-content: space-around;
            margin-top: 1rem;
            width: 100%;
            .tag {
              width: 45%;
              color: whitesmoke;
              font-size: 1rem;
              font-weight: 400;
              padding: 0.5rem;
              border-radius: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
