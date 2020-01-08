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
      :localization="localization"
      :switch-width="switchWidth"
      :hour-format24="hourFormat24"
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
    },
    localization: {
      type: Object,
      default: () => ({
        switchOpen: 'Open',
        switchClosed: 'Closed',
        placeholderOpens: 'Opens',
        placeholderCloses: 'Closes',
        addHours: 'Add hours',
        open: {
          invalidInput:
            'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',
          greaterThanNext:
            'Please enter an opening time that is before the closing time.',
          lessThanPrevious:
            'Please enter an opening time that is after the previous closing time.',
          midnightNotLast:
            "Midnight can only be selected for the day's last closing time."
        },
        close: {
          invalidInput:
            'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',
          greaterThanNext:
            'Please enter a closing time that is after the opening time.',
          lessThanPrevious:
            'Please enter a closing time that is before the next opening time.',
          midnightNotLast:
            "Midnight can only be selected for the day's last closing time."
        },
        t24hours: '24 hours',
        midnight: 'Midnight',
        days: {
          monday: 'Monday',
          tuesday: 'Tuesday',
          wednesday: 'Wednesday',
          thursday: 'Thursday',
          friday: 'Friday',
          saturday: 'Saturday',
          sunday: 'Sunday'
        }
      })
    },
    switchWidth: {
      type: Number,
      default: 90
    },
    hourFormat24: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.business-hours-container {
  display: block;
  width: 100%;
  /* max-width: 630px; */
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #3d4852;
}
</style>
