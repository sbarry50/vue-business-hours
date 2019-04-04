<template>
  <div is="transition-group" name="component-fade">
    <div
      class="flex-table row"
      role="rowgroup"
      v-for="({open, close, id, isOpen}, index) in hours"
      :key="id"
    >
      <div class="flex-row day" role="cell">
        <div v-show="showDay(index)">{{ jsUcfirst(day) }}</div>
      </div>
      <div class="flex-row toggle" role="cell">
        <toggle-button
          v-show="showDay(index)"
          @change="toggleOpen(); resetHours();"
          :value="isOpen"
          :sync="true"
          :labels="{checked: 'Open', unchecked: 'Closed'}"
          color="#0085ba"
          :width="75"
          :height="25"
          :font-size="12"
        />
      </div>
      <transition name="fade">
        <div class="flex-row select-1" role="cell" v-show="isOpen">
          <select-times
            :name="name"
            :day="day"
            :open="'open'"
            :hours="hours"
            :times="times"
            :index="index"
            :default-text="'Opens'"
            :selected-time="open"
            @timeSelected="onTimeSelected('open', index, $event)"
          ></select-times>
        </div>
      </transition>
      <transition name="fade">
        <div class="flex-row select-time" role="cell" v-show="isOpen">
          <select-times
            :name="name"
            :day="day"
            :open="'close'"
            :hours="hours"
            :times="times"
            :index="index"
            :default-text="'Closes'"
            :selected-time="close"
            @timeSelected="onTimeSelected('close', index, $event)"
          ></select-times>
        </div>
      </transition>
      <div class="flex-row remove" role="cell" v-show="isOpen">
        <button
          type="button"
          class="font-awesome-button"
          v-show="showRemoveButton()"
          @click="removeRow(index)"
        >
          <font-awesome-icon icon="times" class="fa-sm"/>
        </button>
      </div>
      <div class="flex-row add" role="cell" v-show="isOpen">
        <button
          type="button"
          class="add-hours wp-link-color"
          v-show="showAddButton(index)"
          @click="addRow();"
        >Add hours</button>
      </div>
    </div>
  </div>
</template>

<script>
var uniqid = require('uniqid');
export default {
  props: {
    name: String,
    day: String,
    hours: Array,
    times: Array
  },
  methods: {
    jsUcfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleOpen: function() {
      this.hours[0].isOpen = this.hours[0].isOpen ? false : true;
    },
    isOpen: function() {
      return this.hours[0].isOpen;
    },
    resetHours: function() {
      this.hours.length = 1;
      this.hours[0].open = '';
      this.hours[0].close = '';
    },
    addRow: function() {
      this.hours.push({
        id: uniqid(),
        open: '',
        close: '',
        isOpen: true
      });
    },
    removeRow: function(index) {
      this.hours.splice(index, 1);
    },
    showDay: function(index) {
      return index > 0 ? false : true;
    },
    showRemoveButton: function() {
      return this.hours.length > 1 ? true : false;
    },
    showAddButton: function(index) {
      const nextIndex = index + 1;
      return nextIndex == this.hours.length &&
        this.hours[index].open != '' &&
        this.hours[index].close != '' &&
        this.hours[index].open != '24hrs' &&
        this.hours[index].close != '24hrs' &&
        this.hours[index].close != '2330' &&
        this.hours[index].close != '2400'
        ? true
        : false;
    },
    onTimeSelected: function(open, index, value) {
      if (open == 'open') {
        if (this.hours[index].open == '24hrs') {
          this.hours[index].close = '';
        }
        this.hours[index].open = value;
      }

      if (open == 'close') {
        this.hours[index].close = value;
      }

      if (value == '24hrs') {
        this.hours[index].open = value;
        this.hours[index].close = value;
        this.hours.length = 1;
      }

      if (
        (this.hours[index].open == '24hrs' ||
          this.hours[index].close == '24hrs') &&
        value == ''
      ) {
        this.hours[index].open = value;
        this.hours[index].close = value;
      }
    }
  }
};
</script>