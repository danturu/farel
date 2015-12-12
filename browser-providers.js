'use strict';

let CUSTOM_LAUNCHERS = module.exports.CUSTOM_LAUNCHERS = {
  'SL_CHROME': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '46',
  },

  'SL_FIREFOX': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '42',
  },

  'SL_SAFARI8': {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8',
  },

  'SL_SAFARI9': {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '9',
  },

  'SL_IE9': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2008',
    version: '9',
  },

  'SL_IE10': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2012',
    version: '10',
  },

  'SL_IE11': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11',
  },

  'SL_EDGE': {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    platform: 'Windows 10',
    version: '20',
  },

  'SL_IOS7': {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '7.1'
  },

  'SL_IOS8': {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '8.4'
  },

  'SL_IOS9': {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: '9.1'
  },

  'SL_ANDROID4.1': {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.1',
  },

  'SL_ANDROID4.2': {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.2',
  },

  'SL_ANDROID4.3': {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.3',
  },

  'SL_ANDROID4.4': {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.4',
  },

  'SL_ANDROID5.1': {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '5.1',
  }
}

let BROWSER_ALIASES = module.exports.BROWSER_ALIASES = {
  'ALL': Object.keys(CUSTOM_LAUNCHERS),

  'DESKTOP': [
    'SL_CHROME', 'SL_FIREFOX', 'SL_IE10', 'SL_IE11', 'SL_EDGE', 'SL_SAFARI7', 'SL_SAFARI8', 'SL_SAFARI9',
  ],

  'MOBILE': [
    'SL_ANDROID4.1', 'SL_ANDROID4.2', 'SL_ANDROID4.3', 'SL_ANDROID4.4', 'SL_ANDROID5.1'
  ],

  'ANDROID': [
    'SL_ANDROID4.1', 'SL_ANDROID4.2', 'SL_ANDROID4.3', 'SL_ANDROID4.4', 'SL_ANDROID5.1'
  ],

  'IE': [
    'SL_IE9', 'SL_IE10', 'SL_IE11',
  ],

  'IOS': [
    'SL_IOS7', 'SL_IOS8', 'SL_IOS9',
  ],

  'SAFARI': [
    'SL_SAFARI7', 'SL_SAFARI8', 'SL_SAFARI9',
  ],
};
