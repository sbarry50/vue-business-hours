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
      :open-text="openText"
      :closed-text="closedText"
      :opens-text="opensText"
      :closes-text="closesText"
      :time-format="timeFormat"
      v-on="{change: handleFieldChange(day)}"
    ></business-hours-day>
  </div>
</template>

<script>
import BusinessHoursDay from './BusinessHoursDay.vue';
export default {
  name: 'BusinessHours',
  data() {
    return {
      model: {}
    }
  },
  created() {
    this.model = Object.assign({}, this.days);
  },
  components: {
    BusinessHoursDay
  },
  methods: {
    handleFieldChange(day) {
      return hours => {
        this.model = Object.assign(this.model, {[day]: hours});
       
      }
    }
  },
  watch: {
    model(businessHours) {
       this.$emit('change', businessHours);
    }
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
    openText: {
      type: String,
      default: 'Open'
    },
    closedText: {
      type: String,
      default: 'Closed'
    },
    opensText: {
      type: String,
      default: 'Open'
    },
    closesText: {
      type: String,
      default: 'Closes'
    },
    addHoursText: {
      type: String,
      default: 'Add Hours'
    },
    timeFormat: {
      type: Number,
      default: 12
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
