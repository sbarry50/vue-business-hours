<template>
  <div class="demo-container">
    <h1>Vue Business Hours</h1>
    <p>Vue component for setting business hours in an administration panel.</p>
    <a href="https://github.com/sbarry50/vue-business-hours">Github</a>
    <div class="demo-component">
      <h2>Business Hours</h2>
      <business-hours :days="demoDays" :time-increment="15"></business-hours>
    </div>
    <div class="demo-component">
      <h2>Holiday Hours, Select Mode</h2>
      <business-hours
        :days="demoHolidays"
        name="holidayHours"
        type="select"
        :time-increment="60"
        color="#00af0b"
      ></business-hours>
    </div>
    <div class="demo-component">
      <h2>Business Hours with Errors</h2>
      <business-hours :days="demoDaysErrors" name="specialHours" color="#e06c00"></business-hours>
    </div>
    <div class="demo-component wide">
      <h2>
        Business Hours with Spanish Translation, 24h time format, Wider Toggle
        Switch
      </h2>
      <business-hours
        :days="demoDaysSpanish"
        name="spanishHoursDatalist"
        color="#6b0b9d"
        :localization="demoSpanishLocalization"
        :switch-width="150"
        :hour-format24="true"
      ></business-hours>
    </div>
  </div>
</template>

<script>
import demoDays from './data/demoDays';
import demoDaysSpanish from './data/demoDaysSpanish';
import demoHolidays from './data/demoHolidays';
import demoDaysErrors from './data/demoDaysErrors';
import demoSpanishLocalization from './data/demoSpanishLocalization';

export default {
  data() {
    return {
      demoDays: demoDays,
      demoDaysSpanish: demoDaysSpanish,
      demoHolidays: demoHolidays,
      demoDaysErrors: demoDaysErrors,
      demoSpanishLocalization: demoSpanishLocalization
    };
  }
};
</script>

<style scoped>
.demo-container {
  margin: 50px auto;
  width: 800px;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  color: #3d4852;
}

.demo-component {
  width: 660px;
  margin-bottom: 50px;
}

.demo-component.wide {
  width: 800px;
}
</style>
