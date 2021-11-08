<template>
  <section
    class="stats"
    :style="{ backgroundColor: findColor(pokemon.types[0].type.name) }"
  >
    <div class="custom-shape-divider-top-1636288897">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
    <div class="inner-section cont-lg">
      <h2 class="title">Base Stats</h2>
      <div class="bars-container">
        <div class="bar" :key="index" v-for="(stat, index) in pokemon.stats">
          <span class="name col-sm-3 col-12">{{
            stat.stat.name.replace("-", " ")
          }}</span>
          <span
            :ref="`val${index}`"
            :class="{ value: true, 'col-12': true, 'col-sm-1': true }"
            >{{ stat.base_stat }}</span
          >
          <div class="metric col-12 col-sm-8">
            <div
              class="percentage"
              :ref="`perc${index}`"
              :style="{
                width: calcPercentage(stat.base_stat) + '%',
                boxShadow: `0 0 15px 2px ${findBoxColor(stat.base_stat)}`,
              }"
              v-if="index === 0"
            ></div>
            <div
              class="percentage"
              :ref="`perc${index}`"
              :style="{
                width: calcPercentage(stat.base_stat) + '%',
                boxShadow: `0 0 15px 2px ${findBoxColor(stat.base_stat)}`,
              }"
              v-else-if="index === 1"
            ></div>
            <div
              class="percentage"
              :ref="`perc${index}`"
              :style="{
                width: calcPercentage(stat.base_stat) + '%',
                boxShadow: `0 0 15px 2px ${findBoxColor(stat.base_stat)}`,
              }"
              v-else-if="index === 2"
            ></div>
            <div
              class="percentage"
              :ref="`perc${index}`"
              :style="{
                width: calcPercentage(stat.base_stat) + '%',
                boxShadow: `0 0 15px 2px ${findBoxColor(stat.base_stat)}`,
              }"
              v-else-if="index === 3"
            ></div>
            <div
              class="percentage"
              :ref="`perc${index}`"
              :style="{
                width: calcPercentage(stat.base_stat) + '%',
                boxShadow: `0 0 15px 2px ${findBoxColor(stat.base_stat)}`,
              }"
              v-else-if="index === 4"
            ></div>
            <div
              class="percentage"
              :ref="`perc${index}`"
              :style="{
                width: calcPercentage(stat.base_stat) + '%',
                boxShadow: `0 0 15px 2px ${findBoxColor(stat.base_stat)}`,
              }"
              v-else-if="index === 5"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
let flag;

export default {
  props: {
    findColor: Function,
    pokemon: Object,
  },
  mounted() {
    this.$nextTick(() => {
      const widths = [];
      const values = [];
      flag = true;
      //trying to animated stat widths of bars;
      //getting all width values and reseting them to 0;
      //getting all number values;
      for (let i = 0; i < 6; i++) {
        widths.push(this.$refs[`perc${i}`].style.getPropertyValue("width"));
        this.$refs[`perc${i}`].style.setProperty("width", "0%");
        values.push(Number(this.$refs[`val${i}`].innerText));
      }
      //on specific scroll position give them the proper widths again
      //and animating number values from 0 to the stat value
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 425 && flag) {
          for (let i = 0; i < 6; i++) {
            //return if null
            if (!this.$refs[`perc${i}`]) {
              return;
            }
            this.$refs[`perc${i}`].style.width = widths[i];
            this.animateValue(i, 0, values[i], 1500);
            //change flag to execute only once
            if (flag) flag = false;
          }
        }
      });
    });
  },
  //   beforeDestroy() {
  //     window.removeEventListener("scroll", () => {
  //       if (window.scrollY >= 425 && flag) {
  //         document
  //           .querySelectorAll(".metric .percentage")
  //           .forEach((el, index) => {
  //             el.style.width = widths[index];
  //             this.animateValue(index, 0, values[index], 1500);
  //           });
  //         flag = false;
  //       }
  //     });
  //   },
  methods: {
    findBoxColor(number) {
      if (number < 60) return "red";
      if (number < 90) return "orange";
      if (number < 120) return "green";
      if (number <= 255) return "cyan";
    },
    calcPercentage(number) {
      return (number * 100) / 255;
    },
    animateValue(id, start, end, duration) {
      if (start === end) return;
      var range = end - start;
      var current = start;
      var increment = end > start ? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));
      //   var obj = document.querySelectorAll(".bar .value")[id];
      var obj = this.$refs[`val${id}`];
      var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    },
    // calcAttackPercentage(number) {
    //   return (number * 100) / 190;
    // },
    // calcDefencePercentage(number) {
    //   return (number * 100) / 230;
    // },
    // calcSpAttackPercentage(number) {
    //   return (number * 100) / 194;
    // },
    // calcSpDefencePercentage(number) {
    //   return (number * 100) / 230;
    // },
    // calcSpeedPercentage(number) {
    //   return (number * 100) / 180;
    // },
  },
};
</script>

<style lang="scss" scoped>
.custom-shape-divider-top-1636288897 {
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1636288897 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 47px;
}

.custom-shape-divider-top-1636288897 .shape-fill {
  fill: #ffffff;
}
.stats {
  padding-bottom: 3rem;
  color: white;
  //   background-color: rgb(248, 208, 48);
  .inner-section {
    padding: 0 0.3rem;
  }
  .title {
    font-size: 2rem;
    font-weight: 800;
  }
  .bars-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 700px;
    text-align: center;
    margin: auto;
    width: 100%;
    .bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.8rem;
      width: 100%;
      .name {
        text-transform: capitalize;
        font-weight: 500;
        text-align: left;
      }

      .value {
        font-family: "Red Hat Mono", monospace !important;
        font-weight: 800;
        font-size: 1.1rem;
      }
      .metric {
        height: 12px;
        background-color: rgba(255, 255, 255, 0.452);
        border-radius: 100000px;
        position: relative;
        .percentage {
          content: "";
          //   width: 40%;
          height: 100%;
          width: 0%;
          position: absolute;
          background-color: white;
          //   box-shadow: 0 0 15px 2px cyan;
          border-radius: 0.5rem;
          left: 0;
          top: 0;
          transition: all 1.5s;
        }
      }
    }
  }
}
@media (max-width: 575px) {
  .bar {
    margin-bottom: 1rem !important;
    .name {
      text-align: center !important;
    }
    .value {
      margin-bottom: 0.5rem !important;
    }
  }
  .inner-section {
    padding: 0 1rem !important;
  }
}
</style>
