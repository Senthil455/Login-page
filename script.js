'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var remember = document.getElementById('remember');
  var toggleBtn = document.querySelector('.toggle-password');
  var submitBtn = form.querySelector('.btn-primary');

  var passwordVisible = false;

  function validateEmail(value) {
    if (!value || value.trim() === '') return 'Email address is required';
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value.trim())) return 'Please enter a valid email address';
    return '';
  }

  function validatePassword(value) {
    if (!value || value === '') return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  }

  function showError(input, msg) {
    input.style.borderColor = msg ? 'var(--color-error)' : '';
  }

  email.addEventListener('blur', function () { showError(this, validateEmail(this.value)); });
  email.addEventListener('input', function () { if (this.style.borderColor) showError(this, validateEmail(this.value)); });
  password.addEventListener('blur', function () { showError(this, validatePassword(this.value)); });
  password.addEventListener('input', function () { if (this.style.borderColor) showError(this, validatePassword(this.value)); });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      passwordVisible = !passwordVisible;
      password.type = passwordVisible ? 'text' : 'password';
      this.setAttribute('aria-label', passwordVisible ? 'Hide password' : 'Show password');
      this.innerHTML = passwordVisible
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  }
});