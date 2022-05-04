function updateOrderHistory(orderList) {
  let result = ''; 

  orderList.reverse().forEach((order) => {
    result += '<div class="key">Product Name:</div>';
    result += '<div class="value">' + sanitize(order.name) + '</div>';

    result += '<div class="key">Product Type:</div>';
    result += '<div class="value">' + sanitize(order.type) + '</div>';

    result += '<hr>';
  });

  document.getElementById('orderHistory').innerHTML = result;
}

window.addEventListener('load', (loadEvent) => {
  let request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      let orderList = JSON.parse(request.responseText);

      updateOrderHistory(orderList);
    } else
      request.onerror();
  };

  request.onerror = () => popup('Sorry, loading the order history failed.');
  request.ontimeout = () => popup('Sorry, loading the order history timed out.');

  request.open('GET', apiUrl + 'orders');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', apiToken);
  request.send();
});
