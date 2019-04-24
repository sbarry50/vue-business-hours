<template>
  <div id="app" class="business-hours-container">
    <business-hours v-for="(hours, day) in days" :key="day" :day="day" :hours="hours"></business-hours>
  </div>
</template>

<script>
import axios from 'axios';
import demoDays from './data/demoDays';
// import demoDaysErrors from './data/demoDaysErrors';

// endpoint for supplied days object
const url = '';

export default {
  data() {
    return {
      days: demoDays
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
.business-hours-container {
  display: block;
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  font-family: -apple-system, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #3d4852;
}
</style>