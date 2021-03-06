'use strict';

var DOM = require('app/services/dom');
var Form = require('app/super/form');
var inherits = require('inherits');
var AuthenticationFormValidator = require('./authentication-form-validator');
var Navigation = require('app/widgets/navigation');

inherits(AuthenticationForm, Form);

function AuthenticationForm(domElement, formValidationError, submitButtonSpinner, userData) {
  this.requiredFields = ['email', 'password'];

  this.processForm = function(formData) {
    return authenticateUser()
    .then(recordTimestamp)
    .then(submitForm);

    function authenticateUser() {
      return userData.authenticateUser(formData.email, formData.password);
    }

    function recordTimestamp() {
      return userData.set('timestamps/lastLogin', Date.now());
    }

    function submitForm() {
      domElement.submit();
    }
  };

  var passwordRecoveryLink = DOM.require('#password-recovery', domElement);
  var passwordField = DOM.require('input[name="password"]', domElement);

  passwordRecoveryLink.addEventListener('click', function(event) {
    event.preventDefault();
    submitEmailToPasswordRecoveryPage();
  });

  function submitEmailToPasswordRecoveryPage() {
    domElement.method = 'GET';
    domElement.action = Navigation.getPathForPage('PasswordRecoveryPage');
    passwordField.value = '';
    domElement.submit();
  }

  this.submitEmailToPasswordRecoveryPage = submitEmailToPasswordRecoveryPage;

  var formValidator = new AuthenticationFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);
}

module.exports = AuthenticationForm;
