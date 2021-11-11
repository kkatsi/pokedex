<template>
  <div class="evolutions">
    <h4 class="title">Evolutions</h4>
    <span v-for="evolution in pokemonEvolutions" :key="evolution.id">
      {{ evolution.name }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonEvolutions: [],
    };
  },
  props: {
    // color: String,
    pokemon: Object,
  },
  methods: {
    async getEvolutionChain() {
      const res = await fetch(this.pokemon.speciesDetails.evolution_chain.url);
      const json = await res.json();
      return json.chain;
    },
    getPokemon(pokemon) {
      return new Promise(async (resolve, reject) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const json = await res.json();
        resolve(json);
      });
    },
    getSimpleEvoChain(chain) {
      console.log(chain);
      const evoChain = [];
      let evoData = chain;

      do {
        let numberOfEvolutions = evoData["evolves_to"].length;
        const evoDetails = evoData.evolution_details[0];

        evoChain.push({
          name:
            evoData.species.name === "wormadam"
              ? "wormadam-plant"
              : evoData.species.name,
          min_level: !evoDetails ? 1 : evoDetails.min_level,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoDetails ? null : evoDetails.item,
        });

        if (numberOfEvolutions > 1) {
          for (let i = 1; i < numberOfEvolutions; i++) {
            evoChain.push({
              name:
                evoData.evolves_to[i].species.name === "wormadam"
                  ? "wormadam-plant"
                  : evoData.evolves_to[i].species.name,
              min_level: !evoData.evolves_to[i]
                ? 1
                : evoData.evolves_to[i].min_level,
              trigger_name: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].trigger.name,
              item: !evoData.evolves_to[i]
                ? null
                : evoData.evolves_to[i].evolution_details[0].item,
            });
          }
        }

        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      return evoChain;
    },
  },
  async mounted() {
    const evolution_chain = await this.getEvolutionChain();
    console.log(evolution_chain);

    const simple_evolution_chain = this.getSimpleEvoChain(evolution_chain);
    console.log(simple_evolution_chain);

    const pokemonEvolutions = await Promise.all(
      simple_evolution_chain.map(
        async (pokemon) => await this.getPokemon(pokemon)
      )
    );

    this.pokemonEvolutions = pokemonEvolutions;
  },
};
</script>

<style lang="scss" scoped>
.evolutions {
  min-height: 500px;
  .title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0 !important;
  }
}
</style>
