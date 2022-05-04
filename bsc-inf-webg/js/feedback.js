function checkEmail(email) {
  let emailExpression = /\S+@\S+\.\S+/;

  return emailExpression.test(email);
}

function clearValidationErrors() {
  document.querySelectorAll('.validationError').forEach(indicator => {
    indicator.classList.add('collapsed');
  });
}

function displayValidationErrors(validationErrors) {
  validationErrors.forEach(validationError => {
    let indicatorId = validationError['field'] + 'ValidationError';
    let indicator = document.getElementById(indicatorId);

    indicator.innerHTML = validationError['error'];
    indicator.classList.remove('collapsed');
  });
}

function getRadioValue(form, formField) {
  let radioButtons = form[formField];

  for (let index = 0; index < radioButtons.length; index++) {
    let radioButton = radioButtons[index];

    if (radioButton.checked)
      return radioButton.value;
  }

  return '';
}

function submitFeedback() {
  let form = document.forms[0];

  let feedback = {
    'pizzaRating': form['pizzaTaste'].value,
    'prizeRating': form['pizzaPrice'].value,
    'name': form['customerName'].value,
    'email': form['customerEmail'].value,
    'feedback': form['comment'].value,
  };

  let request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 300)
      popup('Thank you for your feedback!');
    else
      request.onerror();
  };

  request.onerror = () => popup('Sorry, submitting the feedback failed.');
  request.ontimeout = () => popup('Sorry, submitting the feedback timed out.');

  request.open('POST', apiUrl + 'feedback');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', apiToken);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(feedback));
}

function validateFeedback(formData) {
  let validationErrors = []

  let comment = formData['comment'];

  if (comment.length < 50) validationErrors.push({
    'field': 'comment',
    'error': comment
      ? 'This comment is too short! (' + comment.length + '/50 characters)'
      : 'Please enter a comment!'});

  let customerEmail = formData['customerEmail'];

  if (!checkEmail(customerEmail)) validationErrors.push({
    'field': 'customerEmail',
    'error': customerEmail
      ? 'This e-mail address is invalid!'
      : 'Please enter an e-mail address!'});

  let customerName = formData['customerName'];

  if (!customerName) validationErrors.push({
    'field': 'customerName',
    'error': 'Please enter your name!'});

  let pizzaPrice = formData['pizzaPrice'];

  if (!pizzaPrice) validationErrors.push({
    'field': 'pizzaPrice',
    'error': 'Please pick an option!'});

  let pizzaTaste = formData['pizzaTaste'];

  if (!pizzaTaste) validationErrors.push({
    'field': 'pizzaTaste',
    'error': 'Please pick an option!'});

  return validationErrors;
}

function validateFeedbackForm() {
  let form = document.forms[0];

  let formData = {
    'comment': form['comment'].value,
    'customerEmail': form['customerEmail'].value,
    'customerName': form['customerName'].value,
    'pizzaPrice': getRadioValue(form, 'pizzaPrice'),
    'pizzaTaste': getRadioValue(form, 'pizzaTaste'),
  };

  let validationErrors = validateFeedback(formData);

  clearValidationErrors();
  displayValidationErrors(validationErrors);

  form['submit'].disabled = validationErrors.length > 0;

  return validationErrors.length == 0;
}

document.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  if (validateFeedbackForm())
    submitFeedback();
});

window.addEventListener('load', () => {
  document.querySelectorAll('.validationTarget').forEach(input => {
    input.addEventListener('input', validateFeedbackForm);
  });

  validateFeedbackForm();
});
