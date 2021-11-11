<template>
  <div class="evolutions">
    <h4 class="title">Evolutions</h4>
  </div>
</template>

<script>
export default {
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
  },
  async mounted() {
    const evolution_chain = await this.getEvolutionChain();
    console.log(evolution_chain);
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
