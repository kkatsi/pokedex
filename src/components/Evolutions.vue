<template>
  <div class="evolutions container">
    <h4 class="title">Evolutions</h4>
    <div class="row">
      <div
        class="evol-col col-12 col-md-4"
        v-for="(evolution, i) in pokemonEvolutions"
        :key="i"
      >
        <div
          class="pokemon-container"
          v-for="(pok, index) in evolution"
          :key="index"
        >
          <div class="arrow-container" v-show="i !== 0 && windowWidth > 750">
            <div class="level-evolving">
              <span class="evolves_at">Evolves at level</span>
              <span class="evolution-level">{{
                evolutionChain[i][index].min_level
              }}</span>
            </div>

            <img src="../assets/Images/right-arrow.png" alt="" />
          </div>
          <img
            :src="pok.sprites.other['official-artwork'].front_default"
            alt=""
          />
          <span
            class="name"
            :style="{
              color: findColor(pok.types[0].type.name),
              textShadow: `0 0 0.5em ${findColor(pok.types[0].type.name)}`,
            }"
            >{{ pok.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonEvolutions: [],
      windowWidth: window.innerWidth,
      evolutionChain: [],
    };
  },
  props: {
    // color: String,
    findColor: Function,
    pokemon: Object,
  },
  methods: {
    async getEvolutionChain() {
      const res = await fetch(this.pokemon.speciesDetails.evolution_chain.url);
      const json = await res.json();
      return json.chain;
    },
    getPokemon(pokemon) {
      console.log(pokemon);
      return new Promise(async (resolve, reject) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
        );
        const json = await res.json();
        json.evolution_number = pokemon.evolution_number;
        resolve(json);
      });
    },
    getSimpleEvoChain(chain) {
      // console.log(chain);
      const evoChain = [];
      let evoData = chain;
      let index = 0;

      do {
        let numberOfEvolutions = evoData["evolves_to"].length;
        const evoDetails = evoData.evolution_details[0];
        index += 1;

        evoChain.push({
          evolution_number: index,
          // name:
          //   evoData.species.name === "wormadam"
          //     ? "wormadam-plant"
          //     : evoData.species.name,
          id: evoData.species.url.split("/")[
            evoData.species.url.split("/").length - 2
          ],
          min_level: !evoDetails ? null : evoDetails.min_level,
          gender: !evoDetails ? null : evoDetails.gender,
          held_item: !evoDetails ? null : evoDetails.held_item,
          item: !evoDetails ? null : evoDetails.item,
          known_move: !evoDetails ? null : evoDetails.known_move,
          known_move_type: !evoDetails ? null : evoDetails.known_move_type,
          location: !evoDetails ? null : evoDetails.location,
          min_affection: !evoDetails ? null : evoDetails.min_affection,
          min_beauty: !evoDetails ? null : evoDetails.min_beauty,
          min_happiness: !evoDetails ? null : evoDetails.min_happines,
          needs_overworld_rain: !evoDetails
            ? null
            : evoDetails.needs_overworld_rain,
          party_species: !evoDetails ? null : evoDetails.party_species,
          party_type: !evoDetails ? null : evoDetails.party_type,
          relative_physical_stats: !evoDetails
            ? null
            : evoDetails.relative_physical_stats,
          time_of_day: !evoDetails ? null : evoDetails.time_of_day,
          trade_species: !evoDetails ? null : evoDetails.trade_species,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoDetails ? null : evoDetails.item,
        });
        if (numberOfEvolutions > 1) {
          for (let i = 0; i < numberOfEvolutions; i++) {
            evoChain.push({
              evolution_number: index + 1,
              // name:
              //   evoData.evolves_to[i].species.name === "wormadam"
              //     ? "wormadam-plant"
              //     : evoData.evolves_to[i].species.name,
              id: evoData.evolves_to[i].species.url.split("/")[
                evoData.evolves_to[i].species.url.split("/").length - 2
              ],
              min_level: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].min_level,
              gender: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].gender,
              held_item: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].held_item,
              item: !evoData.evolves_to[i] ? null : evoData.evolves_to[i].item,
              known_move: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].known_move,
              known_move_type: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].known_move_type,
              location: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].location,
              min_affection: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].min_affection,
              min_beauty: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].min_beauty,
              min_happiness: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].min_happines,
              needs_overworld_rain: !evoData.evolves_to[i]
                ? false
                : evoData.evolves_to[i].evolution_details[0]
                    .needs_overworld_rain,
              party_species: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].party_species,
              party_type: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].party_type,
              relative_physical_stats: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0]
                    .relative_physical_stats,
              time_of_day: !evoData.evolves_to[i]
                ? ""
                : evoData.evolves_to[i].time_of_day,
              trade_species: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].trade_species,
              trigger_name: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].trigger.name,
              item: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].item,
            });
          }
          let y = 0;
          while (
            y < evoData.evolves_to.length &&
            evoData.evolves_to[y].evolves_to.length > 0
          ) {
            // console.log(y);
            const tempData = evoData.evolves_to[y].evolves_to[0];
            // console.log(tempData);
            const tempDetails = tempData?.evolution_details[0];
            evoChain.push({
              evolution_number: index + 2,
              // name:
              //   tempData.species.name === "wormadam"
              //     ? "wormadam-plant"
              //     : tempData.species.name,
              id: tempData.species.url.split("/")[
                tempData.species.url.split("/").length - 2
              ],
              min_level: !tempDetails ? null : tempDetails.min_level,
              gender: !tempDetails ? null : tempDetails.gender,
              held_item: !tempDetails ? null : tempDetails.held_item,
              item: !tempDetails ? null : tempDetails.item,
              known_move: !tempDetails ? null : tempDetails.known_move,
              known_move_type: !tempDetails
                ? null
                : tempDetails.known_move_type,
              location: !tempDetails ? null : tempDetails.location,
              min_affection: !tempDetails ? null : tempDetails.min_affection,
              min_beauty: !tempDetails ? null : tempDetails.min_beauty,
              min_happiness: !tempDetails ? null : tempDetails.min_happines,
              needs_overworld_rain: !tempDetails
                ? null
                : tempDetails.needs_overworld_rain,
              party_species: !tempDetails ? null : tempDetails.party_species,
              party_type: !tempDetails ? null : tempDetails.party_type,
              relative_physical_stats: !tempDetails
                ? null
                : tempDetails.relative_physical_stats,
              time_of_day: !tempDetails ? null : tempDetails.time_of_day,
              trade_species: !tempDetails ? null : tempDetails.trade_species,
              trigger_name: !tempDetails ? null : tempDetails.trigger.name,
              item: !tempDetails ? null : tempDetails.item,
            });
            y += 1;
          }
          evoData = evoData.evolves_to.evolves_to;
        } else evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      return evoChain;
    },
  },
  async mounted() {
    const evolution_chain = await this.getEvolutionChain();
    console.log(evolution_chain);

    const simple_evolution_chain = this.getSimpleEvoChain(evolution_chain);
    // console.log(simple_evolution_chain);

    // const tmp = pokemonEvolutions.groupBy("evolution_number");

    const tmp = simple_evolution_chain.reduce(
      (groups, item) => ({
        ...groups,
        [item.evolution_number]: [
          ...(groups[item.evolution_number] || []),
          item,
        ],
      }),
      {}
    );

    const finalArray = [];

    for (const [key, value] of Object.entries(tmp)) {
      finalArray.push(value);
    }

    this.evolutionChain = finalArray;

    const pokemonEvolutions = await Promise.all(
      simple_evolution_chain.map(
        async (pokemon) => await this.getPokemon(pokemon)
      )
    );

    console.log(pokemonEvolutions);

    const poketemp = pokemonEvolutions.reduce(
      (groups, item) => ({
        ...groups,
        [item.evolution_number]: [
          ...(groups[item.evolution_number] || []),
          item,
        ],
      }),
      {}
    );

    const finalArraypokemon = [];

    for (const [key, value] of Object.entries(poketemp)) {
      finalArraypokemon.push(value);
    }

    console.log(finalArraypokemon);

    this.pokemonEvolutions = finalArraypokemon;
  },
};
</script>

<style lang="scss" scoped>
.evolutions {
  min-height: 500px;
  .title {
    font-size: 2rem;
    font-weight: 800;
  }
  .row {
    margin: 5rem 0;
    justify-content: center;
    .evol-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .pokemon-container {
      margin: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        max-width: 100%;
      }
      .name {
        font-size: 1.3rem;
        font-weight: bold;
        text-transform: capitalize;
      }
      .arrow-container {
        width: 32%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -35%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .arrow {
          font-size: 7rem;
        }
        .level-evolving {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .evolution-level {
            font-family: "Red Hat Mono", monospace !important;
            font-weight: 900;
            text-shadow: 0 0 0.8em cyan;
            background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }
}
</style>
