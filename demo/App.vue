<template>
  <div class="demo-container">
    <div class="demo-component">
      <h1>Business Hours</h1>
      <business-hours :days="demoDays"></business-hours>
    </div>
    <div class="demo-component">
      <h1>Holiday Hours</h1>
      <business-hours
        :days="demoHolidays"
        name="holiday_hours"
        type="select"
        :time-increment="60"
        color="#00af0b"
      ></business-hours>
    </div>
    <div class="demo-component">
      <h1>Business Hours with Errors</h1>
      <business-hours :days="demoDaysErrors" :time-increment="15" color="#e06c00"></business-hours>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import demoDays from './data/demoDays';
import demoHolidays from './data/demoHolidays';
import demoDaysErrors from './data/demoDaysErrors';

// endpoint for supplied days object
const url = '';

export default {
  data() {
    return {
      days: [],
      demoDays: demoDays,
      demoHolidays: demoHolidays,
      demoDaysErrors: demoDaysErrors
    };
  },
  async created() {
    if (url !== '') {
      this.days = await axios.get(url).then(response => {
        return response.data;
      });
    }
  }
};
</script>

<style scoped>
.demo-container {
  margin: 50px auto;
  width: 600px;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  color: #3d4852;
}

.demo-component {
  margin-bottom: 50px;
}
</style>