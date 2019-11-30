# Vue Business Hours

Vue component for setting business hours in an administration panel. Option to use a text `<input>` and `<datalist>` component with 'autocomplete' functionality for greater flexbility to define business hours. Or a `<select>` component to limit options to predetermined times in 15, 30 and 60 minute increments.

[Demo](https://nifty-bassi-0eabe2.netlify.com/)

## Install

### NPM

Install with NPM

```bash
npm install vue-business-hours
```

Then in your `main.js` or other entry point register as a plugin.

```js
import BusinessHours from 'vue-business-hours';

Vue.use(BusinessHours);
```

Or register as a component.

```js
import BusinessHours from 'vue-business-hours';

Vue.component('BusinessHours', BusinessHours);
```

### CDN

You can also add this component straight to an HTML page with a `<script>` tag along with Vue and Moment.js.

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js"></script>
<script src="https://unpkg.com/vue-business-hours"></script>
```

## Usage

This component can be used for regular business hours, holiday hours and/or other special hours with simple configuration changes.

```html
<div id="app">
  <!-- default -->
  <h2>Business Hours</h2>
  <business-hours :days="days"></business-hours>

  <!-- with options -->
  <h2>Holiday Hours</h2>
  <business-hours
    :days="holidays"
    name="holidayHours"
    type="select"
    :time-increment="60"
    color="#00af0b"
  ></business-hours>
</div>
```

In your `main.js`, `App.vue` or in `<script>` tags on your HTML page.

```js
new Vue({
  el: '#app',
  data() {
    return {
      days: yourDaysObject,
      holidays: yourHolidaysObject
    };
  }
});
```

Here's an example in an `App.vue` file fetching the `days` object with an Axios API call.

```html
<template>
  <h1>Business Hours</h1>
  <section v-if="errored">
    <p>
      Oops, something went wrong. Please check the console for more details.
    </p>
  </section>
  <section v-else>
    <div v-if="loading">Loading...</div>
    <business-hours v-else :days="businessHours"></business-hours>
  </section>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        businessHours: {},
        loading: true,
        errored: false
      };
    },
    created() {
      this.getData('https://example.com/api/business-hours-endpoint').then(
        data => (this.businessHours = data)
      );
    },
    methods: {
      getData: function(endpoint) {
        return axios
          .get(endpoint)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    }
  };
</script>
```

The width of the component is set by its containing element's width. For default usage, we recommend setting the containing element to 675px. If you adjust the toggle switch via the `switchWidth` prop to a value greater than the 90px default, you may need to set the containing element to wider than 675px.

## Properties

| Name           | Type    | Required | Default                    | Description                                                                                              |
| -------------- | ------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| days           | Object  | yes      |                            | An object with days and business hours to be set by the component. See below for format.                 |
| name           | String  | no       | `businessHours`            | The name of the key which will correspond to the saved business hours.                                   |
| time-increment | Number  | no       | `30`                       | The number of minutes to increment the dropdown time options. Allowed values: `15`, `30` or `60` minutes |
| type           | String  | no       | `datalist`                 | The type of input component used. Allowed values: `datalist' or 'select'                                 |
| color          | String  | no       | `#2779bd`                  | The color of the toggle switch and Add hours button. Must be in hex color format leading with a`#`       |
| localization   | Object  | no       | [see below](#localization) | An object of all texts used in component                                                                 |
| switchWidth    | Number  | no       | `90`                       | Width of toggle switch                                                                                   |
| hourFormat24   | Boolean | no       | `false`                    | Use 24 hour format                                                                                       |

### Data

The `days` property should be supplied with a JSON object in the following format. The `open` and `close` time values must be in the 24 hour format with no colon. Midnight can be designated by `2400`. `24hrs` is also valid. The `id` property must be unique for each entry. The `isOpen` property should only be false if both `open` and `close` are empty.

```javascript
{
  sunday: [
    {
      open: '',
      close: '',
      id: '5ca5578b0c5c7',
      isOpen: false
    }
  ],
  monday: [
    {
      open: '0800',
      close: '1700',
      id: '5ca5578b0c5d1',
      isOpen: true
    }
  ],
  tuesday: [
    {
      open: '0800',
      close: '1700',
      id: '5ca5578b0c5d8',
      isOpen: true
    }
  ],
  wednesday: [
    {
      open: '0800',
      close: '1700',
      id: '5ca5578b0c5df',
      isOpen: true
    }
  ],
  thursday: [
    {
      open: '0800',
      close: '1700',
      id: '5ca5578b0c5e6',
      isOpen: true
    }
  ],
  friday: [
    {
      open: '0800',
      close: '1700',
      id: '5ca5578b0c5ec',
      isOpen: true
    },
    {
      open: '1900',
      close: '2200',
      id: '5ca5578b0c5f2',
      isOpen: true
    }
  ],
  saturday: [
    {
      open: '24hrs',
      close: '24hrs',
      id: '5ca5578b0c5f8',
      isOpen: true
    }
  ]
}
```

### Localization

Set texts in the object to match your locale. Use appropriate `switchWidth` to fit your `switchOpen` and `switchClosed` text.

```javascript
{
    switchOpen: 'Open',
    switchClosed: 'Closed',
    placeholderOpens: 'Opens',
    placeholderCloses: 'Closes',
    addHours: 'Add hours',
    open: {
        invalidInput: 'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',
        greaterThanNext: 'Please enter an opening time that is before the closing time.',
        lessThanPrevious: 'Please enter an opening time that is after the previous closing time.',
        midnightNotLast: "Midnight can only be selected for the day's last closing time."
    },
    close: {
        invalidInput: 'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',
        greaterThanNext: 'Please enter a closing time that is after the opening time.',
        lessThanPrevious: 'Please enter a closing time that is before the next opening time.',
        midnightNotLast: "Midnight can only be selected for the day's last closing time."
    },
    t24hours: '24 hours',
    midnight: 'Midnight'
}
```
