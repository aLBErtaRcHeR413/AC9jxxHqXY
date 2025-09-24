// 代码生成时间: 2025-09-24 09:55:59
const { isEmpty, isEmail, isURL, isLength } = require('validator');

/**
 * FormValidator class for validating form data
 * @class FormValidator
 */
class FormValidator {
  constructor() {
    this.errors = [];
  }

  /**
   * Validate email field
   * @param {string} value The email to validate
   * @returns {string} Error message if validation fails, otherwise an empty string
   */
  validateEmail(value) {
    if (!isEmail(value)) {
      return 'Email is invalid';
    }
    return '';
  }

  /**
   * Validate URL field
   * @param {string} value The URL to validate
   * @returns {string} Error message if validation fails, otherwise an empty string
   */
  validateURL(value) {
    if (!isURL(value)) {
      return 'URL is invalid';
    }
    return '';
  }

  /**
   * Validate text field with minimum length
   * @param {string} value The text to validate
   * @param {number} minLength Minimum length of the text
   * @returns {string} Error message if validation fails, otherwise an empty string
   */
  validateText(value, minLength) {
    if (isEmpty(value) || !isLength(value, { min: minLength })) {
      return `Text must be at least ${minLength} characters long`;
    }
    return '';
  }

  /**
   * Add an error message to the errors list
   * @param {string} message The error message to add
   */
  addError(message) {
    this.errors.push(message);
  }

  /**
   * Get all error messages
   * @returns {Array<string>} A list of error messages
   */
  getErrors() {
    return this.errors;
  }
}

// Example usage
const validator = new FormValidator();

const form = {
  email: 'test@example.com',
  url: 'https://example.com',
  text: 'Hello World',
};

const errors = [];
if (validator.validateEmail(form.email)) {
  errors.push(validator.validateEmail(form.email));
}
if (validator.validateURL(form.url)) {
  errors.push(validator.validateURL(form.url));
}
if (validator.validateText(form.text, 5)) {
  errors.push(validator.validateText(form.text, 5));
}

if (errors.length) {
  console.error('Validation errors:', errors);
} else {
  console.log('Form data is valid');
}
