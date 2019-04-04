<template>
  <div id="app" class="table-container">
    <business-hours
      v-for="(hours, day) in days"
      :key="day"
      name="business_hours"
      :day="day"
      :hours="hours"
      :times="times"
    ></business-hours>
  </div>
</template>

<script>
import axios from 'axios';
import days from '../data/days.js';
import times from '../data/times.js';

export default {
  data() {
    return {
      days: days,
      times: times
    };
  },
  created: function() {
    // this.getDays();
    // this.getTimes();
  },
  methods: {
    getDays: function() {
      axios.get().then(response => {
        this.days = response.data;
      });
    },
    getTimes: function() {
      axios.get().then(response => {
        if (Array.isArray(response.data) && response.data.length) {
          this.times = response.data;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.table-container {
  display: block;
  margin: 60px auto;
  width: 100%;
  max-width: 600px;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #3d4852;
}

.flex-table {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0.75em 0;
  height: 45px;
}

.flex-row {
  width: calc(100% / 6);
  padding-right: 7px;
}

.business-hours-container,
.row-container {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.remove {
  display: flex;
  justify-content: center;
  width: 50px;
}

label.vue-js-switch {
  margin-bottom: 0;
}

button.add-hours,
button.font-awesome-button {
  height: 30px;
  background-color: transparent;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.fa-times {
  color: #3d4852;
}

button.font-awesome-button {
  width: 30px;
  font-size: 24px;
}

button.add-hours {
  font-size: 14px;
  font-weight: bold;
}

.flex-row select {
  width: 96px;
}

.wp-link-color {
  color: #0085ba;

  &:hover {
    color: #008ec2;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
