# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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