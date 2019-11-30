<template>
  <select :name="optionName" @change="inputEventHandler" v-model="selected">
    <option v-show="isFirstRow(index) && onlyOneRow(hours)" value>{{
      defaultText
    }}</option>
    <option v-show="isFirstRow(index)" value="24hrs">{{
      localization.t24hours
    }}</option>
    <option
      v-for="time in filteredTimes"
      :key="time"
      :value="time"
      :selected="time == selected"
      >{{ time | formatTime(hourFormat24) }}</option
    >
    <option v-show="showMidnightOption" value="2400">{{
      localization.midnight
    }}</option>
  </select>
</template>

<script>
import { helperMixin } from '../mixins/helperMixin';
import { formFieldMixin } from '../mixins/formFieldMixin';
export default {
  name: 'BusinessHoursSelect',

  mixins: [helperMixin, formFieldMixin]
};
</script>
