

window.addEventListener('DOMContentLoaded', () => {
  if(!localStorage.getItem('products')){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data));
    });
  }
 
JSON.parse(localStorage.getItem('products')).forEach(update);

checkLocal();

});

function update(current) {
  const toAppend = document.createElement('product-item');

  toAppend.shadowRoot.querySelector('img').src = current.image;
  toAppend.shadowRoot.querySelector('img').alt = current.title; 
  toAppend.shadowRoot.querySelector('.title').innerHTML = current.title; 
  toAppend.shadowRoot.querySelector('.price').innerHTML = '$' + current.price;
  toAppend.id = current.id;
  toAppend.shadowRoot.querySelector('button').id = current.id;

  toAppend.shadowRoot.querySelector('button').addEventListener('click', function(){
    let status = this.innerText;
  
    if(status == 'Remove from Cart'){
      this.innerText = 'Add to Cart';
      document.getElementById("cart-count").innerText = -1 + Number(document.getElementById("cart-count").innerText);
      localStorage.setItem(this.id,"false" );
    }
    else{
      this.innerText = 'Remove from Cart';
      document.getElementById("cart-count").innerText = 1 + Number(document.getElementById("cart-count").innerText);
      alert('Added to Cart!');
      localStorage.setItem(this.id,"true");
    }
    
  });

  document.getElementById("product-list").appendChild(toAppend);
}


function checkLocal(){
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {       
    let key = localStorage.key(i);
    if(localStorage.getItem(key) == "true"){
      document.getElementById(key).shadowRoot.querySelector('button').innerText = 'Remove from Cart';
      count++;
    }
 
}

document.getElementById('cart-count').innerText = count;

}
