// Script para manejar el carrito de compras

let cart = []; // Array para almacenar los productos del carrito

// Función para actualizar el carrito en la interfaz
function renderCart() {
  const cartList = document.getElementById('cart');
  const cartTotal = document.getElementById('cart-total');
  
  // Limpiamos el contenido previo del carrito
  cartList.innerHTML = '';
  
  // Verificamos si el carrito está vacío
  if (cart.length === 0) {
    cartList.innerHTML = '<li class="list-group-item text-muted">Tu carrito está vacío</li>';
    cartTotal.textContent = '0';
  } else {
    let total = 0;
    
    // Recorremos los productos en el carrito y los mostramos
    cart.forEach((product, index) => {
      total += product.price;
      cartList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${product.name} - $${product.price}
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
        </li>
      `;
    });
    
    // Actualizamos el total en el carrito
    cartTotal.textContent = total.toFixed(2);
  }
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
  // Verificamos si el carrito tiene menos de 50 productos antes de agregar
  if (cart.length < 50) {
    cart.push({ name, price });
    renderCart();
  } else {
    alert('No puedes agregar más productos. Máximo 50 compras permitidas.');
  }
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Event listener para los botones "Agregar al Carrito"
document.querySelectorAll('.addToCart').forEach((button, index) => {
  button.addEventListener('click', () => {
    const productName = button.parentNode.querySelector('h4').textContent;
    const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('$')[1]);
    addToCart(productName, productPrice);
  });
});

// Event listener para el botón de "Pagar"
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length > 0) {
    alert('Gracias por tu compra!');
    // Aquí podría incluirse lógica adicional, como enviar el pedido a un servidor, etc.
    cart = []; // Limpiamos el carrito después de la compra
    renderCart(); // Actualizamos la interfaz
  } else {
    alert('El carrito está vacío. Agrega productos antes de proceder al pago.');
  }
});
