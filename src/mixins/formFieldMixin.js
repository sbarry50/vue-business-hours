import moment from 'moment';
export const formFieldMixin = {
  data() {
    return {
      selected: this.selectedTime,
      times: []
    };
  },
  props: {
    name: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    hours: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    inputNum: {
      type: Number,
      required: true
    },
    totalInputs: {
      type: Number,
      required: true
    },
    selectedTime: {
      type: String,
      required: true
    },
    timeIncrement: {
      type: Number,
      required: true
    },
    localization: {
      type: Object
    },
    hourFormat24: {
      type: Boolean
    }
  },
  created() {
    this.times = this.generateTimes(this.timeIncrement);
  },
  watch: {
    selectedTime: function() {
      this.selected = this.selectedTime;
    }
  },
  computed: {
    whichTime: function() {
      return this.isEven(this.inputNum) ? 'close' : 'open';
    },
    defaultText: function() {
      return this.whichTime === 'open'
        ? this.localization.placeholderOpens
        : this.localization.placeholderCloses;
    },
    optionName: function() {
      return (
        this.name +
        '[' +
        this.day +
        '][' +
        this.index +
        '][' +
        this.whichTime +
        ']'
      );
    },
    filteredTimes: function() {
      let prevTime = this.getPrevious(this.hours, this.index, this.inputNum),
        nextTime = this.getNext(
          this.hours,
          this.index,
          this.inputNum,
          this.totalInputs
        ),
        filteredTimes = this.times;

      if (!this.isFirstRow(this.index) && prevTime === '') {
        prevTime = this.getPrevious(this.hours, this.index, this.inputNum - 1);
      }

      if (this.isFirstInput(this.inputNum)) {
        filteredTimes = this.getFiltered('before', nextTime, filteredTimes);
      } else if (this.isLastInput(this.inputNum, this.totalInputs)) {
        filteredTimes = this.getFiltered('after', prevTime, filteredTimes);
      } else {
        filteredTimes = this.getFiltered('before', nextTime, filteredTimes);
        filteredTimes = this.getFiltered('after', prevTime, filteredTimes);
      }

      return filteredTimes;
    },
    showMidnightOption: function() {
      return (
        this.isLastRow(this.index, this.hours) &&
        this.whichTime === 'close' &&
        this.hours[this.index].close !== '24hrs'
      );
    }
  },
  filters: {
    formatTime: function(time, hourFormat24) {
      return moment(time, 'HHmm').format(hourFormat24 ? 'HH:mm' : 'hh:mm A');
    }
  },
  methods: {
    inputEventHandler: function(e) {
      this.$emit('input-change', e.target.value);
    },
    generateTimes: function(timeIncrement) {
      let currentTime = '0000',
        times = [];

      do {
        times.push(currentTime);
        currentTime = moment(currentTime, 'HHmm')
          .add(timeIncrement, 'minutes')
          .format('HHmm');
      } while (currentTime !== '0000');

      return times;
    },
    getFiltered: function(when, adjacentTime, collection) {
      if (
        this.isLastInput(this.inputNum, this.totalInputs) &&
        this.hours[this.index].open === ''
      ) {
        collection = collection.filter(value => value > adjacentTime);
        collection.shift();
        return collection;
      }

      if (adjacentTime === '') {
        return collection;
      }

      if (when === 'before') {
        collection = collection.filter(value => value < adjacentTime);
      } else if (when === 'after') {
        collection = collection.filter(value => value > adjacentTime);
      }

      return collection;
    }
  }
};
