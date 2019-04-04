<template>
  <select :name="optionName" @change="timeSelected" v-model="selected">
    <option v-show="index == 0 && hours.length == 1" value>{{defaultText}}</option>
    <option v-show="index == 0" value="24hrs">24 hours</option>
    <option
      v-for="time in filteredTimes"
      :key="time"
      :value="time"
      :selected="time == selected"
    >{{ time | formatTime }}</option>
    <option v-show="showMidnightOption()" value="2400">Midnight</option>
  </select>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      selected: this.selectedTime
    };
  },
  props: {
    name: String,
    day: String,
    hours: Array,
    index: Number,
    times: Array,
    open: String,
    defaultText: String,
    selectedTime: String
  },
  watch: {
    selectedTime: function() {
      this.selected = this.selectedTime;
    }
  },
  computed: {
    optionName: function() {
      return (
        this.name + '[' + this.day + '][' + this.index + '][' + this.open + ']'
      );
    },
    filteredTimes: function(times) {
      let hours = this.hours;
      const index = this.index;
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const length = hours.length;
      const lastIndex = length - 1;
      let filteredTimes = this.times;

      if (length >= 2) {
        if (index == 0) {
          if (hours[nextIndex].open != '') {
            filteredTimes = filteredTimes.filter(
              time => time < hours[nextIndex].open
            );
          }
        } else if (index == lastIndex) {
          filteredTimes = filteredTimes.filter(
            time => time > hours[prevIndex].close
          );
        } else if (index != 0 && index != lastIndex) {
          if (hours[nextIndex].open != '') {
            if (this.open == 'open' && hours[index].close == '') {
              filteredTimes = filteredTimes.filter(
                time => time < hours[nextIndex].open
              );
              filteredTimes.pop();
            } else if (this.open == 'close' && hours[index].open == '') {
              filteredTimes = filteredTimes.filter(
                time => time > hours[prevIndex].close
              );
              filteredTimes.shift();
            } else {
              filteredTimes = filteredTimes.filter(
                time =>
                  time > hours[prevIndex].close && time < hours[nextIndex].open
              );
            }
          }
        }
      }

      if (this.open == 'open' && hours[index].close != '') {
        filteredTimes = filteredTimes.filter(time => time < hours[index].close);
      }

      if (this.open == 'close') {
        filteredTimes = filteredTimes.filter(time => time > hours[index].open);
        if (hours[index].open == '') {
          filteredTimes.shift();
        }
      }

      return filteredTimes;
    }
  },
  filters: {
    formatTime: function(time) {
      return moment(time, 'HHmm').format('hh:mm A');
    }
  },
  methods: {
    timeSelected: function(event) {
      this.$emit('timeSelected', event.target.value);
    },
    showMidnightOption: function() {
      return (
        this.index == this.hours.length - 1 &&
        this.open == 'close' &&
        this.hours[this.index].close != '24hrs'
      );
    }
  }
};
</script>