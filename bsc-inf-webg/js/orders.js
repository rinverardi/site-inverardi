function submitOrder(form) {
  let order = {
    'name': form['name'].value,
    'type': form['type'].value,
  }

  let request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 300)
      popup('Thank you for your order!');
    else
      request.onerror();
  };

  request.onerror = () => popup('Sorry, submitting the order failed.');
  request.ontimeout = () => popup('Sorry, submitting the order timed out.');

  request.open('POST', apiUrl + 'orders');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', apiToken);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(order));
}

window.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  submitOrder(submitEvent.target);
});
