function popup(message) {
  let popupWindowContent = document.getElementById('popupWindowContent');

  popupWindowContent.textContent = message;

  let popupBackground = document.getElementById('popupBackground');

  popupBackground.style.display = 'block';
}

window.onclick = (event) => {
  let popupBackground = document.getElementById('popupBackground');

  popupBackground.style.display = 'none';
};
