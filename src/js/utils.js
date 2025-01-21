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
// Flexbox card gap
const cardGap = 16;

let currentIndex = 0;

// Clone cards to create infinite loop effect
const firstCards = carouselCards.slice(0, 4);
const lastCards = carouselCards.slice(-4);

firstCards.forEach((card) => {
  const clone = card.cloneNode(true);
  carouselTrack.appendChild(clone);
});

lastCards.slice().reverse().forEach((card) => {
  const clone = card.cloneNode(true);
  carouselTrack.insertBefore(clone, carouselTrack.firstChild);
});

// Update carousel position
function updateCarousel() {
  const cardWidth = carouselCards[0].getBoundingClientRect().width;
  const visibleIndex = currentIndex + 4;
  const hc = 443.75;
  carouselTrack.style.transform = `translateX(-${visibleIndex * (cardWidth + cardGap)}px)`;
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

// ===================================================
// ------------- ACCORDION FUNCTIONALITY -------------
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hover-card");

  const isMobile = () => window.innerWidth <= 900;

  const setupAccordion = () => {
    if (isMobile()) {
      cards.forEach((card) => {
        const title = card.querySelector(".hover-card__title");
        const description = card.querySelector(".hover-card__description");
        const icon = card.querySelector(".toggle-icon");

        // Collapse all sections initially
        description.classList.remove("hover-card__description--expanded");
        icon.textContent = "+";

        title.addEventListener("click", () => {
          cards.forEach((otherCard) => {
            const otherDescription = otherCard.querySelector(
              ".hover-card__description"
            );
            const otherIcon = otherCard.querySelector(".toggle-icon");
            otherDescription.classList.remove(
              "hover-card__description--expanded"
            );
            otherIcon.textContent = "+";
          });

          const isExpanded = description.classList.toggle(
            "hover-card__description--expanded"
          );
          icon.textContent = isExpanded ? "-" : "+";
        });
      });

      // After clearing all, expand the first card
      if (cards.length > 0) {
        const firstCard = cards[0];
        const firstText = firstCard.querySelector(".hover-card__description");
        const firstIcon = firstCard.querySelector(".toggle-icon");
        firstText.classList.add("hover-card__description--expanded");
        firstIcon.textContent = "-";
      }
    }
  };

  setupAccordion();

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!isMobile()) {
        // Remove accordion behavior on larger screens
        cards.forEach((card) => {
          const text = card.querySelector(".hover-card__description");
          const icon = card.querySelector(".toggle-icon");
          text.classList.add("hover-card__description--expanded");
          icon.textContent = "";
        });
      } else {
        setupAccordion();
      }
    }, 150);
  });
});

// ========================================================
// ------------- TABBED SECTION FUNCTIONALITY -------------
// ========================================================

const tabs = document.querySelectorAll("[data-tab-target]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabContentTarget = document.getElementById(tab.dataset.tabTarget);
    const activeTabContents = document.querySelectorAll(
      ".tab__content--active"
    );
    activeTabContents.forEach((activeTabContent) => {
      activeTabContent.classList.remove("tab__content--active");
    });

    tabs.forEach((activeTab) => {
      activeTab.classList.remove("tab--active");
      activeTab.querySelector(".tab__indicator").textContent = "+";
    });

    tabContentTarget.classList.add("tab__content--active");
    tab.classList.add("tab--active");
    tab.querySelector(".tab__indicator").textContent = "-";
  });
});
