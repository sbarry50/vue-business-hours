# Vue Business Hours

Vue component for setting business hours in an administration panel. Option to use a text `<input>` and `<datalist>` component with "autocomplete" functionality for greater flexbility to define business hours. Or a `<select>` component to limit options to predetermined times in 15, 30 and 60 minute increments.

[Demo](https://codesandbox.io/s/github/sbarry50/vue-business-hours)

## Usage

Using defaults:
```javscript
 <div id="app" class="business-hours-container">
    <business-hours
      v-for="(hours, day) in days"
      :key="day"
      :day="day"
      :hours="hours"
    ></business-hours>
  </div>
```

Without defaults:
```javscript
 <div id="app" class="business-hours-container">
    <business-hours
      v-for="(hours, day) in days"
      :key="day"
      :day="day"
      :hours="hours"
      name="office_hours"
      :time-increment="60"
      type="select"
      color="#38a89d"
    ></business-hours>
  </div>
```

### Data

A `days` object should be supplied in the following format.

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

### Properties

| Name           | Type   | Required | Default          | Description                                                                                              |
| -------------- | ------ | -------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| day            | String | yes      |                  | The day of the week. From the `days` object.                                                             |
| hours          | Array  | yes      |                  | The opening/closing hours for the day. From the `days` object.                                           |
| name           | String | no       | `business_hours` | The name of the key which will correspond to the saved business hours.                                   |
| time-increment | Number | no       | `30`             | The number of minutes to increment the dropdown time options. Allowed values: `15`, `30` or `60` minutes |
| type           | String | no       | `datalist`       | The type of input component used. Allowed values: `datalist' or 'select'                                 |
| color          | String | no       | `#2779bd`        | The color of the toggle switch and Add hours button. Must be in hex color format leading with a `#`      |

