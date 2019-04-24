import moment from 'moment';
export const helperMixin = {
  methods: {
    toUpperCaseFirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    frontendTimeFormat: function(value) {
      return moment(value, 'HHmm').format('hh:mm A');
    },
    backendTimeFormat: function(value) {
      return moment(value, 'hh:mm A').format('HHmm');
    },
    isValidFrontendTime: function(value) {
      return moment(value, 'hh:mm A', true).isValid();
    },
    isValidBackendTime: function(value) {
      return moment(value, 'HHmm', true).isValid();
    },
    frontendInputFormat: function(value) {
      if (value === '24hrs') {
        value = '24 hours';
      } else if (value === '2400') {
        value = 'Midnight';
      } else if (this.isValidBackendTime(value)) {
        value = this.frontendTimeFormat(value);
      } else if (value === '') {
        value = '';
      }

      return value;
    },
    backendInputFormat: function(value) {
      if (value === 'Midnight' || value === 'midnight') {
        return '2400';
      } else if (value === '24 hours' || value === '24 Hours') {
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
