<template>
  <div class="pokemon-basic-info">
    <span class="id">{{ pokemon.id }}</span>
    <h1 class="name">{{ pokemon.name }}</h1>
    <div class="row">
      <div class="col-4 height">
        <label for="height">Height</label>
        <span name="height">{{ toMeter(pokemon.height) }} m</span>
      </div>
      <div class="col-4 weight">
        <label for="weight">Weight</label>
        <span name="weight">{{ toKilos(pokemon.weight) }} kg</span>
      </div>
      <div class="col-4 species">
        <label for="species">Species</label>
        <span name="species">{{
          pokemon.speciesDetails.genera.filter(
            (gen) => gen.language.name === "en"
          )[0].genus
        }}</span>
      </div>
      <div class="col-12 abilities">
        <label for="abilities">Abilities</label>
        <div class="abilities-container">
          <div
            :key="index"
            v-for="(ability, index) in pokemon.abilities"
            class="ability-container"
          >
            <span :class="{ hidden: ability.is_hidden, ability: true }">
              {{ ability.ability.name.replace("-", " ") }}
            </span>
            <eye-off-icon
              v-if="ability.is_hidden"
              style="margin-left:.5rem"
            ></eye-off-icon>
            <div class="icon-container">
              <info-icon style="margin-left:.5rem" @click="openDetails">
              </info-icon>
              <div class="description-container" ref="desc">
                <div class="text">
                  <button
                    class="close-button"
                    @click="openDetails"
                    aria-label="close-button"
                  >
                    <x-icon></x-icon>
                  </button>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  culpa voluptatem itaque reprehenderit libero minima ab hic
                  earum cum illum?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
</template>

<script>
import { EyeOffIcon, InfoIcon, XIcon } from "vue-feather-icons";
import featCompt from "../lib/feather";

featCompt(EyeOffIcon);
featCompt(InfoIcon);
featCompt(XIcon);

export default {
  components: {
    EyeOffIcon,
    InfoIcon,
    XIcon,
  },
  props: {
    pokemon: Object,
    findColor: Function,
  },
  methods: {
    openDetails() {
      console.log("open");
      const description_container = this.$refs.desc;
      description_container.classList.toggle("active");
    },
    toMeter(number) {
      return number / 10;
    },
    toKilos(number) {
      return number / 10;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Mono:wght@300;400;500;600;700&display=swap");
.pokemon-basic-info {
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 550px;
  opacity: 0;
  margin-top: 380px;
  background-color: whitesmoke;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 1rem 0;
  .id {
    font-weight: 700;
    font-size: 1.2rem;
    color: rgb(97, 97, 97);
  }
  .name {
    font-weight: 800;
    font-size: 2.5rem;
    text-transform: capitalize;
  }
  .row {
    justify-content: space-between;
    width: 100%;
    .height,
    .weight,
    .species,
    .abilities {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.1rem;

      label {
        font-size: 1.2rem;
        font-weight: 800;
      }
      span {
        font-family: "Red Hat Mono", monospace !important;
        font-weight: 700;
        color: rgb(145, 145, 145);
        &.hidden {
          background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .abilities-container {
        display: flex;
        flex-direction: column;
        .ability-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.3rem;
          .ability {
            text-transform: capitalize;
          }
          .icon-container {
            position: relative;
            .description-container {
              background-color: white;
              position: absolute;
              width: 300px;
              box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19),
                0 6px 3px rgba(0, 0, 0, 0.23);
              border-radius: 5px;
              font-size: 0.9rem;
              opacity: 0;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              transition: all 0.5s ease;
              visibility: hidden;
              .text {
                position: relative;
                padding: 20px;

                &:after {
                  content: "▼";
                  width: 5px;
                  height: 5px;
                  position: absolute;
                  top: calc(100% - 5px);
                  left: 50%;
                  transform: translateX(-50%);
                  color: white;
                }
                .close-button {
                  all: initial;
                  position: absolute;
                  color: grey;
                  top: 5px;
                  right: 5px;
                  padding: 5px;
                  cursor: pointer;
                }
              }
              &.active {
                bottom: 150%;
                opacity: 1;
                visibility: initial;
              }
            }
          }
        }
      }
    }
    .abilities {
      margin-top: 0.8rem;
    }
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
      font-weight: 900;
      padding: 0.5rem;
      border-radius: 0.5rem;
      text-transform: capitalize;
    }
  }
}
@media (max-width: 550px) {
  .pokemon-basic-info {
    margin-top: 250px;
    width: auto;
    background-color: transparent;
    box-shadow: none;
  }
}
</style>
