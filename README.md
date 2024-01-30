# brook-logger

A simple logger based on filesystem module.

[![Version npm](https://img.shields.io/npm/v/brook-logger.svg?style=flat-square)](https://www.npmjs.com/package/brook-logger)
[![npm Downloads](https://img.shields.io/npm/dm/brook-logger.svg?style=flat-square)](https://npmcharts.com/compare/brook-logger?minimal=true)

[![NPM](https://nodei.co/npm/brook-logger.png?downloads=true&downloadRank=true)](https://nodei.co/npm/brook-logger/)

## Motivation

`brook-logger` is just a simple logging library with fs (filesystem) nodejs module.
For example, using fs one may want output and error logs to be stored in a persistent local file.

`brook-logger` aims to follow the development path to make each log a single message unit.

## Usage

The recommended way to use `brook-logger` is to create an Instance of the Logger Class;
i.e using `brook-logger.Logger` Class.

``` js
const brook = require('brook-logger');

const logger = new brook.Logger();

```

## Table of contents

* [Motivation](#motivation)
* [Usage](#usage)
* [Table of Contents](#table-of-contents)
* [Logging](#logging)
* [Logging levels](#logging-levels)
  * [Using logging levels](#using-logging-levels)
* [Installation](#installation)
* [Run Tests](#run-tests)

## Logging

A logger accepts the following parameters:

| Name          | Default                     |  Description    |
| ------------- | --------------------------- | --------------- |
| `preserveLogs`| `false`                     | To save logs in created Log Files |
| `path`        | `logs/`                     | Log Files path  |
| `errorPath`   | `logs/`                     | Error Log Files path  |
| `rotation`    | `brook-logger.Rotation.DAILY` | When to rotate Log Files |
| `logFileExtension` | `false`                | Extensions for generated Log Files |
| `initLog`     | `false`                     | Log when Logger is initialised  |

``` js
const { Rotation, Level } = require('brook-logger');
```

## Logging Levels

Currently the following Logging levels are present in `brook-logger`.

```js
{
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  VERBOSE = 'VERBOSE',
  DEBUG = 'DEBUG',
}
```

### Using Logging Levels

To log at a specific level, just call the same method from the logger instance.

``` js
//
// Any logger instance
//
logger.log("this is a simple log text.");
logger.warn("this is a simple log text.");
logger.error("this is a simple log text.");
```

`brook-logger` will support customizable logging levels in future versions.

## Installation

``` bash
npm install brook-logger
```

## Run Tests

All of the tests are written with [`jest`].
They can be run with `npm`.

``` bash
npm test
```

### Author: [ Jkan1 ]

### Contributors: -
