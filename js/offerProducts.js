// Fetch data from JSON
function products() {
  fetch('./assets/products.json')
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => console.error('Error:', error));
}

// display products
function displayProducts(products) {
  const carousel = document.getElementById("carousel-wrapper");
  let currentIndex = 0;



  // lastly added the items to show start
  let itemsToShow = getItemsToShow()

  // itemsToShow based on screen width
  function getItemsToShow() {
    const width = window.innerWidth;
    console.log(width)

    if (width <= 768) {
      return 1; // Small screens
    } else if (width <= 992) {
      return 2; // Medium screens
    } else {
      return 4; // Large screens
    }
  }

  // window resize
  function updateItemsToShow() {
    itemsToShow = getItemsToShow();
    updateCarousel(); 
  }

  // window resize events
  window.addEventListener("resize", updateItemsToShow);
// lastly added the items to show end


  // add products to the carousel
  function renderCarousel() {
    carousel.innerHTML = "";
    products.forEach(product => {
      const slide = document.createElement("div");
      slide.classList.add("carousel-slide");
      slide.innerHTML = `
      <div class="product">
        <div>
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="card-body">
          <!-- rating -->
          <div class="rating">
            <i class="fa-solid fa-star" style="color: #FFBA49;"></i>
            <i class="fa-solid fa-star" style="color: #FFBA49;"></i>
            <i class="fa-solid fa-star" style="color: #FFBA49;"></i>
            <i class="fa-solid fa-star" style="color: #FFBA49;"></i>
            <i class="fa-solid fa-star" style="color: #FFBA49;"></i>
            <span>(${product.rating || 5})</span>
          </div>
          <h5>${product.category}</h5>
          <h3>${product.name.slice(0, 13)}...</h3>
          <div class="price">
            <span class="normal-price">${product.originalPrice}$</span>
            <span class="discount-price">${product.discountPrice}$</span>
          </div>
        </div>
      </div>`;
      carousel.appendChild(slide);
    });
  }

  function updateCarousel() {
    const offset = -currentIndex * (100 / itemsToShow);
    carousel.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    if (currentIndex + itemsToShow < products.length) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = products.length - itemsToShow;
    }
    updateCarousel();
  }

  // Auto-play functionality
  setInterval(() => {
    nextSlide();
  }, 2000); 

  renderCarousel();
  updateCarousel();


}

products();
