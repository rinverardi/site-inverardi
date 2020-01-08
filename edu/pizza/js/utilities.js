function sanitize(value) {
  let result = document.createElement('div');

  result.textContent = value;

  return result.innerHTML;
}
