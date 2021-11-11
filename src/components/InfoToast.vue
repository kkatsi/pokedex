<template>
  <div class="info-container">
    <info-icon
      v-show="icon === 'info'"
      style="margin-left:.5rem"
      @click="
        Object.keys(ability).length
          ? openDetails(refValue, ability.ability.name)
          : openDetails(refValue)
      "
    >
    </info-icon>
    <eye-off-icon
      v-show="icon === 'eye'"
      v-if="ability.is_hidden || false"
      style="margin-left:.5rem"
      @click="openDetails(`hidden`)"
    ></eye-off-icon>
    <div
      :class="{
        'description-container': icon === 'info',
        'hidden-container': icon === 'eye',
      }"
      :ref="refValue"
    >
      <div class="text">
        <button
          class="close-button"
          @click="openDetails(refValue)"
          aria-label="close-button"
        >
          <x-icon></x-icon>
        </button>
        {{ abilityDescription.short_effect || text }}
      </div>
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
  data() {
    return {
      abilityDescription: {},
      prevRefName: "",
    };
  },
  props: {
    ability: Object,
    icon: String,
    refValue: String,
    text: String,
  },
  components: {
    EyeOffIcon,
    InfoIcon,
    XIcon,
  },
  methods: {
    async openDetails(refName, ability) {
      if (this.prevRefName === refName) {
        const description_container = this.$refs[refName];
        description_container.classList.remove("active");
        this.prevRefName = "random";
        return;
      }
      document
        .querySelectorAll(".description-container, .hidden-container")
        .forEach((el) => {
          if (el.classList.contains("active")) el.classList.remove("active");
        });

      if (!ability) {
        const description_container = this.$refs[refName];
        description_container.classList.toggle("active");
        this.prevRefName = refName;
        return;
      }
      if (
        Object.keys(this.abilityDescription).length === 0 ||
        this.prevRefName !== refName
      ) {
        const res = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`);
        const json = await res.json();
        const abilityDescription = json.effect_entries.filter(
          (entry) => entry.language.name === "en"
        )[0];
        // console.log(abilityDescription);
        this.abilityDescription = abilityDescription;
      }
      const description_container = this.$refs[refName];
      description_container.classList.toggle("active");
      this.prevRefName = refName;
    },
  },
};
</script>

<style lang="scss" scoped>
.info-container,
.eye-container {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  //   font-size: 1.5rem;
  .description-container,
  .hidden-container {
    background-color: white;
    position: absolute;
    width: 200px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 6px 3px rgba(0, 0, 0, 0.23);
    border-radius: 5px;
    font-size: 0.9rem;
    opacity: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s ease;
    visibility: hidden;
    z-index: -1;
    .text {
      position: relative;
      padding: 15px;
      color: initial;
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
        top: 0px;
        right: 0px;
        padding: 5px;
        cursor: pointer;
      }
    }
    &.active {
      bottom: 150%;
      opacity: 1;
      visibility: initial;
      z-index: 1;
    }
  }
}
</style>
