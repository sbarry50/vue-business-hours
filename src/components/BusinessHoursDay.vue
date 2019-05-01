<template>
  <div is="transition-group" name="fade">
    <div v-for="({open, close, id, isOpen}, index) in hours" :key="id">
      <div class="flex-table row" role="rowgroup">
        <div class="flex-row day" role="cell">
          <div v-if="showDay(index)">{{ titleCase(day) }}</div>
        </div>
        <div class="flex-row toggle" role="cell">
          <ToggleButton
            v-if="showDay(index)"
            @change="toggleOpen(); resetHours(); runValidations();"
            :value="anyOpen"
            :sync="true"
            :labels="{checked: 'Open', unchecked: 'Closed'}"
            :color="color"
            :width="75"
            :height="25"
            :font-size="12"
          />
        </div>
        <transition name="fade">
          <div class="flex-row hours open" role="cell" v-show="isOpenToday">
            <BusinessHoursSelect
              v-if="type === 'select'"
              :name="name"
              :input-num="inputNum('open', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="open"
              @input-change="onChangeEventHandler('open', index, $event)"
            ></BusinessHoursSelect>
            <BusinessHoursDatalist
              v-if="type === 'datalist'"
              :name="name"
              :input-num="inputNum('open', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="open"
              :any-error="anyError(validations[index].open)"
              @input-change="onChangeEventHandler('open', index, $event)"
            ></BusinessHoursDatalist>
          </div>
        </transition>
        <transition name="fade">
          <div class="flex-row dash" role="cell" v-show="isOpenToday">-</div>
        </transition>
        <transition name="fade">
          <div class="flex-row hours close" role="cell" v-show="isOpenToday">
            <BusinessHoursSelect
              v-if="type === 'select'"
              :name="name"
              :input-num="inputNum('close', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :selected-time="close"
              @input-change="onChangeEventHandler('close', index, $event)"
            ></BusinessHoursSelect>
            <BusinessHoursDatalist
              v-if="type === 'datalist'"
              :name="name"
              :input-num="inputNum('close', index)"
              :total-inputs="totalInputs"
              :day="day"
              :hours="hours"
              :time-increment="timeIncrement"
              :index="index"
              :any-error="anyError(validations[index].close)"
              :updated-validations="validations[index].close"
              :selected-time="close"
              @input-change="onChangeEventHandler('close', index, $event)"
            ></BusinessHoursDatalist>
          </div>
        </transition>
        <div class="flex-row remove" role="cell" v-show="isOpenToday">
          <button
            type="button"
            class="font-awesome-button"
            v-if="showRemoveButton()"
            @click="removeRow(index)"
          >
            <FontAwesomeIcon icon="times" class="fa-sm"/>
          </button>
        </div>
        <div class="flex-row add" role="cell" v-show="isOpenToday">
          <button
            type="button"
            :style="{ color: color }"
            class="add-hours"
            v-if="showAddButton(index)"
            @click="addRow();"
          >Add hours</button>
        </div>
      </div>
      <ul class="time-errors" v-if="validations[index].anyErrors">
        <li
          v-for="{whichTime, error} in activeErrors(index)"
          :key="whichTime + '.' + error"
        >{{ errorMessage(whichTime, error) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BusinessHoursSelect from './BusinessHoursSelect.vue';
import BusinessHoursDatalist from './BusinessHoursDatalist.vue';
import { ToggleButton } from 'vue-js-toggle-button';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { helperMixin } from '../mixins/helperMixin';
import { validationMixin } from '../mixins/validationMixin';
import uniqid from 'uniqid';
export default {
  name: 'BusinessHoursDay',
  components: {
    BusinessHoursSelect,
    BusinessHoursDatalist,
    ToggleButton,
    FontAwesomeIcon
  },
  mixins: [helperMixin, validationMixin],
  props: {
    day: {
      type: String,
      required: true
    },
    hours: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    timeIncrement: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    totalInputs: function() {
      return this.hours.length * 2;
    },
    isOpenToday: function() {
      return this.hours[0].isOpen;
    },
    anyOpen: function() {
      return this.hours.some(hour => {
        return hour.isOpen === true;
      });
    }
  },
  methods: {
    onChangeEventHandler: function(whichTime, index, value) {
      value = this.backendInputFormat(value);

      if (value == '24hrs') {
        this.hours.splice(1);
        this.hours[0].open = this.hours[0].close = value;
        this.runValidations();
        return;
      }

      if (
        (this.hours[index].open == '24hrs' ||
          this.hours[index].close == '24hrs') &&
        value == ''
      ) {
        this.hours[index].open = this.hours[index].close = value;
        this.runValidations();
        return;
      }

      if (
        !this.onlyOneRow(this.hours) &&
        value === '' &&
        ((whichTime === 'open' && this.hours[index].close === '') ||
          (whichTime === 'close' && this.hours[index].open === ''))
      ) {
        this.removeRow(index);
        this.runValidations();
        return;
      }

      this.hours[index][whichTime] = value;
      this.runValidations();
    },
    inputNum: function(whichTime, index) {
      if (whichTime === 'open') {
        return index * 2 + 1;
      } else if (whichTime === 'close') {
        return index * 2 + 2;
      }
    },
    toggleOpen: function() {
      this.hours[0].isOpen = this.hours[0].isOpen ? false : true;
    },
    resetHours: function() {
      this.hours.splice(1);
      this.hours[0].open = this.hours[0].close = '';
    },
    addRow: function() {
      this.hours.push({
        id: uniqid(),
        open: '',
        close: '',
        isOpen: true
      });
      this.runValidations();
    },
    removeRow: function(index) {
      this.hours.splice(index, 1);
      this.runValidations();
    },
    showDay: function(index) {
      return index > 0 ? false : true;
    },
    showRemoveButton: function() {
      return this.hours.length > 1 ? true : false;
    },
    showAddButton: function(index) {
      return this.hours.length === index + 1 &&
        this.hours[index].open !== '' &&
        this.hours[index].close !== '' &&
        this.hours[index].open !== '24hrs' &&
        this.hours[index].close !== '24hrs' &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 15 &&
          this.hours[index].close === '2345'
        ) &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 30 &&
          this.hours[index].close === '2330'
        ) &&
        !(
          this.type === 'select' &&
          this.timeIncrement === 60 &&
          this.hours[index].close === '2300'
        ) &&
        this.hours[index].close !== '2400' &&
        this.validations[index].anyErrors === false
        ? true
        : false;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0.75em 0;
  height: 45px;
}

.flex-row {
  width: calc(100% / 6);
  padding-right: 7px;
}

.flex-row /deep/ input,
.flex-row /deep/ select {
  margin: 1px;
  padding: 3px 5px;
  width: 100px;
  height: 28px;
  font-size: 14px;
  line-height: 28px;
  vertical-align: middle;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
}

.flex-row.toggle {
  width: 96px;
}
.flex-row.dash {
  padding-right: 7px;
  width: 5px;
}

.row-container {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.remove {
  display: flex;
  justify-content: center;
  width: 50px;
}

label.vue-js-switch {
  margin-bottom: 0;
}

button.add-hours,
button.font-awesome-button {
  height: 30px;
  background-color: transparent;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  padding: 0;
  cursor: pointer;
}

button.add-hours:focus,
button.font-awesome-button:focus {
  outline: none;
}

button.font-awesome-button {
  width: 30px;
  font-size: 24px;
}

button.add-hours {
  font-size: 14px;
  font-weight: bold;
}

.fa-times {
  color: #3d4852;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.time-errors {
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #e3342f;
  list-style: none;
}

.time-errors li {
  margin-bottom: 6px;
}
</style>