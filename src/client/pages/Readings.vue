<template>
  <section class="section">
    <h2 class="title">{{ $route.params.name }} Meter Reading</h2>
    <h2 class="subtitle">{{ $route.params.meter }}</h2>

    <form class="control">
      Last&nbsp;
      <label for="year" class="radio">
        <input id="year" v-model="range" type="radio" value="year" />
        Year
      </label>
      &nbsp;
      <label for="month" class="radio">
        <input id="month" v-model="range" type="radio" value="month" />
        Month
      </label>
      &nbsp;
      <label for="week" class="radio">
        <input id="week" v-model="range" type="radio" value="week" />
        Week
      </label>
      &nbsp;
      <label for="day" class="radio">
        <input id="day" v-model="range" type="radio" value="day" />
        Day
      </label>
      &nbsp;
      <label for="hour" class="radio">
        <input id="hour" v-model="range" type="radio" value="hour" />
        Hour
      </label>
    </form>

    <div class="columns">
      <div class="column is-half">
        <temperature-chart id="tempchart" v-bind:data="temperatures" />
      </div>
      <div class="column is-half">
        <chart
          id="humiditychart"
          v-bind:data="humidities"
          title="Relative Humidity"
          label="Percent (%)"
          v-bind:suggestedMin="20"
          v-bind:suggestedMax="80"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <chart
          id="pressurechart"
          v-bind:data="pressures"
          title="Vapor Pressure Deficit"
          label="hectopascals (hPa)"
          v-bind:suggestedMin="0"
          v-bind:suggestedMax="3"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Chart from "@/components/Chart.vue";
import TemperatureChart from "@/components/TemperatureChart.vue";
import { convertToLocalTime } from "date-fns-timezone";

const Readings = Vue.extend({
  props: {
    name: { type: String, default: "" }
  },

  data() {
    return {
      range: "hour",
      temperatures: [] as { x: Date; y: number }[],
      humidities: [] as { x: Date; y: number }[],
      pressures: [] as { x: Date; y: number }[],
      units: "F"
    };
  },

  components: {
    Chart,
    TemperatureChart
  },

  mounted() {
    this.refresh();
  },

  watch: {
    range() {
      this.refresh();
    }
  },

  methods: {
    changeUnits(units: string) {
      this.units = units;
    },

    refresh() {
      const xhr = new XMLHttpRequest();
      const url = process.env.VUE_APP_API_URL || "http://localhost:5000";

      xhr.open(
        "GET",
        `${url}/readings/?meter=${this.$route.params.meter}&last=${this.range}`
      );

      xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        if (!data.error) {
          this.temperatures = [];
          this.humidities = [];
          const timeZone = "Etc/UTC";
          data.forEach(
            (d: {
              createdat: Date;
              temperature: number;
              humidity: number;
              pressure: number;
            }) => {
              const ts = convertToLocalTime(d.createdat, { timeZone });
              const temperature = {
                x: ts,
                y: d.temperature as number
              };
              const humidity = {
                x: ts,
                y: 100 * d.humidity
              };
              const pressure = {
                x: ts,
                y: d.pressure / 1000
              };

              this.temperatures.push(temperature);
              this.humidities.push(humidity);
              this.pressures.push(pressure);
            }
          );
        }
      };

      xhr.send();
    }
  }
});
export default Readings;
</script>