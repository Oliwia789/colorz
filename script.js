document.addEventListener('DOMContentLoaded', () => {
  const productCarousel = document.querySelector('.products__carousel');
  const articlesCarousel = document.querySelector('.blog__articles');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const menuIcon = document.querySelector('.open-burger-menu');
  const nav = document.querySelector('.header__mob__nav');

  let cardWidth; 

  let productMaxScroll;
  let productCurrentScroll = 0;
  let productStartX;
  let isProductDragging = false;
  let articlesMaxScroll;
  let articlesCurrentScroll = 0;
  let articlesStartX;
  let isArticlesDragging = false;

  function updateCardWidth() {
    if (window.innerWidth <= 768) {
      cardWidth = 274; 
    } else {
      cardWidth = 347; 
    }
  }

  function updateProductButtons() {
    prevButton.classList.toggle('products__carousel__btn__disabled', productCurrentScroll <= 0);
    prevButton.disabled = productCurrentScroll <= 0;
    nextButton.classList.toggle('products__carousel__btn__disabled', productCurrentScroll >= productMaxScroll);
    nextButton.disabled = productCurrentScroll >= productMaxScroll;
  }

  function updateProductScrollValues() {
    productMaxScroll = productCarousel.scrollWidth - productCarousel.clientWidth;
    updateProductButtons();
  }

  function updateArticlesScrollValues() {
    articlesMaxScroll = articlesCarousel.scrollWidth - articlesCarousel.clientWidth;
  }

  function scrollProductTo(position) {
    productCurrentScroll = position;
    if (productCurrentScroll < 0) productCurrentScroll = 0;
    if (productCurrentScroll > productMaxScroll) productCurrentScroll = productMaxScroll;
    productCarousel.style.transform = `translateX(-${productCurrentScroll}px)`;
    updateProductButtons();
  }

  function scrollArticlesTo(position) {
    articlesCurrentScroll = position;
    if (articlesCurrentScroll < 0) articlesCurrentScroll = 0;
    if (articlesCurrentScroll > articlesMaxScroll) articlesCurrentScroll = articlesMaxScroll;
    articlesCarousel.style.transform = `translateX(-${articlesCurrentScroll}px)`;
  }

  menuIcon.addEventListener('click', () => {
    nav.classList.toggle('open'); 
  });

  prevButton.addEventListener('click', () => {
    scrollProductTo(productCurrentScroll - cardWidth);
  });

  nextButton.addEventListener('click', () => {
    scrollProductTo(productCurrentScroll + cardWidth);
  });

  productCarousel.addEventListener('touchstart', (e) => {
    productStartX = e.touches[0].clientX;
    isProductDragging = true;
  });

  productCarousel.addEventListener('touchmove', (e) => {
    if (!isProductDragging) return;
    const touchX = e.touches[0].clientX;
    const deltaX = productStartX - touchX;
    scrollProductTo(productCurrentScroll + deltaX);
    productStartX = touchX; 
  });

  productCarousel.addEventListener('touchend', () => {
    isProductDragging = false;
  });

  articlesCarousel.addEventListener('touchstart', (e) => {
    articlesStartX = e.touches[0].clientX;
    isArticlesDragging = true;
  });

  articlesCarousel.addEventListener('touchmove', (e) => {
    if (!isArticlesDragging) return;
    const touchX = e.touches[0].clientX;
    const deltaX = articlesStartX - touchX;
    scrollArticlesTo(articlesCurrentScroll + deltaX);
    articlesStartX = touchX; 
  });

  articlesCarousel.addEventListener('touchend', () => {
    isArticlesDragging = false;
  });

  updateCardWidth();

  updateProductScrollValues();
  updateArticlesScrollValues();

  window.addEventListener('resize', () => {
    updateCardWidth();
    updateProductScrollValues();
    updateArticlesScrollValues();
  });
});