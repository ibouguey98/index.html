// Biinaa-Glam - Boutique en ligne luxe
// Gestion du panier et des produits

let cart = [];
let products = [];
let activeCategory = 'all';

// Charger les produits
async function loadProducts() {
  try {
    const response = await fetch('products.json');
    products = await response.json();
    displayProducts();
  } catch (error) {
    console.error('Erreur de chargement des produits:', error);
  }
}

// Afficher les produits (avec filtre optionnel)
function displayProducts(category = 'all') {
  const productsGrid = document.querySelector('.products-grid');
  if (!productsGrid) return;

  // Filtrer les produits selon la catégorie
  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <p>Aucun produit dans cette catégorie.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => `
    <div class="product" data-id="${product.id}" data-category="${product.category}">
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-category-badge">${product.category}</span>
      </div>
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString('fr-FR')} FCFA</p>
      <div class="actions">
        <button class="btn primary add-to-cart" data-id="${product.id}">
          <i class="fas fa-shopping-bag"></i> Ajouter au panier
        </button>
      </div>
    </div>
  `).join('');

  // Ajouter les événements sur les boutons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.id);
      addToCart(productId);
    });
  });
}

// Filtrer par catégorie
function filterByCategory(category) {
  activeCategory = category;

  // Mettre à jour les boutons actifs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });

  // Afficher les produits filtrés avec animation
  const grid = document.querySelector('.products-grid');
  if (grid) {
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      displayProducts(category);
      grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }, 200);
  }
}

// Ajouter au panier
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showNotification(`"${product.name}" ajouté au panier!`);
}

// Retirer du panier
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Mettre à jour la quantité
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

// Mettre à jour l'affichage du panier
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  // Compter le nombre total d'articles
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Calculer le total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `${total.toLocaleString('fr-FR')} FCFA`;

  // Afficher les articles
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag" style="font-size:3rem;color:var(--gold-light);display:block;margin-bottom:1rem;"></i>
        <p>Votre panier est vide</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-row" data-id="${item.id}">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <div class="cart-item-price">${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</div>
          <div class="cart-item-unit">${item.price.toLocaleString('fr-FR')} FCFA / unité</div>
        </div>
        <div class="cart-item-controls">
          <button class="btn-qty" onclick="updateQuantity(${item.id}, -1)">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">${item.quantity}</span>
          <button class="btn-qty" onclick="updateQuantity(${item.id}, 1)">
            <i class="fas fa-plus"></i>
          </button>
          <button class="btn-remove" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
}

// Afficher/masquer le panier
function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('hidden');
}

// Passer à la caisse (WhatsApp)
function checkout() {
  if (cart.length === 0) {
    showNotification('Votre panier est vide!', 'error');
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let message = '🛍️ *Nouvelle commande Biinaa-Glam*%0A%0A';

  // Grouper par catégorie dans le message
  const categories = [...new Set(cart.map(item => item.category))];
  categories.forEach(cat => {
    message += `*${cat}:*%0A`;
    cart.filter(item => item.category === cat).forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `  • ${item.name} x${item.quantity} — ${itemTotal.toLocaleString('fr-FR')} FCFA%0A`;
    });
    message += `%0A`;
  });

  message += `💰 *Total: ${totalAmount.toLocaleString('fr-FR')} FCFA*%0A%0AMerci pour votre commande! 🌟`;

  const whatsappUrl = `https://wa.me/221778069948?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// Notification
function showNotification(message, type = 'success') {
  // Supprimer les notifications existantes
  document.querySelectorAll('.notification').forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // Événements des boutons de filtre
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterByCategory(btn.dataset.category);
    });
  });

  // Événements du panier
  document.getElementById('cart-btn').addEventListener('click', toggleCart);
  document.getElementById('close-cart').addEventListener('click', toggleCart);
  document.getElementById('checkout-btn').addEventListener('click', checkout);

  // Fermer le panier en cliquant à l'extérieur
  document.addEventListener('click', (e) => {
    const cartEl = document.getElementById('cart');
    const cartBtn = document.getElementById('cart-btn');
    if (!cartEl.contains(e.target) && !cartBtn.contains(e.target) && !cartEl.classList.contains('hidden')) {
      toggleCart();
    }
  });
});
