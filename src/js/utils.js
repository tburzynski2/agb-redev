// ====================================
// ----- NAVIGATION FUNCTIONALITY -----
// ====================================

// Shorten nav on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const headerButton = document.querySelector(".btn--nav-quote");
  if (window.scrollY > 50) {
    header.classList.add("shrink");
    headerButton.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
    headerButton.classList.remove("shrink");
  }
});

// ===================================================
// ----- IMAGE CAROUSEL & LIGHTBOX FUNCTIONALITY -----
// ===================================================
const carouselTrack = document.querySelector(".carousel__track");
const carouselCards = Array.from(document.querySelectorAll(".carousel__card"));
const leftChevron = document.querySelector(".carousel__chevron--left");
const rightChevron = document.querySelector(".carousel__chevron--right");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeLightboxButton = document.querySelector(".lightbox__close");

let currentIndex = 0;

// Clone cards to create infinite loop effect
const firstCards = carouselCards.slice(0, 4);
const lastCards = carouselCards.slice(-4);

firstCards.forEach((card) => {
  const clone = card.cloneNode(true);
  carouselTrack.appendChild(clone);
});

lastCards.forEach((card) => {
  const clone = card.cloneNode(true);
  carouselTrack.insertBefore(clone, carouselTrack.firstChild);
});

// Update carousel position
function updateCarousel() {
  const cardWidth = carouselCards[0].getBoundingClientRect().width;
  const visibleIndex = currentIndex + 4;
  carouselTrack.style.transform = `translateX(-${visibleIndex * cardWidth}px)`;
}

// Initial position for infinite loop
updateCarousel();
carouselTrack.style.transition = "none";

// Move carousel right
rightChevron.addEventListener("click", () => {
  const totalCards = carouselTrack.children.length;
  currentIndex += 1;

  carouselTrack.style.transition = "transform 0.5s ease-in-out";
  updateCarousel();

  if (currentIndex >= totalCards - 8) {
    setTimeout(() => {
      carouselTrack.style.transition = "none";
      currentIndex -= carouselCards.length;
      updateCarousel();
    }, 500);
  }
});

// Move carousel left
leftChevron.addEventListener("click", () => {
  currentIndex -= 1;

  carouselTrack.style.transition = "transform 0.5s ease-in-out";
  updateCarousel();

  if (currentIndex < 0) {
    setTimeout(() => {
      carouselTrack.style.transition = "none";
      currentIndex += carouselCards.length;
      updateCarousel();
    }, 500);
  }
});

// Open lightbox using event delegation
carouselTrack.addEventListener("click", (e) => {
  const target = e.target.closest(".carousel__card img");
  if (target) {
    lightbox.classList.add("is-active");
    lightboxImage.src = target.src;
    lightboxImage.alt = target.alt;
  }
});

// Close lightbox when clicking close button or outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === closeLightboxButton) {
    lightbox.classList.remove("is-active");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }
});
