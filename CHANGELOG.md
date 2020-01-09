# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2020-01-08

### Added

- Added localization for day names - Issue [#9](https://github.com/sbarry50/vue-business-hours/issues/9) PR [#10](https://github.com/sbarry50/vue-business-hours/pull/10) Thanks [Graker](https://github.com/graker)
- Added event emitter to access updated values - Issue [#6](https://github.com/sbarry50/vue-business-hours/issues/6) PR [#8](Added "change" emit to Business Hours day) Thanks [wilokecom](https://github.com/wilokecom)

## [1.3.0] - 2019-11-29

### Added

- Added localization, changeable switch width and 24h format - PR [#4](https://github.com/sbarry50/vue-business-hours/pull/4) Thanks [Drackokacka](https://github.com/Drackokacka)

### Changed

- CSS tweaks to account for adjustable toggle switch width
- Component width now set to 100% of containing element.

## [1.2.3] - 2019-05-17

### Changed

- Changed width of .business-hours-container to 600px

## [1.2.2] - 2019-04-30

### Changed

- Properly register subcomponents locally instead of globally.
- NPM package bug fixes
- Updated README.md

## [1.1.2] - 2019-04-26

### Changed

- NPM package bug fixes

## [1.1.0] - 2019-04-25

### Added

- Added business hour container component to allow for easier reuse for special hours or holiday hours.
- NPM package support added and published.

### Changed

- Demo changed to show implemention for regular business hours and holiday hours as well as different options

## [1.0.0] - 2019-04-24

### Added

- Text input with datalist autocompletion option in addition to original select
- Input/datalist validations
- Ability to control the color of the toggle switch and Add hours button with a `color` property

### Changed

- Major rewrite
- Component now generates time dropdown options based on `timeIncrement' property

### Removed

- Requirement for `times` data array used to populate the dropdown options.

## [0.1.0] - 2019-04-03

### First commit

- Select business hours vue component
