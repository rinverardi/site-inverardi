function summarize(ratings, target) {
  var svg = dimple.newSvg(target, 400, 200);

  let chartData = Object
    .keys(ratings)
    .map((key) => ({'key': key, 'value': ratings[key]}));

  var chart = new dimple.chart(svg, chartData);

  chart.setBounds(10, 10, 390, 190)
  chart.addMeasureAxis('p', 'value');
  chart.addSeries('key', dimple.plot.pie);
  chart.addLegend(10, 10, 100, 100, "left");
  chart.draw();
}

function summarizePrice(feedbackList) {
  let ratings = {};

  feedbackList.forEach((feedback) => {
    let key = feedback.prizeRating;

    if (ratings[key])
      ratings[key]++;
    else
      ratings[key] = 1;
  });

  summarize(ratings, '#summaryPrice');
}

function summarizeTaste(feedbackList) {
  let ratings = {};

  feedbackList.forEach((feedback) => {
    let key = feedback.pizzaRating;

    if (ratings[key])
      ratings[key]++;
    else
      ratings[key] = 1;
  });

  summarize(ratings, '#summaryTaste');
}

function updateFeedbackHistory(feedbackList) {
  let result = ''; 

  feedbackList.reverse().forEach((feedback) => {
    result += '<div class="key">Price:</div>';
    result += '<div class="value">' + sanitize(feedback.prizeRating) + '</div>';

    result += '<div class="key">Taste:</div>';
    result += '<div class="value">' + sanitize(feedback.pizzaRating) + '</div>';

    result += '<div class="key">Customer Name:</div>';
    result += '<div class="value">' + sanitize(feedback.name) + '</div>';

    result += '<div class="key">Customer E-Mail:</div>';
    result += '<div class="value">' + sanitize(feedback.email) + '</div>';

    result += '<div class="key">Comment:</div>';
    result += '<div class="value">' + sanitize(feedback.feedback) + '</div>';

    result += '<hr>';
  });

  document.getElementById('feedbackHistory').innerHTML = result;
}

window.addEventListener('load', (loadEvent) => {
  let request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      let feedbackList = JSON.parse(request.responseText);

      summarizePrice(feedbackList);
      summarizeTaste(feedbackList);

      updateFeedbackHistory(feedbackList);
    } else
      request.onerror();
  };

  request.onerror = () => popup('Sorry, loading the feedback history failed.');
  request.ontimeout = () => popup('Sorry, loading the feedback history timed out.');

  request.open('GET', apiUrl + 'feedback');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', apiToken);
  request.send();
});
