export const validationMixin = {
  data() {
    return {
      validations: [],
      errors: {
        open: {
          invalidInput: this.localization.open.invalidInput,
          greaterThanNext: this.localization.open.greaterThanNext,
          lessThanPrevious: this.localization.open.lessThanPrevious,
          midnightNotLast: this.localization.open.midnightNotLast
        },
        close: {
          invalidInput: this.localization.close.invalidInput,
          lessThanPrevious: this.localization.close.lessThanPrevious,
          greaterThanNext: this.localization.close.greaterThanNext,
          midnightNotLast: this.localization.close.midnightNotLast
        }
      }
    };
  },
  created() {
    this.runValidations();
  },
  computed: {},
  methods: {
    defaultValidation: function() {
      return {
        invalidInput: false,
        greaterThanNext: false,
        lessThanPrevious: false,
        midnightNotLast: false
      };
    },
    defaultValidations: function() {
      return {
        anyErrors: false,
        open: this.defaultValidation(),
        close: this.defaultValidation()
      };
    },
    isValidInput: function(input) {
      return (
        this.isValidBackendTime(input) ||
        input === '2400' ||
        input === '24hrs' ||
        input === ''
      );
    },
    resetValidations: function() {
      let validations = [];

      this.hours.forEach((hour, index) => {
        validations[index] = this.defaultValidations();
      });

      this.validations = validations;
    },
    runValidations: function() {
      let inputNum = 1;

      this.resetValidations();

      this.hours.forEach((hour, index) => {
        this.runValidation(hour.open, index, inputNum, 'open');
        inputNum++;
        this.runValidation(hour.close, index, inputNum, 'close');
        inputNum++;
      });

      this.updateAnyErrors();
    },
    runValidation: function(value, index, inputNum, whichTime) {
      if (this.isValidBackendTime(value)) {
        this.validations[index][whichTime] = this.runInputValidation(
          value,
          index,
          inputNum,
          this.totalInputs
        );
      }

      this.validations[index][whichTime].invalidInput = !this.isValidInput(
        value
      )
        ? true
        : false;

      this.updateAdjacentValidations(index, whichTime, inputNum);
    },
    runInputValidation: function(value, index, inputNum, totalInputs) {
      const prevTime = this.getPrevious(this.hours, index, inputNum);
      const nextTime = this.getNext(this.hours, index, inputNum, totalInputs);
      let validations = this.defaultValidation();

      validations.midnightNotLast =
        value === '2400' && !this.isLastInput(inputNum, totalInputs)
          ? true
          : false;

      if (prevTime === undefined) {
        validations.greaterThanNext =
          value >= nextTime && nextTime !== '' ? true : false;
      } else if (nextTime === undefined) {
        validations.lessThanPrevious =
          value <= prevTime && prevTime !== '' ? true : false;
      } else {
        validations.lessThanPrevious =
          value <= prevTime && prevTime !== '' ? true : false;
        validations.greaterThanNext =
          value >= nextTime && nextTime !== '' ? true : false;
      }

      return validations;
    },
    updateAdjacentValidations: function(index, whichTime, inputNum) {
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const currentValidations = this.validations[index][whichTime];
      let prevValidations = this.getPrevious(this.validations, index, inputNum);
      let nextValidations = this.getNext(
        this.validations,
        index,
        inputNum,
        this.totalInputs
      );

      if (prevValidations !== undefined) {
        if (currentValidations.lessThanPrevious) {
          prevValidations.greaterThanNext = true;
        } else if (!currentValidations.lessThanPrevious) {
          prevValidations.greaterThanNext = false;
        }
      }

      if (nextValidations !== undefined) {
        if (currentValidations.greaterThanNext) {
          nextValidations.lessThanPrevious = true;
        } else if (!currentValidations.greaterThanNext) {
          nextValidations.lessThanPrevious = false;
        }
      }

      if (!this.isFirstInput(inputNum) && whichTime === 'open') {
        this.validations[prevIndex].close = prevValidations;
      } else if (whichTime === 'close') {
        this.validations[index].open = prevValidations;
      }

      if (
        !this.isLastInput(inputNum, this.totalInputs) &&
        whichTime === 'close'
      ) {
        this.validations[nextIndex].open = nextValidations;
      } else if (whichTime === 'open') {
        this.validations[index].close = nextValidations;
      }
    },
    updateAnyErrors: function() {
      this.validations.forEach(
        (validation, index) =>
          (this.validations[index].anyErrors = this.anyErrors(validation))
      );
    },
    anyErrors: function(validation) {
      return this.anyError(validation.open) || this.anyError(validation.close)
        ? true
        : false;
    },
    anyError: function(validation) {
      return Object.keys(validation).some(key => {
        return validation[key] === true;
      });
    },
    activeErrors: function(index) {
      const validations = this.validations[index];
      let errors = [];

      Object.keys(validations).forEach(key => {
        if (typeof validations[key] === 'object') {
          let validation = validations[key];
          Object.keys(validation)
            .filter(key => {
              return validation[key] === true;
            })
            .forEach(error => {
              errors.push({
                whichTime: key,
                error: error
              });
            });
        }
      });

      return errors;
    },
    errorMessage: function(whichTime, error) {
      return this.errors[whichTime][error];
    }
  }
};
