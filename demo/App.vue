<template>
  <div class="demo-container">
    <div class="demo-component">
      <h1>Business Hours</h1>
      <business-hours :days="demoDays" :time-increment="15"></business-hours>
    </div>
    <div class="demo-component">
      <h1>Holiday Hours</h1>
      <business-hours
        :days="demoHolidays"
        name="holidayHours"
        type="select"
        :time-increment="60"
        color="#00af0b"
      ></business-hours>
    </div>
    <div class="demo-component">
      <h1>Business Hours with Errors</h1>
      <business-hours :days="demoDaysErrors" name="specialHours" color="#e06c00"></business-hours>
    </div>
  </div>
</template>

<script>
import demoDays from './data/demoDays';
import demoHolidays from './data/demoHolidays';
import demoDaysErrors from './data/demoDaysErrors';

export default {
  data() {
    return {
      demoDays: demoDays,
      demoHolidays: demoHolidays,
      demoDaysErrors: demoDaysErrors
    };
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