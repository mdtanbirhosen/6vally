const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll(".dot");
const images = document.querySelectorAll(".carousel img");

let index = 1; 
const totalImages = images.length - 2; // Adjusting for cloned images
const transitionTime = 500; 
let isAnimating = false; 

function updateCarousel() {
    if (isAnimating) return; 
    isAnimating = true;
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(${-index * 100}%)`;

    // Update dots (resetting active class)
    dots.forEach(dot => dot.classList.remove("active"));
    dots[(index - 1 + totalImages) % totalImages].classList.add("active");
}

// Handle transition end to fix instant jump issue
carousel.addEventListener("transitionend", () => {
    if (index > totalImages) {
        index = 1;
        resetPosition();
    }
    if (index <= 0) {
        index = totalImages;
        resetPosition();
    }
    isAnimating = false; 
});

function resetPosition() {
    setTimeout(() => {
        carousel.style.transition = "none"; // Remove transition to prevent instant jump
        carousel.style.transform = `translateX(${-index * 100}%)`;
    }, 10); // Small delay to ensure transition effect
}

function nextSlide() {
    if (isAnimating) return;
    index++;
    updateCarousel();
}

// Auto Slide
let autoSlide = setInterval(nextSlide, 3000);

// Dot Navigation
dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
        clearInterval(autoSlide); 
        index = parseInt(e.target.dataset.index) + 1;
        updateCarousel();
        autoSlide = setInterval(nextSlide, 3000);
    });
});

// Set initial position 
carousel.style.transition = "none";
carousel.style.transform = `translateX(${-index * 100}%)`;
