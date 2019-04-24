<template>
  <select :name="optionName" @change="inputEventHandler" v-model="selected">
    <option v-show="isFirstRow(index) && onlyOneRow(hours)" value>{{defaultText}}</option>
    <option v-show="isFirstRow(index)" value="24hrs">24 hours</option>
    <option
      v-for="time in filteredTimes"
      :key="time"
      :value="time"
      :selected="time == selected"
    >{{ time | formatTime }}</option>
    <option v-show="showMidnightOption" value="2400">Midnight</option>
  </select>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';
export default {
  mixins: [formFieldMixin]
};
</script>
