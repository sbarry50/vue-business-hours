<template>
  <div class="business-hours-container">
    <business-hours-day
      v-for="(hours, day) in days"
      :key="day"
      :day="day"
      :hours="hours"
      :name="name"
      :time-increment="timeIncrement"
      :type="type"
      :color="color"
    ></business-hours-day>
  </div>
</template>

<script>
import BusinessHoursDay from './BusinessHoursDay.vue';
export default {
  name: 'BusinessHours',
  components: {
    BusinessHoursDay
  },
  props: {
    days: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: 'businessHours'
    },
    type: {
      type: String,
      default: 'datalist',
      validator: function(value) {
        return ['datalist', 'select'].indexOf(value) !== -1;
      }
    },
    timeIncrement: {
      type: Number,
      default: 30,
      validator: function(value) {
        return [15, 30, 60].indexOf(value) !== -1;
      }
    },
    color: {
      type: String,
      default: '#2779bd',
      validator: function(value) {
        return value.charAt(0) === '#' ? true : false;
      }
    }
  }
};
</script>

<style scoped>
.business-hours-container {
  display: block;
  width: 600px;
  max-width: 600px;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #3d4852;
}
</style>