document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".navbar__hamburger");
  const navbar = document.querySelector(".navbar");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("navbar--open");
  });

  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdownMenu = toggle.nextElementSibling;
      dropdownMenu.classList.toggle("open");
    });
  });

  
});
