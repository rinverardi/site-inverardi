(function() {
  let mapHolders = document.getElementsByClassName("map-holder");

   for (mapHolder of mapHolders) {
     mapHolder.scroll(
       (mapHolder.scrollWidth - mapHolder.clientWidth) / 2,
       (mapHolder.scrollHeight - mapHolder.clientHeight) / 2);
   }
})();
