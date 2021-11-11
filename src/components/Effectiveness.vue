<template>
  <section class="effectiveness container">
    <h2 class="title">Effectiveness</h2>
    <p style="margin-top:0">
      The effectiveness of each move type on
      <span
        class="pokemon-name"
        :style="{
          color: findColor(pokemon.types[0].type.name),
          textShadow: `0 0 0.5em ${findColor(pokemon.types[0].type.name)}`,
        }"
        >{{ pokemon.name }}</span
      >
    </p>
    <div class="row">
      <div
        class="super-effective col-12 col-sm-6"
        v-show="types.fourx?.length > 0 || false"
      >
        <h4 class="title">
          <div class="text-container">
            <span>Super</span>
            <span>Effective</span>
          </div>
          <span class="multiplier fourx">
            4x
          </span>
        </h4>

        <span
          v-for="(type, index) in types.fourx"
          :key="index"
          class="tag"
          :style="{ background: findColor(type.name) }"
        >
          {{ type.name }}
        </span>
      </div>
      <div
        class="super-effective col-12 col-sm-6"
        v-show="types.twox?.length > 0 || false"
      >
        <h4 class="title">
          <div class="text-container">
            <span>Super</span>
            <span>Effective</span>
          </div>
          <span class="multiplier twox">
            2x
          </span>
        </h4>
        <span
          v-for="(type, index) in types.twox"
          :key="index"
          class="tag"
          :style="{ background: findColor(type.name) }"
        >
          {{ type.name }}
        </span>
      </div>
      <div
        class="not-effective col-12 col-sm-6"
        v-show="types.halfx?.length > 0 || false"
      >
        <h4 class="title">
          <div class="text-container">
            <span>Not very</span>
            <span>Effective</span>
          </div>
          <span class="multiplier halfx">
            1/2x
          </span>
        </h4>
        <span
          v-for="(type, index) in types.halfx"
          :key="index"
          class="tag"
          :style="{ background: findColor(type.name) }"
        >
          {{ type.name }}
        </span>
      </div>
      <div
        class="not-effective col-12 col-sm-6"
        v-show="types.quarterx?.length > 0 || false"
      >
        <h4 class="title">
          <div class="text-container">
            <span>Not very</span>
            <span>Effective</span>
          </div>
          <span class="multiplier quarterx">
            1/4x
          </span>
        </h4>
        <span
          v-for="(type, index) in types.quarterx"
          :key="index"
          class="tag"
          :style="{ background: findColor(type.name) }"
        >
          {{ type.name }}
        </span>
      </div>
      <div
        class="zero col-12 col-sm-6"
        v-show="types.zerox?.length > 0 || false"
      >
        <h4 class="title">
          <div class="text-container">
            <span>No</span>
            <span>Effect</span>
          </div>
          <span class="multiplier zerox">
            0x
          </span>
        </h4>
        <span
          v-for="(type, index) in types.zerox"
          :key="index"
          class="tag"
          :style="{ background: findColor(type.name) }"
        >
          {{ type.name }}
        </span>
      </div>
    </div>
    <small style="font-style:italic">All the other types are 1x</small>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // temp: [],
      types: {},
    };
  },
  props: {
    pokemon: Object,
    findColor: Function,
  },
  methods: {
    getEffectiveness(type) {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const json = await res.json();
        resolve(json.damage_relations);
      });
    },
  },
  async mounted() {
    const temp = await Promise.all(
      this.pokemon.types.map((type) => this.getEffectiveness(type.type.name))
    );

    let doubleDMG = [];
    let halfDMG = [];

    let zeroDMG = [];
    temp.forEach((item) => {
      doubleDMG.push(...item.double_damage_from);
      zeroDMG.push(...item.no_damage_from);
      halfDMG.push(...item.half_damage_from);
    });

    // console.log(doubleDMG, zeroDMG, halfDMG);

    const fourx = doubleDMG
      .map((e) => e["name"])
      .map((e, i, final) => final.indexOf(e) !== i && i)
      .filter((obj) => doubleDMG[obj])
      .map((e) => doubleDMG[e]);

    doubleDMG = doubleDMG.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );

    const twox = doubleDMG.filter((item, index) => {
      return fourx.every((f) => {
        return f.name !== item.name;
      });
    });

    zeroDMG = zeroDMG.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
    const zerox = zeroDMG;
    const quarterx = halfDMG
      .map((e) => e["name"])
      .map((e, i, final) => final.indexOf(e) !== i && i)
      .filter((obj) => halfDMG[obj])
      .map((e) => halfDMG[e]);

    halfDMG = halfDMG.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );

    const halfx = halfDMG
      .filter((item, index) => {
        return quarterx.every((f) => {
          return f.name !== item.name;
        });
      })
      .filter((x) => {
        return zerox.every((z) => {
          return z.name !== x.name;
        });
      });

    console.log(halfx, zerox);

    this.types = {
      fourx: fourx,
      twox: twox,
      zerox: zerox,
      halfx: halfx,
      quarterx: quarterx,
    };
    // console.log(this.types);
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap");
.effectiveness {
  color: initial;
  padding-bottom: 3rem;
  background-color: whitesmoke;
  .title {
    font-size: 2rem;
    font-weight: 800;
    margin-top: 0 !important;
    padding-top: 2rem;
    margin-bottom: 0 !important;
  }
  .pokemon-name {
    font-weight: bolder;
    font-size: 1.1rem;
    text-transform: capitalize;
    // background: linear-gradient(to right, #719c9c 0%, #131116 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .row {
    justify-content: center;
    max-width: 700px;
    margin: auto;
    .col-12 {
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem !important;
        .text-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          span {
            font-family: "Yuji Boku", serif !important;
            font-size: 2rem;
            &:last-child {
              line-height: -10px;
            }
          }
        }
        .multiplier {
          font-size: 3rem;
          font-weight: 900;
          font-family: "Red Hat Mono", monospace !important;
          &.fourx {
            text-shadow: 0 0 0.8em cyan;
            background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          &.twox {
            text-shadow: 0 0 0.8em green;
            background: linear-gradient(to right, #34dd3d 0%, #013518 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          &.halfx {
            font-size: 2.2rem;
            text-shadow: 0 0 0.8em orange;
            background: linear-gradient(to right, #d6bd4b 0%, #8d5001 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          &.quarterx {
            font-size: 2.2rem;
            text-shadow: 0 0 0.8em red;
            background: linear-gradient(to right, #dd5050 0%, #610202 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          &.zerox {
            text-shadow: 0 0 0.8em black;
            background: linear-gradient(to right, #615c5c 0%, #141010 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          // color: white;
        }

        // white-space: pre-line;
      }
      .tag {
        width: 80%;
        color: whitesmoke;
        font-size: 1rem;
        font-weight: 900;
        padding: 0.5rem;
        border-radius: 0.5rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
