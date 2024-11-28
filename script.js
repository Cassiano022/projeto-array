import { menuOptions } from './products.js';

// Elementos do DOM
const list = document.querySelector('.product-list');
const buttonShowAll = document.querySelector('.show-all');
const buttonMapAll = document.querySelector('.map-all');
const buttonSumAll = document.querySelector('.sum-all');
const buttonFilterAll = document.querySelector('.filter-all');

// Função para formatar valores em moeda
const formatCurrency = (value) => 
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

// Função para exibir produtos na lista
const showAll = (productsArray) => {
  if (!Array.isArray(productsArray)) {
    console.error("Erro: productsArray não é um array!");
    return;
  }

  const productsHTML = productsArray.map((product) => `
    <li class="product-item">
      <img src="${product.src}" alt="${product.name}" class="product-image">
      <div class="product-details">
        <p class="product-name">${product.name}</p>
        <p class="product-description">${product.description}</p>
        <p class="item-price">${formatCurrency(product.price)}</p>
        <span class="product-type">${product.vegan ? 'Vegano' : 'Tradicional'}</span>
      </div>
    </li>
  `).join('');

  list.innerHTML = productsHTML;
};

// Função para aplicar desconto de 10% e exibir os produtos
const mapAllItems = () => {
  const newPrices = menuOptions.map((product) => ({
    ...product,
    price: Number((product.price * 0.9).toFixed(2)) // Arredonda para 2 casas decimais
  }));

  showAll(newPrices);
};

// Função para calcular o valor total dos produtos
const sumAllItems = () => {
  const totalValue = menuOptions.reduce((acc, curr) => acc + curr.price, 0);
  
  list.innerHTML = `
    <li class="total-value">
      <p>O Valor Total dos Itens é ${formatCurrency(totalValue)}</p>
    </li>
  `;
};

// Função para filtrar e exibir apenas itens veganos
const filterAllItems = () => {
  const filterJustVegan = menuOptions.filter((product) => product.vegan);
  showAll(filterJustVegan);
};

// Eventos para os botões
const setupEventListeners = () => {
  buttonShowAll.addEventListener('click', () => showAll(menuOptions));
  buttonMapAll.addEventListener('click', mapAllItems);
  buttonSumAll.addEventListener('click', sumAllItems);
  buttonFilterAll.addEventListener('click', filterAllItems);
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  showAll(menuOptions); // Mostra todos os produtos ao carregar a página
});

