<template>
  <section class="pokemon-basic-info">
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
          pokemon.speciesDetails?.genera.filter(
            (gen) => gen.language.name === "en"
          )[0].genus || "-"
        }}</span>
      </div>
      <div class="col-6 abilities">
        <label for="abilities">Abilities</label>
        <div class="abilities-container">
          <div
            :key="index"
            v-for="(ability, index) in pokemon.abilities"
            class="ability-container"
          >
            <span :class="{ hidden: ability.is_hidden, ability: true }">
              {{ !ability.is_hidden ? index + 1 + ". " : "" }}
              {{ ability.ability.name.replaceAll("-", " ") }}
            </span>
            <info-toast
              :ability="ability"
              icon="eye"
              refValue="hidden"
              text="Hidden Ability"
            >
            </info-toast>
            <info-toast
              :ability="ability"
              icon="info"
              :refValue="`desc${index}`"
              text=""
            >
            </info-toast>
          </div>
        </div>
      </div>
      <div class="col-6 gender">
        <label for="gender">Gender</label>
        <div name="gender-container">
          <span v-if="pokemon.speciesDetails?.gender_rate === -1"
            >Genderless</span
          >
          <div v-else class="gender-div">
            <div class="male-container">
              {{
                100 -
                  calcPercentageGender(pokemon.speciesDetails?.gender_rate) ||
                  "??"
              }}%<span class="male">♂</span>
            </div>
            <span v-show="windowWidth > 550">&nbsp;/&nbsp;</span>
            <div class="female-container">
              {{
                calcPercentageGender(pokemon.speciesDetails?.gender_rate) ||
                  "??"
              }}%<span class="female">♀</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 catch-rate">
        <label for="catch">Catch Rate</label>
        <div class="catch-container">
          <span name="catch"
            >{{
              calcPercentageCatchRate(
                pokemon.speciesDetails?.capture_rate,
                pokemon.stats.filter((stat) => stat.stat.name === "hp")[0]
                  .base_stat
              )
            }}%</span
          >
          <info-toast
            :refValue="`info`"
            :ability="{}"
            icon="info"
            text="Chance of capturing the pokemon with Poke Ball, full HP."
          ></info-toast>
        </div>
      </div>
      <div class="col-6 level-rate">
        <label for="level">Levelling Rate</label>
        <span name="level" class="level">{{
          pokemon.speciesDetails?.growth_rate.name.replaceAll("-", " ") || "??"
        }}</span>
      </div>
      <div class="col-12 types">
        <label for="tag">
          Types
        </label>
        <div class="label-container">
          <span
            :key="type.slot"
            v-for="type in pokemon.types"
            name="tag"
            class="tag"
            :style="{ background: findColor(type.type.name) }"
          >
            {{ type.type.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InfoToast from "./InfoToast.vue";

export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  components: {
    // EyeOffIcon,
    // InfoIcon,
    // XIcon,
    InfoToast,
  },
  props: {
    pokemon: Object,
    findColor: Function,
  },
  methods: {
    toMeter(number) {
      return number / 10;
    },
    toKilos(number) {
      return number / 10;
    },
    calcPercentageGender(number) {
      return (number / 8) * 100;
    },
    calcPercentageCatchRate(number, baseHP) {
      if (!number) return "??";
      return (
        ((1 + (baseHP * 3 - baseHP * 2) * number * 1 * 1) /
          (baseHP * 3) /
          256) *
        100
      ).toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-basic-info {
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  opacity: 1;
  margin-top: 380px;
  margin-bottom: 3rem;
  //   background-color: whitesmoke;
  //   border-radius: 1rem;
  //   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  //   padding: 1rem 0;
  svg {
    cursor: pointer;
  }
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
    .abilities,
    .gender,
    .types,
    .catch-rate,
    .level-rate {
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
        &.level {
          text-transform: capitalize;
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
        }
      }

      .gender-div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Red Hat Mono", monospace !important;
        font-weight: 700;
        color: rgb(145, 145, 145);
        .male-container,
        .female-container {
          font-family: "Red Hat Mono", monospace !important;
          .male,
          .female {
            font-size: 1.5rem;
            margin-left: 0.5rem;
            font-weight: 900;
          }
          .male {
            color: blue;
          }
          .female {
            color: palevioletred;
          }
        }
      }
    }
    .catch-rate {
      .catch-container {
        display: flex;
        align-items: center;
        justify-content: center;
        // .info-container {
        //   position: relative;
        //   .description-container,
        //   .hidden-container {
        //     background-color: white;
        //     position: absolute;
        //     width: 200px;
        //     box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19),
        //       0 6px 3px rgba(0, 0, 0, 0.23);
        //     border-radius: 5px;
        //     font-size: 0.9rem;
        //     opacity: 0;
        //     bottom: 0;
        //     left: 50%;
        //     transform: translateX(-50%);
        //     transition: all 0.5s ease;
        //     visibility: hidden;
        //     z-index: -1;
        //     .text {
        //       position: relative;
        //       padding: 15px;

        //       &:after {
        //         content: "▼";
        //         width: 5px;
        //         height: 5px;
        //         position: absolute;
        //         top: calc(100% - 5px);
        //         left: 50%;
        //         transform: translateX(-50%);
        //         color: white;
        //       }
        //       .close-button {
        //         all: initial;
        //         position: absolute;
        //         color: grey;
        //         top: 0px;
        //         right: 0px;
        //         padding: 5px;
        //         cursor: pointer;
        //       }
        //     }
        //     &.active {
        //       bottom: 150%;
        //       opacity: 1;
        //       visibility: initial;
        //       z-index: 1;
        //     }
        //   }
        // }
      }
    }
    .types {
      .label-container {
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
    .abilities,
    .gender,
    .catch-rate,
    .level-rate,
    .types {
      margin-top: 2rem;
    }
  }
}
@media (max-width: 550px) {
  .pokemon-basic-info {
    margin-top: 350px !important;
    width: auto;
    background-color: transparent;
    box-shadow: none;
  }
  .gender-div {
    flex-direction: column;
  }
}
</style>
