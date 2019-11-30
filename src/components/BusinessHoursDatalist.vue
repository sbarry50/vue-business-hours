<template>
  <div>
    <input
      class="time-input"
      :class="[ anyError ? 'has-error' : '']"
      type="text"
      :list="datalistID"
      :placeholder="defaultText"
      @change="inputEventHandler"
      :value="formattedTime"
    >
    <datalist :id="datalistID">
      <option v-if="isFirstRow(index)">{{localization.t24hours}}</option>
      <option v-for="time in filteredTimes" :key="time">{{ time | formatTime(hourFormat24) }}</option>
      <option v-if="showMidnightOption">{{localization.midnight}}</option>
    </datalist>
    <input :name="optionName" type="hidden" :value="selected">
  </div>
</template>

<script>
import { helperMixin } from '../mixins/helperMixin';
import { formFieldMixin } from '../mixins/formFieldMixin';
export default {
  name: 'BusinessHoursDatalist',
  mixins: [helperMixin, formFieldMixin],
  props: {
    anyError: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    formattedTime: function() {
      return this.frontendInputFormat(this.selected);
    },
    datalistID: function() {
      return (
        this.name.replace('_', '-') +
        '-' +
        this.day +
        '-' +
        this.index +
        '-' +
        this.whichTime
      );
    }
  }
};
</script>

<style scoped>
.time-input.has-error {
  border: solid #e3342f 1px;
}
</style>