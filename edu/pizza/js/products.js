images = {

  // Use pizza images that are more aesthetically pleasing.

  'https://farm4.staticflickr.com/3565/5818252079_29635c03cc.jpg': 'pizza_giardino_250x250.jpg',
  'https://farm5.staticflickr.com/4042/4660357797_09dcd917b1.jpg': 'pizza_piccante_250x250.jpg',
  'https://farm9.staticflickr.com/8326/8096659940_4e0a65e598.jpg': 'pizza_prosciutto_250x250.jpg',
  'https://farm3.staticflickr.com/2797/4344770705_b6d159f799.jpg': 'pizza_quattro_formaggi_250x250.jpg',
  'https://farm5.staticflickr.com/4078/4932649252_b0aaa733ae.jpg': 'pizza_quattro_stagioni_250x250.jpg',
  'https://farm6.staticflickr.com/5661/22907779119_b2ec1efa11.jpg': 'pizza_stromboli_250x250.jpg',
  'https://farm7.staticflickr.com/6044/6363618775_e8714fb517.jpg': 'pizza_verde_250x250.jpg',
  'https://farm9.staticflickr.com/8574/16488100040_988f0caa70.jpg': 'pizza_rustica_250x250.jpg',

  // Use salad images that are more aesthetically pleasing.

  'https://farm6.staticflickr.com/5087/5358599242_7251dc7de4.jpg': 'salad_green_250x250.jpg',
  'https://farm4.staticflickr.com/3130/5862973974_c107ed81ea.jpg': 'salad_tomato_250x250.jpg',
  'https://farm9.staticflickr.com/8223/8372222471_662acd24f6.jpg': 'salad_field_250x250.jpg',
  'https://farm8.staticflickr.com/7017/6818343859_bb69394ff2.jpg': 'salad_rocket_250x250.jpg',

  // Use soft drink images that are more aesthetically pleasing.

  'https://farm1.staticflickr.com/71/203324363_b448827eb0.jpg': 'softdrink_coke_250x250.jpg',
  'https://farm1.staticflickr.com/684/32876893826_130576f75a.jpg': 'softdrink_fanta_250x250.jpg',
  'https://farm4.staticflickr.com/3344/3593103557_bf47c0a3a2.jpg': 'softdrink_pepsi_250x250.jpg',
  'https://farm3.staticflickr.com/2391/2507916617_254348d40c.jpg': 'softdrink_redbull_250x250.jpg',
}

function map(product, productNode) {
  productNode.querySelector(".productName").textContent = product.name;
  productNode.querySelector(".productPrice").textContent = product.prize;
  productNode.querySelector("img").src = replaceImage(product.imageUrl);
  productNode.querySelector("input[name='name']").value = product.name;
}

function mapPizza(product, productNode) {
  map(product, productNode);

  productNode.querySelector(".productDescription").textContent = product.ingredients.join(', ');
  productNode.querySelector("input[name='type']").value = 'pizza';
}

function mapSalad(product, productNode) {
  map(product, productNode);

  productNode.querySelector("input[name='type']").value = 'salad';
}

function mapSoftdrink(product, productNode) {
  map(product, productNode);

  productNode.querySelector("input[name='type']").value = 'softdrink';
}

function replaceImage(imageUrl) {
  return images[imageUrl] ? '../images/' + images[imageUrl] : imageUrl;
}

function showProducts(productUrl, productMapper) {
  let request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      let productList = JSON.parse(request.responseText);
      let productTemplate = document.getElementById("productTemplate");

      productList.forEach(product => {
        let productNode = productTemplate.cloneNode(true);

        productMapper(product, productNode);
        productTemplate.parentNode.appendChild(productNode);
      });

      productTemplate.parentNode.removeChild(productTemplate);
    } else
      request.onerror();
  };

  request.onerror = () => popup('Sorry, loading the products failed.');
  request.ontimeout = () => popup('Sorry, loading the products timed out.');

  request.open('GET', productUrl);
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', apiToken);
  request.send();
}
