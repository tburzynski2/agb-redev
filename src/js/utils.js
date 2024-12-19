window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const headerButton = document.querySelector(".btn__nav-quote");
  if (window.scrollY > 50) {
    header.classList.add("shrink");
    headerButton.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
    headerButton.classList.remove("shrink");
  }
});
