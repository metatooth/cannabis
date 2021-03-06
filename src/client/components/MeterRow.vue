<template>
  <tr>
    <td class="has-text-centered">
      <div class="tags has-addons">
        <span class="tag has-background-dark" :class="meterClass">
          <font-awesome-icon icon="tachometer-alt" />
        </span>
        <span class="tag has-text-light has-background-dark">
          {{ meterReadingTemperature.toFixed(1) }} {{ unitsWithDegrees }}
        </span>
        <span class="tag has-text-light has-background-dark">
          {{ meterReadingHumidity.toFixed(0) }} %
        </span>
      </div>
    </td>
    <td>
      <a @click="editable" v-if="!editing">
        <span v-if="meter.nickname">{{ meter.nickname }}</span>
        <span v-else>click to name</span>
      </a>
      <div class="field is-grouped" v-else>
        <div class="control">
          <input
            class="input is-small"
            type="text"
            v-model="nickname"
            @keyup.esc="cancel"
          />
        </div>
        <div class="control">
          <button class="button is-small is-primary" @click="save">
            <font-awesome-icon icon="check" />
          </button>
        </div>
        <div class="control">
          <button class="button is-small is-danger" @click="cancel">
            <font-awesome-icon icon="times" />
          </button>
        </div>
      </div>
    </td>
    <td>
      <timestamp :timestamp="new Date(Date.parse(meter.timestamp))" />
    </td>
    <td>
      <router-link
        :to="{
          name: 'readings',
          params: { name: meter.nickname, device: meter.device }
        }"
      >
        &gt;&gt;&gt;
      </router-link>
    </td>
    <td>
      {{ meter.device }}
    </td>
    <td>
      <div class="control">
        <button class="button is-small is-danger" @click="trash">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { Meter } from "@/store/meters/types";
import { Notification } from "@/store/notifications/types";
import { celsius2fahrenheit, celsius2kelvin } from "../../shared/utils";
import Timestamp from "@/components/Timestamp.vue";

const MeterRow = Vue.extend({
  props: {
    meter: Meter,
    units: String
  },

  data() {
    return {
      nickname: this.meter.nickname,
      updating: false,
      editing: false
    };
  },

  components: {
    Timestamp
  },

  watch: {
    meter() {
      this.updating = false;
    }
  },

  computed: {
    meterClass(): string {
      const found = this.notifications.find((n: Notification) => {
        return n.id === this.meter.device;
      });
      if (found) {
        return "has-text-danger";
      }

      return "has-text-success";
    },
    meterReadingHumidity(): number {
      return 100 * this.meter.humidity;
    },
    meterReadingTemperature(): number {
      if (this.units === "C") {
        return this.meter.temperature;
      } else if (this.units === "F") {
        return celsius2fahrenheit(this.meter.temperature);
      }
      return celsius2kelvin(this.meter.temperature);
    },
    unitsWithDegrees(): string {
      return "°" + this.units;
    },

    ...mapState("notifications", ["notifications"])
  },

  methods: {
    editable(): void {
      this.editing = true;
    },

    save(): void {
      this.edit({
        ...this.meter,
        nickname: this.nickname
      });
      this.editing = false;
    },

    saveMeterType(metertype: string): void {
      this.edit({
        ...this.meter,
        metertype: metertype
      });
    },

    cancel() {
      this.nickname = this.meter.nickname;
      this.editing = false;
    },

    trash() {
      if (confirm("OK to remove?")) {
        this.remove(this.meter);
      }
    },

    ...mapActions("meters", ["edit", "remove"])
  }
});

export default MeterRow;
</script>
