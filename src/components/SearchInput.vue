<template>
  <div class="container">
    <div class="black-line"></div>
    <div class="input-container">
      <input
        v-model="value"
        type="text"
        ref="searchText"
        @keyup="handleChange"
        placeholder="Search for pokemon name or code..."
      />
      <button @click="search" class="icon">
        <search-icon></search-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { SearchIcon } from "vue-feather-icons";
import featCompt from "../lib/feather";

featCompt(SearchIcon);

export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.value);
    },
    handleChange(e) {
      var code = e.keyCode ? e.keyCode : e.which;
      if (code == 13) {
        this.search();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 10vh;
  position: relative;
  //   background: red;
  //   .black-line {
  //     position: absolute;
  //     left: 0;
  //     top: 50%;
  //     width: 100%;
  //     height: 1px;
  //     background: grey;
  //     transform: translateY(-50%);
  //     box-shadow: 0px -5px 10px #888, 0px 5px 10px maroon;
  //   }
  .input-container {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 5vh;
    width: 50%;
    max-width: 500px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    border-radius: 100000px;
    box-shadow: -1px -5px 12px #888, -1px 5px 12px #800000;
    overflow: hidden;
    .icon {
      background: #25348a;
      border: 0;
      cursor: pointer;
      width: 15%;
      color: white;
      height: 100%;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        transform: scale(1.3);
      }
    }
    input {
      background: whitesmoke;
      width: 85%;
      height: 100%;
      position: relative;
      border: 0;
      padding: 10px 30px;
      font-size: 1.3rem;
      font-weight: bold;

      &::placeholder {
        font-style: italic;
      }
      &:focus-visible {
        outline: 0;
      }
    }
  }
}
</style>
