'use strict';

var LoginPage = (function () {
  var form, email, password, remember, toggleBtn, submitBtn;
  var passwordVisible = false;

  var Validators = {
    email: function (v) {
      if (!v || v.trim() === '') return 'Email is required';
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(v.trim()) ? '' : 'Invalid email address';
    },
    password: function (v) {
      if (!v || v.trim() === '') return 'Password is required';
      return v.length < 6 ? 'At least 6 characters' : '';
    }
  };

  var UI = {
    showError: function (input, msg) {
      var g = input.closest('.form-group');
      var el = g.querySelector('.field-error');
      if (!el) { el = document.createElement('span'); el.className = 'field-error'; el.setAttribute('role', 'alert'); g.appendChild(el); }
      el.textContent = msg;
      input.style.borderColor = msg ? 'var(--color-error)' : '';
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    },
    clearError: function (input) {
      var g = input.closest('.form-group');
      var el = g.querySelector('.field-error'); if (el) el.textContent = '';
      input.style.borderColor = '';
      input.setAttribute('aria-invalid', 'false');
    },
    valid: function (input, fn) {
      var msg = fn(input.value);
      if (msg) { this.showError(input, msg); return false; }
      this.clearError(input); return true;
    }
  };

  function validForm() { return UI.valid(email, Validators.email) && UI.valid(password, Validators.password); }

  function loadRemembered() {
    try { var s = localStorage.getItem('rememberedEmail'); if (s) { email.value = s; remember.checked = true; } } catch (e) { console.warn('localStorage:', e); }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validForm()) { var first = form.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }
    try { if (remember.checked) localStorage.setItem('rememberedEmail', email.value.trim()); else localStorage.removeItem('rememberedEmail'); } catch (e) { console.warn('localStorage:', e); }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    setTimeout(function () { submitBtn.disabled = false; submitBtn.textContent = 'Sign in'; }, 1200);
  }

  loadRemembered();
  email.addEventListener('blur', function () { UI.valid(email, Validators.email); });
  email.addEventListener('input', function () { if (email.getAttribute('aria-invalid') === 'true') UI.valid(email, Validators.email); });
  password.addEventListener('blur', function () { UI.valid(password, Validators.password); });
  password.addEventListener('input', function () { if (password.getAttribute('aria-invalid') === 'true') UI.valid(password, Validators.password); });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      passwordVisible = !passwordVisible;
      password.type = passwordVisible ? 'text' : 'password';
      this.setAttribute('aria-label', passwordVisible ? 'Hide password' : 'Show password');
    });
  }

  form.addEventListener('submit', onSubmit);
})();