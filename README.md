# vue-business-hours

Vue component for selecting business hours.

[Demo](https://codesandbox.io/s/github/sbarry50/vue-business-hours)

## Usage

```javscript
 <div id="app" class="table-container">
    <business-hours
      v-for="(hours, day) in days"
      :key="day"
      name="business_hours"
      :day="day"
      :hours="hours"
      :times="times"
    ></business-hours>
  </div>
```

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

A `times` array should be supplied in the 24 hour HHmm format.

```javascript
[
  '0000',
  '0030',
  '0100',
  '0130',
  '0200',
  '0230',
  '0300',
  '0330',
  '0400',
  '0430',
  '0500',
  '0530',
  '0600',
  '0630',
  '0700',
  '0730',
  '0800',
  '0830',
  '0900',
  '0930',
  '1000',
  '1030',
  '1100',
  '1130',
  '1200',
  '1230',
  '1300',
  '1330',
  '1400',
  '1430',
  '1500',
  '1530',
  '1600',
  '1630',
  '1700',
  '1730',
  '1800',
  '1830',
  '1900',
  '1930',
  '2000',
  '2030',
  '2100',
  '2130',
  '2200',
  '2230',
  '2300',
  '2330'
];
```
