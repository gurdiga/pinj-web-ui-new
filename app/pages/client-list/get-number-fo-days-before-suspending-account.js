'use strict';

var ONE_DAY = 24 * 3600 * 1000;

function getNumberOfDaysBeforeSuspendingAccount(timestamps) {
  if (isInTrial(timestamps.registration)) return daysOfTrialRemaining(timestamps);
  else return daysOfGraceRemaining(timestamps);
}

function daysOfTrialRemaining(timestamps) {
  var timeSinceRegistration = Date.now() - timestamps.registration;
  var trialTimeLeft = config.TRIAL_PERIOD - timeSinceRegistration;

  return Math.round(trialTimeLeft / ONE_DAY);
}

function daysOfGraceRemaining(timestamps) {
  var timeSinceLastPayment = Date.now() - timestamps.lastPayment;
  var graceDaysLeft = config.PAYMENT_PERIOD + config.GRACE_PERIOD - timeSinceLastPayment;

  return Math.round(graceDaysLeft / ONE_DAY);
}

var config = require('app/config');
var isInTrial = require('./is-in-trial');

module.exports = getNumberOfDaysBeforeSuspendingAccount;
