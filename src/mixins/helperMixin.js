import moment from 'moment';
export const helperMixin = {
  props: {
    localization: {
      type: Object
    }
  },
  methods: {
    titleCase: function(str) {
      return str
        .split('-')
        .map(function capitalize(part) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join(' ');
    },
    frontendTimeFormat: function(value) {
      return moment(value, 'HHmm').format(
        this.hourFormat24 ? 'HH:mm' : 'hh:mm A'
      );
    },
    backendTimeFormat: function(value) {
      return moment(value, 'hh:mm A').format('HHmm');
    },
    isValidFrontendTime: function(value) {
      return moment(
        value,
        this.hourFormat24 ? 'HH:mm' : 'hh:mm A',
        true
      ).isValid();
    },
    isValidBackendTime: function(value) {
      return moment(value, 'HHmm', true).isValid();
    },
    frontendInputFormat: function(value) {
      if (value === '24hrs') {
        value = this.localization.t24hours;
      } else if (value === '2400') {
        value = this.localization.midnight;
      } else if (this.isValidBackendTime(value)) {
        value = this.frontendTimeFormat(value);
      } else if (value === '') {
        value = '';
      }

      return value;
    },
    backendInputFormat: function(value) {
      if (
        value === this.localization.midnight ||
        value === this.localization.midnight.toLowerCase()
      ) {
        return '2400';
      } else if (
        value.toLowerCase() === this.localization.t24hours.toLowerCase()
      ) {
        return '24hrs';
      } else if (this.isValidFrontendTime(value)) {
        return this.backendTimeFormat(value);
      } else {
        return value;
      }
    },
    isEven: function(value) {
      return value % 2 == 0 ? true : false;
    },
    isFirstInput: function(inputNum) {
      return inputNum === 1;
    },
    isLastInput: function(inputNum, totalInputs) {
      return inputNum === totalInputs;
    },
    isFirstRow: function(index) {
      return index === 0;
    },
    isLastRow: function(index, hours) {
      return index === hours.length - 1;
    },
    isMiddleRow: function(index, hours) {
      return !this.isFirstRow(index) && !this.isLastRow(index, hours);
    },
    onlyOneRow: function(hours) {
      return hours.length === 1;
    },
    getPrevious: function(type, index, inputNum) {
      if (inputNum === 1) {
        return;
      }

      return this.isEven(inputNum) ? type[index].open : type[index - 1].close;
    },
    getNext: function(type, index, inputNum, totalInputs) {
      if (inputNum === totalInputs) {
        return;
      }

      return this.isEven(inputNum) ? type[index + 1].open : type[index].close;
    }
  }
};
