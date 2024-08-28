document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.products__carousel');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  const cardWidth = 347; 
  let maxScroll;
  let currentScroll = 0;

  function updateButtons() {
    prevButton.classList.toggle('products__carousel__btn__disabled', currentScroll <= 0);
    prevButton.disabled = currentScroll <= 0;
    nextButton.classList.toggle('products__carousel__btn__disabled', currentScroll >= maxScroll);
    nextButton.disabled = currentScroll >= maxScroll;
  }

  function updateScrollValues() {
    maxScroll = carousel.scrollWidth - carousel.clientWidth;
    updateButtons();
  }

  prevButton.addEventListener('click', () => {
      currentScroll -= cardWidth;
      if (currentScroll < 0) currentScroll = 0;
      carousel.style.transform = `translateX(-${currentScroll}px)`;
      updateButtons();
  });

  nextButton.addEventListener('click', () => {
      currentScroll += cardWidth;
      if (currentScroll > maxScroll) currentScroll = maxScroll;
      carousel.style.transform = `translateX(-${currentScroll}px)`;
      updateButtons();
  });

  updateScrollValues();


  window.addEventListener('resize', () => {
      updateScrollValues();
  });
});